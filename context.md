# 📻 إذاعة القرآن الكريم - Comprehensive Project Context

> **Purpose:** This document provides complete context for AI models to understand and work with this project seamlessly.

---

## 📋 Quick Reference

| Property | Value |
|----------|-------|
| **Project Name** | إذاعة القرآن الكريم (Quran Radio) |
| **Type** | Web-based Audio Streaming Player |
| **Language** | Arabic (RTL - Right-to-Left) |
| **Framework** | Vanilla HTML/CSS/JavaScript (No frameworks) |
| **Audio Source** | RadioJar Stream |
| **Stream URL** | `https://stream.radiojar.com/8s5u5tpdtwzuv` |

---

## 🗂️ Project Structure

```
fm/
├── index.html          # Main HTML - UI structure (~165 lines)
├── script.js           # JavaScript - All logic & interactivity (~466 lines)
├── styles.css          # CSS - Styling & responsive design (~775 lines)
├── context.md          # This documentation file
├── cozy-home-interior-anime-style.jpg    # Local background option
├── wp11702872-cozy-lofi-wallpapers.jpg   # Local background option
└── .git/               # Git repository
```

---

## 🔧 Technology Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure, semantic elements, audio element |
| CSS3 | Flexbox, animations, backdrop-filter, custom properties |
| Vanilla JavaScript | ES6+, async/await, DOM manipulation |
| Google Fonts | Amiri (Arabic serif), Cairo (Arabic sans-serif) |
| CounterAPI.dev | Global play counter synchronization |
| localStorage | Listening time, fallback counter |

---

## 📄 DETAILED FILE DOCUMENTATION

### 1. index.html

**Purpose:** Defines the complete UI structure.

#### HTML Root Attributes
```html
<html lang="ar" dir="rtl">  <!-- Arabic language, Right-to-Left direction -->
```

#### Complete DOM Hierarchy
```
<body>
├── <div class="container">
│   ├── <div class="player-card">
│   │   ├── <div class="logo">
│   │   │   ├── <h1>إذاعة القرآن الكريم</h1>
│   │   │   └── <span>بث مباشر</span>
│   │   │
│   │   ├── <div class="status">
│   │   │   └── <div class="status-indicator">
│   │   │       ├── <span class="status-dot" id="statusDot">
│   │   │       └── <span id="statusText">
│   │   │
│   │   ├── <div class="controls">
│   │   │   └── <button class="play-btn" id="playBtn">
│   │   │       ├── <svg class="play-icon">  (▶ icon)
│   │   │       └── <svg class="pause-icon"> (❚❚ icon)
│   │   │
│   │   ├── <div class="volume-control">
│   │   │   ├── <button class="volume-icon" id="volumeIcon">
│   │   │   └── <input type="range" class="volume-slider" id="volumeSlider">
│   │   │
│   │   ├── <div class="listening-time">
│   │   │   ├── <svg> (clock icon)
│   │   │   ├── Text: "وقت الاستماع الخاص بك:"
│   │   │   ├── <span id="listeningTime">
│   │   │   └── <span class="info-tooltip">
│   │   │       ├── "?"
│   │   │       └── <span class="tooltip-text"> (cache warning)
│   │   │
│   │   ├── <button class="set-timer-btn" id="setTimerBtn">
│   │   │   ├── <svg> (alarm clock icon)
│   │   │   ├── Text: "اضبط المؤقت"
│   │   │   └── <span class="timer-badge" id="sleepTimerDisplay">
│   │   │
│   │   └── <div class="timer-modal" id="timerModal">
│   │       └── <div class="timer-modal-content">
│   │           ├── <div class="timer-modal-header">
│   │           │   ├── <h3>مؤقت النوم</h3>
│   │           │   └── <button id="closeModalBtn">×</button>
│   │           └── <div class="timer-modal-body">
│   │               ├── <select id="sleepTimerSelect">
│   │               └── <div id="customTimerContainer">
│   │                   ├── <input id="customTimerInput">
│   │                   └── <button id="setCustomTimer">
│   │
│   └── <a class="suggestions-btn"> (Google Form link)
│
├── <div class="play-counter"> (fixed bottom-left)
│   ├── <svg> (play icon)
│   ├── Text: "مرات التشغيل:"
│   └── <span id="playCount">
│
└── <audio id="audioPlayer" preload="none">
    └── <source src="https://stream.radiojar.com/8s5u5tpdtwzuv">
```

#### All Element IDs (Complete Reference)

