//rafce
import React, { Children, createContext, useContext, useState } from 'react'

const FavoritesContext = createContext();

export function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (restaurant) => {
        setFavorites(favorites.filter(r => r.id !== restaurantId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}
export const useFavorites = () => useContext(FavoritesContext)