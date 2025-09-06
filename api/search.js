export default async function handler(req, res) {

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests for this API
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  try {
    // Extract query parameters from the request
    const { query } = req;
    
    // Use API key from environment variable (more secure)
    // const apiKey = process.env.VITE_SERPAPI_KEY;
    const apiKey = import.meta.env.VITE_SERPAPI_KEY
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key not configured on server' 
      });
    }

    // Build the search parameters
    const searchParams = new URLSearchParams({
      api_key: apiKey,
      ...query // Spread all query parameters from the request
    });

    // Make request to SerpAPI
    const serpApiUrl = `https://serpapi.com/search?${searchParams.toString()}`;
    
    console.log('Making request to SerpAPI:', serpApiUrl.replace(apiKey, 'HIDDEN'));
    
    const response = await fetch(serpApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SerpAPI error response:', errorText);
      throw new Error(`SerpAPI returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Check if SerpAPI returned an error
    if (data.error) {
      console.error('SerpAPI error:', data.error);
      return res.status(400).json({ 
        error: 'SerpAPI error',
        details: data.error 
      });
    }

    // Return the successful response
    return res.status(200).json(data);

  } catch (error) {
    console.error('Serverless function error:', error);
    
    // Return appropriate error response
    return res.status(500).json({
      error: 'Failed to fetch search results',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}