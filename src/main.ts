
import {urls} from "./urls";
import {scrapeWaterLevel} from "~/puppeteerScraper";
import {copyToClipboard, toSheetEntry} from "~/clipboard";
import {saveWaterLevelToFile} from "~/exporter";

async function run() {
    const databaseName = 'catalunya';
    try {
        const url = urls[databaseName];
        const data = await scrapeWaterLevel(url);
        console.log('💧 Water Level Data:', toSheetEntry(data));

        await copyToClipboard(data);
        saveWaterLevelToFile(data, databaseName)

        console.log('Data successfully saved.');
    } catch (error) {
        console.error('Error:', error);
    }
}

 run();
