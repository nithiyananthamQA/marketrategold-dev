# Real-Time Gold Rate API Integration Guide

This document explains how the real-time gold rate feature works and how to upgrade it with professional API services.

## Current Implementation

The site currently fetches live gold rates using:
1. **Server-side API endpoint**: `/api/gold-rates`
2. **Free exchange rate API**: ExchangeRate-API.com
3. **Calculation method**: International gold prices converted to INR

## How It Works

### 1. API Endpoint (`src/pages/api/gold-rates.ts`)
- Fetches USD to INR exchange rate
- Calculates gold prices based on international rates
- Returns rates for 22K and 18K gold per gram
- Caches responses for 5 minutes

### 2. Frontend Display (`src/components/Contact.astro`)
- Auto-fetches rates on page load
- Auto-refreshes every 5 minutes
- Manual refresh button available
- Shows live/cached/offline status indicator

## Upgrade to Professional APIs

For more accurate real-time rates, you can upgrade to these professional gold price APIs:

### Option 1: GoldAPI.io (Recommended)
**Free Tier**: 100 requests/month  
**Paid**: Starting at $9/month for 1,000 requests

1. Sign up at https://www.goldapi.io/
2. Get your API key
3. Update `src/pages/api/gold-rates.ts`:

```typescript
// Add before the exchange rate fallback
try {
  const goldResponse = await fetch('https://www.goldapi.io/api/XAU/INR', {
    headers: {
      'x-access-token': process.env.GOLDAPI_KEY || 'your-api-key'
    }
  });
  
  if (goldResponse.ok) {
    const goldData = await goldResponse.json();
    const gold24kINR = Math.round(goldData.price_gram_24k);
    const gold22kINR = Math.round(gold24kINR * 0.9167);
    const gold18kINR = Math.round(gold24kINR * 0.75);
    
    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      rates: { gold_24k: gold24kINR, gold_22k: gold22kINR, gold_18k: gold18kINR },
      currency: 'INR',
      unit: 'gram'
    }), { status: 200 });
  }
} catch (error) {
  console.error('GoldAPI error:', error);
}
```

4. Add to `.env`:
```
GOLDAPI_KEY=your-api-key-here
```

### Option 2: Metals-API.com
**Free Tier**: 100 requests/month  
**Paid**: Starting at $9.99/month

1. Sign up at https://metals-api.com/
2. Get access key
3. Update `src/pages/api/gold-rates.ts`:

```typescript
const response = await fetch(
  `https://metals-api.com/api/latest?access_key=${process.env.METALS_API_KEY}&base=USD&symbols=XAU`
);

const data = await response.json();
const goldOunceUSD = 1 / data.rates.XAU;
const goldGramUSD = goldOunceUSD / 31.1035;
// Then convert to INR...
```

### Option 3: Indian Market APIs

For Indian market-specific rates:

**GoodReturns Gold API** or **Money Control Scraping**
- Provides India-specific gold rates
- More accurate for local markets
- May require web scraping (check terms of service)

## Environment Variables

Create a `.env` file in the project root:

```env
# Gold Price API Keys
GOLDAPI_KEY=your-goldapi-key
METALS_API_KEY=your-metals-api-key

# Optional: Indian market API
INDIAN_GOLD_API_URL=your-api-url
```

## Performance Optimization

Current caching strategy:
- **API responses**: Cached for 5 minutes (server-side)
- **Client refresh**: Every 5 minutes (automatic)
- **Manual refresh**: Available via button

To adjust caching:

```typescript
// In src/pages/api/gold-rates.ts
headers: {
  'Cache-Control': 'public, max-age=300', // 300 seconds = 5 minutes
}
```

## Fallback Strategy

The system uses a 3-tier fallback:
1. **Primary**: Professional gold API (if configured)
2. **Secondary**: Exchange rate + international gold price calculation
3. **Tertiary**: Hardcoded approximate rates

## Testing

Test the API endpoint:
```bash
curl http://localhost:4321/api/gold-rates
```

Expected response:
```json
{
  "success": true,
  "timestamp": "2026-03-09T...",
  "rates": {
    "gold_24k": 6920,
    "gold_22k": 6350,
    "gold_18k": 5190
  },
  "currency": "INR",
  "unit": "gram"
}
```

## Deployment

When deploying to Cloudflare Pages:

1. Add environment variables in Cloudflare dashboard:
   - Settings → Environment Variables
   - Add `GOLDAPI_KEY` and other keys

2. The API endpoint will work automatically as a serverless function

## Monitoring

Monitor API usage:
- Check browser console for errors
- Watch status indicator (green = live, yellow = cached, red = offline)
- Check server logs for API failures

## Cost Estimation

With 5-minute caching:
- **Daily requests**: ~288 (24 hours × 60 min / 5)
- **Monthly requests**: ~8,640

Recommended plan: Professional tier with API key (1,000-10,000 requests/month)

## Support

For issues or questions:
- Check API provider documentation
- Review browser console for errors
- Check `/api/gold-rates` response
- Verify environment variables are set

## Disclaimer

Gold rates shown are approximate and may vary from actual market rates. Always verify with local jewelers before transactions.
