const weatherIcons = {
  Rain: "wi wi-day-rain",
  Clouds: "wi wi-day-cloudy",
  Clear: "wi wi-day-sunny",
  Snow: "wi wi-day-snow",
  Mist: "wi wi-day-fog",
  Drizzle: "wi wi-day-sleet",
  Thunderstorm: "wi wi-day-"
};

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const toCelsius = (Fahrenheit) => {
  return Fahrenheit*(9/5) + 32
}

async function main(/*withIP = true*/) {
  let ville;


  //J'ai commenté cette partie, car ma clé n'est plus valable et de toute façon je sais quel temps il fait chez moi. De plus il n'est même pas précis, car la ville qu'il m'affiche n'est pas la mienne ^^'
  
  // if(withIP) {
  // const ip = await fetch("https://api.ipify.org?format=json")
  //   .then((resultat) => resultat.json())
  //   .then((json) => json.ip);
  // ville = await fetch(`http://api.ipstack.com/${ip}?access_key=6c07fc5b95006b32ff0d9a4f6ef1b115`)
  //   .then((resultat) => resultat.json())
  //   .then((json) => json.city);
  // } else {
  ville = document.querySelector('#ville').textContent;
  // }
  const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=68cc43e3ca14e2819d7f4528461a2e32&lang=fr&units=metric`)
    .then((resultat) => resultat.json())
    .then((json) => json);
    displayWeatherInfos(meteo)
}

var now = new Date();
 
var annee   = now.getFullYear();
var mois    = ('0'+(now.getMonth()+1)).slice(-2);
var jour    = ('0'+now.getDate()   ).slice(-2);
var heure   = ('0'+now.getHours()  ).slice(-2);
var minute  = ('0'+now.getMinutes()).slice(-2);


function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp + '°C ';
    //const newTemperature = Math.round(temperature)
    const description = data.weather[0].description;
    const conditions = data.weather[0].main;
    const longitude = data.coord.lon;
    const latitude = data.coord.lat;
    const country = data.sys.country;
    const titre = name + '  ' + country + '  ' + temperature + '  ' + capitalize(description);
    const date = "Nous sommes le "+jour+"/"+mois+"/"+annee+" et il est "+heure+" heure "+minute+" minutes"
    console.log(data)
    

    document.getElementById('ville').textContent = name;
    document.getElementById('temperature').textContent = /*Math.round(*/temperature/*)*/;
    document.getElementById('conditions').textContent = capitalize(description);
    document.getElementById('lon').textContent = longitude;
    document.getElementById('lat').textContent = latitude;
    document.querySelector('#pays').textContent = country;
    document.getElementsByTagName('title').textContent = titre;
    document.getElementById('date').textContent = date
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