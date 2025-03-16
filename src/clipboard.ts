import { copy } from 'copy-paste';

export type WaterLevelData = {
    date: Date;
    percentage: number;
};

export async function copyToClipboard(data: WaterLevelData): Promise<void> {
    const date = data.date;
    const day = String(date.getDate()).padStart(2, '0'); // Get day of month, not week!
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit format
    const year = date.getFullYear();

    const formattedPercentage = (data.percentage / 100).toFixed(4).replace('.', ','); // Convert to fraction & replace dot with comma

    const dataToCopy = `${day}/${month}/${year}\t${formattedPercentage}`;
    copy(dataToCopy);
    console.log('📋 Copied to clipboard:', dataToCopy);
}