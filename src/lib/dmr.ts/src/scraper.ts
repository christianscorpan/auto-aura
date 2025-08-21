import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import * as cheerio from 'cheerio';
import { URLSearchParams } from 'url';
import { interpretValue } from './interpreter';
import type { VehicleData, InspectionData, InsuranceData, DispensationData, VehicleBasicData, RegistrationData } from './interfaces';

wrapper(axios);

const getHeaders = (extraHeaders: Record<string, string> = {}) => ({
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  ...extraHeaders,
});

const BASE_URL = 'https://motorregister.skat.dk';
const PREFIX = "ptr-dmr:portlet.";
const DEFAULT_TIMEOUT_MS = 15000;

class MissingTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingTokenError';
  }
}

const getTokenAndUrl = async (session: AxiosInstance): Promise<[string, string]> => {
  const response = await session.get(`${BASE_URL}/dmr-kerne/koeretoejdetaljer/visKoeretoej`, { headers: getHeaders() });
  const $ = cheerio.load(response.data);
  const token = $('#searchForm input[name="dmrFormToken"]').val();
  const url = $('#searchForm').attr('action');

  if (typeof token !== 'string' || !url) {
    throw new MissingTokenError('Could not find token or URL on the page.');
  }

  return [token, url];
};

const cleanText = (node: cheerio.Cheerio<any> | undefined): string => {
  if (!node) return "";
  return (node.text() || "")
    .replace(/:\s*$/, "")
    .trim();
}

const extractPageData = ($: cheerio.CheerioAPI): Partial<VehicleData> => {
  const allowedSections = new Set(['visKT', 'opretKT']);
  const labels = $(`[id^="${PREFIX}"]`).filter((i, el) => $(el).is('label'));

  const items = labels.map((i, label) => {
    const $label = $(label);
    const id = $label.attr('id') || '';
    const section = id.slice(PREFIX.length).split(".")[0] || null;
    const description = cleanText($label);

    let valueText: string | null = null;

    // 1) For attribute
    const forId = $label.attr('for');
    if (forId) {
      const target = $(`#${forId}`);
      if (target.length) {
        if (target.is('input, textarea, select')) {
          valueText = target.val() as string;
        } else {
          valueText = cleanText(target);
        }
      }
    }

    // 2) Fallback: value cell
    if (!valueText) {
      const cell = $label.closest("td, th, div");
      if (cell.length && cell.next().length) {
        valueText = cleanText(cell.next());
      }
    }

    // 3) Fallback: immediate sibling
    if (!valueText && $label.next().length) {
      valueText = cleanText($label.next());
    }

    const interpreted = interpretValue(valueText);

    return { id, section, description, raw: valueText, interpreted };
  }).get();

  // Grouped by section
  const grouped = items.reduce((acc, cur) => {
    if (cur.section && allowedSections.has(cur.section)) {
      if (!acc[cur.section]) {
        acc[cur.section] = {};
      }
      const key = cur.id.split('.').pop();
      if (key) {
        acc[cur.section][key] = {
          description: cur.description,
          value: cur.interpreted
        };
      }
    }
    return acc;
  }, {} as Record<string, Record<string, { description: string; value: unknown }>>);

  return grouped as unknown as Partial<VehicleData>;
};

const parseInspections = ($: cheerio.CheerioAPI): InspectionData[] => {
  const rows = $('tr[class*="stripes-"]');
  const results: InspectionData[] = [];

  rows.each((_, el) => {
    const cells = $(el).find('td');
    if (cells.length < 4) return;

    const resultText = cleanText(cells.eq(2));
    const dateText = cleanText(cells.eq(3));

    const parsedDate = interpretValue(dateText);
    const date = parsedDate instanceof Date ? parsedDate : null;

    if (date && resultText) {
      results.push({
        date,
        status: resultText || null,
      });
    }
  });

  return results;
};

const parseInsurance = ($: cheerio.CheerioAPI): InsuranceData | null => {
  const companyRaw = cleanText($('#lblSelskab'));
  const numberRaw = cleanText($('#lblBevisNummer'));
  const statusRaw = cleanText($('#lblStatus'));
  const createdRaw = cleanText($('#lblbevisdato, #lblBevisDato'));

  const companyVal = interpretValue(companyRaw);
  const numberVal = interpretValue(numberRaw);
  const createdVal = interpretValue(createdRaw);

  const company = typeof companyVal === 'string' ? companyVal : null;
  const number = typeof numberVal === 'string' ? numberVal : null;
  const created = createdVal instanceof Date ? createdVal : null;

  let is_active: boolean | null = null;
  if (statusRaw) {
    const s = statusRaw.trim().toLowerCase();
    if (s === 'aktiv') is_active = true;
    else is_active = false;
  }

  if (company || number || created || is_active !== null) {
    return { company, number, created, is_active } as InsuranceData;
  }
  return null;
};

