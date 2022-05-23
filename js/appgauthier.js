const weatherIcons = {
    Rain: "wi wi-day-rain",
    Clouds: "wi wi-day-cloudy",
    Clear: "wi wi-day-sunny",
    Snow: "wi wi-day-snow",
    mist: "wi wi-day-fog",
    Drizzle: "wi wi-day-sleet",
  };
  
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };
  
  const toCelsius = (Fahrenheit) => {
    return Fahrenheit*(9/5) + 32
  }
    async function main() {
        const ip = await fetch('https://api.ipify.org/?format=json')
        .then(function (result) {
            return result.json()
        })
        .then(function (json) {
            json.ip
        })
        const ville = await fetch(`http://api.ipstack.com/${ip}?access_key=c6fd7cc6e588eab80b6e6603d2480ac2`)
        .then(function (result) {
            return result.json()
        })
        .then(function (json) {
            json.city
        })
        const meteo = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=b50fa6b0dcac04fced2fcfd68274f86a&lang=fr&units=metric`)
        .then(function (result) {
            return result.json()
        })
        .then(function (json) {
            json.main.temp
        })
    }
  
  function displayWeatherInfos(data) {
      const name = data.name;
      const temperature = data.main.temp + '°C ';
      const conditions = data.weather[0].main;
      const description = data.weather[0].description;
      const longitude = data.coord.lon;
      const latitude = data.coord.lat;
      const country = data.sys.country;
      const titre = name + '  ' + country + '  ' + temperature + '  ' + capitalize(description);
      
  
      document.getElementById('ville').textContent = name;
      document.getElementById('temperature').textContent = /*Math.round(*/temperature/*)*/;
      document.getElementById('conditions').textContent = capitalize(description);
      document.getElementById('lon').textContent = longitude;
      document.getElementById('lat').textContent = latitude;
      document.querySelector('#pays').textContent = country;
      document.querySelector('title').textContent = titre;
      document.querySelector('i.wi').className = weatherIcons[conditions];
  
      document.querySelector('title').textContent = titre;
      document.body.className = conditions.toLowerCase();
  }
  
  const ville = document.querySelector('#ville');
  
  ville.addEventListener('click', () => {
    ville.contentEditable = true;
  });
  
  ville.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      ville.contentEditable = false
      main(false)
    }
  })
  
  
  main();