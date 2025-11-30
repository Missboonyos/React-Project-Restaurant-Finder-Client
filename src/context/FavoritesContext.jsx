// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { favoritesAPI } from '../services/api';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load favorites from backend when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setFavorites([]); // Clear favorites when logged out
    }
  }, [isAuthenticated]);

  // Load favorites from backend
  const loadFavorites = async () => {
    if (!isAuthenticated) return;

    setLoading(true);

    // Start timer
    const startTime = Date.now();
    const minLoadingTime = 500; // 500ms minimum loading time

    try {
      const data = await favoritesAPI.getAll();

      // Calculate remaining time to meet minimum loading time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Wait if needed
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  // Add restaurant to favorites
  const addFavorite = async (restaurant) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }

    try {
      await favoritesAPI.add(restaurant.id);
      
      // Update local state
      setFavorites((prev) => {
        if (prev.some((fav) => fav.id === restaurant.id)) {
          return prev;
        }
        return [...prev, restaurant];
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
      alert('Failed to add favorite: ' + error.message);
    }
  };

  // Remove restaurant from favorites
  const removeFavorite = async (restaurantId) => {
    if (!isAuthenticated) return;

    try {
      await favoritesAPI.remove(restaurantId);
      
      // Update local state
      setFavorites((prev) => prev.filter((r) => r.id !== restaurantId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Failed to remove favorite: ' + error.message);
    }
  };

  // Check if restaurant is in favorites
  const isFavorite = (restaurantId) => {
    return favorites.some((r) => r.id === restaurantId);
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    loadFavorites // Expose to manually reload if needed
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};