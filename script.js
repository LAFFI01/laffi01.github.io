// --- USER PROFILES DATA ---
const userProfiles = [
    {
        id: 'TEK_LAFFI_01',
        name: 'LAFFI_01',
        role: 'ML Engineer',
        image: 'PROFILE.jpg',
        username: 'laffi',
        hostname: 'BABE',
        email: 'khatrijr01@gmail.com',
        bio: 'ML Engineer| ML & AI | Everything by LLM'
    },
    {
        id: 'FIT_LAFFI_01',
        name: 'LAFFI_01',
        role: 'Fitness Model',
        image: 'FIT_LAFFI_01_logo.jpg',
        username: 'laffi',
        hostname: 'BABE',
        email: 'khatrijr01@gmail.com',
        bio: ' Calisthenics |  | Fitness & Wellness | Bodyweight Training | Outdoor Workouts'
    }
];

let currentUser = userProfiles[0]; // Default to LAFFI_01
let currentVolume = 100;

// --- VOLUME CONTROL FUNCTIONALITY ---
function initializeVolumeControl() {
    const volumeIcon = document.getElementById('volume-icon');
    const volumeModal = document.getElementById('volume-modal');
    const volumeSlider = document.getElementById('volume-slider');
    const volumePercent = document.getElementById('volume-percent');
    const muteBtn = document.getElementById('mute-btn');
    const maxBtn = document.getElementById('max-btn');
    const audioPlayer = document.getElementById('backgroundMusic');
    
    if (!volumeIcon || !volumeModal || !volumeSlider) return;
    
    // Load saved volume from sessionStorage at page load
    const savedVolume = sessionStorage.getItem('currentVolume');
    if (savedVolume !== null) {
        currentVolume = parseInt(savedVolume);
        volumeSlider.value = currentVolume;
        volumePercent.textContent = currentVolume + '%';
        if (audioPlayer) {
            audioPlayer.volume = currentVolume / 100;
        }
        updateVolumeSliderFill();
    }
    
    // Toggle volume modal
    volumeIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        volumeModal.style.display = volumeModal.style.display === 'none' ? 'flex' : 'none';
    });
    
    // Close modal on outside click
    volumeModal.addEventListener('click', (e) => {
        if (e.target === volumeModal) {
            volumeModal.style.display = 'none';
        }
    });
    
    // Update volume on slider change
    volumeSlider.addEventListener('input', (e) => {
        currentVolume = parseInt(e.target.value);
        volumePercent.textContent = currentVolume + '%';
        if (audioPlayer) {
            audioPlayer.volume = currentVolume / 100;
        }
        updateVolumeSliderFill();
        saveVolumeToSessionStorage();
    });
    
    // Mute button
    muteBtn.addEventListener('click', () => {
        currentVolume = 0;
        volumeSlider.value = 0;
        volumePercent.textContent = '0%';
        if (audioPlayer) {
            audioPlayer.volume = 0;
        }
        updateVolumeSliderFill();
        saveVolumeToSessionStorage();
    });
    
    // Max volume button
    maxBtn.addEventListener('click', () => {
        currentVolume = 100;
        volumeSlider.value = 100;
        volumePercent.textContent = '100%';
        if (audioPlayer) {
            audioPlayer.volume = 1;
        }
        updateVolumeSliderFill();
        saveVolumeToSessionStorage();
    });
    
    // Update slider fill color
    function updateVolumeSliderFill() {
        volumeSlider.style.setProperty('--volume-width', currentVolume + '%');
    }
    
    updateVolumeSliderFill();
    
    // Listen for volume changes from anime.html page
    let lastSyncedVolume = currentVolume;
    setInterval(() => {
        const storedVolume = sessionStorage.getItem('currentVolume');
        if (storedVolume !== null) {
            const newVolume = parseInt(storedVolume);
            // Only update if the value changed AND it wasn't from our own change
            if (newVolume !== lastSyncedVolume) {
                currentVolume = newVolume;
                volumeSlider.value = newVolume;
                volumePercent.textContent = newVolume + '%';
                if (audioPlayer) {
                    audioPlayer.volume = newVolume / 100;
                }
                updateVolumeSliderFill();
                lastSyncedVolume = newVolume;
            }
        }
    }, 300);
}

