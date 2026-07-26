# Atmosphere - Diamond Edition

Atmosphere is a premium, animated weather dashboard (Diamond Edition) featuring a glassmorphism UI and a 3D perspective tilt effect. It delivers real-time weather metrics, air quality updates, and dynamic visual environments based on current conditions.

## 🚀 Live Demo & Screenshots

* **Live Demo:** <br>
* (https://weather-api-theta-beryl.vercel.app/)

### Screenshots

<img width="1917" height="1087" alt="Screenshot 2026-07-26 221854" src="https://github.com/user-attachments/assets/deab0c50-bb89-456b-b373-920cb616d50f" />

## ✨ Key Features

* **Smart Location Tracker:** Utilizes the browser's native `navigator.geolocation` to automatically detect your coordinates and load your local weather on startup.
* **Dynamic Background Images:** Fetches luxurious, cinematic photography of the current city using the Pollinations AI image endpoint (`image.pollinations.ai`). If an image fails to load, it falls back to a high-quality Unsplash image.
* **Comprehensive Weather API:** Integrates with the `Open-Meteo API` to fetch 24-hour forecasts, 7-day outlooks, current temperatures, wind speed, and humidity without needing API keys.
* **Air Quality Index (AQI):** Uses the Open-Meteo Air Quality API to display the US AQI and color-coded health statuses (Good, Moderate, Unhealthy, etc.).
* **Geocoding & Search:** Allows users to search for any country, city, or zip code, powered by the `OpenStreetMap Nominatim API` and Open-Meteo's geocoding search.
* **Immersive Visuals:** Features dynamically generated particles (rain drops, snow, or twinkling stars) and background gradients that change depending on the weather code and time of day.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure for the dashboard.
* **CSS3:** Advanced styling using CSS variables, backdrop-filters for the glass effect, and keyframe animations for particles and background panning.
* **Vanilla JavaScript (ES6+):** Handles async API calls, DOM manipulation, live clock intervals, and the interactive 3D mousemove listener.
* **Icons:** Animated weather icons sourced from amCharts.

## 💻 Local Setup

1. Clone this repository.
2. Open `index.html` in your web browser.
3. Ensure you allow location permissions when prompted to test the automatic location tracker.
