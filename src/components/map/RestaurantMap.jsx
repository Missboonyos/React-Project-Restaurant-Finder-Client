// src/components/RestaurantMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RestaurantMap({ restaurants, center = [13.7563, 100.5018] }) {
  const navigate = useNavigate();

  const handleMarkerClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '400px', width: '100%', borderRadius: '15px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{restaurant.name}</strong>
                <br />
                <span style={{ color: '#666' }}>{restaurant.category}</span>
                <br />
                <span style={{ color: '#ffc107' }}>★ {restaurant.rating}</span>
                <br />
                <button
                  onClick={() => handleMarkerClick(restaurant.id)}
                  style={{
                    marginTop: '8px',
                    padding: '5px 15px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                  }}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default RestaurantMap;