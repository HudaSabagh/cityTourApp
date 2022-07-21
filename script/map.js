// how to use a custom icon:
const greenIcon = new L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const pois = [
    {
        lat: 46.6197417911381,
        long: 14.254603424198022,
        name: 'Sick Klagenfurt Bar',
        desc: 'this is a really sick bar',
        link: 'http://www.google.com',
    },
    {
        lat: 46.62916918308896,
        long: 14.30131162903591,
        name: 'Restaurant One',
        desc: 'this is a really sick restaurant',
        link: 'http://www.google.com'
    }
]

// geolocation api functions
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.')
    }
}

function showPosition(position) {
    console.log('lat: ', position.coords.latitude);
    console.log('long: ', position.coords.longitude);

    L.marker([position.coords.latitude, position.coords.longitude], {icon: greenIcon}).addTo(map);
}

// maps initialization 
var map = L.map('map').setView([46.62197594810503, 14.2878471264074389], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// creates a new marker
L.marker([46.62197594810503, 14.287847126407438]).addTo(map)
    .bindPopup(`
    <div>
        <p><strong>Name:</strong></p>
        <p>Cool Bar</p>
        <p><strong>What can you do here?:</strong></p>
        <p>this is the description</p>
        <a href="#">Visit Homepage</a>
        <br />
        <a href="https://maps.google.com/?q=<lat>,<lng>">Navigate me!</a>
    </div>`)
    .openPopup();


// example -> has to happen in a function, that goes over our poisArray - pois.forEach(...)
// L.marker([poi.lat, poi.long]).addTo(map)
//     .bindPopup(`
//     <div>
//         <p><strong>Name:</strong></p>
//         <p>${poi.name}</p>
//         <p><strong>What can you do here?:</strong></p>
//         <p>${poi.desc}</p>
//         <a href="${poi.link}">Visit Homepage</a>
//     </div>`)

// make a function, that does the above for you

// then use pois.forEach()

// initialize geolocation
getLocation();