import {readFileSync, existsSync, appendFileSync, mkdirSync} from 'fs';
import path from 'path';
import {toSheetData} from '~/clipboard';
import {WaterLevelData} from '../types';

const EXPORT_FOLDER = path.resolve(process.cwd(), 'export');
/**
 * Appends a new date entry if it does not exist already.
 */
export function saveWaterLevelToFile(data: WaterLevelData, databaseName: string): boolean {
  ensureExportFolder();
  const FILE_PATH = path.join(EXPORT_FOLDER, getFileName(databaseName));

  const {date, percentage} = toSheetData(data);
  const newEntry = `${date}\t${percentage}`;

  const existingContent = existsSync(FILE_PATH) ? readFileSync(FILE_PATH, 'utf8') : '';

  if (existingContent.includes(date)) {
    return false;
  }

  appendFileSync(FILE_PATH, `\n${newEntry}`, {encoding: 'utf8'});
  console.log(`✅ Saved: ${newEntry}`);

  return true;
}

function getFileName(databaseName: string): string {
  return `${databaseName}_water_levels.txt`;
}

function ensureExportFolder(): void {
  if (!existsSync(EXPORT_FOLDER)) {
    mkdirSync(EXPORT_FOLDER, {recursive: true});
    console.log(`📁 Created folder: ${EXPORT_FOLDER}`);
  }
}
