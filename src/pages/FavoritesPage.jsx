// src/pages/FavoritesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import './FavoritesPage.css';

function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFavorite, loading } = useFavorites();
  const { isAuthenticated } = useAuth();

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const handleRemove = (e, restaurantId) => {
    e.stopPropagation();
    removeFavorite(restaurantId);
  };

  // If not logged in, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={24} />
          </button>
          <h1>My Favorites</h1>
        </div>

        <div className="favorites-content">
          <div className="empty-favorites">
            <p>Please login to view your favorites</p>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      {/* Header */}
      <div className="favorites-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h1>My Favorites</h1>
      </div>

      {/* Content */}
      <div className="favorites-content">
        {loading ? (
          <div className="loading-favorites">Loading your favorites...</div>
        ) : favorites.length === 0 ? (
          <div className="empty-favorites">
            <p>You haven't added any favorites yet.</p>
            <button onClick={() => navigate('/search')}>Browse Restaurants</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((restaurant) => (
              <div
                key={restaurant.id}
                className="favorite-card"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div
                  className="favorite-image"
                  style={{ backgroundImage: `url(${restaurant.image_url})` }}
                >
                  <button
                    className="remove-btn"
                    onClick={(e) => handleRemove(e, restaurant.id)}
                    title="Remove from favorites"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="favorite-info">
                  <h3>{restaurant.name}</h3>
                  <span className="favorite-category">{restaurant.category}</span>

                  <div className="favorite-rating">
                    <Star size={16} fill="#ffc107" color="#ffc107" />
                    <span>{restaurant.rating}</span>
                  </div>

                  <div className="favorite-address">
                    <MapPin size={14} />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;