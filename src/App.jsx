//rafce
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import RestaurantDetail from './pages/RestaurantDetail';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

const App = () => {
  return (
    <FavoritesProvider>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/favorites" element={<FavoritesPage/>} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App

