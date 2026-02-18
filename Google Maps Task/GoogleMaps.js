function initMap() {
    const center = { lat: 32.0853, lng: 34.7818 }; 

    const map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 8,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get current place weather!",
      position: center,
    });

    infoWindow.open(map);
    map.addListener("click", async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const position = { lat, lng };

      infoWindow.setPosition(position);
      infoWindow.setContent("Loading...");
      infoWindow.open(map);

      try {
        const weather = await fetchWeather(lat, lng);
        infoWindow.setContent(formatWeather(weather));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        infoWindow.setContent(`Failed: ${msg}`);
      }
    });
  }
  window.initMap = initMap;

  async function fetchWeather(lat, lon) {
    const API_KEY = "84d9ff5ab74a718a07972379ca657c01";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Weather request failed");
    }

    return await response.json();
}

function formatWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
 const color = getTempColor(temp);
 
  return `
    <div>
      <div><b>${city}</b> ${country}</div>
      <div>
        Temperature:
        <span style="color:${color}; font-weight:bold;">
          ${temp} °C
        </span>
      </div>
      <div>Feels like: ${feels} °C</div>
      <div>Humidity: ${humidity} %</div>
    </div>
  `;
}

function getTempColor(temp) {
  if (temp < 10) return "blue";
  if (temp <= 25) return "orange";
  return "red";
}