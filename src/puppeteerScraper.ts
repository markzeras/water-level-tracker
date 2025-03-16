import puppeteer from 'puppeteer';

export type WaterLevelData = {
    date: Date;
    percentage: number;
};

export async function scrapeWaterLevel(url: string): Promise<WaterLevelData> {
    let waterLevelData: WaterLevelData = { date: new Date(), percentage: 0 };
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        const data = await page.evaluate(() => {
            const percentageEl = document.querySelector('.percentage');
            const dateEl = document.querySelector('.date');

            return {
                date: dateEl ? dateEl.textContent?.trim() || null : null,
                percentage: percentageEl ? parseFloat(percentageEl.textContent || '0') : null,
            };
        });

        if (data.date) {
            const date = parseCustomDate(data.date);
            waterLevelData.date = new Date(date);
        }
        if (data.percentage) {
            waterLevelData.percentage = parseFloat(data.percentage.toString());
        }
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }

    return waterLevelData;
}

function parseCustomDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(Number);
    const fullYear = year + 2000;
    return new Date(fullYear, month - 1, day);
}