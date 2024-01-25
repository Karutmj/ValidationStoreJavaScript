import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import axios from 'axios';

const PlaceMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );

      const data = response.data;
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } else {
        setCoordinates(null);
      }
    } catch (error) {
      console.error('Error fetching place coordinates:', error);
    }
  };

  return (
    <div>
      <h2>Place Map</h2>
      <input
        type="text"
        placeholder="Enter place (e.g., Warsaw, ul. Jasna)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ width: '100%', height: '400px' }}>
        <ComposableMap>
          <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {coordinates && (
            <circle
              cx={coordinates.lng}
              cy={coordinates.lat}
              r={3}
              fill="red"
            />
          )}
        </ComposableMap>
      </div>
    </div>
  );
};

export default PlaceMap;