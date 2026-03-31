const apiKey = "ac36308770a40f08dfdbea3911fca151";

function getWeather() {
  const city = document.getElementById("city").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temp").innerText = data.main.temp + "°C";
      document.getElementById("desc").innerText = data.weather[0].description;

      setEmoji(data.weather[0].main);
    });
}

function setEmoji(condition) {
  let emoji = "🌈";

  if (condition === "Clouds") emoji = "☁️";
  if (condition === "Rain") emoji = "🌧️";
  if (condition === "Clear") emoji = "☀️";
  if (condition === "Snow") emoji = "❄️";
  if (condition === "Thunderstorm") emoji = "⛈️";

  document.getElementById("emoji").innerText = emoji;
}