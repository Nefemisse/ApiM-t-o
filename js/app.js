const weatherIcons = {
    "Rain" : "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice[1];
}

async function main(){
    await fetch('https://api.ipify.org?format=json')
    .then(resultat =>resultat.json())
    .then(json => {
        const ip = json.ip;
        fetch(`http://api.ipstack.com/${ip}?access_key=6c07fc5b95006b32ff0d9a4f6ef1b115`)
        .then(resultat => resultat.json())
        .then(json => {
            const ville = json.city;
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=68cc43e3ca14e2819d7f4528461a2e32&lang=fr&units=metric`)
            .then(resultat => resultat.json())
            .then(json => {
                console.log(json);
            })
        })
    })
}

main();