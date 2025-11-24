// src/pages/SearchPage.jsx
import React, { useState, useEffect, use } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ArrowLeft, Map, List } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { mockRestaurants } from '../data/mockRestaurants';
import RestaurantMap from '../components/map/RestaurantMap';
import './SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'list'); // list or map

  useEffect(() => {
    // Check if view=map in URL
    const view = searchParams.get('view');
    if (view === 'map') {
      setViewMode('map');
    }
  }, [searchParams])

  useEffect(() => {
    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      let filtered = mockRestaurants;

      const category = searchParams.get('category');
      const query = searchParams.get('query');

      if (category) {
        filtered = filtered.filter((r) => r.category === category);
      }

      if (query) {
        filtered = filtered.filter(
          (r) =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.address.toLowerCase().includes(query.toLowerCase())
        );
      }

      setRestaurants(filtered);
      setLoading(false);
    }, 300);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const handleFavoriteToggle = (restaurant) => {
    if (isFavorite(restaurant.id)) {
      removeFavorite(restaurant.id);
    } else {
      addFavorite(restaurant);
    }
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const toggleView = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list')
  }

  return (
    <div className="search-page">
      {/* Header */}
      <div className="search-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>Find Restaurants</h1>
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
        <div className='view-toggle'>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={ ()=> setViewMode('list')}
          >
            <List size={18} />
            <span>List</span>
          </button>
          <button
            className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            onClick={()=> setViewMode('map')}
          >
            <Map size={18} />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="results-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : restaurants.length === 0 ? (
          <div className="no-results">
            <p>No restaurants found</p>
          </div>
        ) : viewMode === 'map' ?(
          // Map View
          <div className='map-view'>
            <RestaurantMap restaurants={restaurants} />
            <p className='map-hint'>Click on markers to see restaurant details</p>
          </div>
        ) : (
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