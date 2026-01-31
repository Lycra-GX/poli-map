import './style.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

let currentIndex = -1;
const markers = [];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // Cleaner look for campus maps
    center: [101.1215, 4.5884],
    zoom: 16
});

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
        desc: "Cafeteria near JKE building.",
        img: "image/cafe_jke/Cafe_JKE.jpg"
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

// Initialize Markers
locations.forEach((loc, index) => {
    const marker = new mapboxgl.Marker({ color: '#003366' })
        .setLngLat(loc.coords)
        .addTo(map);

    marker.getElement().addEventListener('click', () => showLocation(index));
    markers.push(marker);
});

function showLocation(index) {
    currentIndex = index;
    const loc = locations[index];

    // Update UI
    document.getElementById('panel-img').src = loc.img;
    document.getElementById('panel-title').innerText = loc.name;
    document.getElementById('panel-desc').innerText = loc.desc;
    document.getElementById('info-panel').style.display = 'block';

    // Highlight Marker (Red for current, Blue for others)
    markers.forEach((m, i) => {
        const path = m.getElement().querySelector('svg path');
        path.setAttribute('fill', i === index ? '#dc3545' : '#003366');
    });

    map.flyTo({ center: loc.coords, zoom: 17.5, duration: 1500 });
}

// Event Listeners (The Vite way)
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('info-panel').style.display = 'none';
    markers.forEach(m => m.getElement().querySelector('svg path').setAttribute('fill', '#003366'));
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % locations.length;
    showLocation(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + locations.length) % locations.length;
    showLocation(currentIndex);
});