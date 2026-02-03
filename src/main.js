import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

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