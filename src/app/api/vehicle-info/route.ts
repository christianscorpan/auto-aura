
import { NextResponse } from 'next/server';
import { DMR } from 'dmr';

async function getVehicleInfo(regNr: string) {
  console.log(`[API_ROUTE] Starting vehicle info fetch for: ${regNr}`);
  try {
    const data = await DMR.vehicle(regNr);

    if (!data || !data.Make || !data.Model || !data.FirstRegistration) {
       console.error("[API_ROUTE] Incomplete data from DMR library for:", regNr, data);
       return { error: "The vehicle registry didn't provide all required details. Please check the registration number." };
    }

    const make = data.Make;
    const model = data.Model;
    const year = new Date(data.FirstRegistration).getFullYear().toString();

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
    // The dmr.ts library throws an error for "No vehicle found"
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
        // Use 404 for not found, 400 for other client-side errors
        const status = result.error.includes('No vehicle found') ? 404 : 400;
        return NextResponse.json(result, { status });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API_ROUTE] Error in POST handler:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
