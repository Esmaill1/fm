# 📻 إذاعة القرآن الكريم - Project Context

## 📋 Project Overview

**Name:** إذاعة القرآن الكريم (Quran Radio)  
**Type:** Web-based Audio Streaming Player  
**Language:** Arabic (RTL - Right-to-Left)  
**Purpose:** Live streaming of Quran recitation radio

---

## 🗂️ File Structure

```
fm/
├── index.html                              # Main HTML entry point
├── script.js                               # JavaScript logic & interactivity
├── styles.css                              # Styling & responsive design
├── cozy-home-interior-anime-style.jpg      # Local background image
├── wp11702872-cozy-lofi-wallpapers.jpg     # Local background image
└── .git/                                   # Git repository
```

---

## 📄 File Analysis

### 1. `index.html`

**Purpose:** Main HTML structure for the radio player interface.

#### Key Elements:

| Element                      | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| `<html lang="ar" dir="rtl">` | Arabic language with Right-to-Left direction                          |
| Google Fonts                 | Uses **Amiri** (Arabic serif) and **Cairo** (Arabic sans-serif) fonts |
| Background                   | Animated GIF from alphacoders.com                                     |
| Audio Source                 | RadioJar stream: `https://stream.radiojar.com/8s5u5tpdtwzuv`          |

#### DOM Structure:

```
body
└── .container
    └── .player-card
        ├── .logo (h1 + span)
        ├── .status (.status-indicator)
        ├── .controls (.play-btn with SVG icons)
        └── .volume-control (button + range slider)
└── <audio> (hidden audio player)
```

#### IDs Used:

- `playBtn` - Play/Pause button
- `volumeIcon` - Volume mute/unmute button
- `volumeSlider` - Volume range input
- `statusDot` - Connection status indicator
- `statusText` - Status message text
- `audioPlayer` - Hidden audio element

---

### 2. `script.js`

**Purpose:** Handles all interactivity, audio control, and dynamic features.

#### Features Breakdown:

##### 🎨 Random Background System

```javascript
const backgrounds = [
  // 8 external URLs (GIFs and JPGs)
  // 2 local files
];
```

- **10 total background options** (8 external + 2 local)
- Only applies to desktop (window width > 768px)
- Mobile uses the inline GIF from HTML
- Re-randomizes on window resize

##### ▶️ Play/Pause Logic

| State        | Visual           | Status Text                 |
| ------------ | ---------------- | --------------------------- |
| Ready        | Default          | جاهز للتشغيل                |
| Connecting   | `.loading` class | جاري الاتصال...             |
| Playing      | `.playing` class | يعمل الآن                   |
| Paused       | Default          | متوقف                       |
| Error        | `.offline` dot   | خطأ - حاول مرة أخرى         |
| Timeout (5s) | `.offline` dot   | فشل الاتصال - حاول مرة أخرى |

##### 🔊 Volume Control

- **Default volume:** 80% (0.8)
- **Mute toggle:** Click volume icon to mute/unmute
- **Previous volume memory:** Restores last volume after unmute
- **Dynamic icon:** Changes based on volume level:
  - `volume = 0`: Muted icon
  - `volume < 0.5`: Low volume icon
  - `volume >= 0.5`: Full volume icon

##### ⌨️ Keyboard Support

- **Spacebar:** Play/Pause toggle (when body is focused)

##### 📡 Audio Events Handled:

| Event     | Action                          |
| --------- | ------------------------------- |
| `waiting` | Shows "جاري التحميل..."         |
| `playing` | Shows "يعمل الآن"               |
| `error`   | Shows error, sets offline state |

---

### 3. `styles.css`

**Purpose:** Complete styling with responsive design and animations.

#### Design System:

##### 🎨 Color Palette

| Color           | Usage              | Hex/Value               |
| --------------- | ------------------ | ----------------------- |
| Primary Gold    | Buttons, gradients | `#ffb347`               |
| Secondary Gold  | Gradients          | `#ff8c42`               |
| Text Gold Light | Text, indicators   | `#ffcc80`               |
| Background Dark | Card background    | `rgba(20, 15, 10, 0.8)` |
| Overlay         | Body overlay       | `rgba(0, 0, 0, 0.4)`    |

##### 🔤 Typography

| Font  | Usage      | Weight   |
| ----- | ---------- | -------- |
| Amiri | Logo/Title | 400, 700 |
| Cairo | Body text  | 300-700  |

##### 🎬 Animations

```css
@keyframes pulse    /* Status dot & loading state */
@keyframes spin; /* Defined but not used */
```

##### 📱 Responsive Breakpoints

