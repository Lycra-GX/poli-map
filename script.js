// Center coordinates for PUO
const puoCoords = [4.5884, 101.1215]; 

// Initialize the map
const map = L.map('map').setView(puoCoords, 17);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Data for PUO Buildings
const locations = [
    {
        name: "JKA (Civil Engineering)",
        coords: [4.5891, 101.1218],
        desc: "Main building for Civil Engineering students."
    },
    {
        name: "Library (Perpustakaan PUO)",
        coords: [4.5880, 101.1225],
        desc: "Learning resource center & e-library access."
    },
    {
        name: "Pusat Islam PUO",
        coords: [4.5875, 101.1205],
        desc: "Main prayer hall and religious activity center."
    },
    {
        name: "Kamsis (Residential College)",
        coords: [4.5865, 101.1235],
        desc: "Student accommodation area."
    }
];

// Loop through locations and add markers
locations.forEach(loc => {
    L.marker(loc.coords)
     .addTo(map)
     .bindPopup(`<b class="info-label">${loc.name}</b><br>${loc.desc}`)
     .on('mouseover', function (e) {
         this.openPopup();
     });
});