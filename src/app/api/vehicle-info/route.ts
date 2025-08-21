
import { NextResponse } from 'next/server';
import { DMR } from '@/lib/dmr';

async function getVehicleInfo(regNr: string) {
  console.log(`[API_ROUTE] Starting vehicle info fetch for: ${regNr}`);
  try {
    const data = await DMR.vehicle(regNr);

    // The DMR library camelCases the keys, so "1. registrering" becomes "1Registrering"
    // and "Mærke" becomes "maerke". We need to find the correct keys.
    const makeKey = Object.keys(data).find(k => k.toLowerCase() === 'maerke' || k.toLowerCase() === 'make');
    const modelKey = Object.keys(data).find(k => k.toLowerCase() === 'model');
    const registrationKey = Object.keys(data).find(k => k.toLowerCase().includes('registrering'));

    const make = makeKey ? data[makeKey] : null;
    const model = modelKey ? data[modelKey] : null;
    const firstRegistrationDate = registrationKey ? data[registrationKey] : null;

    if (!make || !model || !firstRegistrationDate) {
       console.error("[API_ROUTE] Incomplete data from DMR library for:", regNr, data);
       return { error: "The vehicle registry didn't provide all required details. Please check the registration number." };
    }

    const year = new Date(firstRegistrationDate).getFullYear().toString();

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
        const status = result.error.includes('No vehicle found') ? 404 : 400;
        return NextResponse.json(result, { status });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API_ROUTE] Error in POST handler:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
