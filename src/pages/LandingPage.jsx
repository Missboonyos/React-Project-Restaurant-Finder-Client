// rafce
import React, { useState } from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const categories = ['Italian', 'Thai', 'Japanese', 'Western', 'Vegan', 'Chinese']

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`)
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${category}`)
  }

  const handleMapClick = () => {
    navigate('/serach?view=map')
  }

  return (
    <div className='landing-page'>
      <div className='landing-container'>
        <h1 className='title'>Let's Tasty!</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className='search-form'>
          <input
            type="text"
            placeholder='Search restaurants...'
            className='search-input'
            value={searchValue}
            onChange={(e)=> setSearchValue(e.target.value)}
          />
          <button type='submit' className='search-button'>
            Search
          </button>
        </form>

        {/* Category Section */}
        <div className='category-section'>
          <h3>Category Favorites</h3>
          <div className='category-grid'>
            {
              categories.map((category)=>(
                <button
                  key={category}
                  className='category-button'
                  onClick={()=> handleCategoryClick(category)}
                >
                    {category}
                </button>
              ))
            }
          </div>
        </div>
        
        {/* Map Button */}
        <button className='map-button' onClick={handleMapClick}>
            <MapPin size={24} />
            <span>View on MAP</span>
        </button>

        {/*Navigation to Favorites*/}
        <button className='favorites-link' onClick={()=> navigate('/favorites')}>
          My Favorites →
        </button>
      </div>
    </div>
  )
}


export default LandingPage