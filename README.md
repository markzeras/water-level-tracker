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

### launchd (macOS alternative — recommended)

`launchd` is the native macOS scheduler. It handles sleep better than cron via `PreventSystemSleep`.

The template includes an `EnvironmentVariables` section with the necessary PATH for Homebrew tools (pnpm and node).

Copy the template and replace `{userName}` with your username, then load it:
```bash
cp launchd/water-level-tracker.plist ~/Library/LaunchAgents/com.{userName}.water-level-tracker.plist
launchctl load ~/Library/LaunchAgents/com.{userName}.water-level-tracker.plist
```

To check the status:
```bash
launchctl list | grep water-level-tracker
```

To unload:
```bash
launchctl unload ~/Library/LaunchAgents/com.{userName}.water-level-tracker.plist
```

Logs are saved to `~/Library/Logs/water-level-tracker.log` and `~/Library/Logs/water-level-tracker.error.log`.