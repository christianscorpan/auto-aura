
"use server";

import { z } from "zod";
import * as cheerio from 'cheerio';

const formSchema = z.object({
  regNr: z.string().min(2, "Registration number is required."),
  make: z.string().min(2, "Make is required."),
  model: z.string().min(2, "Model is required."),
  year: z.string().min(4, "A valid year is required."),
  mileage: z.string().min(1, "Mileage is required."),
  condition: z.string().min(1, "Condition is required."),
  price: z.string().min(1, "Asking price is required."),
  name: z.string().min(2, "Your name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(8, "A valid phone number is required."),
});

export async function getVehicleInfo(regNr: string) {
  console.log(`[SCRAPE] Starting vehicle info fetch for: ${regNr}`);
  try {
    const initialResponse = await fetch("https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
      }
    });
    console.log(`[SCRAPE] Initial page fetch status: ${initialResponse.status}`);

    const initialHtml = await initialResponse.text();
    const $initial = cheerio.load(initialHtml);
    const token = $initial('input[name="dmrFormToken"]').val();
    const formAction = $initial('form[id="searchForm"]').attr('action');

    console.log(`[SCRAPE] Extracted token: ${token}`);
    console.log(`[SCRAPE] Extracted form action: ${formAction}`);

    if (!token || !formAction) {
      console.error("[SCRAPE ERROR] Could not find token or form action on initial page.");
      throw new Error("Could not find token or form action on SKAT page.");
    }
    
    const searchUrl = 'https://motorregister.skat.dk' + formAction;
    const searchBody = new URLSearchParams({
      dmrFormToken: token,
      soegeord: regNr,
      soegekriterie: 'REGISTRERINGSNUMMER',
      "button.search": "Søg"
    });

    console.log(`[SCRAPE] Posting to URL: ${searchUrl}`);
    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      body: searchBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
        'Referer': 'https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej'
      }
    });

    console.log(`[SCRAPE] Search request status: ${searchResponse.status}`);
    const searchHtml = await searchResponse.text();
    
    if (searchHtml.includes("Ingen køretøjer fundet.")) {
      console.log("[SCRAPE] No vehicle found for the given registration number.");
      return { error: "No vehicle found with that registration number." };
    }
    
    console.log('[SCRAPE] Vehicle found page content length:', searchHtml.length);
    const $ = cheerio.load(searchHtml);

    const getValueByLabel = (label: string) => {
        const elem = $(`div.label:contains('${label}')`);
        const value = elem.next('div.control').find('span.value, div.value').text().trim();
        console.log(`[SCRAPE] Extracted '${label}': ${value}`);
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


    console.log(`[SCRAPE] Final extracted data - Make: ${make}, Model: ${model}, Year: ${year}`);

    return {
      success: true,
      data: {
        make: make,
        model: model,
        year: year,
      }
    };
  } catch (e: any) {
    console.error("[SCRAPE] Top-level error:", e.message, e.stack);
    return { error: "Failed to fetch vehicle data. The service might be unavailable." };
  }
}

export async function submitOffer(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = formSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      error: "Invalid data provided. Please check the form and try again.",
    };
  }

  const { data } = validatedFields;
  const files = formData.getAll("photos");
  
  console.log("--- New Car Offer Received ---");
  console.log("Offer Details:", data);

  const photoDetails = files.map(file => {
      if(file instanceof File) {
          return `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
      }
      return 'Invalid file entry';
  }).join(', ');

  console.log("Photos:", photoDetails || "No photos uploaded");
  console.log("----------------------------");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { success: "Offer submitted successfully! We will get back to you shortly." };
}