// --- DISPLAY SETTINGS FUNCTIONALITY ---
let displaySettings = {
    brightness: 100,
    darkMode: true,
    nightLight: false
};

function initializeDisplaySettings() {
    const networkIcon = document.getElementById('network-icon');
    const networkModal = document.getElementById('network-modal');
    const brightnessSlider = document.getElementById('brightness-slider');
    const brightnessValue = document.getElementById('brightness-value');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const nightLightToggle = document.getElementById('reader-mode-toggle');
    const resetBtn = document.getElementById('reset-settings-btn');
    const body = document.body;
    
    if (!networkIcon || !networkModal) return;
    
    // Load saved settings
    loadDisplaySettings();
    applyDisplaySettings();
    
    // Toggle network modal
    networkIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        networkModal.style.display = networkModal.style.display === 'none' ? 'flex' : 'none';
    });
    
    // Close modal on outside click
    networkModal.addEventListener('click', (e) => {
        if (e.target === networkModal) {
            networkModal.style.display = 'none';
        }
    });
    
    // Brightness control
    brightnessSlider.addEventListener('input', (e) => {
        displaySettings.brightness = e.target.value;
        brightnessValue.textContent = displaySettings.brightness + '%';
        applyDisplaySettings();
        saveDisplaySettings();
    });
    
    // Dark mode toggle
    darkModeToggle.addEventListener('change', (e) => {
        displaySettings.darkMode = e.target.checked;
        applyDisplaySettings();
        saveDisplaySettings();
    });
    
    // Night light toggle
    nightLightToggle.addEventListener('change', (e) => {
        displaySettings.nightLight = e.target.checked;
        applyDisplaySettings();
        saveDisplaySettings();
    });
    
    // Reset button
    resetBtn.addEventListener('click', () => {
        displaySettings = {
            brightness: 100,
            darkMode: true,
            nightLight: false
        };
        brightnessSlider.value = 100;
        brightnessValue.textContent = '100%';
        darkModeToggle.checked = true;
        nightLightToggle.checked = false;
        applyDisplaySettings();
        saveDisplaySettings();
    });
}

function applyDisplaySettings() {
    const body = document.body;
    
    // Apply brightness
    body.style.filter = `brightness(${displaySettings.brightness}%)`;
    
    // Apply dark mode
    if (displaySettings.darkMode) {
        body.style.backgroundColor = '#0f1724';
        document.documentElement.style.colorScheme = 'dark';
    } else {
        body.style.backgroundColor = '#f5f5f5';
        document.documentElement.style.colorScheme = 'light';
    }
    
    // Apply night light (warm orange filter for reduced blue light)
    if (displaySettings.nightLight) {
        body.classList.add('reader-mode');
    } else {
        body.classList.remove('reader-mode');
    }
}

function saveDisplaySettings() {
    localStorage.setItem('displaySettings', JSON.stringify(displaySettings));
}

function loadDisplaySettings() {
    const saved = localStorage.getItem('displaySettings');
    if (saved) {
        displaySettings = JSON.parse(saved);
        // Update UI
        document.getElementById('brightness-slider').value = displaySettings.brightness;
        document.getElementById('brightness-value').textContent = displaySettings.brightness + '%';
        document.getElementById('dark-mode-toggle').checked = displaySettings.darkMode;
        document.getElementById('reader-mode-toggle').checked = displaySettings.nightLight;
    }
}

