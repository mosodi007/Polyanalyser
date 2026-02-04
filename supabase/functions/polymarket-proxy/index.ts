import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GAMMA_API_BASE = 'https://gamma-api.polymarket.com';
const CLOB_API_BASE = 'https://clob.polymarket.com';

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint');
    const params = url.searchParams.get('params');

    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: 'Missing endpoint parameter' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let targetUrl = '';

    if (endpoint === 'events') {
      const queryParams = params || 'limit=50&closed=false&order=id&ascending=false';
      targetUrl = `${GAMMA_API_BASE}/events?${queryParams}`;
      console.log('Fetching events from:', targetUrl);
    } else if (endpoint === 'markets') {
      const queryParams = params || 'limit=50&closed=false';
      targetUrl = `${GAMMA_API_BASE}/markets?${queryParams}`;
      console.log('Fetching markets from:', targetUrl);
    } else if (endpoint === 'market') {
      const marketId = url.searchParams.get('id');
      if (!marketId) {
        return new Response(
          JSON.stringify({ error: 'Missing market id' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      targetUrl = `${GAMMA_API_BASE}/markets/${marketId}`;
      console.log('Fetching market from:', targetUrl);
    } else if (endpoint === 'event') {
      const eventSlug = url.searchParams.get('slug');
      if (!eventSlug) {
        return new Response(
          JSON.stringify({ error: 'Missing event slug' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      targetUrl = `${GAMMA_API_BASE}/events/slug/${eventSlug}`;
      console.log('Fetching event by slug from:', targetUrl);
    } else if (endpoint === 'market-by-slug') {
      const marketSlug = url.searchParams.get('slug');
      if (!marketSlug) {
        return new Response(
          JSON.stringify({ error: 'Missing market slug' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      targetUrl = `${GAMMA_API_BASE}/markets/slug/${marketSlug}`;
      console.log('Fetching market by slug from:', targetUrl);
    } else if (endpoint === 'orderbook') {
      const tokenId = url.searchParams.get('token_id');
      if (!tokenId) {
        return new Response(
          JSON.stringify({ error: 'Missing token_id' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      targetUrl = `${CLOB_API_BASE}/book?token_id=${tokenId}`;
      console.log('Fetching orderbook from:', targetUrl);
    } else if (endpoint === 'tags') {
      targetUrl = `${GAMMA_API_BASE}/tags`;
      console.log('Fetching tags from:', targetUrl);
    } else if (endpoint === 'search') {
      const searchQuery = url.searchParams.get('q');
      if (!searchQuery) {
        return new Response(
          JSON.stringify({ error: 'Missing search query parameter (q)' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      const queryParams = new URLSearchParams();
      queryParams.set('q', searchQuery);

      // Optional parameters
      const limitPerType = url.searchParams.get('limit_per_type');
      if (limitPerType) queryParams.set('limit_per_type', limitPerType);

      const keepClosedMarkets = url.searchParams.get('keep_closed_markets');
      if (keepClosedMarkets) queryParams.set('keep_closed_markets', keepClosedMarkets);

      targetUrl = `${GAMMA_API_BASE}/public-search?${queryParams.toString()}`;
      console.log('Searching markets from:', targetUrl);
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid endpoint' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Polymarket API error (${response.status}):`, errorText);
      throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched data successfully, response type:', Array.isArray(data) ? 'array' : 'object');

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in polymarket-proxy:', error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
