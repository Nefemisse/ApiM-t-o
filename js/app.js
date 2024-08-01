const weatherIcons = {
  Rain: "wi-day-rain",
  Clouds: "wi-day-cloudy",
  Clear: "wi-day-sunny",
  Snow: "wi-day-snow",
  Mist: "wi-day-fog",
  Drizzle: "wi-day-sleet",
  Thunderstorm: "wi-day-thunderstorm",
  Haze: "wi-day-haze"
};

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

async function main() {
  const ville = document.querySelector('#ville').textContent;
  const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=68cc43e3ca14e2819d7f4528461a2e32&lang=fr&units=metric`)
    .then((resultat) => resultat.json())
    .then((json) => json);
  const latitude = meteo.coord.lat;
  const longitude = meteo.coord.lon;
  const countryFuseauHoraire = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`)
    .then((resultat) => resultat.json())
    .then((json) => json)
  displayWeatherInfos(meteo);
  displayFuseauHoraire(countryFuseauHoraire);
}

const villeEditable = document.querySelector('#ville');

villeEditable.addEventListener('click', () => {
  villeEditable.contentEditable = true;
});
villeEditable.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    villeEditable.contentEditable = false
    main(false)
  }
})

const now = new Date();
const annee   = now.getFullYear();
const mois    = ('0'+(now.getMonth()+1)).slice(-2);
const jour    = ('0'+now.getDate()   ).slice(-2);
const heure   = ('0'+now.getHours()  ).slice(-2);
const minute  = ('0'+now.getMinutes()).slice(-2);

const displayWeatherInfos = (data) => {
  const name = data.name;
  const temperature = data.main.temp + '°C ';
  const feels_like = data.main.feels_like + '°C ';
  const description = data.weather[0].description;
  const conditions = data.weather[0].main;
  const longitude = data.coord.lon;
  const latitude = data.coord.lat;
  const country = data.sys.country;
  const titre = name + '  ' + country + '  ' + temperature + '  ' + capitalize(description);
  console.log(data)
  console.log(conditions)
  
  document.getElementById('ville').textContent = name;
  document.getElementById('temperature').textContent = temperature;
  document.getElementById('feels_like').textContent = feels_like;
  document.getElementById('conditions').textContent = capitalize(description);
  document.getElementById('lon').textContent = longitude;
  document.getElementById('lat').textContent = latitude;
  document.querySelector('#pays').textContent = country;
  document.getElementById('i').classList.remove("wi-day-rain");
  document.getElementById('i').classList.add(weatherIcons[conditions]);
  document.querySelector('title').textContent = titre;
  document.body.className = conditions.toLowerCase();
}

displayFuseauHoraire = (data) => {
  switch (data.dayOfWeek) {
    case "Monday":
      data.dayOfWeek = "Lundi";
      break;
    case "Tuesday":
    data.dayOfWeek = "Mardi";
      break;
    case "Wednesday":
      data.dayOfWeek = "Mercredi";
      break;
    case "Thursday":
      data.dayOfWeek = "Jeudi";
      break;
    case "Friday":
      data.dayOfWeek = "Vendredi";
      break;
    case "Saturday":
      data.dayOfWeek = "Samadi";
      break;
    default: data.dayOfWeek = "Dimanche";
      break;
  }

  const ville = document.querySelector('#ville').textContent;
  const mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const date = `A "${ville}" nous somme le ${data.dayOfWeek} ${data.day} ${mois[data.month-1]} et il est ${data.time.slice(0,2)} h ${data.time.slice(3)}`
  const timeZone = data.timeZone;

  document.getElementById('date').textContent = date;
  document.getElementById('timeZone').textContent = timeZone;
  
  console.log(data);
}

main();
