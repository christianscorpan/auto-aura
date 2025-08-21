import { getVehicle } from './index';
import type { VehicleData } from './interfaces';

const licensePlate = 'BJ99821'; // Example license plate

getVehicle(licensePlate)
  .then((data: VehicleData | null) => {
    if (data) {
      console.log('Vehicle data:', JSON.stringify(data, null, 2));
    } else {
      console.log(`No vehicle found with license plate: ${licensePlate}`);
    }
  })
  .catch((error: unknown) => {
    console.error('Error scraping data:', error);
  });
