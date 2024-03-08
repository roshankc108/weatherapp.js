// weather app script codes:

const weatheFrom = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".searchBox");
const card = document.querySelector(".card");
const apiKey = "a3876e87e52bf540fcfda627c965bd1f";

weatheFrom.addEventListener("submit",async (event) => {
  event.preventDefault(); //to prevent the default page reload behaviour casuing by the form submit

  const city = cityInput.value;
  if (city) {
    try{
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
    }
    catch(error){
        console.error(error);
        displayError(error);
    }
  } else {
    displayError("Please enter a city name!");
  }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response =  await fetch(apiUrl);

    console.log(response);
}

function displayWeatherInfo(data) {}

function getWeatherEmoji(weatherId) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add(".error");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
