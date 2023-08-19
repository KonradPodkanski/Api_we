"use strict";
const input = document.querySelector("#type-city");
const btn = document.querySelector("button");
const image = document.querySelector("img");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");

// parts of URL
const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=182b832768d412741a66b58f9eef69b9";
const API_UNITS = "&units=metric";
const LANG = "&lang=pl&lang=en";

const checkTemp = () => {
	const city = input.value;
	const URL = API_LINK + city + API_UNITS + LANG + API_KEY;
	console.log(URL);
	//fetch send a question to the website and if response is correctly, received a data or execute catch to inform about issue
	fetch(URL)
		.then(res => res.json())
		.then(res => {
			const temp = Math.floor(res.main.temp);
			const hum = res.main.humidity;
			const feelTemp = Math.floor(res.main.feels_like);
			const status = Object.assign({}, ...res.weather);

			cityName.textContent = input.value;
			weather.textContent = status.main;
			temperature.textContent = temp + "°C";
			feelsLike.textContent = feelTemp + "°C";
			humidity.textContent = hum + "%";
			console.log(status.id);

			warning.textContent = "";
			input.value = "";
// by means of this, it checks id of the weather and changes to a matching image
			if (status.id >= 200 && status.id <= 232) {
				//another idea is image.setAttribute("src", "./img/weather.svg");
				image.src = "./img/thunder.svg";
			} else if (status.id >= 300 && status.id <= 321) {
				image.src = "./img/rainy-7.svg";
			} else if (status.id >= 500 && status.id <= 531) {
				image.src = "./img/rainy-6.svg";
			} else if (status.id >= 600 && status.id <= 622) {
				image.src = "./img/snowy-6.svg";
			} else if (status.id === 800) {
				image.src = "./img/day.svg";
			} else if (status.id === 801 || status.id === 802) {
				image.src = "./img/cloudy-day.svg";
			} else if (status.id === 803 || status.id === 804) {
				image.src = "./img/cloudy.svg";
			}
		})
		.catch(() => (warning.textContent = "Type correct city name!"));
};

// function indicates click on enter
const enterClick = e => {
	if (e.key === "Enter") {
		checkTemp();
	}
};
const prepareDOMEvents = () => {
	btn.addEventListener("click", checkTemp);
	input.addEventListener("keyup", enterClick);
};
const main = () => {
	prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
