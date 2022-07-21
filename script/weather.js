const apiKey = '0601002b9c7517c7504246d06ed325d1';

// Klagenfurt would be: 46.62638546260993, 14.309435204721062

// geolocation api functions
function getLocationForWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendCall);
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}

function sendCall(position) {
    console.log('send to api lat: ', position.coords.latitude);
    console.log('send to api long: ', position.coords.longitude);
    // if u prefere Klagenfurt, store your lat and long here -> 46.62638546260993, 14.309435204721062
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    console.log('url to fetch: ', url)

    let date = new Date();
    const formattedDate = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:00`
    console.log('formattedDate: ', formattedDate)
    // in case you want to increase your hours:
    // date.setHours(date.getHours() + 3);
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('fetch data: ', data)
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.current.weather[0]["icon"]}.svg`;

            // create your elements + attached the data values that you want
            const weatherDiv = `
            <div id="currentWeather">
                <div class="weather-time">${formattedDate}</div>
                <div classp="city-tem" >${Math.round(data.current.temp)}<sup>°C</sup></div>
                <figure style="margin: 0">
                    <img class="weather-icon" style="width: 30px" src="${icon}" alt="${data.current.weather[0].description}">
                </figure>
                <div style="text-align: center;">${data.current.weather[0].description}</div>
            </div>`

            // append your element to the DOM (html)
            weather.insertAdjacentHTML('beforeEnd', weatherDiv)
        })
        .catch(() => {
            console.log('error in fetch 😩')
        })
}

getLocationForWeather()