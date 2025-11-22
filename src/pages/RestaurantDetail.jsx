// rafce
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { mockRestaurants } from '../data/mockRestaurants';
import './RestaurantDetail.css';

function RestaurantDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ user_name:'', rating: 5, comment: ''});

  useEffect(()=> {
    // Find restaurant from mock data
    const found = mockRestaurants.find((r)=> r.id === parseInt(id));
    setRestaurant(found);
    setLoading(false);
  }, [id]);

  const handleFavoriteToggle = () => {
    if (isFavorite(restaurant.id)) {
      removeFavorite(restaurant.id);
    } else {
      addFavorite(restaurant);
    }
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // For now, just log the review (later we'll send to backend)
    console.log('New Review:', newReview);
    alert('Review submitted! (In demo mode - will save to backend later)');
    setNewReview({ user_name: '', rating: 5, comment: ''})
  };

  if (loading) {
    return <div className='loading-page'>Loading...</div>
  }

  if (!restaurant) {
    return (
      <div className='not-found'>
        <h2>Restaurant not found</h2>
        <button onClick={()=> navigate('/')}>Go Home</button>
      </div>
    )
  }

  return (
    <div className='detail-page'>
      {/* Header Image */}
      <div 
        className='detail-header'
        style={{ backgroundImage: `url(${restaurant.image_url})`}}
    >
        <button className='back-btn' onClick={()=> navigate(-1)}>
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
      <div className='detail-content'>
        <div className='detail-main'>
          <h1>{restaurant.name}</h1>
          <span className='detail-category'>{restaurant.category}</span>

          <div className='detail-rating'>
            <Star size={20} fill='#ffc107' color='#ffc107' />
            <span>{restaurant.rating}</span>
          </div>

      <div className='detail-info'>
        <div className='info-item'>
          <MapPin size={18} />
          <span>{restaurant.address}</span>
        </div>
        <div className='info-item'>
          <Phone size={18} />
          <span>{restaurant.phone}</span>
        </div>
      </div>
    </div>
  </div>

      {/* Menu Section */}
      <div className='detail-section'>
        <h2>Menu</h2>
        <div className='menu-list'>
          {restaurant.menu.map((item, index) => (
            <div key={index} className='menu-item'>
              <span className='menu-name'>{item.name}</span>
              <span className='menu-price'>฿{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className='detail-section'>
        <h2>Reviews</h2>

      {/* Add Review Form */}
      <form onSubmit={handleReviewSubmit} className='review-form'>
          <input
            type='text'
            placeholder='Your name'
            value={newReview.user_name}
            onChange={(e)=> setNewReview({ ...newReview, user_name: e.target.value})}
            required
            />
            <select
              value={newReview.rating}
              onChange={(e)=> setNewReview({ ...newReview, rating: parseInt(e.target.value)})}              
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
            <textarea
              placeholder='Write your review'
              value={newReview.comment}
              onChange={(e)=> setNewReview({...newReview, comment: e.target.value})}
              required
            />
            <button type='submit'>Submit Review</button>          
      </form>
      
      {/* Reviews List */}
      <div className='reviews-list'>
        {restaurant.reviews.length === 0 ? (
          <p className='no-reviews'>No reviews yet. Be the first!</p>
        ) : (
          restaurant.reviews.map((review)=> (
            <div key={review.id} className='review-item'>
              <div className='review-header'>
                <span className='review-user'>{review.user_name}</span>
                <span className='review-rating'>
                  {'★'.repeat(review.rating)}{'★'.repeat(5-review.rating)}
                </span>
              </div>
              <p className='review-comment'>{review.comment}</p>
              <span className='review-date'>{review.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default RestaurantDetail