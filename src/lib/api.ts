const API_BASE_URL = "https://api.chooseyourcart.com/api/v1";

// Types based on API documentation
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  sale_price?: string | null; // Optional sale price for discounts
  stock: number;
  is_featured: boolean;
  is_upcoming: boolean;
  available_from: string | null;
  image_url: string | null;
  rating?: number; // Average rating for reviews
  reviews_count?: number; // Number of reviews
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Slider {
  id: number;
  title: string | null;
  link_url: string | null;
  position: number;
  image_url: string | null;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Authentication Types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
}

// Product Detail Interface (with multiple images)
export interface ProductDetail extends Product {
  created_at: string;
  updated_at: string;
  images: Array<{
    id: number;
    name: string;
    url: string;
    size: number;
  }>;
}

// Category Products Response
export interface CategoryProductsResponse {
  data: PaginatedResponse<Product>;
  category: Category;
}

// API Response for Category Products (internal use)
interface CategoryProductsApiResponse {
  success: boolean;
  data: PaginatedResponse<Product>;
  category: Category;
  message?: string;
}

// Order Interfaces
export interface Order {
  id: number;
  order_number: string;
  product_id: number;
  quantity: number;
  unit_price: string;
  total_amount: string;
  status:
    | "pending"
    | "payment_verification"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  shipping_address: string;
  phone_number: string;
  notes?: string;
  payment_verified_at?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  product_name: string;
  product_slug: string;
  product_image: string;
  category_name: string;
  payment_screenshot_url?: string;
  verifier?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface CreateOrderRequest {
  product_id: number;
  quantity: number;
  shipping_address: string;
  phone_number: string;
  payment_method?: string;
  full_name?: string;
  email?: string;
  city?: string;
  postal_code?: string;
  notes?: string;
  payment_screenshot: File;
}

export interface OrderDetail extends Order {
  user_id: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Generic API fetch function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    // Don't set default Content-Type for FormData, let browser handle it
    const isFormData = options.body instanceof FormData;
    const defaultHeaders = isFormData
      ? { ...options.headers }
      : {
          "Content-Type": "application/json",
          ...options.headers,
        };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: defaultHeaders,
    });

    const responseText = await response.text();

    if (!response.ok) {
      // Try to get detailed error message from response
      try {
        const errorData = JSON.parse(responseText);
        
        if (errorData.errors) {
          // Handle Laravel validation errors
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('; ');
          throw new Error(`Validation failed: ${validationErrors}`);
        } else if (errorData.message) {
          throw new Error(errorData.message);
        }
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
        console.error("Raw error response:", responseText);
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      const data: ApiResponse<T> = JSON.parse(responseText);

      if (!data.success) {
        throw new Error(data.message || "API request was not successful");
      }

      return data.data;
    } catch (parseError) {
      if (
        parseError instanceof Error &&
        parseError.message.includes("API request")
      ) {
        throw parseError;
      }
      throw new Error(`Invalid response format`);
    }
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// API functions
export const api = {
  // Categories
  getCategories: (): Promise<Category[]> =>
    apiRequest<Category[]>("/categories"),

  // Products
  getProducts: (params?: {
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        )}`
      : "";
    return apiRequest<PaginatedResponse<Product>>(`/products${queryParams}`);
  },

  getFeaturedProducts: (params?: {
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        )}`
      : "";
    return apiRequest<PaginatedResponse<Product>>(
      `/products/featured${queryParams}`
    );
  },

  getUpcomingProducts: (params?: {
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        )}`
      : "";
    return apiRequest<PaginatedResponse<Product>>(
      `/products/upcoming${queryParams}`
    );
  },

  searchProducts: (params?: {
    q?: string;
    category_id?: number;
    per_page?: number;
    page?: number;
  }): Promise<PaginatedResponse<Product>> => {
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        )}`
      : "";
    return apiRequest<PaginatedResponse<Product>>(
      `/products/search${queryParams}`
    );
  },

  // Sliders
  getSliders: (): Promise<Slider[]> => apiRequest<Slider[]>("/sliders"),

  // Authentication
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginRequest): Promise<AuthResponse> =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      return response;
    }),

  forgotPassword: (data: ForgotPasswordRequest): Promise<{ message: string }> =>
    apiRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resetPassword: (data: ResetPasswordRequest): Promise<{ message: string }> =>
    apiRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProfile: (token: string): Promise<User> =>
    apiRequest<{ user: User }>("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.user;
    }),

  updateProfile: (token: string, data: UpdateProfileRequest): Promise<User> =>
    apiRequest<{ user: User }>("/auth/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.user),

  changePassword: (
    token: string,
    data: ChangePasswordRequest
  ): Promise<{ message: string }> =>
    apiRequest<{ message: string }>("/auth/change-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  logout: (token: string): Promise<{ message: string }> =>
    apiRequest<{ message: string }>("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // Product Details
  getProductDetail: (slug: string): Promise<ProductDetail> =>
    apiRequest<ProductDetail>(`/products/${slug}`),

  // Category Products
  getCategoryProducts: async (
    slug: string,
    params?: { per_page?: number; page?: number }
  ): Promise<CategoryProductsResponse> => {
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        )}`
      : "";
    const response = await fetch(
      `${API_BASE_URL}/categories/${slug}/products${queryParams}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: CategoryProductsApiResponse = await response.json();

    if (!responseData.success) {
      throw new Error(responseData.message || "API request was not successful");
    }

    // Extract both data and category from the API response
    return {
      data: responseData.data,
      category: responseData.category,
    };
  },

  // Orders
  getUserOrders: (
    token: string,
    params?: { per_page?: number; page?: number }
  ): Promise<PaginatedResponse<Order>> => {
    const queryParams = params
      ? `?${new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        )}`
      : "";
    return apiRequest<PaginatedResponse<Order>>(`/orders${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createOrder: (
    token: string,
    data: CreateOrderRequest
  ): Promise<{ message: string; order: Order }> => {
    const formData = new FormData();
    formData.append("product_id", data.product_id.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("shipping_address", data.shipping_address);
    formData.append("phone_number", data.phone_number);

    if (data.payment_method) {
      formData.append("payment_method", data.payment_method);
    }

    if (data.full_name) {
      formData.append("full_name", data.full_name);
    }

    if (data.email) {
      formData.append("email", data.email);
    }

    if (data.city) {
      formData.append("city", data.city);
    }

    if (data.postal_code) {
      formData.append("postal_code", data.postal_code);
    }

    if (data.notes) {
      formData.append("notes", data.notes);
    }

    if (data.payment_screenshot) {
      formData.append("payment_screenshot", data.payment_screenshot);
    }

    return apiRequest<{ message: string; order: Order }>("/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, let browser handle it
      },
      body: formData,
    });
  },

  getOrderDetail: (token: string, orderId: number): Promise<OrderDetail> =>
    apiRequest<OrderDetail>(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  cancelOrder: (token: string, orderId: number): Promise<{ message: string }> =>
    apiRequest<{ message: string }>(`/orders/${orderId}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
