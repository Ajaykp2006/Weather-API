# AI Development Prompts

This file tracks the prompts used to assist in the development of the Atmosphere dashboard.

## APIs & Data Handling
* **Prompt:** "How can I fetch weather data and an Air Quality Index (AQI) without requiring a paid API key?"
* **Implementation:** Integrated the Open-Meteo API for both forecast and air quality data.

## Location Tracking
* **Prompt:** "Write a JavaScript function that uses the browser's geolocation to get the user's current latitude and longitude."
* **Implementation:** Implemented `navigator.geolocation.getCurrentPosition` attached to the DOMContentLoaded event and a dedicated UI button. 

## Dynamic Images
* **Prompt:** "How can I dynamically set a background image based on the name of the searched city?"
* **Implementation:** Integrated the Pollinations AI URL (`https://image.pollinations.ai/prompt/...`) to load cinematic location imagery, combined with a robust Javascript `Image()` preloader to catch errors and load an Unsplash fallback.
