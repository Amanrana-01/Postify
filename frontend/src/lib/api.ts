const API_BASE_URL = process.env.PAYLOAD_URL || 'http://localhost:3000';
const API_KEY = process.env.PAYLOAD_API;

export interface ApiResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: any;
  heroImage?: {
    url: string;
    alt?: string;
  };
  meta?: {
    description?: string;
  };
  categories?: Array<{
    title: string;
    slug: string;
  }>;
  publishedAt?: string;
  populatedAuthors?: Array<{
    id: string;
    name: string;
  }>;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.apiKey = API_KEY || '';
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async fetchPosts(params: {
    limit?: number;
    page?: number;
    search?: string;
    category?: string;
    depth?: number;
    select?: string[];
  } = {}): Promise<ApiResponse<Post>> {
    const searchParams = new URLSearchParams();
    
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.depth) searchParams.set('depth', params.depth.toString());
    if (params.search) searchParams.set('where[title][contains]', params.search);
    if (params.category) searchParams.set('where[categories.slug][equals]', params.category);
    if (params.select) {
      params.select.forEach(select => {
        searchParams.set(`select[${select}]`, 'true');
      });
    }
    searchParams.set('where[_status][equals]', 'published');

    const response = await fetch(
      `${this.baseUrl}/api/posts?${searchParams.toString()}`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    return response.json();
  }

  async fetchPost(slug: string): Promise<Post | null> {
    const response = await fetch(
      `${this.baseUrl}/api/posts?where[slug][equals]=${slug}&depth=2`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const data = await response.json();
    return data.docs?.[0] || null;
  }

  async fetchPostById(id: string): Promise<Post | null> {
    const response = await fetch(
      `${this.baseUrl}/api/posts/${id}?depth=2`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    return response.json();
  }

  async fetchCategories(): Promise<ApiResponse<Category>> {
    const response = await fetch(
      `${this.baseUrl}/api/categories`,
      {
        headers: this.getHeaders(),
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