// --- UTILITY: Debounce Function for Performance ---
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// --- ACCOUNT SWITCHING FUNCTIONALITY ---
function initializeProfileSwitcher() {
    const profileSwitch = document.getElementById('profile-switch');
    const modal = document.getElementById('profile-switcher-modal');
    
    if (!profileSwitch || !modal) return;
    
    // Render profile list
    renderProfileList();
    
    // Toggle modal on profile picture click
    profileSwitch.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function renderProfileList() {
    const profileList = document.getElementById('profile-list');
    if (!profileList) return;
    
    profileList.innerHTML = '';
    
    userProfiles.forEach(profile => {
        const item = document.createElement('div');
        item.className = `profile-item ${profile.id === currentUser.id ? 'active' : ''}`;
        item.onclick = () => switchAccount(profile);
        
        item.innerHTML = `
            <img src="${profile.image}" alt="${profile.name}">
            <div class="profile-item-info">
                <p class="profile-item-name">${profile.name}</p>
                <p class="profile-item-role">${profile.role}</p>
            </div>
        `;
        
        profileList.appendChild(item);
    });
}

function switchAccount(profile) {
    currentUser = profile;
    
    // Update profile picture
    const profileImg = document.querySelector('#profile-switch img');
    if (profileImg) {
        profileImg.src = profile.image;
    }
    
    // Update terminal header
    const terminalHeader = document.querySelector('.title-center');
    if (terminalHeader) {
        terminalHeader.textContent = `${profile.username}@${profile.hostname}: ~/CODE/MY_ML`;
    }
    
    // Update terminal prompt display
    updateTerminalPrompt();
    
    // Refresh terminal display with new user's info
    const windowContent = document.querySelector('#terminal-output');
    if (windowContent) {
        windowContent.innerHTML = '';
    }
    typeTerminal();
    
    // Re-enable terminal input in case it was disabled by exit command
    enableTerminalInput();
    
    // Update profile list active state
    renderProfileList();
    
    // Close modal
    const modal = document.getElementById('profile-switcher-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// --- UTILITY: Copy Email to Clipboard ---
function copyEmailToClipboard() {
    const email = currentUser.email;
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copied to clipboard: ' + email);
    }).catch(err => {
        console.error('Failed to copy email:', err);
        alert('Failed to copy email. Please try again.');
    });
}

// --- 1. Live Clock Functionality ---
function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleString('en-US', options).replace(',', '');
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = timeString;
    }
}

setInterval(updateClock, 1000);
updateClock();

// --- 2. Terminal Animation & Profile Display ---
function typeTerminal() {
    const windowContent = document.querySelector('#terminal-output');
    if (!windowContent) return;
    
    // Update prompt display
    updateTerminalPrompt();
    
    let text = '';
    
    const prompt = `<span class="prompt-user">${currentUser.username}</span><span class="terminal-colon">@</span>${currentUser.hostname}<span class="terminal-colon">:</span><span class="prompt-path">~/CODE/MY_ML</span><span class="terminal-dollar">$</span>`;
    
    const profileData = [
        { delay: 100, content: `${prompt} whoami` },
        { delay: 400, content: `<br>${currentUser.name}` },
        { delay: 250, content: `<br>${prompt} cat profile.txt` },
        { delay: 600, content: '<br>─────────────────────────────────' },
        { delay: 150, content: `<br>📊 <strong>${currentUser.role}</strong>` },
        { delay: 150, content: `<br>${currentUser.bio.split(' | ')[0]}` },
        { delay: 150, content: `<br>${currentUser.bio.split(' | ')[1]}` },
        { delay: 150, content: `<br>${currentUser.bio.split(' | ')[2]}` },
        { delay: 150, content: `<br>${currentUser.bio.split(' | ').slice(3).join(' | ')}` },
        { delay: 150, content: '<br>─────────────────────────────────' },
        { delay: 250, content: `<br>${prompt} contact` },
        { delay: 300, content: `<br>📧 ${currentUser.email}` },
        { delay: 150, content: '<br>💼 Open to: Freelance · Full-time' },
        { delay: 150, content: '<br>🌍 Remote' }
    ];
    
    let profileIndex = 0;
    
    function displayNextLine() {
        if (profileIndex < profileData.length) {
            const line = profileData[profileIndex];
            text += line.content;
            windowContent.innerHTML = text;
            windowContent.scrollTop = windowContent.scrollHeight;
            profileIndex++;
            setTimeout(displayNextLine, line.delay);
        }
    }
    
    displayNextLine();
}

function updateTerminalPrompt() {
    const promptUser = document.querySelector('#terminal-prompt-user');
    const promptPath = document.querySelector('#terminal-prompt-path');
    if (promptUser && promptPath) {
        promptUser.textContent = currentUser.username;
        promptPath.textContent = '~/CODE/MY_ML';
    }
}

