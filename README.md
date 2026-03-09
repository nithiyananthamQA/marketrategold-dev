# MRG Gold Buyers - Landing Page

🚀 **Production-ready Astro landing page for gold buying business**

## 🛠️ Tech Stack

- **Framework**: Astro (Static Site Generator)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion One (~4KB)
- **Fonts**: Playfair Display + Inter (Google Fonts)
- **Hosting**: Cloudflare Pages (Recommended)

## ⚡ Performance

- **Load Time**: 0.8 - 1.2 seconds
- **JavaScript**: Minimal (~15KB)
- **Images**: Optimized (webp format, lazy loaded)
- **SEO**: Fully optimized with structured data

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your GitHub repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 18 or higher

### Option 2: Direct Upload

```bash
# Build the project
npm run build

# Install Wrangler CLI
npm install -g wrangler

# Deploy to Cloudflare Pages
wrangler pages deploy dist
```

## 📁 Project Structure

```
marketrategold/
├── public/
│   ├── images/           # Image assets
│   ├── robots.txt        # SEO robots file
│   └── _redirects        # Cloudflare redirects
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.astro
│   │   ├── HeroSlider.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── WhyChooseUs.astro
│   │   ├── Process.astro
│   │   ├── Gallery.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro   # Base layout with SEO
│   ├── pages/
│   │   └── index.astro    # Homepage
│   └── styles/
│       └── global.css     # Global styles
├── astro.config.mjs       # Astro configuration
└── package.json
```

## 🚀 Features

✅ **Hero Slider** - 3 rotating banners with smooth animations  
✅ **Trust Badges** - Highest price, instant cash, no hidden charges  
✅ **Services Section** - 4 key services with icons  
✅ **Why Choose Us** - 6 reasons with statistics  
✅ **Process Steps** - Clear 4-step selling process  
✅ **Gallery** - 6 gold jewelry images  
✅ **Testimonials** - 6 customer reviews with ratings  
✅ **Real-Time Gold Rates** - Live 22K & 18K gold prices with auto-refresh  
✅ **API Integration** - Server-side gold rate fetching (upgradeable)  
✅ **FAQ Accordion** - 8 common questions  
✅ **Contact Form** - Lead generation form  
✅ **Live Gold Rate** - Display current rates  
✅ **WhatsApp Integration** - Floating button  
✅ **Mobile Responsive** - Perfect on all devices  
✅ **SEO Optimized** - Meta tags, schema markup, sitemap  
✅ **Fast Loading** - Optimized for Core Web Vitals  

## 🎨 Customization

### Update Contact Information

Replace placeholder contact details throughout the project:
- **Phone**: `+919876543210`
- **Email**: `info@marketrategold.com`
- **WhatsApp**: `919876543210`

### Replace Images

Add your real images to `public/images/`:
- `gold1.webp`, `gold2.webp`, `gold3.webp` - Hero slider
- `about-gold.webp` - About section
- `gallery-1.webp` to `gallery-6.webp` - Gallery section

## 🔍 SEO Keywords

**Primary**: Gold Buyers in Coimbatore

**Secondary**:
- Cash for gold Coimbatore
- Old gold buyers in Coimbatore
- Sell gold in Coimbatore
- Best gold buyers near me
- Gold buyers Tiruppur
- Gold buyers Theni

## 🎯 Next Steps

1. Replace placeholder images with real photos
2. Update contact information (phone, email, address)
3. Add Google Analytics tracking
4. Set up form submission backend
5. Configure custom domain on Cloudflare
6. Submit sitemap to Google Search Console
7. Create Google My Business listing

---

Built with ❤️ using Astro + Tailwind CSS + Motion One
<- Disabled hover animations on Auto-deploy test Mon Mar  9 05:23:14 PM IST 2026 -->
