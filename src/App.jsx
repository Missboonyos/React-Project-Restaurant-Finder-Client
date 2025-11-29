//rafce
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
          {/* Toast Container - Show all toasts */}
          <Toaster 
            position='top-center'
            reverseOrder={false}
            toastOptions={{
              // Default options
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                padding: '16px',
                borderRadius: '10px'
              },
              // Success toast style
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '4caf50',
                  secondary: '#fff'
                }
              },
              // Error toast style
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#e74c3c',
                  secondary: '#fff'
                }
              }
            }}                    
          />

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

