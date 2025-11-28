// src/services/api.js
const API_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// ======================
// AUTHENTICATION APIs
// ======================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    
    // Save token to localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to get user');
    return data;
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// ======================
// RESTAURANT APIs
// ======================

export const restaurantAPI = {
  // Get all restaurants (with optional filters)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_URL}/restaurants?${queryString}` : `${API_URL}/restaurants`;
    
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch restaurants');
    return data;
  },

  // Get single restaurant by ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch restaurant');
    return data;
  },

  // Search restaurants by category
  searchByCategory: async (category) => {
    return restaurantAPI.getAll({ category });
  },

  // Search restaurants by query
  search: async (query) => {
    return restaurantAPI.getAll({ search: query });
  }
};

// ======================
// REVIEW APIs
// ======================

export const reviewAPI = {
  // Add review to restaurant
  add: async (restaurantId, reviewData) => {
    const response = await fetch(`${API_URL}/reviews/${restaurantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to add review');
    return data;
  },

  // Update review
  update: async (reviewId, reviewData) => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update review');
    return data;
  },

  // Delete review
  delete: async (reviewId) => {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to delete review');
    return data;
  }
};

// ======================
// FAVORITES APIs (Require Authentication)
// ======================

export const favoritesAPI = {
  // Get all favorites
  getAll: async () => {
    const response = await fetch(`${API_URL}/favorites`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch favorites');
    return data;
  },

  // Add to favorites
  add: async (restaurantId) => {
    const response = await fetch(`${API_URL}/favorites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ restaurant_id: restaurantId })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to add favorite');
    return data;
  },

  // Remove from favorites
  remove: async (restaurantId) => {
    const response = await fetch(`${API_URL}/favorites/${restaurantId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to remove favorite');
    return data;
  },

  // Check if restaurant is favorite
  isFavorite: async (restaurantId) => {
    const response = await fetch(`${API_URL}/favorites/check/${restaurantId}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to check favorite');
    return data.isFavorite;
  }
};

// ======================
// MENU APIs
// ======================

export const menuAPI = {
  // Get menu items for restaurant
  getByRestaurant: async (restaurantId) => {
    const response = await fetch(`${API_URL}/menu/restaurant/${restaurantId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch menu');
    return data;
  },

  // Add menu item
  add: async (restaurantId, menuItem) => {
    const response = await fetch(`${API_URL}/menu/restaurant/${restaurantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to add menu item');
    return data;
  },

  // Update menu item
  update: async (menuId, menuItem) => {
    const response = await fetch(`${API_URL}/menu/${menuId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update menu item');
    return data;
  },

  // Delete menu item
  delete: async (menuId) => {
    const response = await fetch(`${API_URL}/menu/${menuId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to delete menu item');
    return data;
  }
};