const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(weatherData) {
    const weatherInfo = document.getElementById('weatherInfo');
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const weatherCondition = weatherData.weather[0].description;
    const emoji = getWeatherEmoji(weatherData.weather[0].main);

    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <div class="weather-icon">${emoji}</div>
        <div class="temperature">${temperature} °C</div>
        <p class="condition">${weatherCondition}</p>
    `;
}

function getWeatherEmoji(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return '☀️';  // Sunny
        case 'clouds':
            return '☁️';  // Cloudy
        case 'rain':
            return '🌧';  // Rainy
        case 'drizzle':
            return '🌦';  // Light Rain
        case 'thunderstorm':
            return '⛈';  // Thunderstorm
        case 'snow':
            return '❄️';  // Snow
        case 'mist':
        case 'fog':
        case 'haze':
            return '🌫';  // Misty or Foggy
        default:
            return '❓';  // Unknown weather condition
    }
}
