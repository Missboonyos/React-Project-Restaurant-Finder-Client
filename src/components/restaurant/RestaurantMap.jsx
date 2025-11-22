// rafce
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const RestaurantMap = ({ restaurants, center}) {
    return (
    <MapContainer center={center} zoom={13} style={{height: '400px'}}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {restaurants.map(restaurant =>(
        <Marker key={restaurant.id} 
            position={[restaurant.location.lat, restaurant.location.lng]} >
          <Popup>{restaurant.name}</Popup>
        </Marker>
      ))}
    
    </MapContainer>
  )
}

export default RestaurantMap