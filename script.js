// weather app script codes:

const weatheFrom = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".searchBox");
const card = document.querySelector(".card");
const apiKey = "a3876e87e52bf540fcfda627c965bd1f";

weatheFrom.addEventListener("submit", async (event) => {
  event.preventDefault(); //to prevent the default page reload behaviour casuing by the form submit

  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city name!");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  // https://openweathermap.org/current
  // visit this link for api url and get form "Built-in API request by city name" section

  const response = await fetch(apiUrl);

  //   console.log(response);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  //   console.log(data);
  //object destructuring
  const {
    name: city, // take city name form json data
    main: { temp, humidity }, // main is a property that contains an array so we use object destructuring again i.e. nested object destructuring
    weather: [{ description, id }], // now weather is an array of objcets, so we have to use an array destructuring followed by object destrurturing
  } = data;
  // after destructuring we can now use city temp humidity description id etc as an variable
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  //   tempDisplay.textContent = `${((temp - 273.15 )* 9/5 + 32).toFixed(1)}°F`;
  humidityDisplay.textContent = `humidity: ${humidity}% `;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  // visit this site for weather emojis and conditions
  // https://openweathermap.org/weather-conditions
  var wid = weatherId;
  switch (true) {
    case wid >= 200 && wid < 300:
      return "⛈️"; //thunder strom
      break;
    case wid >= 300 && wid < 400:
      return "🌧️"; // drizzle : raining cloud
      break;
    case wid >= 500 && wid < 600:
      return "🌦️"; //rain heavyrain
      break;
    case wid >= 600 && wid < 700:
      return "❄"; //snow
      break;
    case wid >= 700 && wid < 800:
      return "🌫️"; //fog
      break;
    case wid === 800:
      return "🌞"; //sunny clearsky
      break;
    case wid >= 801 && wid < 810:
      return "☁"; //cloud
      break;
    default:
      return "⁉️";
      break;
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add(".error");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
