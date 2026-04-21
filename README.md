# water-level-tracker
Parse html page with water level data and save it to a file.

## Setup
First time setup: install Chrome/Chromium for puppeteer
```bash
npx puppeteer browsers install chrome
```

## Run
```
pnpm start --commitAndPush --copyToClipboard
```

## Support
Only catalunia, Spain is supported.

### Cron
To run the script every day at 10:00 AM:

```
crontab -e
```

If using vim, press `i` to enter insert mode. First, add the PATH line (required for pnpm and Node to work in cron):
```bash
PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Then add your cron job(s):
```bash
0 10 * * * cd /Users/{userName}/water-level-tracker && pnpm start --commitAndPush
```

Type `:wq` to save and exit.

**Note:** The PATH line is essential because cron runs with a minimal environment. Without it, cron won't find `pnpm` or `node`.