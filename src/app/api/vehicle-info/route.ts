
import { NextResponse } from 'next/server';
import { getVehicle } from '@/lib/dmr.ts/src';

async function getVehicleInfo(regNr: string) {
  console.log(`[API_ROUTE] Starting vehicle info fetch for: ${regNr}`);
  try {
    const data = await getVehicle(regNr);

    if (!data || !data.visKT) {
        console.error("[API_ROUTE] Incomplete data from DMR library for:", regNr, data);
        return { error: "The vehicle registry didn't provide complete data. Please check the registration number." };
    }

    const make = data.visKT.lblFabrikant?.value ?? null;
    const model = data.visKT.lblModelAar?.value?.split(' ')[0] ?? null; // Often model and year are combined
    const year = data.visKT.lblRegDato?.value ? new Date(data.visKT.lblRegDato.value).getFullYear().toString() : null;

    if (!make || !model || !year) {
       console.error("[API_ROUTE] Could not extract all required fields from DMR data:", { make, model, year, data });
       return { error: "The vehicle registry didn't provide all required details. Please check the registration number." };
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
    console.error(`[API_ROUTE] Error fetching vehicle data for ${regNr}:`, e);
    if (e.message && e.message.includes('No vehicle found')) {
        return { error: `No vehicle found with registration number: ${regNr}.` };
    }
    return { error: `Failed to fetch vehicle data. The service might be unavailable or the registration number is invalid.` };
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
        const status = result.error.includes('No vehicle found') ? 404 : 500; // Use 500 for server-side errors
        return NextResponse.json(result, { status });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API_ROUTE] Error in POST handler:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
