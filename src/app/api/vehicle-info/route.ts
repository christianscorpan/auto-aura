// src/app/api/vehicle-info/route.ts
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

async function getVehicleInfo(regNr: string) {
  console.log(`[API_ROUTE] Starting vehicle info fetch for: ${regNr}`);
  try {
    const initialResponse = await fetch("https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
      }
    });
    console.log(`[API_ROUTE] Initial page fetch status: ${initialResponse.status}`);
    if (!initialResponse.ok) {
        console.error(`[API_ROUTE] Failed to fetch initial page, status: ${initialResponse.status}`);
        return { error: `Failed to connect to the vehicle registry (Status: ${initialResponse.status}).` };
    }

    const initialHtml = await initialResponse.text();
    const $initial = cheerio.load(initialHtml);
    const token = $initial('input[name="dmrFormToken"]').val();
    const formAction = $initial('form[id="searchForm"]').attr('action');

    console.log(`[API_ROUTE] Extracted token: ${token}`);
    console.log(`[API_ROUTE] Extracted form action: ${formAction}`);

    if (!token || !formAction) {
      console.error("[API_ROUTE ERROR] Could not find token or form action on initial page.");
      throw new Error("Could not find token or form action on SKAT page.");
    }
    
    const searchUrl = 'https://motorregister.skat.dk' + formAction;
    const searchBody = new URLSearchParams({
      dmrFormToken: token,
      soegeord: regNr,
      soegekriterie: 'REGISTRERINGSNUMMER',
      "button.search": "Søg"
    });

    console.log(`[API_ROUTE] Posting to URL: ${searchUrl}`);
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      body: searchBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
        'Referer': 'https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej'
      }
    });

    console.log(`[API_ROUTE] Search request status: ${searchResponse.status}`);
    const searchHtml = await searchResponse.text();
    
    if (searchHtml.includes("Ingen køretøjer fundet.")) {
      console.log("[API_ROUTE] No vehicle found for the given registration number.");
      return { error: "No vehicle found with that registration number." };
    }
    
    console.log('[API_ROUTE] Vehicle found page content length:', searchHtml.length);
    const $ = cheerio.load(searchHtml);

    const getValueByLabel = (label: string) => {
        const elem = $(`div.label:contains('${label}')`);
        const value = elem.next('div.control').find('span.value, div.value').text().trim();
        console.log(`[API_ROUTE] Extracted '${label}': ${value}`);
        return value || null;
    }

    const makeModelVariant = getValueByLabel("Mærke, model, variant");
    let make = null;
    let model = null;
    if (makeModelVariant) {
        const parts = makeModelVariant.split(',').map(s => s.trim());
        make = parts[0] || null;
        model = parts[1] || null;
    }
    
    const firstRegDateRaw = getValueByLabel("1. registreringsdato");
    let year = null;
    if (firstRegDateRaw) {
        const datePart = firstRegDateRaw.split(' ')[0]; // "DD-MM-YYYY"
        const yearPart = datePart.split('-')[2];
        year = yearPart;
    }


    console.log(`[API_ROUTE] Final extracted data - Make: ${make}, Model: ${model}, Year: ${year}`);

    return {
      success: true,
      data: {
        make: make,
        model: model,
        year: year,
      }
    };
  } catch (e: any) {
    console.error("[API_ROUTE] Top-level error:", e.message, e.stack);
    return { error: "Failed to fetch vehicle data. The service might be unavailable." };
  }
}

export async function POST(request: Request) {
  try {
    const { regNr } = await request.json();
    if (!regNr) {
      return NextResponse.json({ error: 'Registration number is required' }, { status: 400 });
    }
    const result = await getVehicleInfo(regNr);
    if (result.error) {
        return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API_ROUTE] Error in POST handler:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
