let isCelsius = true;
let currentDataState = { lat: null, lon: null, name: null, timezone: "UTC" };
let clockInterval = null;

const DOM = {
  dashboard: document.getElementById("dashboard"),
  overlay: document.getElementById("overlay-msg"),
  overlayText: document.getElementById("overlay-text"),
  spinner: document.getElementById("spinner"),
  searchInput: document.getElementById("search-input"),
  heroContent: document.getElementById("hero-content"),
  dataContent: document.getElementById("data-content"),
  particles: document.getElementById("particles"),
  locationBg: document.getElementById("location-bg"),
};

function updateBackgroundState(code, isDay) {
  let modeClass = isDay ? "day-clear" : "night-clear";
  let particleCount = isDay ? 20 : 70;

  if ([51, 53, 55, 61, 63, 65, 95, 96, 99].includes(code)) {
    modeClass = "weather-rain";
    particleCount = 100;
  } else if ([71, 73, 75, 45, 48].includes(code)) {
    modeClass = "weather-snow";
    particleCount = 50;
  }

  if (document.body.className !== modeClass) {
    document.body.className = modeClass;
    generateParticles(particleCount);
  }
}

function generateParticles(count) {
  DOM.particles.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    p.style.setProperty("--duration", `${Math.random() * 4 + 2}s`);
    p.style.animationDelay = `${Math.random() * -5}s`;
    fragment.appendChild(p);
  }
  DOM.particles.appendChild(fragment);
}

if (window.matchMedia("(min-width: 850px)").matches) {
  document.addEventListener("mousemove", (e) => {
    const rect = DOM.dashboard.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      const centerX = rect.width / 2,
        centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      DOM.dashboard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    } else {
      DOM.dashboard.style.transform = `rotateX(0) rotateY(0)`;
    }
  });
  document.addEventListener(
    "mouseleave",
    () => (DOM.dashboard.style.transform = `rotateX(0) rotateY(0)`),
  );
}

function getWeatherDetails(code, isDay) {
  const baseUrl =
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/";
  const map = {
    0: { text: "Clear", icon: isDay ? "day.svg" : "night.svg" },
    1: {
      text: "Mostly Clear",
      icon: isDay ? "cloudy-day-1.svg" : "cloudy-night-1.svg",
    },
    2: {
      text: "Partly Cloudy",
      icon: isDay ? "cloudy-day-2.svg" : "cloudy-night-2.svg",
    },
    3: { text: "Overcast", icon: "cloudy.svg" },
    45: { text: "Fog", icon: "cloudy.svg" },
    48: { text: "Rime Fog", icon: "cloudy.svg" },
    51: { text: "Light Drizzle", icon: "rainy-4.svg" },
    53: { text: "Drizzle", icon: "rainy-5.svg" },
    55: { text: "Heavy Drizzle", icon: "rainy-6.svg" },
    61: { text: "Light Rain", icon: "rainy-4.svg" },
    63: { text: "Rain", icon: "rainy-5.svg" },
    65: { text: "Heavy Rain", icon: "rainy-6.svg" },
    71: { text: "Light Snow", icon: "snowy-4.svg" },
    73: { text: "Snow", icon: "snowy-5.svg" },
    75: { text: "Heavy Snow", icon: "snowy-6.svg" },
    95: { text: "Thunderstorm", icon: "thunder.svg" },
    96: { text: "Severe Storms", icon: "thunder.svg" },
    99: { text: "Severe Storms", icon: "thunder.svg" },
  };
  return map[code]
    ? { text: map[code].text, iconUrl: baseUrl + map[code].icon }
    : { text: "Unknown", iconUrl: baseUrl + "cloudy.svg" };
}

function getAQIStatus(aqi) {
  if (aqi <= 50) return { text: "Good", color: "#4ade80" };
  if (aqi <= 100) return { text: "Moderate", color: "#facc15" };
  if (aqi <= 150) return { text: "Unhealthy for Sensitive", color: "#fb923c" };
  if (aqi <= 200) return { text: "Unhealthy", color: "#f87171" };
  return { text: "Very Unhealthy", color: "#a855f7" };
}

