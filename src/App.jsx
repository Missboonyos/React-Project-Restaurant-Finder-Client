//rafce
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import RestaurantDetail from './pages/RestaurantDetail';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import './App.css';


const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>    
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/favorites" element={<FavoritesPage/>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default App

