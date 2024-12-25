function findData() {
    const country = document.getElementById("country").value.trim();
    const url = `https://restcountries.com/v3.1/name/${country}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showData(data[0]))
        .catch(() => alert("Country not found! Please try again."));
}

function showData(data) {
    const parent = document.querySelector(".output");
    parent.innerHTML = ""; // Clear previous results
    parent.className = "output card p-3";

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row", "align-items-center");
    parent.appendChild(rowDiv);

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("col-md-6", "col-12", "text-center");
    const img = document.createElement("img");
    img.src = data.flags.png;
    img.alt = `${data.name.official} Flag`;
    img.style.maxWidth = "100%";
    imgDiv.appendChild(img);
    rowDiv.appendChild(imgDiv);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("col-md-6", "col-12");
    infoDiv.innerHTML = `
        <h3>${data.name.official}</h3>
        <p><strong>Common Name:</strong> ${data.name.common}</p>
        <p><strong>Capital:</strong> ${data.capital}</p>
        <p><strong>Region:</strong> ${data.region}</p>
        <p><strong>Population:</strong> ${data.population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${data.area.toLocaleString()} km²</p>
        <button class="btn btn-info mt-3" onclick="weatherData('${data.capital}')">More Weather Info</button>
    `;
    rowDiv.appendChild(infoDiv);
}

function weatherData(city) {
    const apiKey = "d161cc6fc1cc49be9b534950240812";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showWeatherData(data))
        .catch(() => alert("Weather data not available!"));
}

function showWeatherData(data) {
    const weatherDiv = document.createElement("div");
    weatherDiv.className = "mt-4 p-3 border rounded bg-light";
    weatherDiv.innerHTML = `
        <h4>Weather Information for ${data.location.name}</h4>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
    `;
    document.querySelector(".output").appendChild(weatherDiv);
}
