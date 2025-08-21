
"use server";

import { z } from "zod";
import { getVehicle } from '@/lib/dmr.ts/src';

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
  console.log(`[SERVER_ACTION] Starting vehicle info fetch for: ${regNr}`);
  try {
    const data = await getVehicle(regNr);

    if (!data || !data.visKT) {
        console.error("[SERVER_ACTION] Incomplete data from DMR library for:", regNr, data);
        return { error: "The vehicle registry didn't provide complete data. Please check the registration number." };
    }

    const make = data.visKT.lblFabrikant?.value ?? null;
    const model = data.visKT.lblModelAar?.value?.split(' ')[0] ?? null; // Often model and year are combined
    const year = data.visKT.lblRegDato?.value ? new Date(data.visKT.lblRegDato.value).getFullYear().toString() : null;

    if (!make || !model || !year) {
       console.error("[SERVER_ACTION] Could not extract all required fields from DMR data:", { make, model, year, data });
       return { error: "The vehicle registry didn't provide all required details. Please check the registration number." };
    }
    
    console.log(`[SERVER_ACTION] Final extracted data - Make: ${make}, Model: ${model}, Year: ${year}`);

    return {
      success: true,
      data: {
        make: make,
        model: model,
        year: year,
      }
    };
  } catch (e: any) {
    console.error(`[SERVER_ACTION] Error fetching vehicle data for ${regNr}:`, e);
    if (e.message && e.message.includes('No vehicle found')) {
        return { error: `No vehicle found with registration number: ${regNr}.` };
    }
    return { error: `Failed to fetch vehicle data. The service might be unavailable or the registration number is invalid.` };
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