function processTerminalCommand(command) {
    const terminalOutput = document.querySelector('#terminal-output');
    const terminalInput = document.querySelector('#terminal-input');
    const prompt = `<span class="prompt-user">${currentUser.username}</span><span class="terminal-colon">@</span>${currentUser.hostname}<span class="terminal-colon">:</span><span class="prompt-path">~/CODE/MY_ML</span><span class="terminal-dollar">$</span>`;
    
    if (!terminalOutput) return;
    
    // Display user command
    let output = terminalOutput.innerHTML;
    output += `<br>${prompt} ${command}`;
    
    const cmd = command.trim().toLowerCase();
    let response = '';
    
    // Command processing
    if (cmd === '' || cmd === ' ') {
        // Empty command, just show next prompt
        response = '';
    } else if (cmd === 'help' || cmd === '?') {
        response = `<br><strong>Available Commands:</strong>
<br>  whoami           - Display current user information
<br>  profile          - Show detailed profile information
<br>  contact          - Display contact information
<br>  skills           - List technical skills
<br>  projects         - Show recent projects
<br>  social           - Show social media links
<br>  clear            - Clear the terminal
<br>  echo [text]      - Print text
<br>  date             - Show current date and time
<br>  exit             - Close the terminal
<br>  help             - Show this help message`;
    } else if (cmd === 'whoami') {
        response = `<br>${currentUser.name}`;
    } else if (cmd === 'profile') {
        response = `<br>─────────────────────────────────
<br>📊 <strong>${currentUser.role}</strong>
<br>${currentUser.bio.split(' | ')[0]}
<br>${currentUser.bio.split(' | ')[1]}
<br>${currentUser.bio.split(' | ')[2]}
<br>${currentUser.bio.split(' | ').slice(3).join(' | ')}
<br>─────────────────────────────────`;
    } else if (cmd === 'contact') {
        response = `<br>📧 Email: ${currentUser.email}
<br>💼 Open to: Freelance · Full-time
<br>🌍 Location: Remote`;
    } else if (cmd === 'skills') {
        response = `<br><strong>Technical Skills:</strong>
<br>  Languages: JavaScript, Python, HTML5, CSS3
<br>  Frontend: React, Vue.js, Responsive Design
<br>  Backend: Node.js, Express, REST APIs
<br>  Tools: Git, VS Code, DevTools
<br>  Databases: MongoDB, Firebase`;
    } else if (cmd === 'projects') {
        response = `<br><strong>Recent Projects:</strong>
<br>  🎵 Music Player - JSON-based playlist with shuffle & repeat
<br>  🌐 Portfolio - Interactive terminal with account switching
<br>  📱 Anime Hub - Content aggregation with category filtering
<br>  ⚙️ Portfolio Features - Volume control, display settings, responsive design`;
    } else if (cmd === 'social') {
        response = `<br><strong>Connect with Me:</strong>
<br>  GitHub: github.com/laffi01
<br>  Twitter: @LAFFI_01
<br>  LinkedIn: LAFFI_01
<br>  Email: khatrijr01@gmail.com`;
    } else if (cmd === 'date') {
        response = `<br>${new Date().toString()}`;
    } else if (cmd.startsWith('echo ')) {
        response = `<br>${command.substring(5)}`;
    } else if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        terminalInput.value = '';
        return;
    } else if (cmd === 'exit') {
        terminalOutput.innerHTML += `<br>${prompt} exit`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        terminalInput.value = '';
        terminalInput.disabled = true;
        terminalInput.style.opacity = '0.5';
        terminalInput.style.cursor = 'not-allowed';
        closeTerminal();
        return;
    } else {
        response = `<br><strong style="color: #ff6b6b;">Unknown command: ${cmd}</strong>
<br>Type <strong>help</strong> for available commands`;
    }
    
    output += response;
    output += `<br>`;
    terminalOutput.innerHTML = output;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
    terminalInput.focus();
}

function enableTerminalInput() {
    const terminalInput = document.querySelector('#terminal-input');
    if (terminalInput) {
        terminalInput.disabled = false;
        terminalInput.style.opacity = '1';
        terminalInput.style.cursor = 'text';
    }
}

function initTerminalInput() {
    const terminalInput = document.querySelector('#terminal-input');
    if (!terminalInput) return;
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value;
            processTerminalCommand(command);
        }
    });
    
    // Auto-focus terminal input when clicking on terminal window
    const terminalWindow = document.querySelector('#terminal-window');
    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
    
    terminalInput.focus();
}

setTimeout(typeTerminal, 500);

// --- 3. Window Management (Drag & Close) with Touch Support ---
const terminalWindow = document.getElementById("terminal-window");
const musicPlayerWindow = document.getElementById("music-player");
const dockTerminal = document.getElementById("dock-terminal");
const dockMusic = document.getElementById("dock-music");