| Breakpoint | Changes                                        |
| ---------- | ---------------------------------------------- |
| `> 768px`  | Desktop - full styling, darker overlay         |
| `≤ 768px`  | Mobile - larger touch targets, lighter overlay |
| `≤ 400px`  | Small phones - reduced padding, smaller fonts  |

##### 🧩 CSS Features Used:

- CSS Custom Properties (via gradients)
- Flexbox layout
- Backdrop filter (blur effect)
- CSS Grid (implicit)
- Custom range slider styling (webkit & moz)
- SVG fill manipulation
- Transform animations
- Box shadows

---

## 🔌 External Dependencies

### APIs & Services

| Service      | URL                                 | Purpose             |
| ------------ | ----------------------------------- | ------------------- |
| RadioJar     | `stream.radiojar.com/8s5u5tpdtwzuv` | Audio stream        |
| Google Fonts | `fonts.googleapis.com`              | Amiri & Cairo fonts |

### External Images (Backgrounds)

1. `i.pinimg.com` - Multiple Pinterest images
2. `images.squarespace-cdn.com` - Squarespace hosted image
3. `i.imgur.com` - Imgur hosted GIF
4. `giffiles.alphacoders.com` - Default mobile GIF

---

## 🔧 Technical Specifications

### Audio

- **Format:** MPEG (MP3)
- **Preload:** None (on-demand loading)
- **Timeout:** 5 seconds for connection attempt

### Browser Compatibility

- Modern browsers with:
  - ES6+ JavaScript
  - CSS Backdrop Filter
  - HTML5 Audio API
  - CSS Custom Properties

### Performance Considerations

- `preload="none"` - No audio preloading (saves bandwidth)
- `backdrop-filter: blur(20px)` - May impact mobile performance
- External image loading - Depends on third-party availability

---

## 🎯 User Interface States

### Play Button States

```
┌─────────────┬──────────────────┬───────────────┐
│   State     │   CSS Class      │   Icon        │
├─────────────┼──────────────────┼───────────────┤
│ Idle        │ (none)           │ Play (▶)      │
│ Loading     │ .loading         │ Play (▶) pulsing│
│ Playing     │ .playing         │ Pause (❚❚)    │
└─────────────┴──────────────────┴───────────────┘
```

### Status Dot States

```
┌─────────────┬──────────────────┬───────────────┐
│   State     │   CSS Class      │   Appearance  │
├─────────────┼──────────────────┼───────────────┤
│ Online      │ (none)           │ Gold, pulsing │
│ Offline     │ .offline         │ Gray, static  │
└─────────────┴──────────────────┴───────────────┘
```

---

## 📝 Arabic Text Reference

| Key               | Arabic                      | English                       |
| ----------------- | --------------------------- | ----------------------------- |
| Title             | إذاعة القرآن الكريم         | Holy Quran Radio              |
| Subtitle          | بث مباشر                    | Live Broadcast                |
| Ready             | جاهز للتشغيل                | Ready to Play                 |
| Connecting        | جاري الاتصال...             | Connecting...                 |
| Loading           | جاري التحميل...             | Loading...                    |
| Playing           | يعمل الآن                   | Now Playing                   |
| Stopped           | متوقف                       | Stopped                       |
| Error             | خطأ - حاول مرة أخرى         | Error - Try Again             |
| Connection Failed | فشل الاتصال - حاول مرة أخرى | Connection Failed - Try Again |
| Connection Error  | خطأ في الاتصال              | Connection Error              |

---

## 🚀 Potential Improvements

### Functionality

- [ ] Add station selector for multiple Quran reciters
- [ ] Implement service worker for offline capability
- [ ] Add share functionality
- [ ] Sleep timer feature
- [ ] Persistent volume preference (localStorage)

### Performance

- [ ] Host background images locally or use CDN
- [ ] Add loading placeholder for images
- [ ] Implement lazy loading for backgrounds

### Accessibility

- [ ] Add ARIA live regions for status updates
- [ ] Improve keyboard navigation
- [ ] Add skip links
- [ ] Screen reader announcements for state changes

### Code Quality

- [ ] Add error boundaries
- [ ] Implement retry logic for failed streams
- [ ] Add analytics/tracking
- [ ] Consider using CSS variables for theming

---

## 📊 Summary Statistics

| Metric                | Value                                       |
| --------------------- | ------------------------------------------- |
| Total Files           | 5 (3 code + 2 images)                       |
| HTML Lines            | ~57                                         |
| JavaScript Lines      | ~130                                        |
| CSS Lines             | ~280                                        |
| External Dependencies | 3 (Google Fonts, RadioJar, External Images) |
| Breakpoints           | 3 (default, 768px, 400px)                   |
| Animations            | 2 defined                                   |
| Background Options    | 10                                          |

---

_Generated: January 4, 2026_
