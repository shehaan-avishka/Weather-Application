let weather = {
  "apiKey" : "5cda7e522e47d217828c680adc2de759",
  fetchWeather: function(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+
            city + "&appid="+
            this.apiKey+ "&units=metric&"
          )
          .then((Response ) => Response.json())
          .then((data) => this.displayWeather(data));
  },
  displayWeather : function(data){
    const {name} = data;
    const { icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name,icon,description,temp,humidity,speed);

    //display in html
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText = temp +" °C";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".wind").innerText = "Wind: " + speed + " Km/h";
    document.querySelector(".humidity").innerText = "Humidity: "+ humidity +"%";
    document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("London,UK");
