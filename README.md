# Bending Back Barriers — Website

A modern, responsive static website for the Bending Back Barriers nonprofit.
Designed to mirror the structure and feel of vonmiller.org, with all content
populated from the existing bendingbackbarriers.org site.

---

## File Structure

```
Website/
├── index.html              ← Homepage
├── about.html              ← About / Mission / Vision
├── programs.html           ← 6 core programs
├── team.html               ← Leadership / Board
├── partners.html           ← Partners & Sponsors
├── contact.html            ← Contact form
├── donate.html             ← Donation page
├── staticwebapp.config.json← Azure Static Web Apps config
├── css/
│   └── styles.css          ← All styles
├── js/
│   └── main.js             ← Scroll effects, animations, nav
└── img/
    ├── favicon.svg         ← Site icon
    ├── hero-bg.jpg         ← ADD: hero background photo
    └── team/               ← ADD: headshot photos here
```

---

## Before You Launch — Customization Checklist

### Content
- [ ] **team.html** — Replace placeholder names/titles/bios with real team members
- [ ] **team.html** — Add headshot photos to `img/team/` folder
- [ ] **index.html & about.html** — Replace image placeholder divs with `<img>` tags
- [ ] **Hero background** — Add a photo named `hero-bg.jpg` to the `img/` folder
- [ ] **Stats** — Update the hero/impact numbers in `index.html` to match your real data
- [ ] **Social links** — Update `href="#"` on all social buttons with real URLs
- [ ] **Donate button** — In `donate.html`, replace the `alert()` in the `donate()` function with a redirect to your real payment platform (PayPal, Stripe, GiveSmart, etc.)
- [ ] **Contact form** — Connect the form to a real backend (options below)
- [ ] **Email address** — Update `info@bendingbackbarriers.org` if it changes
- [ ] **privacy.html** — Create a simple privacy policy page

### Contact Form Options (pick one)
1. **Azure Static Web Apps + Azure Functions** — Free with your credits; add a simple HTTP trigger function
2. **Formspree** (formspree.io) — Free tier, just change the form `action` to your Formspree endpoint
3. **EmailJS** — Client-side email sending, free tier available
4. **Web3Forms** — Simple, free, no backend needed

---

## Deploying to Azure Static Web Apps

### Option A — Via Azure Portal (easiest)
1. Push this folder to a **GitHub repository**
2. Go to [portal.azure.com](https://portal.azure.com)
3. Search for **Static Web Apps** → Create
4. Connect your GitHub repo
5. Set **App location** to `/` (root)
6. Leave **API location** and **Output location** blank
7. Deploy — Azure auto-deploys on every `git push`

### Option B — Via Azure CLI
```bash
# Install Azure CLI if needed: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
az login
az staticwebapp create \
  --name bending-back-barriers \
  --resource-group your-resource-group \
  --source https://github.com/YOUR_USERNAME/YOUR_REPO \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --login-with-github
```

### Connecting Your Custom Domain (bendingbackbarriers.org)
1. In the Azure Portal → your Static Web App → **Custom domains**
2. Add `bendingbackbarriers.org` and `www.bendingbackbarriers.org`
3. Update your DNS records at your domain registrar:
   - Add a `CNAME` record: `www` → `<your-app>.azurestaticapps.net`
   - Add a `TXT` record for domain verification (Azure provides the value)
4. Azure provisions a free SSL certificate automatically

### Cost Estimate
- Azure Static Web Apps **Free tier** handles this site comfortably
- Your $2,000 credits are more than sufficient as a buffer
- Custom domain SSL: **Free** (included)
- Bandwidth: Very low cost for a nonprofit site of this size

---

## Local Development

No build tools required. Just open `index.html` in a browser, or use VS Code's
Live Server extension for hot reload:

```bash
# If you have Node.js installed:
npx serve .

# Or install Live Server in VS Code and click "Go Live"
```

---

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JavaScript — zero dependencies
- Google Fonts: Montserrat + Open Sans
- Azure Static Web Apps for hosting
- Responsive down to 320px width
