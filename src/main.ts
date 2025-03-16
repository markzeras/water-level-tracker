
import {urls} from "./urls";
import {scrapeWaterLevel} from "~/puppeteerScraper";
import {copyToClipboard} from "~/clipboard";

async function run() {
    try {
        const url = urls['catalunya'];
        const data = await scrapeWaterLevel(url);
        console.log('💧 Water Level Data:', data);

        await copyToClipboard(data);

        console.log('Data successfully uploaded.');
    } catch (error) {
        console.error('Error:', error);
    }
}

 run();
