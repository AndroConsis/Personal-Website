# GitHub Pages Deployment Progress

## Completed
- [x] Changed `output: 'standalone'` → `output: 'export'` in `next.config.ts`
- [x] Added `images: { unoptimized: true }` in `next.config.ts`
- [x] Moved `CNAME` from repo root → `public/CNAME` (contains `www.prateekrathore.com`)
- [x] Created `.github/workflows/deploy.yml` (auto-deploys on push to `main`)

## Next Steps

### 1. Verify the build locally
```bash
npm run build
```
Check that an `out/` folder is generated with no errors.

### 2. Enable GitHub Pages in repo settings
1. Go to https://github.com/AndroConsis/Personal-Website/settings/pages
2. Under **Source**, select **GitHub Actions**
3. Save

### 3. Push to trigger the first deployment
```bash
git add .
git commit -m "feat: configure static export for GitHub Pages"
git push
```
Watch the Actions tab: https://github.com/AndroConsis/Personal-Website/actions

### 4. Configure DNS on Hostinger
Log into Hostinger → Domains → prateekrathore.com → DNS Zone

Add this record:
| Type  | Name | Value                   | TTL  |
|-------|------|-------------------------|------|
| CNAME | www  | androconsis.github.io.  | 3600 |

If you also want the apex domain (`prateekrathore.com`) to work, add these A records:
| Type | Name | Value          | TTL  |
|------|------|----------------|------|
| A    | @    | 185.199.108.153 | 3600 |
| A    | @    | 185.199.109.153 | 3600 |
| A    | @    | 185.199.110.153 | 3600 |
| A    | @    | 185.199.111.153 | 3600 |

### 5. Wait for DNS propagation
DNS changes can take up to 24 hours, but usually under 1 hour.

### 6. Enable HTTPS in GitHub Pages settings
After DNS propagates, go back to:
https://github.com/AndroConsis/Personal-Website/settings/pages

Check **Enforce HTTPS** — GitHub will auto-provision a TLS certificate via Let's Encrypt.
