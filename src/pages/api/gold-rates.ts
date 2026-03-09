/**
 * API endpoint to fetch real-time Indian gold rates
 * Uses GoldAPI.io for accurate Indian market rates
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Try GoldAPI.io first (provides accurate Indian rates)
    const goldApiKey = import.meta.env.GOLDAPI_KEY;
    
    if (goldApiKey && goldApiKey !== 'goldapi-your-api-key-here') {
      const goldResponse = await fetch('https://www.goldapi.io/api/XAU/INR', {
        headers: {
          'x-access-token': goldApiKey,
          'Content-Type': 'application/json'
        }
      });

      if (goldResponse.ok) {
        const goldData = await goldResponse.json();
        // GoldAPI returns price per gram for different karats
        const gold24kINR = Math.round(goldData.price_gram_24k);
        const gold22kINR = Math.round(goldData.price_gram_22k);
        const gold18kINR = Math.round(goldData.price_gram_18k);

        return new Response(
          JSON.stringify({
            success: true,
            timestamp: goldData.timestamp ? new Date(goldData.timestamp * 1000).toISOString() : new Date().toISOString(),
            rates: {
              gold_24k: gold24kINR,
              gold_22k: gold22kINR,
              gold_18k: gold18kINR,
            },
            currency: 'INR',
            unit: 'gram',
            source: 'GoldAPI.io',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=600', // Cache for 10 minutes
            },
          }
        );
      }
    }

    // Fallback: Try MetalsAPI
    // You can sign up at https://metals-api.com/ for free tier
    const metalsApiKey = import.meta.env.METALS_API_KEY;
    
    if (metalsApiKey) {
      const metalsResponse = await fetch(
        `https://metals-api.com/api/latest?access_key=${metalsApiKey}&base=INR&symbols=XAU`
      );
      
      if (metalsResponse.ok) {
        const metalsData = await metalsResponse.json();
        const goldGramINR = Math.round((1 / metalsData.rates.XAU) / 31.1035);
        const gold24kINR = goldGramINR;
        const gold22kINR = Math.round(gold24kINR * 0.9167);
        const gold18kINR = Math.round(gold24kINR * 0.75);

        return new Response(
          JSON.stringify({
            success: true,
            timestamp: new Date().toISOString(),
            rates: {
              gold_24k: gold24kINR,
              gold_22k: gold22kINR,
              gold_18k: gold18kINR,
            },
            currency: 'INR',
            unit: 'gram',
            source: 'MetalsAPI',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=600',
            },
          }
        );
      }
    }

    throw new Error('No API key configured');

  } catch (error) {
    console.error('Error fetching gold rates:', error);
    
    // Return current GoodReturns fallback rates (updated manually)
    return new Response(
      JSON.stringify({
        success: false,
        timestamp: new Date().toISOString(),
        rates: {
          gold_24k: 16309,
          gold_22k: 14950,
          gold_18k: 13000,
        },
        currency: 'INR',
        unit: 'gram',
        source: 'Fallback (GoodReturns)',
        fallback: true,
        note: 'Configure GOLDAPI_KEY or METALS_API_KEY in .env for live rates'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=600',
        },
      }
    );
  }
};
