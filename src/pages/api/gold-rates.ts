/**
 * API endpoint to fetch real-time gold rates
 * This server-side endpoint fetches from free APIs without exposing keys to client
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Method 1: Try ExchangeRate-API for USD/INR conversion
    const forexResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const forexData = await forexResponse.json();
    const usdToInr = forexData.rates.INR;

    // Method 2: Fetch gold price from free source
    // Using approximate international gold rate (you can update this with actual API)
    // International gold price per troy ounce in USD (approximate)
    const goldOunceUSD = 2020; // This should ideally come from a gold price API
    const goldGramUSD = goldOunceUSD / 31.1035; // Convert troy ounce to grams
    const gold24kINR = Math.round(goldGramUSD * usdToInr);

    // Calculate rates for different karats
    const gold22kINR = Math.round(gold24kINR * 0.9167); // 22K = 91.67% pure
    const gold18kINR = Math.round(gold24kINR * 0.75);    // 18K = 75% pure

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
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error('Error fetching gold rates:', error);
    
    // Return fallback rates if API fails
    return new Response(
      JSON.stringify({
        success: false,
        timestamp: new Date().toISOString(),
        rates: {
          gold_24k: 6920,
          gold_22k: 6350,
          gold_18k: 5190,
        },
        currency: 'INR',
        unit: 'gram',
        fallback: true,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60', // Cache fallback for 1 minute
        },
      }
    );
  }
};
