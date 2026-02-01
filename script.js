// REPLACE WITH YOUR ACTUAL MAPBOX ACCESS TOKEN
mapboxgl.accessToken = '';

// Center coordinates for PUO [Longitude, Latitude]
const puoCoords = [101.1215, 4.5884]; 

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: puoCoords, // starting position [lng, lat]
    zoom: 16 // starting zoom
});

// Add navigation controls (zoom in/out)
map.addControl(new mapboxgl.NavigationControl());

// Data for PUO Buildings (Coordinates converted to [Lng, Lat])
const locations = [
    {
        name: "JKA (Civil Engineering)",
        coords: [101.1218, 4.5891],
        desc: "Main building for Civil Engineering students."
    },
    {
        name: "JKE (Electrical Engineering)",
        coords: [101.12223048744252, 4.5865135045488925],
        desc: "Main building for Electrical Engineering students."
    },
    {
        name: "JTMK (Information Technology and Comunication)",
        coords: [101.1221099242751, 4.587174478314882],
        desc: "Main building for Information Technology and Communication students."
    },
    {
        name: "JKP (Marine Engineering)",
        coords: [101.1231604020463, 4.587192005780873],
        desc: "Main building for Marine Engineering students."
    },
    {
        name: "Library (Perpustakaan PUO)",
        coords: [101.1225, 4.5880],
        desc: "Learning resource center & e-library access."
    },
    {
        name: "Dewan Jubli Perak",
        coords: [101.12382611851136, 4.587551275310104],
        desc: "Main auditorium for events and ceremonies."
    },
    {
        name: "Cafe A (JKA Cafeteria)",
        coords: [101.12495330042234, 4.587925339876982],
        desc: "Cafeteria near Dewan Warisan."
    },
    {
        name: "Cafe B (JKE Cafeteria)",
        coords: [101.12275930567483, 4.586740727476954],
        desc: "Cafeteria near JKE building."
    },
    {
        name: "Cafe C (Campus B Cafeteria)",
        coords: [101.12257068194992, 4.590834756559952],
        desc: "Cafeteria near Campus B."
    },
    {
        name: "Pusat Islam PUO",
        coords: [101.1205, 4.5875],
        desc: "Main prayer hall and religious activity center."
    },
    {
        name: "Kamsis (Residential College)",
        coords: [101.1235, 4.5865],
        desc: "Student accommodation area."
    },
    {
        name: "Dewan Seri Kinta",
        coords: [101.12338420289376, 4.591193211938619],
        desc: "Main hall for events and activities."
    }
];

// Loop through locations and add markers
locations.forEach(loc => {
    // Create a popup
    const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<strong class="info-label">${loc.name}</strong><p>${loc.desc}</p>`);

    // Create marker and add to map
    const marker = new mapboxgl.Marker({ color: '#003366' })
        .setLngLat(loc.coords)
        .setPopup(popup) // sets mouse click popup
        .addTo(map);

    // Hover functionality (Optional: Mapbox popups usually trigger on click)
    const el = marker.getElement();
    el.addEventListener('mouseenter', () => marker.togglePopup());
    el.addEventListener('mouseleave', () => marker.togglePopup());
});