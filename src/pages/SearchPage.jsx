// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ArrowLeft, Map, List, SlidersHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { restaurantAPI } from '../services/api';
import RestaurantMap from '../components/map/RestaurantMap';
import UserMenu from '../components/user/UserMenu';
import LoadingSpinner from '../components/LoadingSpinner'
import './SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  const [restaurants, setRestaurants] = useState([]);
  const [sortedRestaurants, setSortedRestaurants] = useState([]); // For future sorting feature
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState(searchParams.get('view') || 'list');
  const [sortBy, setSortBy] = useState('rating'); // Default sort by rating
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'map') {
      setViewMode('map');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRestaurants();
  }, [searchParams]);

  // Sort restaurants whenever data or sortBy changes
  useEffect(()=> {
    sortRestaurants()
  }, [restaurants, sortBy])

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');

    // Start timer to ensure minimum loading time
    const startTime = Date.now();
    const minLoadingTime = 500; // 500ms minimum loading time

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

      // Calculate remaining time to meet minimum loading duration
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

      // Wait for remaining time if needed
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      setRestaurants(data);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
      toast.error('Failed to load restaurants');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  // New sorting function
  const sortRestaurants = () => {
    let sorted = [...restaurants];  

    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    setSortedRestaurants(sorted);
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setShowSortMenu(false);
    toast.success(`Sorted by ${newSortBy}`, {
      icon: '🔀', duration: 2000
    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // const handleFavoriteToggle = async (restaurant) => {
  //   if (!isAuthenticated) {
  //     alert('Please login to add favorites');
  //     navigate('/login');
  //     return;
  //   }

  //   if (isFavorite(restaurant.id)) {
  //     await removeFavorite(restaurant.id);
  //   } else {
  //     await addFavorite(restaurant);
  //   }
  // };

  // Changed from above to toast
  const handleFavoriteToggle = async (restaurant) => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites', {
        icon: '🔒',
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    try {
      if (isFavorite(restaurant.id)) {
        await removeFavorite(restaurant.id);
        toast.success('Removed from favorites', {
          icon: '💔',
        })
      } else {
        await addFavorite(restaurant);
        toast.success('Added to favorites!', {
          icon: '❤️',
        })
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  }

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

        {/* View Toggle & Sort */}
        <div className="view-controls">
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

          {/* NEW: Sort Button */}
          {viewMode === 'list' && (
            <div className="sort-container">
              <button
                className="sort-button"
                onClick={() => setShowSortMenu(!showSortMenu)}
              >
                <SlidersHorizontal size={18} />
                <span>Sort</span>
              </button>

              {showSortMenu && (
                <>
                  <div className="sort-overlay" onClick={() => setShowSortMenu(false)} />
                  <div className="sort-menu">
                    <button
                      className={`sort-option ${sortBy === 'rating' ? 'active' : ''}`}
                      onClick={() => handleSortChange('rating')}
                    >
                      ⭐ Rating (High to Low)
                    </button>
                    <button
                      className={`sort-option ${sortBy === 'name' ? 'active' : ''}`}
                      onClick={() => handleSortChange('name')}
                    >
                      🔤 Name (A to Z)
                    </button>
                    <button
                      className={`sort-option ${sortBy === 'category' ? 'active' : ''}`}
                      onClick={() => handleSortChange('category')}
                    >
                      🍽️ Category
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="results-container">
        {loading ? (
          <LoadingSpinner message='Finding delicious restaurants...' size='large' />
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchRestaurants}>Try Again</button>
          </div>
        ) : sortedRestaurants.length === 0 ? (
          <div className="no-results">
            <p>No restaurants found</p>
          </div>
        ) : viewMode === 'map' ? (
          /* Map View */
          <div className="map-view">
            <RestaurantMap restaurants={sortedRestaurants} />
            <p className="map-hint">Click on markers to see restaurant details</p>
          </div>
        ) : (
          /* List View */
          <div className="restaurant-grid">
            {sortedRestaurants.map((restaurant) => (
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