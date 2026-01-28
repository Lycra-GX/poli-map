const buildingData = {
    "jka": {
        name: "Jabatan Kejuruteraan Awam (JKA)",
        desc: "The Civil Engineering department, located near the main entrance."
    },
    "library": {
        name: "Perpustakaan PUO",
        desc: "The central library providing digital resources and study spaces."
    }
};

document.querySelectorAll('.building').forEach(item => {
    item.addEventListener('click', e => {
        const id = e.target.id;
        const info = buildingData[id];

        document.getElementById('building-name').innerText = info.name;
        document.getElementById('building-description').innerText = info.desc;
        
        const panel = document.getElementById('info-panel');
        panel.classList.remove('hidden');
        panel.classList.add('active');
    });
});

function closePanel() {
    document.getElementById('info-panel').classList.remove('active');
}