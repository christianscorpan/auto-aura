export * from './interfaces';
import { scrape } from './scraper';
export { scrape };
export const getVehicle = scrape; // library-friendly alias
