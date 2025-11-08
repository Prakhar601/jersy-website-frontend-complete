// Mock data for when backend is not available
const mockProducts = [
  {
    "id": "1",
    "name": "Classic Blue Jersey",
    "price": 49.99,
    "images": ["/pexels-micaasato-1198173.jpg"],
    "colors": ["#1f7ae0", "#ff6b6b", "#51cf66", "#ffd43b"],
    "fonts": ["Arial", "Helvetica", "Times New Roman", "Courier New"],
    "sizes": ["S", "M", "L", "XL"],
    "variants": [
      {"id": "v1", "name": "Standard", "price": 49.99},
      {"id": "v2", "name": "Premium", "price": 69.99}
    ]
  },
  {
    "id": "2",
    "name": "Red Team Jersey",
    "price": 54.99,
    "images": ["/pexels-mwabonje-2042169.jpg"],
    "colors": ["#ff6b6b", "#1f7ae0", "#51cf66", "#ffd43b"],
    "fonts": ["Arial", "Helvetica", "Impact"],
    "sizes": ["M", "L", "XL", "XXL"],
    "variants": [
      {"id": "v1", "name": "Standard", "price": 54.99}
    ]
  },
  {
    "id": "3",
    "name": "Green Athletic Jersey",
    "price": 59.99,
    "images": ["/pexels-pixabay-207693.jpg"],
    "colors": ["#51cf66", "#1f7ae0", "#ff6b6b"],
    "fonts": ["Arial", "Verdana"],
    "sizes": ["S", "M", "L", "XL", "XXL"],
    "variants": [
      {"id": "v1", "name": "Standard", "price": 59.99},
      {"id": "v2", "name": "Pro", "price": 79.99}
    ]
  }
];

export default function useApi() {
  const baseUrl = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  async function get(path) {
    // Try to fetch from API first, but fallback to mock data if unavailable
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout
      
      const response = await fetch(`${baseUrl}${path}`, {
        credentials: 'include',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      // If API is unavailable, use mock data
      console.log('API unavailable, using mock data');
    }
    
    // Fallback to mock data
    if (path === '/products') {
      return mockProducts;
    }
    if (path.startsWith('/products/')) {
      const id = path.split('/products/')[1];
      const product = mockProducts.find(p => p.id === id);
      if (product) return product;
      throw new Error(`Product ${id} not found`);
    }
    
    throw new Error(`No mock data available for ${path}`);
  }

  async function post(path, body) {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body ?? {}),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`POST ${path} failed: ${response.status} ${text}`);
    }
    return response.json();
  }

  return { get, post };
}


