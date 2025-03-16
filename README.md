# water-level-tracker
Parse html page with water level data and save it to a file.

## Support
Only catalunia, Spain is supported.

### Cron
To run the script every day at 10:00 AM:

```
crontab -e
```
If using vim, press `i` to enter insert mode

Then add the following line:
```bash
0 10 * * * cd /Users/{userName}/water-level-tracker && pnpm start
```

Type `:wq` to save and exit.