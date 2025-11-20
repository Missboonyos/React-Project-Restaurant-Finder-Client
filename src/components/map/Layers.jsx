// rafce
import React from 'react'
import { LayersControl, Marker, TileLayer } from 'react-leaflet'

const Layers = () => {
  return (
    <LayersControl position='topleft'>
        {/* default position="topright" */}
    
    {/* 1.Basemap */}
    <LayersControl.BaseLayer name="OSM" checked>
        <TileLayer
            attribution='&copy;
            <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </LayersControl.BaseLayer>

    {/* 2.Basemap */}
    <LayersControl.BaseLayer name="WorldImagery"
    //   {/* Get url that require no API from https://leaflet-extras.github.io/leaflet-providers/preview/ */}
        <TileLayer
          attribution='&copy; 
              <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
    </LayersControl.BaseLayer>

    {/*This layer is to pin location */}
    <LayersControl.Overlay name="TEST" checked>
        <Marker position={[13, 101]}></Marker>
        
    </LayersControl.Overlay>

    </LayersControl>

  )
}

export default Layers