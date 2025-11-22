//rafce
import React, { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // Add restaurant to favorites
    const addFavorite = (restaurant) => {
        setFavorites((prev)=> {
            // Check if already exists
            if (prev.some((fav) => fav.id === restaurant.id)){
                return prev;
            }
            return [...prev, restaurant];
        })
    }

    // Remove restaurant from favorites
    const removeFavorite = (restaurantId) => {
        return favorites.some((r)=> r.id === restaurantId)
    }

    // Check if restaurant is in favorites
    const isFavorite = (restaurantId) => {
        return favorites.some((r) => r.id === restaurantId);
  };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return (
        <FavoritesContext.Provider value ={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider')
    }
    return context;
}

