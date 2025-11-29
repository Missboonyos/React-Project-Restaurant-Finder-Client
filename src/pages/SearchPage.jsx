// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ArrowLeft, Map, List } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { restaurantAPI } from '../services/api';
import RestaurantMap from '../components/map/RestaurantMap';
import UserMenu from '../components/user/UserMenu';
import './SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'list');

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'map') {
      setViewMode('map');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRestaurants();
  }, [searchParams]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');

    try {
      const category = searchParams.get('category');
      const query = searchParams.get('query');

      let data;
      if (category) {
        data = await restaurantAPI.searchByCategory(category);
      } else if (query) {
        data = await restaurantAPI.search(query);
      } else {
        data = await restaurantAPI.getAll();
      }

      setRestaurants(data);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleFavoriteToggle = async (restaurant) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites');
      navigate('/login');
      return;
    }

    if (isFavorite(restaurant.id)) {
      await removeFavorite(restaurant.id);
    } else {
      await addFavorite(restaurant);
    }
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="search-page">
      {/* Header */}
      <div className="search-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Find Restaurants</h1>
        <UserMenu />
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form-inline">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-inline"
            />
          </div>
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {/* View Toggle Button */}
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
            <span>List</span>
          </button>
          <button
            className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            <Map size={18} />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="results-container">
        {loading ? (
          <div className="loading">Loading restaurants...</div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchRestaurants}>Try Again</button>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="no-results">
            <p>No restaurants found</p>
          </div>
        ) : viewMode === 'map' ? (
          /* Map View */
          <div className="map-view">
            <RestaurantMap restaurants={restaurants} />
            <p className="map-hint">Click on markers to see restaurant details</p>
          </div>
        ) : (
          /* List View */
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <div
                  className="restaurant-image"
                  style={{ backgroundImage: `url(${restaurant.image_url})` }}
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  <button
                    className={`favorite-btn ${isFavorite(restaurant.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(restaurant);
                    }}
                  >
                    ★
                  </button>
                </div>

                <div className="restaurant-info">
                  <h3 onClick={() => handleRestaurantClick(restaurant.id)}>
                    {restaurant.name}
                  </h3>

                  <div className="restaurant-category">{restaurant.category}</div>

                  <div className="restaurant-rating">
                    <Star size={16} fill="#ffc107" color="#ffc107" />
                    <span>{restaurant.rating}</span>
                  </div>

                  <div className="restaurant-address">
                    <MapPin size={16} />
                    <span>{restaurant.address}</span>
                  </div>

                  <div className="restaurant-phone">{restaurant.phone}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;