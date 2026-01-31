# Pi digits data

`pi.txt` contains the decimal digits of π **after** the decimal point (i.e. "14159...", not "3.14159...").

- One digit per character, no spaces or newlines.
- The CLI reads this file once at startup.

## Populate from pi2e.ch

To download 1 million digits from [pi2e.ch](https://pi2e.ch/blog/2017/03/10/pi-digits-download/):

```bash
pnpm run fetch-pi
```

That fetches `pi_dec_1m.txt`, strips the leading `3.`, and writes digits-only to `data/pi.txt`.

## Other sources

- [Pi to 1 million digits](https://www.piday.org/million/) – copy the decimal part into `pi.txt`
- [pi2e.ch](https://pi2e.ch/blog/2017/03/10/pi-digits-download/) – 1k/1M as .txt; 1B/1T on archive.org (compressed); 22.4T on Google Drive (y-cruncher format)
