import './style.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

let currentIndex = -1;
let currentImageIndex = 0;
const markers = [];

const map = new mapboxgl.Map({
    container: 'map',
    // CHANGE: Changed to 'streets-v12' to see roads and building details
    style: 'mapbox://styles/mapbox/streets-v12', 
    center: [101.1215, 4.5884],
    zoom: 16
});

// Data for PUO Buildings (Coordinates converted to [Lng, Lat])
const locations = [
    {
        name: "JKA (Civil Engineering)",
        coords: [101.1218, 4.5891],
        desc: "Main building for Civil Engineering students.",
        img: []
    },
    {
        name: "JKE (Electrical Engineering)",
        coords: [101.12223048744252, 4.5865135045488925],
        desc: "Main building for Electrical Engineering students.",
        img: []
    },
    {
        name: "JTMK (Information Technology and Comunication)",
        coords: [101.1221099242751, 4.587174478314882],
        desc: "Main building for Information Technology and Communication students.",
        img: []
    },
    {
        name: "JKP (Marine Engineering)",
        coords: [101.1231604020463, 4.587192005780873],
        desc: "Main building for Marine Engineering students.",
        img: []
    },
    {
        name: "Library (Perpustakaan PUO)",
        coords: [101.1225, 4.5880],
        desc: "Learning resource center & e-library access.",
        img: []
    },
    {
        name: "Dewan Jubli Perak",
        coords: [101.12382611851136, 4.587551275310104],
        desc: "Main auditorium for events and ceremonies.",
        img: []
    },
    {
        name: "Cafe A (JKA Cafeteria)",
        coords: [101.12495330042234, 4.587925339876982],
        desc: "Cafeteria near Dewan Warisan.",
        img: []
    },
    {
        name: "Cafe B (JKE Cafeteria)",
        coords: [101.12275930567483, 4.586740727476954],
        desc: "Cafeteria near JKE building.",
        img: ["image/cafe_jke/1.jpg", "image/cafe_jke/2.jpg"]
    },
    {
        name: "Cafe C (Campus B Cafeteria)",
        coords: [101.12257068194992, 4.590834756559952],
        desc: "Cafeteria near Campus B.",
        img: []
    },
    {
        name: "Pusat Islam PUO",
        coords: [101.1205, 4.5875],
        desc: "Main prayer hall and religious activity center.",
        img: []
    },
    {
        name: "Kamsis (Residential College)",
        coords: [101.1235, 4.5865],
        desc: "Student accommodation area.",
        img: []
    },
    {
        name: "Dewan Seri Kinta",
        coords: [101.12338420289376, 4.591193211938619],
        desc: "Main hall for events and activities.",
        img: []
    }
];

// Clear the markers array first to be safe
const markerObjects = []; 

locations.forEach((loc, index) => {
    // Create a unique HTML element for each marker
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
        <div class="marker-name">${loc.name}</div>
        <div class="marker-pin"></div>
    `;

    // Create the marker and add it to the map
    const marker = new mapboxgl.Marker(el)
        .setLngLat(loc.coords)
        .addTo(map);

    // Add click event specifically to THIS marker's element
    el.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the map from handling the click
        showLocation(index);
    });

    // Save it so we can change colors later
    markerObjects.push({ marker, element: el });
});

function updatePanelImage() {
    const loc = locations[currentIndex];
    const imgElement = document.getElementById('panel-img');
    const modalImg = document.getElementById('modal-img-content');
    
    // Safety check for images
    if (loc.img && loc.img.length > 0) {
        const path = loc.img[currentImageIndex];
        imgElement.src = path;
        modalImg.src = path;
        imgElement.style.display = 'block';
    } else {
        imgElement.style.display = 'none';
    }
}

function showLocation(index) {
    currentIndex = index;
    currentImageIndex = 0; 
    const loc = locations[index];

    document.getElementById('panel-title').innerText = loc.name;
    document.getElementById('panel-desc').innerText = loc.desc;
    updatePanelImage();
    
    document.getElementById('info-panel').style.display = 'block';

    // Highlight active marker logic
    markerObjects.forEach((obj, i) => {
        const pin = obj.element.querySelector('.marker-pin');
        pin.style.backgroundColor = i === index ? '#dc3545' : '#003366';
    });

    map.flyTo({ center: loc.coords, zoom: 17.5 });
}

// ARROW LOGIC (Image switching only)
const nextImg = (e) => {
    e.stopPropagation();
    const loc = locations[currentIndex];
    if (loc.img && loc.img.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % loc.img.length;
        updatePanelImage();
    }
};

const prevImg = (e) => {
    e.stopPropagation();
    const loc = locations[currentIndex];
    if (loc.img && loc.img.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + loc.img.length) % loc.img.length;
        updatePanelImage();
    }
};

document.getElementById('nextBtn').addEventListener('click', nextImg);
document.getElementById('prevBtn').addEventListener('click', prevImg);
document.getElementById('modalNext').addEventListener('click', nextImg);
document.getElementById('modalPrev').addEventListener('click', prevImg);

document.getElementById('panel-img').addEventListener('click', () => {
    if (locations[currentIndex].img?.length > 0) {
        document.getElementById('image-modal').style.display = 'flex';
    }
});

document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('image-modal').style.display = 'none';
});

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('info-panel').style.display = 'none';
    markerObjects.forEach(obj => obj.element.querySelector('.marker-pin').style.backgroundColor = '#003366');
});