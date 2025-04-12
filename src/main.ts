import {TelegramClient} from '~/Client/Telegram/telegramClient';
import {copyToClipboard, toSheetEntry} from '~/clipboard';
import {saveWaterLevelToFile} from '~/exporter';
import {EnvVarsHelper} from '~/Helpers/EnvVarsHelper';
import {scrapeWaterLevel} from '~/puppeteerScraper';
import {commitAndPushChanges} from '~/Utils/commitAndPush';
import {consoleFlags} from '~/Utils/consoleFlags';
import {urls} from './urls';

async function run() {
  const envVarsHelper: EnvVarsHelper = new EnvVarsHelper(process.env as Record<string, string>);
  const databaseName = 'catalunya';
  const telegramClient = new TelegramClient(envVarsHelper.telegramUrl);
  try {
    const url = urls[databaseName];
    const data = await scrapeWaterLevel(url);
    console.log('💧 Water Level Data:', toSheetEntry(data));

    if (consoleFlags.shouldCopyToClipboard) {
      await copyToClipboard(data); // only if -c flag is passed
    }
    const saved = saveWaterLevelToFile(data, databaseName);

    let returnMessage;
    if (saved) {
      returnMessage = 'Data successfully saved ✅';
      if (consoleFlags.shouldCommitAndPush) {
        await commitAndPushChanges();
      }
      return;
    } else {
      returnMessage = '❌ Entry already exists. Skipping save.';
    }

    await telegramClient.send(returnMessage, envVarsHelper.markTelegramUserId);

    console.log(returnMessage);

    // TODO: Send telegram message
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
