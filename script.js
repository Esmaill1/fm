// Random background on load
const backgrounds = [
    'https://i.pinimg.com/originals/18/83/de/1883de5bfee36b043b973bef00c561e0.gif',
    'https://i.pinimg.com/1200x/36/19/09/36190987c6cd3c29ec4f1ac202decbf1.jpg',
    'https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/fbabc357-b945-4e72-8881-b94e68522174/Cozy+Home+Office?format=2500w',
    'https://storage.ko-fi.com/cdn/useruploads/display/f9d344fe-3715-41b8-8996-6d844cac422b_scrivaniapreview.gif',
    'http://i.imgur.com/MDYkP0A.gif',
    'cozy-home-interior-anime-style.jpg',
    'wp11702872-cozy-lofi-wallpapers.jpg'
];
const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.body.style.backgroundImage = `url('${randomBg}')`;

const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

let isPlaying = false;

// Play/Pause toggle
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.remove('playing');
        statusText.textContent = 'متوقف';
        statusDot.classList.add('offline');
        isPlaying = false;
    } else {
        statusText.textContent = 'جاري الاتصال...';
        audio.play().then(() => {
            playBtn.classList.add('playing');
            statusText.textContent = 'يعمل الآن';
            statusDot.classList.remove('offline');
            isPlaying = true;
        }).catch(err => {
            statusText.textContent = 'خطأ - حاول مرة أخرى';
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

// Volume icon click to mute/unmute
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

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
    } else if (volume < 0.5) {
        volumeIcon.innerHTML = '<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>';
    } else {
        volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
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