| ID | Element | Purpose |
|----|---------|---------|
| `playBtn` | `<button>` | Play/pause toggle button |
| `volumeIcon` | `<button>` | Mute/unmute toggle |
| `volumeSlider` | `<input>` | Volume range slider (0-100) |
| `statusDot` | `<span>` | Connection status indicator |
| `statusText` | `<span>` | Status message display |
| `audioPlayer` | `<audio>` | Hidden audio element |
| `listeningTime` | `<span>` | Listening time display |
| `playCount` | `<span>` | Global play counter display |
| `setTimerBtn` | `<button>` | Opens timer modal |
| `timerModal` | `<div>` | Timer modal container |
| `closeModalBtn` | `<button>` | Closes timer modal |
| `sleepTimerDisplay` | `<span>` | Countdown display on button |
| `sleepTimerSelect` | `<select>` | Timer preset dropdown |
| `customTimerContainer` | `<div>` | Custom input wrapper |
| `customTimerInput` | `<input>` | Custom minutes input |
| `setCustomTimer` | `<button>` | Sets custom timer |

---

### 2. script.js (Complete Reference)

**Purpose:** All interactivity, audio control, timers, and API communication.

#### Global Variables Reference

```javascript
// DOM Elements
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const volumeSlider = document.getElementById("volumeSlider");
const volumeIcon = document.getElementById("volumeIcon");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const playCountElement = document.getElementById("playCount");
const listeningTimeElement = document.getElementById("listeningTime");

// Timer Modal Elements
const timerModal = document.getElementById('timerModal');
const setTimerBtn = document.getElementById('setTimerBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const sleepTimerDisplay = document.getElementById('sleepTimerDisplay');
const sleepTimerSelect = document.getElementById('sleepTimerSelect');
const customTimerInput = document.getElementById('customTimerInput');
const customTimerContainer = document.getElementById('customTimerContainer');
const setCustomTimerBtn = document.getElementById('setCustomTimer');

// State Variables
let isPlaying = false;                    // Current playback state
let playTimeout = null;                   // Connection timeout reference
let wasPlayingBeforeOffline = false;      // For auto-reconnect
let previousVolume = 0.8;                 // For mute/unmute restore
let listeningStartTime = null;            // Session start timestamp
let totalListeningSeconds = 0;            // Total from localStorage
let sleepTimer = null;                    // Sleep timer timeout reference
let sleepTimerEndTime = null;             // Sleep timer end timestamp

// API Configuration
const COUNTER_NAMESPACE = "quran-radio-fm-esmaill";
const COUNTER_KEY = "plays";
```

#### Core Functions

| Function | Purpose | Parameters | Returns |
|----------|---------|------------|---------|
| `setBackground()` | Sets random background on desktop (>768px) | None | void |
| `attemptPlay(incrementCounter)` | Attempts to play audio with 5s timeout | `incrementCounter`: boolean (default true) | void |
| `fetchPlayCount()` | Fetches global play count from CounterAPI | None | Promise<void> |
| `incrementPlayCount()` | Increments global play count | None | Promise<void> |
| `updateListeningTimeDisplay()` | Updates listening time text | None | void |
| `updateVolumeIcon(volume)` | Updates volume icon based on level | `volume`: 0-1 | void |
| `updateSleepTimerDisplay()` | Updates countdown on timer button | None | void |
| `startSleepTimer(minutes)` | Starts sleep timer with fade-out | `minutes`: number | void |

#### Event Listeners Reference

