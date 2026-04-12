# LAFFI_01 - Data Scientist Portfolio

An interactive 3D portfolio website showcasing my data science expertise, skills, and projects with modern animations, light/dark mode support, and integrated music player.

## ✨ Features

- **3D Card Effect** - Mouse-tracking parallax animation for depth
- **Spider Web Background** - Animated mathematical symbols on a procedural grid
- **Light/Dark Mode** - Toggle between themes with persistent localStorage
- **Responsive Design** - Mobile-optimized breakpoints for all devices
- **Smooth Animations** - Typing effects, particle generation, and transitions
- **Performance Optimized** - Canvas pauses when tab is inactive
- **Accessible** - Semantic HTML, ARIA labels, and keyboard navigation
- **🎵 Music Player** - Integrated playlist with cross-page synchronization
- **Anime Hub** - Dedicated page for anime recommendations with mini music player

## 🛠️ Tech Stack

| Component | Tools |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Animations** | Canvas API, CSS Keyframes, RequestAnimationFrame |
| **Design** | Glassmorphism, Gradient Effects, 3D Transforms |
| **Music Player** | Web Audio API, SessionStorage for state sync |
| **Styling** | CSS Variables, Media Queries, Flexbox/Grid |
| **Colors** | Data Science Theme (Cyan, Blue, Slate) |

## 📁 Project Structure

```
laffi01.github.io/
├── index.html              # Main portfolio page
├── anime.html              # Anime Hub recommendations page
├── style.css               # Styling with CSS variables & animations
├── script.js               # Interactive features, animations & music player
├── PROFILE.jpg             # Profile picture (required)
├── background.jpg          # Background image (required)
├── FIT_LAFFI_01_logo.jpg   # Fitness profile image (optional)
├── music/                  # Music files and playlist
│   ├── playlist.json       # Music tracks metadata
│   ├── hit-the-road.mp3    # Sample track 1
│   └── smells-like-teen-spirit.mp3  # Sample track 2
├── .gitignore              # Git ignore rules
└── README.md              # Documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Static file server (for local testing)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/LAFFI01/laffi01.github.io.git
cd laffi01.github.io
```

2. Add missing assets:
   - `PROFILE.jpg` - Your profile picture (160x160px recommended)
   - `background.jpg` - Background image
   - `spider.png` - Spider decoration icon

3. Start a local server:
```bash
# Python 3
python -m http.server 8000

# or Python 2
python -m SimpleHTTPServer 8000

# or Node.js with http-server
npx http-server
```

4. Open `http://localhost:8000` in your browser

## 📄 Pages

### index.html - Main Portfolio
- Interactive 3D portfolio display
- Profile switching (Data Scientist & Fitness profiles)
- Terminal-style UI with commands
- Full music player with playlist management
- Display settings (brightness, dark mode, night light)
- Volume control with mute/max buttons

### anime.html - Anime Hub
- Anime, Manga, Manhwa, Novel, and Movie recommendations
- Category-based filtering with smooth animations
- Mini music player with volume control
- Playback state syncs with main portfolio
- Responsive grid layout
- Back button to return to main portfolio

## 🎨 Customization

### Add Your Music
1. Convert your music to MP3 format
2. Place files in the `music/` directory
3. Update `music/playlist.json` with track metadata:
```json
{
  "title": "Your Song",
  "artist": "Your Artist",
  "duration": 180,
  "url": "music/your-song.mp3",
  "cover": "https://your-image-url.jpg"
}
```

### Update Personal Info
Edit the following in `index.html`:
- Name: `#particleName`
- Role: `#particleRole`
- Bio text in `.bio`
- Skills in `.skills-list`
- Social media links

### Modify Colors
Update CSS variables in `style.css`:
```css
:root {
  --bg: #0f1724;           /* Dark background */
  --accent: #06b6d4;       /* Cyan accent */
  --text: #e6eef8;         /* Light text */
}
```

### Adjust 3D Effect
In `script.js`, modify the card tilt angles:
```javascript
card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
```

## 🎵 Music Player Features

### Main Features
- **Full Playlist Support** - Load tracks from `music/playlist.json`
- **Play/Pause Controls** - Play, pause, next, previous track navigation
- **Volume Control** - Slider with mute and max volume buttons
- **Progress Bar** - Drag to seek any position in the track
- **Track Information** - Display current track title, artist, and duration
- **Shuffle & Repeat** - Shuffle mode and repeat options (all/one)
- **Cross-Page Sync** - Music player state syncs between index.html and anime.html
- **Playback State Persistence** - Resume from previous position when switching pages

### Playlist Format
Create `music/playlist.json`:
```json
[
  {
    "title": "Track Name",
    "artist": "Artist Name",
    "duration": 240,
    "url": "music/track-name.mp3",
    "cover": "https://image-url.jpg"
  }
]
```

### Recent Fixes (v2.0)
- ✅ **Improved Audio Preloading** - Changed from `preload="metadata"` to `preload="auto"` for smooth playback
- ✅ **Added Main Audio Element to anime.html** - Ensures full compatibility across all pages
- ✅ **Fixed Playback Race Conditions** - Added canplay event listeners and readyState checking
- ✅ **Enhanced Error Handling** - Detailed error logging for debugging audio issues
- ✅ **Cross-Origin Support** - Added `crossorigin="anonymous"` attribute for better compatibility
- ✅ **Volume Synchronization** - Fixed volume sync between pages (including zero value handling)
- ✅ **Zero Volume Bug Fix** - Corrected playback state restoration to properly handle volume=0

## 📊 Skills Displayed

- Data Analysis
- Data Visualization
- Machine Learning
- Deep Learning
- Python
- SQL
- FastAPI/Docker

## 🔗 Connect

- **Email**: khatrijr01@gmail.com
- **GitHub**: [@LAFFI01](https://github.com/LAFFI01)
- **LinkedIn**: [LAFFI_01](https://linkedin.com/in/sandesh-khatri-a58457284)
- **Twitter**: [@laffi1111](https://twitter.com/laffi1111)

## � Changelog

### v2.0 - Music Player & Audio Fixes
- Added full-featured music player with playlist support
- Created Anime Hub page with mini music player
- Fixed audio playback issues:
  - Improved preloading from metadata-only to full audio
  - Fixed playback race conditions with canplay events
  - Fixed volume synchronization across pages
  - Fixed zero volume bug in playback state
- Added cross-page state persistence using SessionStorage
- Enhanced error handling with detailed logging
- Added CORS support for audio elements
- Updated README with music player documentation

### v1.0 - Initial Release
- Interactive 3D portfolio with parallax effect
- Terminal-style UI with profile switching
- Display settings (brightness, dark/light mode)
- Volume control
- Responsive design
- Canvas-based animations

## �📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Animations inspired by modern web design trends
- Mathematical symbols for data science aesthetic
- Glassmorphism UI principles
