
"use server";

import { z } from "zod";
import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

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
  try {
    const initialResponse = await fetch("https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
      }
    });

    const initialHtml = await initialResponse.text();
    const $initial = cheerio.load(initialHtml);
    const token = $initial('input[name="dmrFormToken"]').val();
    const formAction = $initial('form[id="searchForm"]').attr('action');

    if (!token || !formAction) {
      throw new Error("Could not find token or form action on SKAT page.");
    }
    
    const searchUrl = 'https://motorregister.skat.dk' + formAction;
    const searchBody = new URLSearchParams({
      dmrFormToken: token,
      soegeord: regNr,
      soegekriterie: 'REGISTRERINGSNUMMER',
    });
    
    // Add the submit button value to the payload
    const submitButton = $initial('button[type="submit"]');
    if (submitButton.length > 0) {
        const buttonName = submitButton.attr('name');
        const buttonValue = submitButton.attr('value');
        if (buttonName && buttonValue) {
            searchBody.set(buttonName, buttonValue);
        } else {
             searchBody.set(formAction, "Søg"); // fallback from python script
        }
    } else {
        searchBody.set(formAction, "Søg");
    }

    const searchResponse = await fetch(searchUrl, {
      method: 'POST',
      body: searchBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
        'Referer': 'https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej'
      }
    });

    const searchHtml = await searchResponse.text();

    if (searchHtml.includes("Ingen køretøjer fundet.")) {
      return { error: "No vehicle found with that registration number." };
    }
  
    const dom = new JSDOM(searchHtml);
    const document = dom.window.document;

    const getValueByLabel = (label: string) => {
      const element = document.evaluate(`//div[contains(@class, 'col-md-3') and normalize-space(text())='${label}']/following-sibling::div[1]`, document, null, dom.window.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element?.textContent?.trim() || null;
    }
    
    const makeModelVariant = getValueByLabel("Mærke, model, variant");
    let make = null;
    let model = null;
    if (makeModelVariant) {
        [make, model] = makeModelVariant.split(',').map(s => s.trim());
    }
    
    const firstRegDateRaw = getValueByLabel("1. registreringsdato");
    const year = firstRegDateRaw ? new Date(firstRegDateRaw.split('. ')[1]).getFullYear().toString() : null;

    return {
      success: true,
      data: {
        make: make,
        model: model,
        year: year,
      }
    };
  } catch (e: any) {
    console.error("Scraping error:", e);
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

  // In a real application, you would integrate an email service like Resend, SendGrid, or Nodemailer here.
  // You would also upload the files to a storage service like Firebase Storage or AWS S3 and include the links in the email.
  
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

  // Simulate network delay for a more realistic UI experience
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return { success: "Offer submitted successfully! We will get back to you shortly." };
}
