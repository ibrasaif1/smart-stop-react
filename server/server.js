require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function searchStops(origin, stop, destination) {
  try {
    // Get the main route
    const routeResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${API_KEY}`);
    const mainRoute = routeResponse.data.routes[0];

    // Find stops along the route
    const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(stop)}&location=${mainRoute.bounds.northeast.lat},${mainRoute.bounds.northeast.lng}&radius=50000&key=${API_KEY}`);
    const potentialStops = placesResponse.data.results;

    // Calculate total time for each stop
    const results = await Promise.all(potentialStops.map(async (potentialStop) => {
      const withStopResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${potentialStop.geometry.location.lat},${potentialStop.geometry.location.lng}&key=${API_KEY}`);
      const routeWithStop = withStopResponse.data.routes[0];
      const totalTime = routeWithStop.legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60; // Convert to minutes

      return {
        address: potentialStop.formatted_address,
        totalTime: Math.round(totalTime)
      };
    }));

    // Sort results by total time
    return results.sort((a, b) => a.totalTime - b.totalTime);
  } catch (error) {
    console.error('Error in searchStops:', error);
    throw error;
  }
}

app.post('/api/search', async (req, res) => {
  try {
    const { origin, stop, destination } = req.body;
    const results = await searchStops(origin, stop, destination);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});