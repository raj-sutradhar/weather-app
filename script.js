const apiKey = '5e93fc947357f44bb9d12f9dd4e6ca31'; 

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
            return '☀️';  
        case 'clouds':
            return '☁️'; 
        case 'rain':
            return '🌧'; 
        case 'drizzle':
            return '🌦';  
        case 'thunderstorm':
            return '⛈';  
        case 'snow':
            return '❄️'; 
        case 'mist':
        case 'fog':
        case 'haze':
            return '🌫';  
        default:
            return '❓';  
    }
}