function updateGreeting(timeIso) {
  const hour = new Date(timeIso).getHours();
  let greeting = "Good Evening";
  if (hour >= 5 && hour < 12) greeting = "Good Morning";
  else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  document.getElementById("greeting").innerText = greeting;
}

function startLiveClock(timezone) {
  if (clockInterval) clearInterval(clockInterval);

  const updateClock = () => {
    try {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(now);
      document.getElementById("hero-time").innerText = timeString;
    } catch (e) {
      document.getElementById("hero-time").innerText =
        new Date().toLocaleTimeString();
    }
  };

  updateClock();
  clockInterval = setInterval(updateClock, 1000);
}

function showLoader(message = "Calibrating Diamond Atmosphere...") {
  DOM.overlayText.innerText = message;
  DOM.spinner.style.display = "block";
  DOM.overlay.style.display = "flex";
  requestAnimationFrame(() => DOM.overlay.classList.add("active"));
  DOM.heroContent.style.opacity = "0";
  DOM.dataContent.style.opacity = "0";
}

function hideLoader() {
  DOM.overlay.classList.remove("active");
  setTimeout(() => {
    DOM.overlay.style.display = "none";
    DOM.heroContent.style.opacity = "1";
    DOM.dataContent.style.opacity = "1";
  }, 300);
}

function showError(message) {
  DOM.spinner.style.display = "none";
  DOM.overlayText.innerText = message;
  setTimeout(hideLoader, 2500);
}

