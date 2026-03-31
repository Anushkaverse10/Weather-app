
const API_KEY = 'ac36308770a40f08dfdbea3911fca151';
const BASE_URL = '[api.openweathermap.org](https://api.openweathermap.org/data/2.5)';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherCard = document.getElementById('weather-card');
const initialState = document.getElementById('initial-state');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const weatherContent = document.getElementById('weather-content');
const errorMessage = document.getElementById('error-message');
const particlesContainer = document.getElementById('particles');


const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const feelsLike = document.getElementById('feels-like');
const hourlyForecast = document.getElementById('hourly-forecast');


const weatherIcons = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️'
};

function showState(state) {

    initialState.classList.add('hidden');
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    weatherContent.classList.add('hidden');

    switch (state) {
        case 'initial':
            initialState.classList.remove('hidden');
            break;
        case 'loading':
            loadingState.classList.remove('hidden');
            break;
        case 'error':
            errorState.classList.remove('hidden');
            break;
        case 'weather':
            weatherContent.classList.remove('hidden');
            break;
    }
}

function formatTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });
}

function formatDate(timezone) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (timezone * 1000));

    return localTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function setWeatherTheme(weatherCode, isNight) {

    document.body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'night');

    clearParticles();

    if (isNight) {
        document.body.classList.add('night');
        createStars();
        return;
    }

    const code = weatherCode.toString();

    if (code.startsWith('2') || code.startsWith('3') || code.startsWith('5')) {

        document.body.classList.add('rainy');
        createRain();
    } else if (code.startsWith('6')) {

        document.body.classList.add('snowy');
        createSnow();
    } else if (code.startsWith('7')) {

        document.body.classList.add('cloudy');
        createFloatingParticles();
    } else if (code === '800') {

        document.body.classList.add('sunny');
        createSunParticles();
    } else {

        document.body.classList.add('cloudy');
        createFloatingParticles();
    }
}

function clearParticles() {
    particlesContainer.innerHTML = '';
}

function createFloatingParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle glow';
        particle.style.width = Math.random() * 100 + 50 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = 15 + Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

function createRain() {
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = 0.5 + Math.random() * 0.5 + 's';
        particlesContainer.appendChild(drop);
    }
}

function createSnow() {
    for (let i = 0; i < 50; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.left = Math.random() * 100 + '%';
        flake.style.width = Math.random() * 8 + 4 + 'px';
        flake.style.height = flake.style.width;
        flake.style.animationDelay = Math.random() * 5 + 's';
        flake.style.animationDuration = 3 + Math.random() * 4 + 's';
        flake.style.opacity = 0.5 + Math.random() * 0.5;
        particlesContainer.appendChild(flake);
    }
}

function createSunParticles() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle glow';
        particle.style.background = 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent 70%)';
        particle.style.width = Math.random() * 150 + 100 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

function createStars() {
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'particle';
        star.style.background = 'white';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = 'twinkle 2s ease-in-out infinite';
        star.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(star);
    }


    if (!document.getElementById('twinkle-style')) {
        const style = document.createElement('style');
        style.id = 'twinkle-style';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
}


async function fetchWeather(city) {
    showState('loading');

    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error('City not found. Try another location!');
            }
            throw new Error('Unable to fetch weather data');
        }

        const weatherData = await weatherResponse.json();

        // Fetch forecast for hourly data
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );

        let forecastData = null;
        if (forecastResponse.ok) {
            forecastData = await forecastResponse.json();
        }

        displayWeather(weatherData, forecastData);

    } catch (error) {
        showState('error');
        errorMessage.textContent = error.message;
    }
}

async function fetchWeatherByCoords(lat, lon) {
    showState('loading');

    try {
        const weatherResponse = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error('Unable to fetch weather data');
        }

        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        let forecastData = null;
        if (forecastResponse.ok) {
            forecastData = await forecastResponse.json();
        }

        displayWeather(weatherData, forecastData);

    } catch (error) {
        showState('error');
        errorMessage.textContent = error.message;
    }
}

function displayWeather(data, forecast) {

    const isNight = data.weather[0].icon.includes('n');


    setWeatherTheme(data.weather[0].id, isNight);


    weatherIcon.textContent = weatherIcons[data.weather[0].icon] || '🌡️';
    temperature.textContent = Math.round(data.main.temp);
    description.textContent = data.weather[0].description;


    cityName.textContent = `${data.name}, ${data.sys.country}`;
    dateTime.textContent = formatDate(data.timezone);


    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;


    if (forecast && forecast.list) {
        displayHourlyForecast(forecast.list.slice(0, 8), data.timezone);
    }

    showState('weather');
}

function displayHourlyForecast(hours, timezone) {
    hourlyForecast.innerHTML = hours.map(hour => {
        const icon = weatherIcons[hour.weather[0].icon] || '🌡️';
        const temp = Math.round(hour.main.temp);
        const time = formatTime(hour.dt, timezone);

        return `
            <div class="hour-card">
                <div class="time">${time}</div>
                <div class="icon">${icon}</div>
                <div class="temp">${temp}°</div>
            </div>
        `;
    }).join('');
}


searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        showState('loading');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            (error) => {
                showState('error');
                errorMessage.textContent = 'Location access denied. Please search manually.';
            }
        );
    } else {
        showState('error');
        errorMessage.textContent = 'Geolocation is not supported by your browser.';
    }
});

createFloatingParticles();
