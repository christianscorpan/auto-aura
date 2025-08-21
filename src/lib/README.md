DMR Scraper (TypeScript)

Library for fetching vehicle details from the Danish Motor Register (DMR) by license plate.

Install

- Local dev: clone and build with `npm run build`.
- As a package: publish this repo or install from a local tarball.

API

- `getVehicle(licensePlate: string): Promise<VehicleData | null>`
  - Looks up a single vehicle by license plate and returns a normalized `VehicleData` object.
  - Returns `null` when no vehicle is found.

Usage (TypeScript)

```ts
import { getVehicle, VehicleData } from 'dmr-scraper';

async function main() {
  const plate = 'AB12345';
  const data: VehicleData | null = await getVehicle(plate);
  if (!data) {
    console.log('No vehicle found');
    return;
  }
  console.log('Vehicle:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
```

Usage (Node.js CommonJS)

```js
const { getVehicle } = require('dmr-scraper');

(async () => {
  const plate = 'AB12345';
  const data = await getVehicle(plate);
  console.log(data);
})();
```

Returned Shape

- `VehicleData` contains:
  - `visKT`: Structured technical data (null when unavailable)
  - `opretKT`: Structured feature/equipment flags (null when unavailable)
  - `insurance`: `{ company, number, is_active, created } | null`
  - `inspections`: `Array<{ date: Date | null; status: string | null }>` or `null`
  - `dispensations`: `{ taxi: boolean | null; dispensations: string | null; leasing: string | null } | null`

Notes

- Scraper performs one lookup per call. Call it once per vehicle.
- Network access to DMR is required at runtime.
- Be considerate in your usage; add your own rate limiting and retries as needed.