async function fetchWeatherData(lat, lon, queryName = null) {
  showLoader();
  DOM.locationBg.classList.remove("loaded");

  try {
    let latitude = lat,
      longitude = lon,
      displayLocation = queryName;

    if (queryName && !lat && !lon) {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(queryName)}&count=1`,
      );
      const geoData = await geoRes.json();
      if (!geoData.results?.length) throw new Error("Location not found");
      latitude = geoData.results[0].latitude;
      longitude = geoData.results[0].longitude;
      displayLocation = geoData.results[0].country
        ? `${geoData.results[0].name}, ${geoData.results[0].country}`
        : geoData.results[0].name;
    } else if (lat && lon && !queryName) {
      try {
        const revRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        );
        const revData = await revRes.json();
        const addr = revData.address || {};
        const localName =
          addr.city ||
          addr.town ||
          addr.village ||
          addr.suburb ||
          "Current Location";
        displayLocation = addr.country
          ? `${localName}, ${addr.country}`
          : localName;
      } catch (e) {
        displayLocation = "Current Location";
      }
    }

    const unitParam = isCelsius ? "celsius" : "fahrenheit";
    const windParam = isCelsius ? "kmh" : "mph";

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${unitParam}&wind_speed_unit=${windParam}`;
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi&timezone=auto`;

    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(aqiUrl),
    ]);
    const data = await weatherRes.json();
    const aqiData = await aqiRes.json();

    currentDataState = {
      lat: latitude,
      lon: longitude,
      name: displayLocation,
      timezone: data.timezone || "UTC",
    };

    const cleanLocation = displayLocation.split(",")[0];
    const primaryBgUrl = `https://image.pollinations.ai/prompt/luxurious%20stunning%20cinematic%20photography%20of%20${encodeURIComponent(cleanLocation)}?width=1920&height=1080&nologo=true`;
    const fallbackBgUrl = `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80`;

    // Robust Image Preloader with Fallback Handling
    const img = new Image();
    img.src = primaryBgUrl;
    img.onload = () => {
      DOM.locationBg.style.backgroundImage = `url('${primaryBgUrl}')`;
      DOM.locationBg.classList.add("loaded");
    };
    img.onerror = () => {
      DOM.locationBg.style.backgroundImage = `url('${fallbackBgUrl}')`;
      DOM.locationBg.classList.add("loaded");
    };

    const isDay = data.current.is_day === 1;

    updateBackgroundState(data.current.weather_code, isDay);
    updateGreeting(data.current.time);
    startLiveClock(currentDataState.timezone);

    const currentDetails = getWeatherDetails(data.current.weather_code, isDay);

    document.getElementById("hero-city").innerText = displayLocation;
    document.getElementById("hero-temp").innerText =
      Math.round(data.current.temperature_2m) + "°";
    document.getElementById("hero-desc").innerText = currentDetails.text;
    document.getElementById("hero-icon").src = currentDetails.iconUrl;

    document.getElementById("m-feels").innerText =
      Math.round(data.current.apparent_temperature) + "°";
    document.getElementById("m-humidity").innerText =
      data.current.relative_humidity_2m + "%";
    document.getElementById("m-wind").innerText =
      data.current.wind_speed_10m + (isCelsius ? " km/h" : " mph");

    const currentAqi = Math.round(aqiData.current.us_aqi);
    const aqiInfo = getAQIStatus(currentAqi);
    document.getElementById("m-aqi").innerText = currentAqi;
    document.getElementById("m-aqi-status").innerText = aqiInfo.text;
    document.getElementById("m-aqi-status").style.color = aqiInfo.color;

    const hourlyStrip = document.getElementById("hourly-strip");
    hourlyStrip.innerHTML = "";
    const currentHourIso = data.current.time.substring(0, 14) + "00";
    let startIndex = data.hourly.time.findIndex((t) => t >= currentHourIso);
    if (startIndex === -1) startIndex = 0;

    for (let i = startIndex; i < startIndex + 24; i++) {
      if (!data.hourly.time[i]) break;
      const time = new Date(data.hourly.time[i]);
      const temp = Math.round(data.hourly.temperature_2m[i]);
      const details = getWeatherDetails(
        data.hourly.weather_code[i],
        data.hourly.is_day[i] === 1,
      );
      const label =
        i === startIndex
          ? "Now"
          : new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              hour12: true,
            }).format(time);

      hourlyStrip.insertAdjacentHTML(
        "beforeend",
        `
            <div class="hourly-card">
              <div class="h-time">${label}</div>
              <img src="${details.iconUrl}" alt="${details.text}" class="h-icon">
              <div class="h-temp">${temp}°</div>
            </div>
          `,
      );
    }

    const dailyList = document.getElementById("daily-list");
    dailyList.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      if (!data.daily.time[i]) break;
      const dayName =
        i === 0
          ? "Today"
          : new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
              new Date(data.daily.time[i]),
            );
      const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
      const minTemp = Math.round(data.daily.temperature_2m_min[i]);
      const details = getWeatherDetails(data.daily.weather_code[i], true);

      dailyList.insertAdjacentHTML(
        "beforeend",
        `
            <div class="daily-card">
              <div class="d-day">${dayName}</div>
              <div class="d-icon-wrap"><img src="${details.iconUrl}" alt="${details.text}" class="d-icon"></div>
              <div class="d-temp">${maxTemp}° <span>${minTemp}°</span></div>
            </div>
          `,
      );
    }

    DOM.searchInput.value = "";
    hideLoader();
  } catch (err) {
    showError(
      err.message === "Location not found"
        ? "Location not found."
        : "Network Error. Try again.",
    );
  }
}

document.getElementById("search-btn").addEventListener("click", () => {
  const val = DOM.searchInput.value.trim();
  if (val) fetchWeatherData(null, null, val);
});

DOM.searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value.trim())
    fetchWeatherData(null, null, e.target.value.trim());
});

document.getElementById("unit-btn").addEventListener("click", (e) => {
  isCelsius = !isCelsius;
  e.target.innerText = isCelsius ? "°C" : "°F";
  if (currentDataState.lat || currentDataState.name)
    fetchWeatherData(
      currentDataState.lat,
      currentDataState.lon,
      currentDataState.name,
    );
});

document.getElementById("geo-btn").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    showLoader("Finding your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchWeatherData(pos.coords.latitude, pos.coords.longitude, null),
      () => showError("Location access denied."),
    );
  } else {
    showError("Geolocation unsupported.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    showLoader("Detecting your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchWeatherData(pos.coords.latitude, pos.coords.longitude, null),
      () => {
        const fallbackCity = localStorage.getItem("savedCity") || "Varanasi";
        fetchWeatherData(null, null, fallbackCity);
      },
    );
  } else {
    const fallbackCity = localStorage.getItem("savedCity") || "Varanasi";
    fetchWeatherData(null, null, fallbackCity);
  }
});