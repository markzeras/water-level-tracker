# Copilot instructions for `water-level-tracker`

## Commands

- Install dependencies: `pnpm install`
- First-time Puppeteer setup: `npx puppeteer browsers install chrome`
- Run the scraper once: `pnpm start`
- Run with side effects: `pnpm start --commitAndPush --copyToClipboard`
- Lint: `pnpm lint`
- Tests: `pnpm test` is currently a placeholder script that exits with `Error: no test specified`; there is no configured test suite or single-test command yet.

## High-level architecture

- This repository is a one-shot TypeScript CLI. `pnpm start` runs `src/main.ts`, which performs a single scrape/save/notify cycle and then exits.
- `src/main.ts` is the orchestration layer: it loads environment variables, selects the data source from `src/urls.ts`, scrapes the current water level, optionally copies the formatted result to the clipboard, appends it to the export file, optionally commits/pushes the export, and finally sends a Telegram notification if the Telegram service is reachable.
- `src/puppeteerScraper.ts` is the only scraping layer. It launches headless Puppeteer, reads `.percentage` and `.date` from the ACA reservoir page, converts the site date format from `DD.MM.YY` into a JavaScript `Date`, and throws if the scraped percentage stays `0`.
- Formatting is centralized in `src/clipboard.ts`. Both clipboard output and file export use the same `toSheetData` / `toSheetEntry` helpers, so any change to the exported row format should happen there rather than in `src/exporter.ts`.
- `src/exporter.ts` persists data in `export/<database>_water_levels.txt` as tab-separated lines. The job scheduling described in `README.md` and `launchd/water-level-tracker.plist` is external to the app; the repo itself does not run as a daemon.

## Key conventions

- The repo currently supports a single hardcoded dataset, `catalunya`. If support for more regions is added, update `src/urls.ts`, the `databaseName` selection in `src/main.ts`, and expect separate export files per database name.
- Export rows are stored as `DD/MM/YYYY<TAB>0,1234`: the scraper returns a percentage like `15.55`, then `src/clipboard.ts` converts it to a sheet/export value by dividing by 100 and using a comma decimal separator. Preserve that format unless the downstream spreadsheet import changes.
- Duplicate detection in `src/exporter.ts` is date-based (`existingContent.includes(date)`), so date formatting is part of the persistence contract.
- Runtime configuration is minimal and read directly by `src/Helpers/EnvVarsHelper.ts`: `TELEGRAM_URL` and `MARK_USER_ID` must exist for Telegram notifications.
- Optional side effects are driven entirely by CLI flags from `src/Utils/consoleFlags.ts`: `-cp` / `--copyToClipboard` and `--commitAndPush`.
- Git automation is intentionally narrow: `src/Utils/commitAndPush.ts` stages only `export/*.txt`, creates an auto-update commit, and pushes to `origin main`.
- TypeScript code uses the `~/*` path alias from `tsconfig.json` for imports rooted in `src`.
- Linting uses the flat ESLint config in `eslint.config.cjs` and targets `src/**/*.ts`; generated folders and `**/*.js` are ignored.