// Drag Elements with Both Mouse and Touch Support
dragElement(terminalWindow, document.getElementById("terminal-header"));
if (musicPlayerWindow) {
    dragElement(musicPlayerWindow, document.getElementById("music-header"));
}

function dragElement(elmnt, header) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    
    if (header) {
        header.addEventListener('mousedown', dragMouseDown);
        header.addEventListener('touchstart', dragTouchStart);
    } else {
        elmnt.addEventListener('mousedown', dragMouseDown);
        elmnt.addEventListener('touchstart', dragTouchStart);
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        isDragging = true;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
    }

    function dragTouchStart(e) {
        e = e || window.event;
        isDragging = true;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.addEventListener('touchend', closeDragElement);
        document.addEventListener('touchmove', elementDragTouch);
    }

    function elementDrag(e) {
        if (!isDragging) return;
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function elementDragTouch(e) {
        if (!isDragging) return;
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        isDragging = false;
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('touchend', closeDragElement);
        document.removeEventListener('touchmove', elementDragTouch);
    }
}

// Window Toggles & Closes
let isTerminalMinimized = false;
let isTerminalMaximized = false;
let terminalOriginalState = {
    width: '700px',
    height: '450px',
    top: '50px',
    left: '50px',
    zIndex: '10'
};

function closeTerminal() {
    if (terminalWindow) {
        terminalWindow.style.display = 'none';
    }
}

function minimizeTerminal() {
    if (!terminalWindow) return;
    
    const titleBar = terminalWindow.querySelector('.title-bar');
    const windowContent = terminalWindow.querySelector('.window-content');
    
    if (!windowContent) {
        console.warn('Window content not found');
        return;
    }
    
    if (isTerminalMinimized) {
        // Restore/Expand
        windowContent.style.display = 'block';
        isTerminalMinimized = false;
        if (titleBar) {
            titleBar.style.borderRadius = '8px 8px 0 0';
        }
        terminalWindow.style.height = terminalOriginalState.height;
    } else {
        // Minimize
        windowContent.style.display = 'none';
        isTerminalMinimized = true;
        if (titleBar) {
            titleBar.style.borderRadius = '8px';
        }
        terminalWindow.style.height = 'auto';
    }
}

function maximizeTerminal() {
    if (!terminalWindow) return;
    
    if (isTerminalMaximized) {
        // Restore to saved size
        terminalWindow.style.width = terminalOriginalState.width;
        terminalWindow.style.height = terminalOriginalState.height;
        terminalWindow.style.top = terminalOriginalState.top;
        terminalWindow.style.left = terminalOriginalState.left;
        terminalWindow.style.zIndex = terminalOriginalState.zIndex;
        isTerminalMaximized = false;
    } else {
        // Save current state before maximizing
        if (!isTerminalMaximized) {
            terminalOriginalState = {
                width: terminalWindow.style.width || '700px',
                height: terminalWindow.style.height || '450px',
                top: terminalWindow.style.top || '50px',
                left: terminalWindow.style.left || '50px',
                zIndex: terminalWindow.style.zIndex || '10'
            };
        }
        
        // Maximize to full screen
        terminalWindow.style.width = 'calc(100vw - 40px)';
        terminalWindow.style.height = 'calc(100vh - 80px)';
        terminalWindow.style.top = '20px';
        terminalWindow.style.left = '20px';
        terminalWindow.style.zIndex = '9999';
        isTerminalMaximized = true;
    }
}

function closeMusic() {
    if (musicPlayerWindow) {
        musicPlayerWindow.style.display = 'none';
    }
}

if (dockTerminal) {
    dockTerminal.addEventListener('click', () => {
        if (terminalWindow) {
            terminalWindow.style.display = 'flex';
            enableTerminalInput();
        }
    });
    // Add keyboard support
    dockTerminal.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (terminalWindow) {
                terminalWindow.style.display = 'flex';
                enableTerminalInput();
            }
        }
    });
}

