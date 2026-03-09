# 🚀 Deployment Guide for Cloudflare Pages

## Prerequisites

- A Cloudflare account (free tier is sufficient)
- Git installed locally
- GitHub account (recommended) or Wrangler CLI

---

## Method 1: Deploy via GitHub (Recommended) ⭐

### Step 1: Push Code to GitHub

```bash
cd /home/nathi/marketrategold

# If not already initialized
git init
git add .
git commit -m "Initial commit: MRG Gold Buyers landing page"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/marketrategold.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Pages**
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your GitHub repository
5. Configure build settings:
   ```
   Project name: marketrategold
   Production branch: main
   Build command: npm run build
   Build output directory: dist
   Environment variables: (none required)
   ```
6. Click **Save and Deploy**

### Step 3: Configure Custom Domain (Optional)

1. Go to **Custom domains** in your Cloudflare Pages project
2. Click **Set up a custom domain**
3. Enter: `marketrategold.com`
4. Follow DNS instructions (Cloudflare will manage SSL automatically)

---

## Method 2: Deploy via Wrangler CLI

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

### Step 3: Build and Deploy

```bash
cd /home/nathi/marketrategold

# Build the project
npm run build

# Deploy
wrangler pages deploy dist --project-name=marketrategold
```

---

## Method 3: Direct Upload (Quick Test)

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click **Create application** → **Pages** → **Upload assets**
4. Drag and drop the entire `dist` folder
5. Click **Deploy site**

---

## Post-Deployment Checklist

### ✅ Required Updates

- [ ] Update phone number: Replace `+919876543210` throughout the site
- [ ] Update WhatsApp: Replace `919876543210` 
- [ ] Update email: Replace `info@marketrategold.com`
- [ ] Replace placeholder images in `public/images/`
- [ ] Update business address in `src/layouts/Layout.astro`
- [ ] Update geo-coordinates in schema markup

### ✅ Optional Enhancements

- [ ] Add Google Analytics tracking code
- [ ] Set up form submission backend (Netlify Forms, EmailJS, Formspree)
- [ ] Configure email forwarding
- [ ] Set up WhatsApp Business API
- [ ] Add Facebook Pixel for retargeting

### ✅ SEO Setup

- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Create [Google My Business](https://business.google.com/) listing
- [ ] Set up [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Add site to local directories
- [ ] Get backlinks from local Tamil Nadu websites

---

## Environment Variables (Optional)

If you want to use environment variables, add them in Cloudflare Pages:

**Settings** → **Environment Variables**

```
PUBLIC_PHONE=+919876543210
PUBLIC_WHATSAPP=919876543210
PUBLIC_EMAIL=info@marketrategold.com
PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Performance Monitoring

After deployment, check performance:

1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. **WebPageTest**: https://www.webpagetest.org/

Expected scores:
- ✅ Performance: 95+
- ✅ Accessibility: 95+
- ✅ Best Practices: 95+
- ✅ SEO: 100

---

## Continuous Deployment

With GitHub integration, every push to `main` branch will automatically:
1. Trigger a new build
2. Deploy to production
3. Update the live site within 1-2 minutes

Preview deployments are created for pull requests automatically.

---

## Troubleshooting

### Build fails on Cloudflare

**Solution**: Ensure Node.js version is 18 or higher
```
Environment Variables → Add variable
NODE_VERSION = 18
```

### Images not loading

**Solution**: Check file paths are lowercase and match exactly

### Forms not submitting

**Solution**: Integrate with a form backend service:
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)

---

## Domain Configuration

### Using Cloudflare Nameservers

1. Purchase domain from any registrar
2. Change nameservers to Cloudflare's:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
3. Add DNS records in Cloudflare:
   ```
   Type: A
   Name: @
   Content: 192.0.2.1 (Cloudflare will handle routing)
   Proxy: ON (orange cloud)
   ```

### SSL/HTTPS

SSL is automatically configured by Cloudflare. Your site will be served over HTTPS with:
- Free SSL certificate
- Auto-renewal
- HTTP → HTTPS redirect

---

## Cost

**Cloudflare Pages Free Tier includes:**
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ DDoS protection

💰 **Total cost: $0/month** (unless you exceed free tier limits)

---

## Support

For deployment issues:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Astro Docs](https://docs.astro.build/)
- [Cloudflare Community](https://community.cloudflare.com/)

---

Built with ❤️ for MRG Gold Buyers
