//rafce
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SearchPage from './pages/SearchPage'
import RestaurantDetail from './pages/RestaurantDetail'
import FavoritesPage from './pages/FavoritesPage'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App