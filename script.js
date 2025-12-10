// Random background on load (desktop only)
const backgrounds = [
    'https://i.pinimg.com/originals/18/83/de/1883de5bfee36b043b973bef00c561e0.gif',
    'https://i.pinimg.com/1200x/36/19/09/36190987c6cd3c29ec4f1ac202decbf1.jpg',
    'https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/fbabc357-b945-4e72-8881-b94e68522174/Cozy+Home+Office?format=2500w',
    'http://i.imgur.com/MDYkP0A.gif',
    'https://i.pinimg.com/originals/d8/82/8d/d8828d2d6254273a617e6337d292303d.gif',
    'https://i.pinimg.com/originals/9f/42/2b/9f422b3823bc356e0e801f2504452c4c.gif',
    'https://i.pinimg.com/originals/a7/1c/ed/a71ced878e41e9296321504f39e1389f.gif',
    'https://i.pinimg.com/originals/1c/98/33/1c983310d3e6765916c63294e4b99de4.gif',
    'cozy-home-interior-anime-style.jpg',
    'wp11702872-cozy-lofi-wallpapers.jpg'
];

// Function to set background with error handling
function setBackground() {
    if (window.innerWidth > 768) {
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        document.body.style.backgroundImage = `url('${randomBg}')`;
    }
}

// Set background on load
setBackground();

// Handle window resize for responsive background
window.addEventListener('resize', () => {
    setBackground();
});

// Mobile uses the GIF set in HTML inline style

const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

let isPlaying = false;
let playTimeout = null;

// Play/Pause toggle with timeout and loading state
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.remove('playing', 'loading');
        if (playTimeout) clearTimeout(playTimeout);
        statusText.textContent = 'متوقف';
        statusDot.classList.add('offline');
        isPlaying = false;
    } else {
        playBtn.classList.add('loading');
        statusText.textContent = 'جاري الاتصال...';
        
        // 5 second timeout for connection attempt
        playTimeout = setTimeout(() => {
            if (isPlaying === false) {
                statusText.textContent = 'فشل الاتصال - حاول مرة أخرى';
                playBtn.classList.remove('loading');
                statusDot.classList.add('offline');
                audio.pause();
            }
        }, 5000);

        audio.play().then(() => {
            if (playTimeout) clearTimeout(playTimeout);
            playBtn.classList.remove('loading');
            playBtn.classList.add('playing');
            statusText.textContent = 'يعمل الآن';
            statusDot.classList.remove('offline');
            isPlaying = true;
        }).catch(err => {
            if (playTimeout) clearTimeout(playTimeout);
            playBtn.classList.remove('loading');
            statusText.textContent = 'خطأ - حاول مرة أخرى';
            statusDot.classList.add('offline');
            console.error('Playback error:', err);
        });
    }
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audio.volume = volume;
    updateVolumeIcon(volume);
});

// Volume icon click to mute/unmute with better styling
let previousVolume = 0.8;
volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = previousVolume;
        volumeSlider.value = previousVolume * 100;
    }
    updateVolumeIcon(audio.volume);
});

// Keyboard support - Space to play/pause
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        playBtn.click();
    }
});

function updateVolumeIcon(volume) {
    const svg = volumeIcon.querySelector('svg');
    if (!svg) return;
    
    let pathD = '';
    if (volume === 0) {
        pathD = 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z';
    } else if (volume < 0.5) {
        pathD = 'M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z';
    } else {
        pathD = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z';
    }
    
    const path = svg.querySelector('path');
    if (path) {
        path.setAttribute('d', pathD);
    }
}

// Set initial volume
audio.volume = 0.8;

// Audio events
audio.addEventListener('waiting', () => {
    statusText.textContent = 'جاري التحميل...';
});

audio.addEventListener('playing', () => {
    statusText.textContent = 'يعمل الآن';
});

audio.addEventListener('error', () => {
    statusText.textContent = 'خطأ في الاتصال';
    statusDot.classList.add('offline');
    playBtn.classList.remove('playing');
    isPlaying = false;
});