const getSectionText = ($: cheerio.CheerioAPI, titlePart: string): string => {
  const header = $('h3').filter((_, el) => $(el).text().toLowerCase().includes(titlePart.toLowerCase())).first();
  if (!header.length) return '';
  let text = '';
  let node: any = header.get(0) ? (header.get(0) as any).nextSibling : null;
  while (node) {
    if (node.type === 'tag') {
      const name = (node.name || '').toLowerCase();
      if (name === 'h3' || name === 'hr') break;
      text += ' ' + $(node).text();
    } else if (node.type === 'text') {
      text += ' ' + (node.data || '');
    }
    node = node.nextSibling;
  }
  return (text || '').replace(/\s+/g, ' ').trim();
};

const parseDispensations = ($: cheerio.CheerioAPI): DispensationData | null => {
  const tilladelserText = getSectionText($, 'Tilladelser');
  const dispText = getSectionText($, 'Dispensationer');
  const leasingText = getSectionText($, 'Leasingforhold');

  let taxi: boolean | null = null;
  const m = tilladelserText.match(/Egnet\s*til\s*taxikørsel\s*:\s*(Ja|Nej)/i);
  if (m) taxi = /^ja$/i.test(m[1]);

  let dispensations: string | null = null;
  if (dispText) {
    dispensations = /ingen\s*resultater/i.test(dispText) ? null : dispText;
  }

  let leasing: string | null = null;
  if (leasingText) {
    leasing = leasingText;
  }

  if (taxi === null && dispensations === null && leasing === null) return null;
  return { taxi, dispensations, leasing } as DispensationData;
};

const parseKeyValueSection = ($: cheerio.CheerioAPI, titlePart: string): Record<string, string> => {
  const out: Record<string, string> = {};
  const header = $('h3').filter((_, el) => $(el).text().toLowerCase().includes(titlePart.toLowerCase())).first();
  if (!header.length) return out;
  // Find the closest .bluebox after the header
  const blue = header.nextAll('.bluebox').first();
  const pairs = blue.find('.keyvalue, .notrequired.keyvalue');
  pairs.each((_, el) => {
    const key = $(el).find('.key').text().replace(/:\s*$/, '').replace(/\s+/g, ' ').trim();
    const value = $(el).find('.value').text().replace(/\s+/g, ' ').trim();
    if (key) out[key] = value;
  });
  return out;
};

const parseFirstPageBasics = ($: cheerio.CheerioAPI): { vehicle: VehicleBasicData | null; registration: RegistrationData | null } => {
  const vehPairs = parseKeyValueSection($, 'Køretøj');
  const regPairs = parseKeyValueSection($, 'Registrerings');

  let vehicle: VehicleBasicData | null = null;
  if (Object.keys(vehPairs).length) {
    const mmv = vehPairs['Mærke, Model, Variant'] || vehPairs['Mærke, Model, Variant:'] || '';
    let brand: string | null = null, model: string | null = null, variant: string | null = null;
    if (mmv) {
      const parts = mmv.split(',').map(s => s.trim()).filter(Boolean);
      brand = parts[0] || null;
      model = parts[1] || null;
      variant = parts.slice(2).join(', ') || null;
    }
    const lastChangeRaw = vehPairs['Seneste ændring'] || vehPairs['Seneste ændring:'] || '';
    const lastChangeVal = interpretValue(lastChangeRaw);
    vehicle = {
      vin: (vehPairs['Stelnummer'] || vehPairs['Stelnummer:'] || null) || null,
      brand,
      model,
      variant,
      type: (vehPairs['Art'] || vehPairs['Art:'] || null) || null,
      lastChange: lastChangeVal instanceof Date ? lastChangeVal : null,
    };
  }

  let registration: RegistrationData | null = null;
  if (Object.keys(regPairs).length) {
    const firstRegVal = interpretValue(regPairs['Første registreringsdato'] || regPairs['Første registrerings3;dato'] || regPairs['Første registrerings3;dato:'] || '');
    registration = {
      registrationNumber: (regPairs['Registreringsnummer'] || regPairs['Registreringsnummer:'] || null) || null,
      firstRegistrationDate: firstRegVal instanceof Date ? firstRegVal : null,
      usage: (regPairs['Anvendelse'] || regPairs['Anvendelse:'] || null) || null,
      lastChange: (regPairs['Seneste ændring'] || regPairs['Seneste ændring:'] || null) || null,
    };
  }

  return { vehicle, registration };
};

