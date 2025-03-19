import {urls} from "./urls";
import {scrapeWaterLevel} from "~/puppeteerScraper";
import {copyToClipboard, toSheetEntry} from "~/clipboard";
import {saveWaterLevelToFile} from "~/exporter";
import {consoleFlags} from "~/Utils/consoleFlags";
import {commitAndPushChanges} from "~/Utils/commitAndPush";

async function run() {
    const databaseName = 'catalunya';
    try {
        const url = urls[databaseName];
        const data = await scrapeWaterLevel(url);
        console.log('💧 Water Level Data:', toSheetEntry(data));

        if (consoleFlags.shouldCopyToClipboard) {
            await copyToClipboard(data); // only if -c flag is passed
        }
        saveWaterLevelToFile(data, databaseName)

        console.log('Data successfully saved.');

        if (consoleFlags.shouldCommitAndPush) {
            await commitAndPushChanges();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