if (dockMusic) {
    dockMusic.addEventListener('click', () => {
        if (musicPlayerWindow) {
            const display = musicPlayerWindow.style.display;
            musicPlayerWindow.style.display = (display === 'none' || display === '') ? 'flex' : 'none';
        }
    });
    // Add keyboard support
    dockMusic.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (musicPlayerWindow) {
                const display = musicPlayerWindow.style.display;
                musicPlayerWindow.style.display = (display === 'none' || display === '') ? 'flex' : 'none';
            }
        }
    });
}

// --- 4. PLAYLIST SYSTEM (Dynamic from JSON) ---
let playlist = [];
let currentTrackIndex = 0;
let isShuffling = false;
let repeatMode = 0; // 0 = no repeat, 1 = repeat all, 2 = repeat one
let likedTracks = new Set();

// Load playlist from JSON file
async function loadPlaylist() {
    try {
        const response = await fetch('music/playlist.json');
        if (!response.ok) {
            throw new Error('Failed to load playlist');
        }
        playlist = await response.json();
        
        if (playlist.length === 0) {
            console.warn('Playlist is empty. Add songs to music/playlist.json');
            return;
        }
        
        // Store playlist in sessionStorage so anime.html can access it
        sessionStorage.setItem('playlistData', JSON.stringify(playlist));
        
        initializePlaylist();
    } catch (error) {
        console.error('Error loading playlist:', error);
        console.log('Make sure music/playlist.json exists in your music folder');
    }
}

// Initialize playlist UI
function initializePlaylist() {
    renderPlaylistItems();
    updateNowPlaying();
}