export const scrape = async (licensePlate: string): Promise<VehicleData | null> => {
  const jar = new CookieJar();
  const session = axios.create({ jar, timeout: DEFAULT_TIMEOUT_MS });

  // Initial token + form action
  const [token, searchUrl] = await getTokenAndUrl(session);

  const payload = new URLSearchParams({
    dmrFormToken: token,
    soegeord: licensePlate,
    soegekriterie: 'REGISTRERINGSNUMMER',
    [searchUrl]: 'Søg',
  });

  const postResponse = await session.post(`${BASE_URL}${searchUrl}`, payload, {
    headers: getHeaders({ 'Referer': `${BASE_URL}${searchUrl}` }),
  });

  if (postResponse.data.includes('Ingen køretøjer fundet.')) {
    return null;
  }

  const $page1 = cheerio.load(postResponse.data);
  const vehicleData: Partial<VehicleData> = extractPageData($page1);
  const inspectionsAcc: InspectionData[] = parseInspections($page1);
  let insuranceAcc: InsuranceData | null = parseInsurance($page1);
  let dispAcc: DispensationData | null = parseDispensations($page1);
  const firstPageBasics = parseFirstPageBasics($page1);

  // Collect all tab links instead of only the active one
  const tabLinks = new Set<string>();
  $page1('.h-tab-btn a').each((_, el) => {
    const href = $page1(el).attr('href');
    if (href) tabLinks.add(href);
  });

  for (const pageUrl of tabLinks) {
    const pageResponse = await session.get(`${BASE_URL}${pageUrl}`, {
      headers: getHeaders({ 'Referer': `${BASE_URL}${searchUrl}` }),
    });
    const $page = cheerio.load(pageResponse.data);
    const pageData = extractPageData($page);
    const pageInspections = parseInspections($page);
    if (pageInspections.length) {
      inspectionsAcc.push(...pageInspections);
    }
    const pageInsurance = parseInsurance($page);
    if (pageInsurance) {
      if (!insuranceAcc) {
        insuranceAcc = pageInsurance;
      } else {
        // Shallow merge: prefer newly discovered non-null fields
        insuranceAcc = {
          company: pageInsurance.company ?? insuranceAcc.company ?? null,
          is_active: pageInsurance.is_active ?? insuranceAcc.is_active ?? null,
          number: pageInsurance.number ?? insuranceAcc.number ?? null,
          created: pageInsurance.created ?? insuranceAcc.created ?? null,
        };
      }
    }
    const pageDisp = parseDispensations($page);
    if (pageDisp) {
      if (!dispAcc) dispAcc = pageDisp;
      else {
        dispAcc = {
          taxi: pageDisp.taxi ?? dispAcc.taxi ?? null,
          dispensations: pageDisp.dispensations ?? dispAcc.dispensations ?? null,
          leasing: pageDisp.leasing ?? dispAcc.leasing ?? null,
        };
      }
    }
    // Shallow merge sections
    for (const key in pageData) {
      if (Object.prototype.hasOwnProperty.call(pageData, key)) {
        // @ts-expect-error index type
        if (vehicleData[key]) {
          // @ts-expect-error index type
          Object.assign(vehicleData[key], pageData[key]);
        } else {
          // @ts-expect-error index type
          vehicleData[key] = pageData[key as keyof VehicleData];
        }
      }
    }
  }

  // Dedupe inspections by date+status
  const inspections = (() => {
    const seen = new Set<string>();
    const out: InspectionData[] = [];
    for (const i of inspectionsAcc) {
      const k = `${i.date?.toISOString() ?? ''}|${i.status ?? ''}`;
      if (!seen.has(k)) {
        seen.add(k);
        out.push(i);
      }
    }
    return out;
  })();

  const result: VehicleData = {
    vehicle: firstPageBasics.vehicle ?? null,
    registration: firstPageBasics.registration ?? null,
    visKT: (vehicleData as any).visKT ?? null,
    opretKT: (vehicleData as any).opretKT ?? null,
    insurance: insuranceAcc ?? null,
    inspections: inspections.length ? inspections : null,
    dispensations: dispAcc ?? null,
  };

  return result;
};
