import './style.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { locations } from './locations.js'; // Ensure the { } are there

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

let currentIndex = -1;
let currentImageIndex = 0;
const markerObjects = []; // We use this to track all markers

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', 
    center: [101.1215, 4.5884],
    zoom: 16
});

// Create markers
locations.forEach((loc, index) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
        <div class="marker-name">${loc.name}</div>
        <div class="marker-pin"></div>
    `;

    const marker = new mapboxgl.Marker(el)
        .setLngLat(loc.coords)
        .addTo(map);

    el.addEventListener('click', (e) => {
        e.stopPropagation();
        showLocation(index);
    });

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

// Update this function to fix the color-changing bug
function showLocation(index) {
    currentIndex = index;
    currentImageIndex = 0;
    const loc = locations[index];

    document.getElementById('panel-title').innerText = loc.name;
    document.getElementById('panel-desc').innerText = loc.desc;
    
    updatePanelImage(); // Make sure this function exists in your script
    document.getElementById('info-panel').style.display = 'block';

    // FIX: Correctly highlight the selected pin
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