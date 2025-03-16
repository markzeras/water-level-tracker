import { copy } from 'copy-paste';
import {WaterLevelData} from "../types";

export async function copyToClipboard(data: WaterLevelData): Promise<void> {
    const dataToCopy = toSheetEntry(data);
    copy(dataToCopy);
}

export function toSheetData(data: WaterLevelData) {
    const date = data.date;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedPercentage = (data.percentage / 100).toFixed(4).replace('.', ',');
    return {
        date: `${day}/${month}/${year}`,
        percentage: formattedPercentage
    }
}

export function toSheetEntry(data: WaterLevelData): string {
    const { date, percentage } = toSheetData(data);

    return `${date}\t${percentage}`;
}