<template>
  <div class="w-full h-screen bg-gray-100">
    <!-- Map Container -->
    <div id="map" class="w-full h-full"></div>

    <!-- Info Panel -->
    <div
      v-if="showPanel"
      class="absolute top-4 left-4 w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl z-[2000] overflow-hidden transition-all duration-300 border border-white/20"
    >
      <!-- Image Section -->
      <div class="relative group" v-if="currentLocation && currentLocation.img && currentLocation.img.length > 0">
        <!-- Close Button -->
        <div
          @click="closePanel"
          class="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-sm hover:bg-white z-10 transition-colors"
        >
          <i class="bi bi-x-lg text-slate-800 text-sm"></i>
        </div>

        <!-- Main Image -->
        <img
          :src="currentLocation.img[currentImageIndex]"
          @click="openModal"
          class="w-full h-48 object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
          alt="Campus"
        />

        <!-- Image Navigation Arrows -->
        <div class="absolute bottom-3 right-3 flex gap-2">
          <button
            @click="prevImage"
            class="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <i class="bi bi-chevron-left text-lg"></i>
          </button>
          <button
            @click="nextImage"
            class="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all"
          >
            <i class="bi bi-chevron-right text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Info Section -->
      <div class="p-5" v-if="currentLocation">
        <h5 class="text-xl font-extrabold text-slate-900 mb-2 leading-tight">
          {{ currentLocation.name }}
        </h5>
        <p class="text-slate-600 text-sm leading-relaxed">
          {{ currentLocation.desc }}
        </p>

        <button
          @click="openGoogleMaps"
          class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <i class="bi bi-geo-alt"></i> View in Google Maps
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="showModal"
      class="modal-overlay"
      @click="closeModal"
    >
      <span
        @click.stop="closeModal"
        class="modal-close"
      >
        <i class="bi bi-x-lg"></i>
      </span>
      <button
        @click.stop="prevImage"
        class="modal-nav-btn prev"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <img
        :src="currentLocation.img[currentImageIndex]"
        @click.stop
        class="modal-img-content"
        alt="Full size"
      />
      <button
        @click.stop="nextImage"
        class="modal-nav-btn next"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { locations } from './locations.js'
import './style.css'

// Set your Mapbox access token here
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

// Reactive state
const currentIndex = ref(-1)
const currentImageIndex = ref(0)
const showPanel = ref(false)
const showModal = ref(false)
const markerObjects = ref([])
let map

const currentLocation = computed(() => {
  return currentIndex.value >= 0 ? locations[currentIndex.value] : null
})

onMounted(() => {
  initializeMap()
})

function initializeMap() {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [101.1215, 4.5884],
    zoom: 16,
  })

  // Create markers for all locations
  locations.forEach((loc, index) => {
    const el = document.createElement('div')
    el.className = 'custom-marker group'

    el.innerHTML = `
      <div class="marker-pulse"></div>
      <div class="marker-label">${loc.name}</div>
      <div class="relative flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-xl transition-transform duration-300 group-hover:scale-125 group-hover:bg-blue-500">
        <i class="bi bi-geo-alt-fill text-white text-sm"></i>
      </div>
    `

    const marker = new mapboxgl.Marker(el).setLngLat(loc.coords).addTo(map)

    el.addEventListener('click', (e) => {
      e.stopPropagation()
      showLocation(index)
    })

    markerObjects.value.push({ marker, element: el })
  })
}

function showLocation(index) {
  currentIndex.value = index
  currentImageIndex.value = 0
  showPanel.value = true
  const loc = locations[index]
  map.flyTo({ center: loc.coords, zoom: 17.5 })
}

function closePanel() {
  showPanel.value = false
}

function nextImage(e) {
  if (e) e.stopPropagation()
  const loc = currentLocation.value
  if (loc && loc.img && loc.img.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % loc.img.length
  }
}

function prevImage(e) {
  if (e) e.stopPropagation()
  const loc = currentLocation.value
  if (loc && loc.img && loc.img.length > 0) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + loc.img.length) % loc.img.length
  }
}

function openModal(e) {
  if (e) e.stopPropagation()
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function openGoogleMaps() {
  if (currentLocation.value) {
    const { coords, name } = currentLocation.value
    const url = `https://www.google.com/maps/search/${encodeURIComponent(
      name,
    )}/@${coords[1]},${coords[0]},17z`
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.modal-overlay {
  display: flex;
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  align-items: center;
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 3001;
}

.modal-img-content {
  width: 95vw;
  height: 85vh;
  object-fit: contain;
  border-radius: 12px;
}

.modal-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 30px;
  z-index: 3001;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.modal-nav-btn:hover {
  opacity: 1;
}

.modal-nav-btn.prev {
  left: 30px;
}

.modal-nav-btn.next {
  right: 30px;
}
</style>
