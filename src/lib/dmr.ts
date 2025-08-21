// @ts-nocheck
/**
 * Asynchronous function for fetching vehicle data from the Danish Motor Registry.
 *
 * @param {string} query - The registration number or VIN of the vehicle.
 * @returns {Promise<any>} A promise that resolves to the vehicle data.
 */
import { JSDOM } from 'jsdom';
export async function vehicle(query: string): Promise<any> {
    const dom = await JSDOM.fromURL("https://motorregister.skat.dk/dmr-kerne/koeretoejdetaljer/visKoeretoej", {
        runScripts: "dangerously",
        pretendToBeVisual: true,
    });
    const doc = dom.window.document;
    await waitForAngular(dom);
    const angular = await getAngular(dom);
    const element = doc.querySelector("#koeretoejIdent");
    const scope = angular.element(element).scope();
    scope.koeretoejIdentType = query.length <= 7 ? "REGISTRERINGSNUMMER" : "STELNUMMER";
    scope.koeretoejIdent = query;
    await scope.$apply();
    doc.querySelector("#search-button-id").click();
    await waitForAngular(dom);
    const vehicleData = extractVehicleData(doc, angular);
    return vehicleData;
}
/**
 * Waits for Angular to be ready on the page.
 * @param {object} dom - The JSDOM object.
 */
function waitForAngular(dom: any) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (dom.window.angular) {
                clearInterval(interval);
                resolve(true);
            }
        }, 100);
    });
}
/**
 * Extracts vehicle data from the document.
 * @param {object} doc - The document object.
 * @param {object} angular - The Angular object.
 * @returns {object} The extracted vehicle data.
 */
function extractVehicleData(doc: any, angular: any) {
    const vehicleData: any = {};
    const vehicleInfoElement = doc.querySelector("#vehicle-information-id");
    if (vehicleInfoElement === null)
        throw new Error("No vehicle found.");
    const scope = angular.element(vehicleInfoElement).scope();
    const rows = vehicleInfoElement.querySelectorAll(".row");
    for (const row of rows) {
        const keyElement = row.querySelector(".key");
        const valueElement = row.querySelector(".value, .value-multiline");
        if (keyElement && valueElement) {
            let key = keyElement.textContent.trim().replace(/:/g, "");
            key = key.charAt(0).toUpperCase() + key.slice(1);
            let value = valueElement.textContent.trim();
            if (scope.isDate(value)) {
                value = new Date(value);
            }
            if (!isNaN(parseFloat(value))) {
                value = parseFloat(value);
            }
            if (value === "Ja")
                value = true;
            if (value === "Nej")
                value = false;
            if (key) {
                const camelCaseKey = key
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: any, index: any) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
                    .replace(/\s+/g, "");
                vehicleData[camelCaseKey] = value;
            }
        }
    }
    return vehicleData;
}
/**
 * Gets the Angular object from the JSDOM object.
 * @param {object} dom - The JSDOM object.
 * @returns {Promise<object>} A promise that resolves to the Angular object.
 */
function getAngular(dom: any) {
    return new Promise((resolve, reject) => {
        const angular = dom.window.angular;
        if (angular) {
            resolve(angular);
        }
        else {
            reject("Angular not found.");
        }
    });
}

export class DMR {
    public static vehicle = vehicle;
}
