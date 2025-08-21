import { scrape } from './index';

const licensePlate = 'BJ99821'; // Example license plate

scrape(licensePlate)
  .then(data => {
    if (data) {
      console.log('Vehicle data:', JSON.stringify(data, null, 2));
    } else {
      console.log(`No vehicle found with license plate: ${licensePlate}`);
    }
  })
  .catch(error => {
    console.error('Error scraping data:', error);
  });
