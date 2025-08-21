
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
    if (!data) {
      console.error("[SERVER_ACTION] No data from DMR library for:", regNr);
      return { error: `No vehicle found with registration number: ${regNr}.` };
    }

    // Prefer normalized fields introduced in the updated library
    const brandVal = data.vehicle?.brand ?? null;
    const modelVal = data.vehicle?.model ?? null;
    const firstReg = data.registration?.firstRegistrationDate ?? null;

    // Fallbacks from visKT if needed
    const makeVal = data.visKT?.lblFabrikant?.value ?? null;
    const modelAarVal = data.visKT?.lblModelAar?.value as unknown;
    const regDatoVal = data.visKT?.lblRegDato?.value as unknown;

    const make = typeof brandVal === 'string' && brandVal.trim() ? brandVal.trim() : (typeof makeVal === 'string' && makeVal.trim() ? makeVal.trim() : '');
    const model = typeof modelVal === 'string' ? modelVal.trim() : '';

    let year: string | null = null;
    if (firstReg instanceof Date) {
      year = String(firstReg.getFullYear());
    } else if (typeof modelAarVal === 'number') {
      year = String(modelAarVal);
    } else if (typeof modelAarVal === 'string' && /^\d{4}$/.test(modelAarVal)) {
      year = modelAarVal;
    } else if (regDatoVal instanceof Date) {
      year = String(regDatoVal.getFullYear());
    } else if (typeof regDatoVal === 'string') {
      const d = new Date(regDatoVal);
      if (!isNaN(d.getTime())) year = String(d.getFullYear());
    }

    // Allow partial prefill: at minimum try to provide the year.
    if (!year) {
      console.warn('[SERVER_ACTION] Year could not be derived from DMR data, returning empty prefill.');
    }
    console.log(`[SERVER_ACTION] Prefill extracted - Make: ${make || '""'}, Model: ${model || '""'}, Year: ${year || '""'}`);

    return {
      success: true,
      data: {
        make: make,
        model: model,
        year: year ?? '',
      }
    };
  } catch (e: any) {
    console.error(`[SERVER_ACTION] Error fetching vehicle data for ${regNr}:`, e);
    if (e?.message && e.message.includes('No vehicle found')) {
        return { error: `No vehicle found with registration number: ${regNr}.` };
    }
    if (e?.name === 'MissingTokenError' || (e?.message && /token|dmrformtoken|action/i.test(e.message))) {
        return { error: 'Vehicle registry page structure changed or is blocking automated requests. Please try again later.' };
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
