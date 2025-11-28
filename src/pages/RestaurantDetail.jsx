// src/pages/RestaurantDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { restaurantAPI, reviewAPI } from '../services/api';
import './RestaurantDetail.css';

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [newReview, setNewReview] = useState({ user_name: '', rating: 5, comment: '' });

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await restaurantAPI.getById(id);
      setRestaurant(data);
    } catch (err) {
      setError('Failed to load restaurant details');
      console.error('Error fetching restaurant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async () => {
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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!newReview.user_name || !newReview.comment) {
      alert('Please fill in all fields');
      return;
    }

    setSubmittingReview(true);

    try {
      await reviewAPI.add(id, newReview);
      alert('Review submitted successfully!');
      setNewReview({ user_name: '', rating: 5, comment: '' });
      
      // Refresh restaurant details to show new review
      await fetchRestaurantDetails();
    } catch (err) {
      alert('Failed to submit review: ' + err.message);
      console.error('Error submitting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return <div className="loading-page">Loading restaurant details...</div>;
  }

  if (error || !restaurant) {
    return (
      <div className="not-found">
        <h2>{error || 'Restaurant not found'}</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {/* Header Image */}
      <div
        className="detail-header"
        style={{ backgroundImage: `url(${restaurant.image_url})` }}
      >
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <button
          className={`fav-btn ${isFavorite(restaurant.id) ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
        >
          ★
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="detail-content">
        <div className="detail-main">
          <h1>{restaurant.name}</h1>
          <span className="detail-category">{restaurant.category}</span>

          <div className="detail-rating">
            <Star size={20} fill="#ffc107" color="#ffc107" />
            <span>{restaurant.rating}</span>
          </div>

          <div className="detail-info">
            <div className="info-item">
              <MapPin size={18} />
              <span>{restaurant.address}</span>
            </div>
            <div className="info-item">
              <Phone size={18} />
              <span>{restaurant.phone}</span>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="detail-section">
          <h2>Menu</h2>
          {restaurant.menu && restaurant.menu.length > 0 ? (
            <div className="menu-list">
              {restaurant.menu.map((item) => (
                <div key={item.id} className="menu-item">
                  <span className="menu-name">{item.name}</span>
                  <span className="menu-price">฿{item.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No menu items available</p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="detail-section">
          <h2>Reviews</h2>

          {/* Add Review Form */}
          <form onSubmit={handleReviewSubmit} className="review-form">
            <input
              type="text"
              placeholder="Your name"
              value={newReview.user_name}
              onChange={(e) => setNewReview({ ...newReview, user_name: e.target.value })}
              required
            />
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
            <textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            />
            <button type="submit" disabled={submittingReview}>
              {submittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {/* Reviews List */}
          <div className="reviews-list">
            {restaurant.reviews && restaurant.reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first!</p>
            ) : (
              restaurant.reviews && restaurant.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-user">{review.user_name}</span>
                    <span className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;