| Event | Target | Action |
|-------|--------|--------|
| `click` | `playBtn` | Toggle play/pause |
| `click` | `volumeIcon` | Toggle mute/unmute |
| `input` | `volumeSlider` | Adjust volume |
| `keydown` (Space) | `document` | Toggle play/pause |
| `click` | `setTimerBtn` | Open timer modal |
| `click` | `closeModalBtn` | Close timer modal |
| `click` | `timerModal` | Close if clicked outside |
| `change` | `sleepTimerSelect` | Set timer or show custom input |
| `click` | `setCustomTimerBtn` | Set custom timer |
| `keypress` (Enter) | `customTimerInput` | Trigger set custom timer |
| `online` | `window` | Auto-reconnect |
| `offline` | `window` | Mark was playing |
| `beforeunload` | `window` | Save listening time |
| `waiting` | `audio` | Show loading status |
| `playing` | `audio` | Start listening time tracking |
| `pause` | `audio` | Save listening time |
| `error` | `audio` | Handle errors, auto-retry |
| `stalled` | `audio` | Auto-retry connection |
| `ended` | `audio` | Auto-retry (stream shouldn't end) |

#### State Machine: Play Button

```
┌─────────────────────────────────────────────────────────────┐
│                        IDLE STATE                           │
│  Classes: (none)                                            │
│  Status: "جاهز للتشغيل"                                     │
│  statusDot: (no .offline)                                   │
└─────────────────────────────────────────────────────────────┘
              │ click
              ▼
┌─────────────────────────────────────────────────────────────┐
│                      LOADING STATE                          │
│  Classes: .loading (pulsing animation)                      │
│  Status: "جاري الاتصال..."                                  │
│  5-second timeout active                                    │
└─────────────────────────────────────────────────────────────┘
              │ success              │ timeout/error
              ▼                      ▼
┌──────────────────────┐   ┌──────────────────────────────────┐
│    PLAYING STATE     │   │         ERROR STATE              │
│  Classes: .playing   │   │  Classes: (none)                 │
│  Status: "يعمل الآن" │   │  Status: "فشل الاتصال..."        │
│  statusDot: active   │   │  statusDot: .offline (gray)      │
└──────────────────────┘   └──────────────────────────────────┘
              │ click
              ▼
┌─────────────────────────────────────────────────────────────┐
│                       PAUSED STATE                          │
│  Classes: (none)                                            │
│  Status: "متوقف"                                            │
│  statusDot: .offline                                        │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. styles.css (Complete Reference)

#### CSS Class Reference

##### Container & Layout
| Class | Purpose |
|-------|---------|
| `.container` | Main wrapper, max-width: 320px, centered |
| `.player-card` | Glassmorphism card with blur effect |
| `.logo` | Title section with gradient text |
| `.status` | Status indicator wrapper |
| `.controls` | Play button container |
| `.volume-control` | Volume slider section |
| `.listening-time` | Time tracker display |

##### Play Button States
| Class | Applied When | Visual Effect |
|-------|--------------|---------------|
| (none) | Idle | Default orange gradient |
| `.loading` | Connecting | Pulsing animation |
| `.playing` | Playing | Shows pause icon |

##### Status Dot States
| Class | Applied When | Visual Effect |
|-------|--------------|---------------|
| (none) | Connected | Gold, pulsing animation |
| `.offline` | Disconnected/Error | Gray, no animation |

##### Timer Components
| Class | Purpose |
|-------|---------|
| `.set-timer-btn` | "اضبط المؤقت" button |
| `.timer-badge` | Countdown display inside button |
| `.timer-modal` | Full-screen modal backdrop |
| `.timer-modal-content` | Modal dialog box |
| `.timer-modal-header` | Modal title & close button |
| `.timer-modal-body` | Modal form content |

##### Other Components
| Class | Purpose |
|-------|---------|
| `.play-counter` | Fixed bottom-left counter |
| `.suggestions-btn` | Feedback link button |
| `.info-tooltip` | Hover tooltip container |
| `.tooltip-text` | Tooltip content |

#### Color Palette Reference

```css
/* Primary Colors */
Gold Primary: #ffb347
Gold Secondary: #ff8c42
Gold Light: #ffcc80
Gold Text: rgba(255, 215, 0, 0.8)

/* Background Colors */
Background Dark: rgba(20, 15, 10, 0.8)
Overlay: rgba(0, 0, 0, 0.4)
Modal Background: rgba(20, 15, 10, 0.95)

/* Text Colors */
Text Primary: rgba(255, 220, 180, 0.9)
Text Secondary: rgba(255, 220, 180, 0.6)
Text Muted: rgba(255, 255, 255, 0.5)

/* Border Colors */
Border Light: rgba(255, 180, 120, 0.1)
Border Medium: rgba(255, 180, 120, 0.3)
```

#### Animations

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

#### Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|------------|--------|-------------|
| `> 768px` | Desktop | Random backgrounds, smaller touch targets |
| `≤ 768px` | Tablet/Mobile | Larger buttons, lighter overlay |
| `≤ 400px` | Small phones | Reduced padding, smaller fonts |

---

## 🔌 External APIs

### 1. RadioJar Audio Stream
```
URL: https://stream.radiojar.com/8s5u5tpdtwzuv
Type: MPEG/MP3 live stream
```

### 2. CounterAPI.dev
```javascript
// Fetch current count
GET https://api.counterapi.dev/v1/quran-radio-fm-esmaill/plays

// Increment count
GET https://api.counterapi.dev/v1/quran-radio-fm-esmaill/plays/up

// Response format: { "count": 12345 }
```

### 3. Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 💾 localStorage Keys

| Key | Type | Purpose | Example Value |
|-----|------|---------|---------------|
| `totalListeningTime` | number (string) | Total seconds listened | `"3600"` |
| `radioPlayCount` | number (string) | Fallback play counter | `"150"` |

---

## 🔄 Feature Workflows

### Play Audio Flow
```
1. User clicks playBtn
2. attemptPlay() called
3. Add .loading class, set status "جاري الاتصال..."
4. Start 5-second timeout
5. Call audio.play()
   ├── Success: Remove .loading, add .playing, increment counter
   └── Failure: Remove .loading, show error, add .offline to statusDot
```

### Sleep Timer Flow
```
1. User clicks "اضبط المؤقت" button
2. Modal opens (display: flex)
3. User selects preset OR enters custom minutes
4. startSleepTimer(minutes) called
5. Modal closes, countdown starts on button
6. When timer ends:
   a. Fade out volume over 2 seconds
   b. Pause audio
   c. Restore original volume
   d. Show "متوقف - انتهى مؤقت النوم"
```

### Auto-Reconnect Flow
```
1. Stream error or connection lost
2. wasPlayingBeforeOffline = true
3. Wait 2-3 seconds
4. audio.load() to reset stream
5. attemptPlay(false) - don't increment counter
```

### Listening Time Tracking
```
1. Audio starts playing → listeningStartTime = Date.now()
2. Every 1 second → Update display with current session + stored total
3. Audio pauses → Calculate session, add to total, save to localStorage
4. Page unload → Save current session to localStorage
```

---

## 📝 Complete Arabic Text Reference

| Key | Arabic | English | Usage |
|-----|--------|---------|-------|
| title | إذاعة القرآن الكريم | Holy Quran Radio | Logo |
| subtitle | بث مباشر | Live Broadcast | Under logo |
| ready | جاهز للتشغيل | Ready to Play | Initial status |
| connecting | جاري الاتصال... | Connecting... | Loading state |
| loading | جاري التحميل... | Loading... | Buffering |
| playing | يعمل الآن | Now Playing | Active playback |
| stopped | متوقف | Stopped | Paused state |
| error | خطأ - حاول مرة أخرى | Error - Try Again | General error |
| connectionFailed | فشل الاتصال - حاول مرة أخرى | Connection Failed | Timeout |
| connectionError | خطأ في الاتصال | Connection Error | Stream error |
| reconnecting | جاري إعادة الاتصال... | Reconnecting... | Auto-retry |
| disconnected | انقطع الاتصال... | Disconnected | Offline |
| sleepTimerEnded | متوقف - انتهى مؤقت النوم | Stopped - Sleep Timer Ended | Timer complete |
| setTimer | اضبط المؤقت | Set Timer | Timer button |
| sleepTimer | مؤقت النوم | Sleep Timer | Modal title |
| stopTimer | إيقاف المؤقت | Stop Timer | First option |
| custom | مخصص | Custom | Custom option |
| set | تعيين | Set | Confirm button |
| minutes | دقيقة/دقائق | Minute(s) | Time display |
| seconds | ثانية | Second(s) | Time display |
| hour | ساعة | Hour | Time display |
| hours | ساعتان | Two Hours | Time display |
| hourAndHalf | ساعة ونصف | Hour and Half | Preset option |
| listeningTime | وقت الاستماع الخاص بك | Your Listening Time | Time tracker |
| playCount | مرات التشغيل | Play Count | Counter label |
| suggestion | لديك اقتراح؟ | Have a Suggestion? | Feedback link |
| cacheWarning | البيانات محفوظة في متصفحك... | Data saved in browser... | Tooltip |
| enterNumber | أدخل رقماً بين 1 و 999 | Enter number between 1-999 | Validation |

---

## 🛠️ Common Modifications Guide

### To Change Audio Stream
```html
<!-- In index.html, update the source: -->
<source src="YOUR_NEW_STREAM_URL" type="audio/mpeg" />
```

### To Add New Timer Preset
```html
<!-- In index.html, add option to sleepTimerSelect: -->
<option value="180">3 ساعات</option>
```

### To Change Counter Namespace
```javascript
// In script.js, update:
const COUNTER_NAMESPACE = "your-new-namespace";
```

### To Modify Colors
```css
/* In styles.css, search and replace color values */
/* Primary gold: #ffb347 */
/* Secondary gold: #ff8c42 */
/* Background: rgba(20, 15, 10, X) */
```

### To Add New Status Message
```javascript
// In script.js, set statusText:
statusText.textContent = "رسالتك الجديدة";
// Optionally toggle statusDot:
statusDot.classList.add("offline");    // Gray
statusDot.classList.remove("offline"); // Gold pulsing
```

### To Add New Background Image
```javascript
// In script.js, add to backgrounds array:
const backgrounds = [
  // ... existing backgrounds
  "your-new-image.jpg",  // local file
  "https://example.com/image.gif",  // external URL
];
```

---

## ✅ Implemented Features

- [x] Live audio streaming from RadioJar
- [x] Play/Pause with visual feedback
- [x] Volume control with mute toggle
- [x] Dynamic volume icon (muted/low/high)
- [x] Connection timeout (5 seconds)
- [x] Loading state animation
- [x] Status indicators (dot + text)
- [x] Global play counter (CounterAPI + localStorage fallback)
- [x] Personal listening time tracker
- [x] Sleep timer with presets (15/30/45/60/90/120 min)
- [x] Custom sleep timer duration (1-999 min)
- [x] Sleep timer modal UI
- [x] Smooth fade-out when timer ends
- [x] Auto-reconnect on connection restore
- [x] Auto-retry on stream errors
- [x] Keyboard support (spacebar)
- [x] Random desktop backgrounds (10 options)
- [x] Mobile-specific background
- [x] Responsive design (3 breakpoints)
- [x] RTL (Right-to-Left) Arabic support
- [x] Glassmorphism design
- [x] Info tooltip for cache warning
- [x] Suggestions/feedback button

---

## 🚧 Potential Future Enhancements

- [ ] Multiple station selector (different Quran reciters)
- [ ] Service worker for offline capability
- [ ] Share functionality
- [ ] Persistent volume preference
- [ ] PWA manifest for installability
- [ ] Audio visualizer
- [ ] Dark/Light theme toggle
- [ ] Notification when timer ends
- [ ] History of listening sessions

---

_Last Updated: January 4, 2026_
_Total Lines: ~1400+ across all files_
| Connection Failed | فشل الاتصال - حاول مرة أخرى | Connection Failed - Try Again |
| Connection Error  | خطأ في الاتصال              | Connection Error              |

---

## 🚀 Implemented Features

### ✅ Completed

- [x] Global play counter (CounterAPI.dev + localStorage fallback)
- [x] Personal listening time tracker with localStorage
- [x] Sleep timer with modal UI (presets + custom duration)
- [x] Smooth fade-out when sleep timer ends
- [x] Auto-reconnect on connection restore
- [x] Suggestions button (Google Form link)
- [x] Info tooltip for cache warning
- [x] Keyboard support (spacebar for play/pause)
- [x] Responsive design (desktop, tablet, mobile)

### 💡 Potential Improvements

- [ ] Add station selector for multiple Quran reciters
- [ ] Implement service worker for offline capability
- [ ] Add share functionality
- [ ] Persistent volume preference (localStorage)
- [ ] Host background images locally or use CDN
- [ ] Add ARIA live regions for accessibility
- [ ] Screen reader announcements for state changes

---

## 📊 Summary Statistics

| Metric                | Value                                       |
| --------------------- | ------------------------------------------- |
| Total Files           | 6 (3 code + 2 images + 1 docs)              |
| HTML Lines            | ~165                                        |
| JavaScript Lines      | ~420                                        |
| CSS Lines             | ~775                                        |
| External Dependencies | 4 (Google Fonts, RadioJar, CounterAPI, External Images) |
| Breakpoints           | 3 (default, 768px, 400px)                   |
| Animations            | 2 (pulse, slideUp)                          |
| Background Options    | 10                                          |

---

## 🔑 Key localStorage Keys

| Key                 | Purpose                        |
| ------------------- | ------------------------------ |
| `totalListeningTime`| Total seconds listened         |
| `radioPlayCount`    | Fallback counter if API fails  |

---

## 🌐 External APIs

| Service       | Endpoint                                              | Purpose           |
| ------------- | ----------------------------------------------------- | ----------------- |
| RadioJar      | `stream.radiojar.com/8s5u5tpdtwzuv`                   | Audio stream      |
| Google Fonts  | `fonts.googleapis.com`                                | Amiri & Cairo     |
| CounterAPI    | `counterapi.dev/api/quran-radio-fm-esmaill/fm-plays/` | Global play count |

---

_Last Updated: January 4, 2026_
