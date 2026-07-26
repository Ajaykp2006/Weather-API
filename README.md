# Atmosphere - Diamond Edition

Atmosphere is a premium, animated weather dashboard (Diamond Edition) featuring a glassmorphism UI and a 3D perspective tilt effect[cite: 8, 9, 10]. It delivers real-time weather metrics, air quality updates, and dynamic visual environments based on current conditions[cite: 8, 9].

## 🚀 Live Demo & Screenshots

* **Live Demo:** [Insert your live hosting URL here, e.g., Vercel, GitHub Pages]

### Screenshots

<img width="1917" height="1087" alt="Screenshot 2026-07-26 221854" src="https://github.com/user-attachments/assets/deab0c50-bb89-456b-b373-920cb616d50f" />

* **Daylight & Clear:** 
  ![Clear Day UI](insert_image_url_here)
* **Nighttime Dashboard:** 
  ![Night UI](insert_image_url_here)
* **Rain/Snow Particles:** 
  ![Rain/Snow Particles](insert_image_url_here)

## ✨ Key Features

* **Smart Location Tracker:** Utilizes the browser's native `navigator.geolocation` to automatically detect your coordinates and load your local weather on startup[cite: 9].
* **Dynamic Background Images:** Fetches luxurious, cinematic photography of the current city using the Pollinations AI image endpoint (`image.pollinations.ai`). If an image fails to load, it falls back to a high-quality Unsplash image[cite: 9].
* **Comprehensive Weather API:** Integrates with the `Open-Meteo API` to fetch 24-hour forecasts, 7-day outlooks, current temperatures, wind speed, and humidity without needing API keys[cite: 9].
* **Air Quality Index (AQI):** Uses the Open-Meteo Air Quality API to display the US AQI and color-coded health statuses (Good, Moderate, Unhealthy, etc.)[cite: 9].
* **Geocoding & Search:** Allows users to search for any country, city, or zip code, powered by the `OpenStreetMap Nominatim API` and Open-Meteo's geocoding search[cite: 9].
* **Immersive Visuals:** Features dynamically generated particles (rain drops, snow, or twinkling stars) and background gradients that change depending on the weather code and time of day[cite: 9, 10].

## 🛠️ Tech Stack

* **HTML5:** Semantic structure for the dashboard[cite: 8].
* **CSS3:** Advanced styling using CSS variables, backdrop-filters for the glass effect, and keyframe animations for particles and background panning[cite: 10].
* **Vanilla JavaScript (ES6+):** Handles async API calls, DOM manipulation, live clock intervals, and the interactive 3D mousemove listener[cite: 9].
* **Icons:** Animated weather icons sourced from amCharts[cite: 9].

## 💻 Local Setup

1. Clone this repository.
2. Open `index.html` in your web browser[cite: 8].
3. Ensure you allow location permissions when prompted to test the automatic location tracker[cite: 9].