// Render playlist items
function renderPlaylistItems() {
    const playlistContainer = document.getElementById('sp-playlist-items');
    if (!playlistContainer) return;
    
    playlistContainer.innerHTML = '';
    
    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = `sp-playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
        item.onclick = () => playTrackAtIndex(index);
        
        item.innerHTML = `
            <div class="sp-playlist-item-title">${track.title}</div>
            <div class="sp-playlist-item-artist">${track.artist}</div>
            <div class="sp-playlist-item-duration">${formatTime(track.duration)}</div>
        `;
        
        playlistContainer.appendChild(item);
    });
    
    updatePlaylistInfo();
}

// Update now playing display
function updateNowPlaying() {
    const currentTrack = playlist[currentTrackIndex];
    if (!currentTrack) return;
    
    document.getElementById('sp-song-title').textContent = currentTrack.title;
    document.getElementById('sp-artist').textContent = currentTrack.artist;
    document.getElementById('sp-album-art').src = currentTrack.cover;
    document.getElementById('duration-time').textContent = formatTime(currentTrack.duration);
    
    // Update audio source with proper error handling
    const audioSource = document.getElementById('audio-source');
    if (audioSource && audioPlayer) {
        audioSource.src = currentTrack.url;
        audioPlayer.load();
        // Reset progress bar when changing tracks
        document.getElementById('current-time').textContent = '0:00';
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) progressFill.style.width = '0%';
    }
    
    // Update like button
    const likeBtn = document.getElementById('sp-like-btn');
    if (likeBtn) {
        likeBtn.textContent = likedTracks.has(currentTrackIndex) ? '❤️' : '🤍';
    }
    
    // Update active playlist item
    renderPlaylistItems();
}

// Play track at index
function playTrackAtIndex(index) {
    if (index < 0 || index >= playlist.length) return;
    
    currentTrackIndex = index;
    updateNowPlaying();
    
    if (audioPlayer) {
        audioPlayer.currentTime = 0;
        // Wait for canplay event to ensure audio is ready
        const playAudio = () => {
            audioPlayer.play().catch(err => {
                console.warn('Could not play audio:', err);
                isPlaying = false;
            });
            isPlaying = true;
            const playBtn = document.getElementById('play-btn');
            if (playBtn) {
                playBtn.textContent = '⏸';
            }
            audioPlayer.removeEventListener('canplay', playAudio);
        };
        
        if (audioPlayer.readyState >= 2) {
            // Audio is already loaded, play immediately
            playAudio();
        } else {
            // Wait for audio to load
            audioPlayer.addEventListener('canplay', playAudio, { once: true });
            // Timeout fallback after 2 seconds
            setTimeout(() => {
                if (audioPlayer.readyState < 2) {
                    console.warn('Audio took too long to load, attempting playback anyway');
                    playAudio();
                }
            }, 2000);
        }
    }
}

// Next track
function nextTrack() {
    let nextIndex;
    
    if (isShuffling) {
        nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
        nextIndex = (currentTrackIndex + 1) % playlist.length;
    }
    
    playTrackAtIndex(nextIndex);
}

// Previous track
function previousTrack() {
    let prevIndex;
    
    if (isShuffling) {
        prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
        prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    }
    
    playTrackAtIndex(prevIndex);
}

// Toggle shuffle
function toggleShuffle() {
    isShuffling = !isShuffling;
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.style.opacity = isShuffling ? '1' : '0.6';
    }
}

// Toggle repeat
function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    const repeatBtn = document.getElementById('repeat-btn');
    if (repeatBtn) {
        repeatBtn.textContent = repeatMode === 2 ? '🔂' : '🔁';
        repeatBtn.style.opacity = repeatMode > 0 ? '1' : '0.6';
    }
}

// Toggle like
function toggleLike() {
    if (likedTracks.has(currentTrackIndex)) {
        likedTracks.delete(currentTrackIndex);
    } else {
        likedTracks.add(currentTrackIndex);
    }
    
    const likeBtn = document.getElementById('sp-like-btn');
    if (likeBtn) {
        likeBtn.textContent = likedTracks.has(currentTrackIndex) ? '❤️' : '🤍';
    }
}

// Toggle playlist view
function togglePlaylist() {
    const playlist = document.getElementById('sp-playlist');
    const nowPlaying = document.getElementById('sp-now-playing');
    
    if (playlist.style.display === 'none' || playlist.style.display === '') {
        playlist.style.display = 'flex';
        nowPlaying.style.display = 'none';
    } else {
        playlist.style.display = 'none';
        nowPlaying.style.display = 'flex';
    }
}

// Update playlist info
function updatePlaylistInfo() {
    const info = document.getElementById('playlist-info');
    if (info) {
        info.textContent = `Track ${currentTrackIndex + 1} of ${playlist.length}`;
    }
}
const audioPlayer = document.getElementById('backgroundMusic');
let isPlaying = false;

// Error handling for audio
if (audioPlayer) {
    audioPlayer.addEventListener('error', function(e) {
        console.warn('Audio file could not be loaded. Check if audio files exist.');
        console.warn('Error code:', audioPlayer.error?.code);
        console.warn('Current track URL:', playlist[currentTrackIndex]?.url);
        isPlaying = false;
        const playBtn = document.getElementById('play-btn');
        if (playBtn) playBtn.textContent = '▶';
    });
    
    audioPlayer.addEventListener('ended', function() {
        if (repeatMode === 2) {
            // Repeat one track
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(err => console.warn('Could not play audio:', err));
        } else {
            // Move to next track
            nextTrack();
        }
    });
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    // Handle stalled audio
    audioPlayer.addEventListener('stalled', function() {
        console.warn('Audio playback stalled');
    });
    
    audioPlayer.addEventListener('suspend', function() {
        console.warn('Audio download suspended');
    });
}

function toggleMusic() {
    if (!audioPlayer) return;
    const playBtn = document.getElementById('play-btn');
    if (!playBtn) return;
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
        playBtn.style.marginLeft = '4px';
    } else {
        audioPlayer.play().catch(err => {
            console.warn('Could not play audio:', err);
            isPlaying = false;
        });
        isPlaying = true;
        playBtn.textContent = '⏸';
        playBtn.style.marginLeft = '0px';
    }
}

function stopMusic() {
    if (!audioPlayer) return;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.textContent = '▶';
        playBtn.style.marginLeft = '4px';
    }
    updateProgress();
}

function setVolume(value) {
    if (audioPlayer) {
        audioPlayer.volume = value / 100;
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const durationTimeEl = document.getElementById('duration-time');
    
    if (!audioPlayer || !progressFill || !currentTimeEl || !durationTimeEl) return;
    
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percent + '%';
    }
    
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationTimeEl.textContent = formatTime(audioPlayer.duration);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// --- CROSS-PAGE MUSIC PLAYBACK SYNC ---
function savePlaybackState() {
    if (!audioPlayer) return;
    const state = {
        trackIndex: currentTrackIndex,
        currentTime: audioPlayer.currentTime || 0,
        isPlaying: isPlaying,
        volume: currentVolume,
        timestamp: Date.now()
    };
    sessionStorage.setItem('musicPlaybackState', JSON.stringify(state));
}

function restorePlaybackState() {
    const saved = sessionStorage.getItem('musicPlaybackState');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            currentTrackIndex = state.trackIndex || 0;
            isPlaying = state.isPlaying || false;
            // Use nullish coalescing (??) instead of || to properly handle 0 value
            currentVolume = state.volume !== undefined && state.volume !== null ? state.volume : 100;
            
            if (audioPlayer) {
                audioPlayer.volume = currentVolume / 100;
            }
            
            return state;
        } catch (error) {
            console.error('Error restoring playback state:', error);
        }
    }
    return null;
}

function syncPlaybackState() {
    savePlaybackState();
}

function saveVolumeToSessionStorage() {
    sessionStorage.setItem('currentVolume', currentVolume);
}

// Auto-save playback state while playing
function setupAutoSave() {
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', () => {
            if (isPlaying) {
                savePlaybackState();
            }
        });
    }
}

// Click on progress bar to seek
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.sp-progress-bar');
    if (progressBar && audioPlayer) {
        progressBar.addEventListener('click', function(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            if (duration) {
                audioPlayer.currentTime = (clickX / width) * duration;
            }
        });
    }
});

// Initialize playlist on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load playlist from JSON file
    loadPlaylist().then(() => {
        // Restore playback state if it exists
        const savedState = restorePlaybackState();
        
        // Update now playing with saved track
        if (savedState && savedState.trackIndex < playlist.length) {
            updateNowPlaying();
            // Restore playback position
            if (audioPlayer) {
                audioPlayer.currentTime = savedState.currentTime;
                // Auto-play if was playing before
                if (savedState.isPlaying) {
                    audioPlayer.play().catch(err => {
                        console.warn('Could not auto-play audio:', err);
                        isPlaying = false;
                    });
                }
            }
        }
        
        // Attach event listeners to control buttons
        const shuffleBtn = document.getElementById('shuffle-btn');
        const repeatBtn = document.getElementById('repeat-btn');
        const likeBtn = document.getElementById('sp-like-btn');
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', toggleShuffle);
        }
        
        if (repeatBtn) {
            repeatBtn.addEventListener('click', toggleRepeat);
        }
        
        if (likeBtn) {
            likeBtn.addEventListener('click', toggleLike);
        }
        
        const progressBar = document.querySelector('.sp-progress-bar');
        if (progressBar && audioPlayer) {
            progressBar.addEventListener('click', function(e) {
                const width = this.clientWidth;
                const clickX = e.offsetX;
                const duration = audioPlayer.duration;
                if (duration) {
                    audioPlayer.currentTime = (clickX / width) * duration;
                }
            });
        }
        
        // Sync playback state periodically
        setInterval(syncPlaybackState, 1000);
    });
    
    // Save playback state before leaving the page
    window.addEventListener('beforeunload', syncPlaybackState);
    
    // Copy Email button functionality
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', copyEmailToClipboard);
    }

    // --- ACCOUNT SWITCHING FUNCTIONALITY ---
    // Initialize profile switcher
    initializeProfileSwitcher();
    
    // --- VOLUME CONTROL FUNCTIONALITY ---
    // Initialize volume control
    initializeVolumeControl();
    
    // --- DISPLAY SETTINGS FUNCTIONALITY ---
    // Initialize display settings
    initializeDisplaySettings();
    
    // --- DOCK ICON TOOLTIPS ---
    initializeDockTooltips();
    
    // --- TERMINAL INPUT ---
    initTerminalInput();
    
    // --- AUTO-SAVE PLAYBACK STATE ---
    setupAutoSave();
    
    // --- SAVE STATE WHEN NAVIGATING TO ANIME PAGE ---
    const animeHubLink = document.querySelector('a[href="anime.html"]');
    if (animeHubLink) {
        animeHubLink.addEventListener('click', () => {
            syncPlaybackState();
        });
    }
});

// Initialize hover tooltips for dock icons
function initializeDockTooltips() {
    const dockIcons = document.querySelectorAll('.dock-icon');
    
    dockIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const title = this.getAttribute('title') || this.getAttribute('aria-label');
            if (!title) return;
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'dock-tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(0, 0, 0, 0.95);
                color: #fff;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                animation: tooltipFadeIn 0.15s ease-in forwards;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
            
            // Remove on mouse leave
            icon.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}