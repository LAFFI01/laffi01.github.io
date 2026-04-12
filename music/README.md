# Music Folder

## How to Add Your Own Music

### Step 1: Add Music Files
Place your `.mp3` files in this folder (`music/`). For example:
- `music/your-song.mp3`
- `music/another-song.mp3`

### Step 2: Update `playlist.json`
Edit the `playlist.json` file in this folder to add your songs.

**Format:**
```json
[
  {
    "title": "Song Name",
    "artist": "Artist Name",
    "duration": 240,
    "url": "music/song-file.mp3",
    "cover": "https://your-image-url.jpg"
  }
]
```

**Fields Explanation:**
- `title` - Display name of the song
- `artist` - Artist or album name
- `duration` - Length in seconds (use online converter or media player to check)
- `url` - Path to the MP3 file (starts with `music/`)
- `cover` - Image URL for album art (can use online images or local image URLs)

### Step 3: Get Duration in Seconds
Easy ways to find duration:
- Open MP3 in media player and note the duration, then convert to seconds
- Use websites like `mp3-duration.com` to get exact seconds
- Or estimate: 3:42 = 222 seconds

### Example JSON with 3 Songs:
```json
[
  {
    "title": "My Favorite Song",
    "artist": "Artist Name",
    "duration": 240,
    "url": "music/my-favorite.mp3",
    "cover": "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop"
  },
  {
    "title": "Another Track",
    "artist": "Another Artist",
    "duration": 180,
    "url": "music/another-track.mp3",
    "cover": "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop"
  },
  {
    "title": "Third Song",
    "artist": "Third Artist",
    "duration": 210,
    "url": "music/third-song.mp3",
    "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop"
  }
]
```

### Folder Structure:
```
laffi01.github.io/
├── index.html
├── script.js
├── style.css
└── music/
    ├── playlist.json         ← Edit this file
    ├── hit-the-road.mp3      ← Add your MP3 files here
    ├── midnight-vibes.mp3
    └── your-music.mp3
```

### Free Music Resources:
- **Unsplash** - Free album art: https://unsplash.com/
- **Pixabay Music** - Free royalty-free audio: https://pixabay.com/music/
- **Free Music Archive** - https://freemusicarchive.org/

That's it! The player will automatically load all songs from `playlist.json`.
