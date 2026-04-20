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
        bio: ' Calisthenics | Fitness & Wellness | Bodyweight Training | Outdoor Workouts'
    }
];

// --- DETECT USER FROM URL PARAMETER ---
function getDefaultUser() {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    
    if (userParam) {
        const lowerParam = userParam.toLowerCase();
        
        // Match by name: 'code' or 'fit'
        if (lowerParam === 'code') {
            return userProfiles.find(p => p.id === 'TEK_LAFFI_01') || userProfiles[0];
        } else if (lowerParam === 'fit') {
            return userProfiles.find(p => p.id === 'FIT_LAFFI_01') || userProfiles[0];
        }
    }
    
    // Default to first profile if no valid parameter
    return userProfiles[0];
}

let currentUser = getDefaultUser();
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
        if (typeof showPixelFaceMessage === 'function') showPixelFaceMessage("Shhh... Going quiet mode! 🤫", 2000, 'cute');
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
        if (typeof showPixelFaceMessage === 'function') showPixelFaceMessage("MAX VOLUME! LET'S GOOO! 🔊🔥", 2500, 'excited');
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
        if (e.target.checked) {
            showPixelFaceMessage("Night light on! Time to get cozy. ⛺", 2500, 'cute');
        } else {
            showPixelFaceMessage("Back to normal colors! 🎨", 2000, 'happy');
        }
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
        showPixelFaceMessage("Settings reset to default! 🔄", 2500, 'happy');
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
const clockEl = document.getElementById('clock');
function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleString('en-US', options).replace(',', '');
    clockEl.textContent = timeString;
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

const terminalOutput = document.querySelector('#terminal-output');
const terminalInput = document.querySelector('#terminal-input');

function processTerminalCommand(command) {
    const prompt = `<span class="prompt-user">${currentUser.username}</span><span class="terminal-colon">@</span>${currentUser.hostname}<span class="terminal-colon">:</span><span class="prompt-path">~/CODE/MY_ML</span><span class="terminal-dollar">$</span>`;
    
    if (!terminalOutput || !terminalInput) return;
    
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
<br>  matrix           - Wake up, Neo...
<br>  mode [name]      - Set face mode (standard, party, hacker, focus, spidey)
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
    } else if (cmd === 'matrix') {
        toggleMatrix();
        response = `<br>Entering the Matrix...`;
    } else if (cmd.startsWith('mode ')) {
        const requestedMode = cmd.substring(5).trim();
        const currentMode = faceModes[currentFaceModeIndex];
        const audioPlayer = document.getElementById('backgroundMusic');
        
        // Check if user is toggling OFF the same mode
        if (requestedMode === currentMode && requestedMode !== 'standard') {
            const desktopFace = document.querySelector('.pixel-face-widget');
            const mobileFace = document.querySelector('.n-pixel-face');
            const faces = [desktopFace, mobileFace].filter(f => f !== null);
            
            faces.forEach(face => {
                faceModes.forEach(m => face.classList.remove(`mode-${m}`));
            });
            currentFaceModeIndex = 0; // Back to standard
            
            // Stop music if spidey mode was deactivated
            if (requestedMode === 'spidey' && audioPlayer) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }
            
            showPixelFaceMessage(`${requestedMode} mode deactivated! Back to standard. 😊`, 2500, 'happy');
            response = `<br><strong>${requestedMode}</strong> mode deactivated!`;
        } else if (faceModes.includes(requestedMode)) {
            const desktopFace = document.querySelector('.pixel-face-widget');
            const mobileFace = document.querySelector('.n-pixel-face');
            const faces = [desktopFace, mobileFace].filter(f => f !== null);
            
            faces.forEach(face => {
                faceModes.forEach(m => face.classList.remove(`mode-${m}`));
                if (requestedMode !== 'standard') face.classList.add(`mode-${requestedMode}`);
            });
            currentFaceModeIndex = faceModes.indexOf(requestedMode);
            
            const modeMessages = {
                'standard': "Standard Mode! Let's go! 😊",
                'party': "Party Mode! Let's dance! 🎉🎶",
                'hacker': "Hacker Mode activated... 💻🕶️",
                'focus': "Focus Mode... Zzz... 🤫",
                'spidey': "My Spidey-Sense is tingling! 🕸️🕷️ Click anywhere!"
            };
            let reaction = 'normal';
            if (requestedMode === 'party') reaction = 'excited';
            if (requestedMode === 'focus') reaction = 'sleeping';
            if (requestedMode === 'hacker') reaction = 'cool';
            if (requestedMode === 'spidey') reaction = 'excited';
            
            // Play "AM I DREAMING" music for spidey mode
            if (requestedMode === 'spidey' && audioPlayer) {
                audioPlayer.src = 'music/am-i-dreaming.mp3';
                audioPlayer.currentTime = 0;
                audioPlayer.play().catch(err => console.warn('Music play failed:', err));
            }
            
            showPixelFaceMessage(modeMessages[requestedMode], 3000, reaction);
            response = `<br>Face mode set to: <strong>${requestedMode}</strong>`;
        } else {
        response = `<br><strong style="color: #ff6b6b;">Unknown mode. Available modes: standard, party, hacker, focus, spidey</strong>`;
        }
    } else if (cmd === 'exit') {
        terminalOutput.innerHTML += `<br>${prompt} exit`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        terminalInput.value = '';
        terminalInput.disabled = true;
        terminalInput.style.opacity = '0.5';
        terminalInput.style.cursor = 'not-allowed';
        closeTerminal();
        return;
    } else if (cmd === 'iloveu') {
        // Hidden easter egg - doesn't show in help
        response = `<br>❤️ Aww... I love you too! 🥰`;
        showPixelFaceMessage("Aww... I love you too! ❤️🥰", 5000, 'loved');
        const faces = document.querySelectorAll('.pixel-face-widget, .n-pixel-face');
        faces.forEach(face => {
            face.style.transition = 'transform 0.3s ease';
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    face.style.transform = i % 2 === 0 ? 'scale(1.15)' : 'scale(1)';
                }, i * 150);
            }
            setTimeout(() => { face.style.transform = ''; }, 900);
        });
    } else if (cmd === 'ihateu') {
        // Hidden easter egg - sad reaction - doesn't show in help
        response = `<br>😔 Oh... that really hurt my feelings... 💔`;
        showPixelFaceMessage("Why would you say that... 😔💔", 4500, 'sad');
    } else {
        response = `<br><strong style="color: #ff6b6b;">Unknown command: ${cmd}</strong>
<br>Type <strong>help</strong> for available commands`;
        
        // Pixel face reaction to invalid command
        const sassyMessages = [
            "Bruh, stop. This is a WEB PAGE not an OS! 😤",
            "Dude, type 'help' if you need it! 🤦",
            "That's not a real command, genius! 🙄",
            "I'm not an actual terminal, type 'help'! 💀",
            "Stop with the random stuff! Type 'help'! 😠",
            "This ain't Linux, type 'help'! 🚫",
            "Wrong command, my friend. Try 'help'! 😒",
            "Not a valid command! Use 'help' to learn! 📚",
            "Did you really think that would work? 😏",
            "I'm just a web terminal, type 'help'! 💻"
        ];
        const sassyMsg = sassyMessages[Math.floor(Math.random() * sassyMessages.length)];
        showPixelFaceMessage(sassyMsg, 3000, 'shocked');
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

// --- MOBILE VIEWPORT FIX ---
let lastViewportWidth = window.innerWidth;
function setMobileHeight() {
    // Only update if width changes to prevent UI squishing when mobile keyboard opens
    if (window.innerWidth !== lastViewportWidth || !document.documentElement.style.getPropertyValue('--vh')) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastViewportWidth = window.innerWidth;
    }
}

function initTerminalInput() {
    const terminalInput = document.querySelector('#terminal-input');
    const terminalOutput = document.querySelector('#terminal-output');
    if (!terminalInput) return;
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value;
            processTerminalCommand(command);
        }
    });

    // Mobile Fix: When the input is focused, ensure the terminal scrolls to the bottom
    terminalInput.addEventListener('focus', () => {
        setTimeout(() => {
            if (terminalOutput) {
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }, 300); // 300ms delay allows the mobile keyboard time to slide up
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
// Enable dragging for pixel face widget on desktop
const pixelFaceWidget = document.querySelector('.pixel-face-widget');
if (pixelFaceWidget) {
    dragElement(pixelFaceWidget, pixelFaceWidget); // Widget can be dragged from anywhere
}

// --- MOBILE APP & WIDGET DRAGGING SETUP ---
// --- ANDROID-STYLE APP GRID ARRANGEMENT ---
class MobileAppGrid {
    constructor() {
        this.elements = [];
        this.cellPositions = new Map(); // Store computed grid positions
    }
    
    initialize(allElements, containerEl) {
        this.elements = allElements;
        this.container = containerEl;
        this.computeGridPositions();
    }
    
    computeGridPositions() {
        if (!this.container) return;
        
        // Get all elements currently in the grid to compute their positions
        this.cellPositions.clear();
        
        this.elements.forEach((el, idx) => {
            const rect = el.getBoundingClientRect();
            this.cellPositions.set(idx, {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height
            });
        });
    }
    
    isCellOccupied(cellIndex, excludeElement) {
        if (cellIndex >= this.elements.length) return true;
        
        const el = this.elements[cellIndex];
        if (el === excludeElement) return false;
        
        // Check if element is positioned in grid or fixed
        if (el.style.position === 'fixed') return false; // Fixed elements don't occupy grid
        
        return true;
    }
    
    findNearestEmptyCell(x, y, draggedElement) {
        let bestIndex = -1;
        let minDistance = Infinity;
        
        for (let i = 0; i < this.elements.length; i++) {
            const el = this.elements[i];
            
            // Skip the dragged element and already fixed elements
            if (el === draggedElement || el.style.position === 'fixed') continue;
            
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            
            if (distance < minDistance) {
                minDistance = distance;
                bestIndex = i;
            }
        }
        
        return bestIndex;
    }
    
    snapElementToGrid(element, targetIndex) {
        if (targetIndex < 0 || targetIndex >= this.elements.length) return false;
        
        const targetEl = this.elements[targetIndex];
        if (!targetEl || targetEl === element) return false;
        
        // Find where this element currently is in the elements array
        const draggingIndex = this.elements.indexOf(element);
        if (draggingIndex === -1) return false;
        
        // Get target element's grid position
        const rect = targetEl.getBoundingClientRect();
        
        // Move dragged element to target's position (fixed)
        element.style.position = 'fixed';
        element.style.left = rect.left + 'px';
        element.style.top = rect.top + 'px';
        element.style.width = rect.width + 'px';
        element.style.height = rect.height + 'px';
        element.style.margin = '0';
        
        // Swap elements in DOM order - this reorders the grid
        if (draggingIndex < targetIndex) {
            // Dragged is before target - insert after target
            targetEl.parentNode.insertBefore(element, targetEl.nextSibling);
        } else {
            // Dragged is after target - insert before target  
            targetEl.parentNode.insertBefore(element, targetEl);
        }
        
        // Update the array
        [this.elements[draggingIndex], this.elements[targetIndex]] = 
        [this.elements[targetIndex], this.elements[draggingIndex]];
        
        return true;
    }
}

const appGrid = new MobileAppGrid();

function initializeMobileDragging() {
    const container = document.querySelector('.n-app-grid');
    if (!container) return;
    
    // ONLY select elements inside the grid (ignores top clock/music widget)
    const allDraggableElements = Array.from(container.querySelectorAll('.n-app, .n-widget-box'));

    appGrid.initialize(allDraggableElements, container);
    
    allDraggableElements.forEach((element) => {
        setupMobileDragElement(element);
    });
}

function setupMobileDragElement(element) {
    let isDragging = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let currentX = 0;
    let currentY = 0;
    let lastX = 0;
    let lastY = 0;
    let dragThreshold = 10; // pixels before drag starts
    let dragStarted = false;
    let lastEdgeScrollTime = 0;
    let resetTiltTimeout;
    
    // Mark as already set up
    if (element.dataset.dragSetup === 'true') return;
    element.dataset.dragSetup = 'true';
    
    let elementWidth = 80;
    let elementHeight = 80;
    
    // PREVENT LINK NAVIGATION ON DRAG
    element.addEventListener('click', (e) => {
        if (dragStarted) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    
    // START DRAG - on touchstart or mousedown
    const startDrag = (clientX, clientY) => {
        if (isDragging) return;
        
        touchStartX = clientX;
        touchStartY = clientY;
        isDragging = true;
        dragStarted = false;
        
        // Get current position
        const rect = element.getBoundingClientRect();
        elementWidth = rect.width;
        elementHeight = rect.height;
        currentX = rect.left;
        currentY = rect.top;
        lastX = clientX;
        lastY = clientY;
    };
    
    // MOVE DRAG - check if we've moved enough to start drag mode
    const moveDrag = (clientX, clientY) => {
        if (!isDragging) return;
        
        const deltaX = clientX - touchStartX;
        const deltaY = clientY - touchStartY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Start drag mode if finger moved more than threshold
        if (distance > dragThreshold) {
            dragStarted = true;
            
            // First time drag starts - apply visual feedback
            if (!element.classList.contains('mobile-dragging')) {
                element.classList.add('mobile-dragging');
                
                // Remove from grid document flow
                element.style.display = 'none';
                
                // Show as fixed floating
                element.style.display = 'block';
                element.style.position = 'fixed';
                element.style.left = currentX + 'px';
                element.style.top = currentY + 'px';
                element.style.width = elementWidth + 'px';
                element.style.height = elementHeight + 'px';
                element.style.margin = '0';
                element.style.transform = 'scale(1.15) perspective(800px) rotateX(0deg) rotateY(0deg)';
                element.style.opacity = '0.95';
                element.style.filter = 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.8))';
                element.style.cursor = 'grabbing';
                element.style.zIndex = '10001';
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                // Pixel face scared reaction
                if (element.querySelector('#pixelFaceSVG')) {
                    showPixelFaceMessage("😱 WHOA! WHERE ARE WE GOING?!", 2000, 'surprised');
                    const nPixelFace = element.closest('.n-pixel-face');
                    if (nPixelFace) {
                        nPixelFace.classList.add('dragging-scared');
                    }
                }
            }
        }
        
        // If dragging, update position
        if (dragStarted) {
            const moveX = clientX - lastX;
            const moveY = clientY - lastY;
            
            currentX += moveX;
            currentY += moveY;
            
            // Keep within bounds
            currentX = Math.max(0, Math.min(currentX, window.innerWidth - elementWidth));
            currentY = Math.max(0, Math.min(currentY, window.innerHeight - elementHeight));
            
            // --- EDGE SCROLLING FOR CAROUSEL ---
            // Scroll smoothly when dragging an app near the left/right screen edges
            const carousel = document.querySelector('.n-app-carousel');
            if (carousel) {
                const edgeThreshold = 60; // Distance from screen edge (px) to trigger scroll
                const now = Date.now();
                if (now - lastEdgeScrollTime > 600) { // 600ms cooldown to let scroll animation finish
                    if (clientX > window.innerWidth - edgeThreshold) {
                        carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
                        lastEdgeScrollTime = now;
                    } else if (clientX < edgeThreshold) {
                        carousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
                        lastEdgeScrollTime = now;
                    }
                }
            }

            // --- 3D TILT EFFECT ---
            // Calculate tilt based on movement velocity
            const tiltX = Math.max(-25, Math.min(25, -moveY * 1.5));
            const tiltY = Math.max(-25, Math.min(25, moveX * 1.5));

            // Update position and apply 3D transform
            element.style.left = currentX + 'px';
            element.style.top = currentY + 'px';
            element.style.transform = `scale(1.15) perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            
            clearTimeout(resetTiltTimeout);
            resetTiltTimeout = setTimeout(() => {
                if (isDragging && dragStarted) {
                    element.style.transform = 'scale(1.15) perspective(800px) rotateX(0deg) rotateY(0deg)';
                }
            }, 100);
            
            lastX = clientX;
            lastY = clientY;
        }
    };
    
    // END DRAG
    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        clearTimeout(resetTiltTimeout);
        
        // If drag actually happened (moved enough), show landing animation
        if (dragStarted) {
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([30, 50, 30]);
            }
            
            // Snap to nearest grid position
            let snapped = false;
            if (typeof appGrid !== 'undefined' && appGrid) {
                const elementCenterX = currentX + (elementWidth / 2);
                const elementCenterY = currentY + (elementHeight / 2);
                const targetIndex = appGrid.findNearestEmptyCell(elementCenterX, elementCenterY, element);
                
                if (targetIndex !== -1) {
                    snapped = appGrid.snapElementToGrid(element, targetIndex);
                }
            }
            
            // If it didn't snap (e.g. out of bounds), return to placeholder
            if (!snapped && element._placeholder) {
                element._placeholder.parentNode.insertBefore(element, element._placeholder);
            }

            // Pixel face landing message and happy reaction
            if (element.querySelector('#pixelFaceSVG')) {
                const nPixelFace = element.closest('.n-pixel-face');
                if (nPixelFace) {
                    nPixelFace.classList.remove('dragging-scared');
                    nPixelFace.classList.add('happy-landing');
                }
                
                const landingMessages = [
                    "🎯 PERFECT LANDING! ✨",
                    "*BZZT* POSITIONED! ⚡",
                    "📍 LOCKED IN! 🔌",
                    "*GLITCH* HERE WE GO! 👾",
                    "💫 TELEPORTED! 🚀",
                    "✅ NEW HOME! 🏠"
                ];
                const msg = landingMessages[Math.floor(Math.random() * landingMessages.length)];
                showPixelFaceMessage(msg, 2000, 'excited');
            }
            
            // Remove placeholder AFTER snapping
            if (element._placeholder) {
                element._placeholder.remove();
                element._placeholder = null;
            }

            // Return to grid flow immediately
            element.classList.remove('mobile-dragging');
            element.style.position = '';
            element.style.left = '';
            element.style.top = '';
            element.style.width = '';
            element.style.height = '';
            element.style.margin = '';
            element.style.transform = '';
            
            // Add bounce animation
            element.classList.add('mobile-drop-land');
            element.style.opacity = '1';
            
            setTimeout(() => {
                element.classList.remove('mobile-drop-land');
                element.style.cursor = 'grab';
                element.style.filter = '';
                element.style.zIndex = '';
                element.style.display = '';
            }, 400);
        } else {
            // Just a tap - reset everything and put back in grid
            if (typeof appGrid !== 'undefined' && appGrid) {
                appGrid.elements.forEach(el => {
                    el.style.zIndex = '';
                });
            }
            
            if (element.querySelector('#pixelFaceSVG')) {
                const nPixelFace = element.closest('.n-pixel-face');
                if (nPixelFace) {
                    nPixelFace.classList.remove('dragging-scared', 'happy-landing');
                }
            }
            
            if (element._placeholder) {
                element._placeholder.remove();
                element._placeholder = null;
            }

            // For tap, reset everything - put back in grid 
            element.classList.remove('mobile-dragging');
            element.style.position = '';
            element.style.left = '';
            element.style.top = '';
            element.style.width = '';
            element.style.height = '';
            element.style.margin = '';
            element.style.display = '';
            element.style.transform = '';
            element.style.cursor = 'grab';
            element.style.filter = '';
            element.style.zIndex = '';
        }
    };
    
    // TOUCH EVENTS (real phone)
    element.addEventListener('touchstart', (e) => {
        if (!e.touches) return;
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    
    element.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches) return;
        if (dragStarted) {
            e.preventDefault(); // Only prevent scroll if actively dragging
        }
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    
    element.addEventListener('touchend', endDrag, { passive: true });
    element.addEventListener('touchcancel', endDrag, { passive: true });
    
    // MOUSE EVENTS (DevTools emulation)
    element.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left mouse button
        startDrag(e.clientX, e.clientY);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveDrag(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseup', endDrag);
}

// Initialize mobile dragging when page loads (debounced to prevent duplicates)
let mobileInitTimeout;
let mobileInitialized = false;

function initMobileWithDebounce() {
    clearTimeout(mobileInitTimeout);
    mobileInitTimeout = setTimeout(() => {
        if (window.innerWidth <= 768 && !mobileInitialized) {
            mobileInitialized = true;
            initializeMobileDragging();
        }
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileWithDebounce);
} else {
    initMobileWithDebounce();
}

// Reinitialize dragging if window is resized to mobile
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        mobileInitialized = false;
        initMobileWithDebounce();
    }
});

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
        if (e.target.closest('.title-right') || e.target.classList.contains('sp-header-icon') || e.target.closest('.speech-bubble-close')) {
            return;
        }
        e = e || window.event;
        e.preventDefault();
        isDragging = true;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Add dragging class to pixel face for scared expression
        if (elmnt.classList.contains('pixel-face-widget')) {
            elmnt.classList.add('dragging');
        }
        
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
    }

    function dragTouchStart(e) {
        if (e.target.closest('.title-right') || e.target.classList.contains('sp-header-icon') || e.target.closest('.speech-bubble-close')) {
            return;
        }
        e = e || window.event;
        isDragging = true;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        
        // Add dragging class to pixel face for scared expression
        if (elmnt.classList.contains('pixel-face-widget')) {
            elmnt.classList.add('dragging');
        }
        
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
        
        // Remove dragging class from pixel face
        if (elmnt.classList.contains('pixel-face-widget')) {
            elmnt.classList.remove('dragging');
            
            // Add digital drop effect when drag stops
            elmnt.classList.add('digi-drop');
            setTimeout(() => {
                elmnt.classList.remove('digi-drop');
            }, 400);
            
            // Show digital landing message
            const digiMessages = [
                "Teleported! 📡✨",
                "*BZZT* Positioned! ⚡",
                "Digital transfer complete! 🔌",
                "Locked in! 🎯✨",
                "*GLITCH* Here I am! 👾",
                "Materialized! 💫"
            ];
            const digiMsg = digiMessages[Math.floor(Math.random() * digiMessages.length)];
            showPixelFaceMessage(digiMsg, 2000, 'excited');
        }
        
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
    const terminal = document.getElementById('terminal-window');
    if (terminal) {
        terminal.style.display = 'none';
        
        // Reset to default size and position when closing
        terminal.style.width = '700px';
        terminal.style.height = '450px';
        terminal.style.top = '50px';
        terminal.style.left = '50px';
        terminal.style.zIndex = '10';
        
        // Reset minimized/maximized states
        isTerminalMinimized = false;
        isTerminalMaximized = false;
        
        // Show window content
        const windowContent = terminal.querySelector('.window-content');
        if (windowContent) {
            windowContent.style.display = 'block';
        }
        
        // Reset title bar border radius
        const titleBar = terminal.querySelector('.title-bar');
        if (titleBar) {
            titleBar.style.borderRadius = '8px 8px 0 0';
        }
    }
}

function minimizeTerminal() {
    const terminal = document.getElementById('terminal-window');
    if (!terminal) return;
    
    const titleBar = terminal.querySelector('.title-bar');
    const windowContent = terminal.querySelector('.window-content');
    
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
        terminal.style.height = terminalOriginalState.height;
    } else {
        // Minimize
        windowContent.style.display = 'none';
        isTerminalMinimized = true;
        if (titleBar) {
            titleBar.style.borderRadius = '8px';
        }
        terminal.style.height = 'auto';
    }
}

function maximizeTerminal() {
    const terminal = document.getElementById('terminal-window');
    if (!terminal) return;
    
    if (isTerminalMaximized) {
        // Restore to saved size
        terminal.style.width = terminalOriginalState.width;
        terminal.style.height = terminalOriginalState.height;
        terminal.style.top = terminalOriginalState.top;
        terminal.style.left = terminalOriginalState.left;
        terminal.style.zIndex = terminalOriginalState.zIndex;
        isTerminalMaximized = false;
    } else {
        // Save current state before maximizing
        if (!isTerminalMaximized) {
            terminalOriginalState = {
                width: terminal.style.width || '700px',
                height: terminal.style.height || '450px',
                top: terminal.style.top || '50px',
                left: terminal.style.left || '50px',
                zIndex: terminal.style.zIndex || '10'
            };
        }
        
        // Maximize to full screen
        terminal.style.width = 'calc(100vw - 40px)';
        terminal.style.height = 'calc(100vh - 80px)';
        terminal.style.top = '20px';
        terminal.style.left = '20px';
        terminal.style.zIndex = '9999';
        isTerminalMaximized = true;
    }
}

function closeMusic() {
    const music = document.getElementById('music-player');
    if (music) {
        music.style.display = 'none';
        
        // Reset to default size and position when closing
        music.style.width = '280px';
        music.style.height = 'auto';
        music.style.bottom = '70px';
        music.style.right = '40px';
        music.style.top = 'auto';
        music.style.left = 'auto';
        music.style.zIndex = '10';
        
        // Hide playlist view and show now playing
        const playlistView = music.querySelector('.sp-playlist');
        const nowPlayingView = music.querySelector('#sp-now-playing');
        if (playlistView) playlistView.style.display = 'none';
        if (nowPlayingView) nowPlayingView.style.display = 'block';
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
            showPixelFaceMessage("Aww, I love this song too! ❤️🎵", 2500, 'loved');
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
    
    audioPlayer.addEventListener('timeupdate', function() {
        updateProgress();
        
        // Random joy reactions and sleep state during music playback
        // Support both desktop and mobile pixel faces
        const pixelFaceWidget = document.querySelector('.pixel-face-widget');
        const mobilePixelFace = document.querySelector('.n-pixel-face');
        const faces = [pixelFaceWidget, mobilePixelFace].filter(f => f !== null);
        
        if (faces.length > 0 && isPlaying) {
            // Occasional excited joy pulses (1% chance per update)
            if (Math.random() < 0.01 && !faces.some(f => f.classList.contains('sleeping-reaction'))) {
                const joyMessages = [
                    "🎵 LOVING IT! 💖",
                    "🎶 YES! 🙌",
                    "🎵 SO GOOD! 🔥",
                    "🎶 BANGER! 🎉",
                    "🎵 VIBE CHECK! ✨",
                    "🎶 KEEP IT GOING! 🚀"
                ];
                const msg = joyMessages[Math.floor(Math.random() * joyMessages.length)];
                showPixelFaceMessage(msg, 1500, 'happy');
                
                // Add playful reaction burst to all faces
                faces.forEach(face => {
                    face.classList.add('playful-reaction');
                    setTimeout(() => {
                        if (isPlaying) face.classList.remove('playful-reaction');
                    }, 600);
                });
            }
            
            // Sleep state logic (2% chance)
            if (Math.random() < 0.02) {
                faces.forEach(face => {
                    if (face.classList.contains('sleeping-reaction')) {
                        // Wake up
                        face.classList.remove('sleeping-reaction');
                        face.classList.add('vibing-reaction', 'happy-reaction');
                        showPixelFaceMessage("🎵 BACK TO VIBING! 💫", 1500, 'happy');
                    } else if (!face.classList.contains('sleeping-reaction')) {
                        // Fall asleep (20% of the time)
                        if (Math.random() < 0.2) {
                            face.classList.remove('vibing-reaction', 'happy-reaction', 'playful-reaction');
                            face.classList.add('sleeping-reaction');
                            
                            // Wake up after 5-10 seconds
                            const wakeUpTime = Math.random() * 5000 + 5000;
                            if (face.sleepTimeout) clearTimeout(face.sleepTimeout);
                            face.sleepTimeout = setTimeout(() => {
                                if (isPlaying && face.classList.contains('sleeping-reaction')) {
                                    face.classList.remove('sleeping-reaction');
                                    face.classList.add('vibing-reaction', 'happy-reaction');
                                    showPixelFaceMessage("😄 ZZZ... OH! THE MUSIC! 🎵", 1500, 'happy');
                                }
                            }, wakeUpTime);
                        }
                    }
                });
            }
        }
    });
    
    // Handle stalled audio
    audioPlayer.addEventListener('stalled', function() {
        console.warn('Audio playback stalled');
    });
    
    audioPlayer.addEventListener('suspend', function() {
        console.warn('Audio download suspended');
    });
}

// --- DANCING EYE AND MOUTH ANIMATIONS ---
function resetFaceExpression() {
    // Support both desktop and mobile SVGs
    const desktopSVG = document.getElementById('pixelFaceSVGDesktop');
    const mobileSVG = document.getElementById('pixelFaceSVG');
    const svgs = [desktopSVG, mobileSVG].filter(s => s !== null);
    
    svgs.forEach(pixelFaceSVG => {
        // Reset eyes to open
        const eyesOpen = pixelFaceSVG.querySelector('.eyes-open');
        const eyesClosed = pixelFaceSVG.querySelector('.eyes-closed');
        if (eyesOpen) eyesOpen.style.opacity = '1';
        if (eyesClosed) eyesClosed.style.opacity = '0';
        
        // Reset mouth to big smile
        const mouth = pixelFaceSVG.querySelector('.mouth');
        if (mouth) {
            mouth.classList.remove('mouth-straight', 'mouth-smile-small', 'mouth-scared', 'mouth-punched');
            mouth.classList.add('mouth-smile-big');
        }
    });
}

function startDancingAnimation() {
    // Clear any existing animation
    if (window.danceEyeMouthInterval) {
        clearInterval(window.danceEyeMouthInterval);
    }
    
    // Support both desktop and mobile SVGs
    const desktopSVG = document.getElementById('pixelFaceSVGDesktop');
    const mobileSVG = document.getElementById('pixelFaceSVG');
    const svgs = [desktopSVG, mobileSVG].filter(s => s !== null);
    
    if (svgs.length === 0) return;
    
    let animationStep = 0;
    
    window.danceEyeMouthInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(window.danceEyeMouthInterval);
            return;
        }
        
        // Apply same animation to all pixel face versions
        svgs.forEach(pixelFaceSVG => {
            const eyesOpen = pixelFaceSVG.querySelector('.eyes-open');
            const eyesClosed = pixelFaceSVG.querySelector('.eyes-closed');
            const mouth = pixelFaceSVG.querySelector('.mouth');
            
            if (!eyesOpen || !eyesClosed || !mouth) return;
            
            // Cycle through different eye and mouth combinations for dancing effect
            switch (animationStep % 8) {
                case 0:
                    // Big smile with open eyes - peak enthusiasm
                    eyesOpen.style.opacity = '1';
                    eyesClosed.style.opacity = '0';
                    mouth.classList.remove('mouth-straight', 'mouth-smile-small', 'mouth-scared');
                    mouth.classList.add('mouth-smile-big');
                    break;
                case 1:
                    // Quick blink
                    eyesOpen.style.opacity = '0';
                    eyesClosed.style.opacity = '1';
                    break;
                case 2:
                    // Back to big smile
                    eyesOpen.style.opacity = '1';
                    eyesClosed.style.opacity = '0';
                    mouth.classList.remove('mouth-straight', 'mouth-smile-small', 'mouth-scared');
                    mouth.classList.add('mouth-smile-big');
                    break;
                case 3:
                    // Medium smile with wink (half-closed eyes) - playful
                    eyesOpen.style.opacity = '0.5';
                    eyesClosed.style.opacity = '0.5';
                    mouth.classList.remove('mouth-smile-big', 'mouth-straight', 'mouth-scared');
                    mouth.classList.add('mouth-smile-small');
                    break;
                case 4:
                    // Big smile open mouth
                    eyesOpen.style.opacity = '1';
                    eyesClosed.style.opacity = '0';
                    mouth.classList.remove('mouth-smile-small', 'mouth-straight', 'mouth-scared');
                    mouth.classList.add('mouth-smile-big');
                    break;
                case 5:
                    // Blink again
                    eyesOpen.style.opacity = '0';
                    eyesClosed.style.opacity = '1';
                    mouth.classList.remove('mouth-smile-big', 'mouth-smile-small', 'mouth-scared');
                    mouth.classList.add('mouth-straight');
                    break;
                case 6:
                    // Back to open with big smile
                    eyesOpen.style.opacity = '1';
                    eyesClosed.style.opacity = '0';
                    mouth.classList.remove('mouth-straight', 'mouth-smile-small', 'mouth-scared');
                    mouth.classList.add('mouth-smile-big');
                    break;
                case 7:
                    // Surprised/excited expression
                    eyesOpen.style.opacity = '1';
                    eyesClosed.style.opacity = '0';
                    mouth.classList.remove('mouth-smile-small', 'mouth-straight', 'mouth-scared');
                    mouth.classList.add('mouth-smile-big');
                    break;
            }
        });
        
        animationStep++;
    }, 300); // Change expression every 300ms for dancing effect
}

function toggleMusic() {
    if (!audioPlayer) return;
    const playBtn = document.getElementById('play-btn');
    if (!playBtn) return;
    
    // Support both desktop and mobile pixel faces
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    const mobilePixelFace = document.querySelector('.n-pixel-face');
    const faces = [pixelFaceWidget, mobilePixelFace].filter(f => f !== null);
    
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        playBtn.textContent = '▶';
        playBtn.style.marginLeft = '4px';
        // Remove music reactions and stop dancing animations
        faces.forEach(face => {
            face.classList.remove('vibing-reaction', 'sleeping-reaction', 'happy-reaction');
            clearInterval(window.danceEyeMouthInterval);
            // Reset eyes and mouth to normal
            resetFaceExpression();
        });
    } else {
        audioPlayer.play().catch(err => {
            console.warn('Could not play audio:', err);
            isPlaying = false;
        });
        isPlaying = true;
        playBtn.textContent = '⏸';
        playBtn.style.marginLeft = '0px';
        // Add vibing + joyful happy reaction
        faces.forEach(face => {
            face.classList.add('vibing-reaction', 'happy-reaction');
        });
        
        // Show enthusiastic joyful message
        const musicMessages = [
            "🎵 I LOVE THIS! 🎉✨",
            "🎶 PURE JOY! 😄💫",
            "🎵 THIS SLAPS! 🔥",
            "🎶 SO GOOD! 🎊🎊",
            "🎵 AMAZING VIBE! ✨😍",
            "🎶 YES YES YES! 🙌🎵",
            "🎵 EARGASM! 😭😭💕",
            "🎶 PERFECTION! 👑✨",
            "🎵 I COULD DANCE! 💃🕺",
            "🎶 ABSOLUTE BOP! 🔥🔥"
        ];
        const msg = musicMessages[Math.floor(Math.random() * musicMessages.length)];
        showPixelFaceMessage(msg, 3000, 'happy');
        
        // Start dancing eye and mouth animations
        startDancingAnimation();
        
        // Add occasional excited reaction boost to both faces
        if (Math.random() < 0.4) {
            faces.forEach(face => {
                face.classList.add('excited-reaction');
                setTimeout(() => {
                    if (isPlaying && face.classList.contains('excited-reaction')) {
                        face.classList.remove('excited-reaction');
                    }
                }, 1000);
            });
        }
    }
}

function stopMusic() {
    if (!audioPlayer) return;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    const playBtn = document.getElementById('play-btn');
    
    // Support both desktop and mobile pixel faces
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    const mobilePixelFace = document.querySelector('.n-pixel-face');
    const faces = [pixelFaceWidget, mobilePixelFace].filter(f => f !== null);
    
    // Stop dancing animations
    if (window.danceEyeMouthInterval) {
        clearInterval(window.danceEyeMouthInterval);
    }
    resetFaceExpression();
    
    if (playBtn) {
        playBtn.textContent = '▶';
        playBtn.style.marginLeft = '4px';
    }
    
    // Remove music reactions with a goodbye message from all faces
    faces.forEach(face => {
        face.classList.remove('vibing-reaction', 'sleeping-reaction', 'happy-reaction', 'excited-reaction', 'playful-reaction');
        clearTimeout(face.sleepTimeout);
    });
    
    // Show goodbye message
    const goodbyeMessages = [
        "🎵 That was AMAZING! 💫",
        "🎶 WHAT A JAM! 🔥",
        "🎵 ENCORE! 🙌",
        "🎶 LET'S PLAY MORE! 🎵",
        "🎵 *SATISFIED* 😊✨"
    ];
    const msg = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
    showPixelFaceMessage(msg, 2500, 'happy');
    
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

// --- PIXEL FACE EYES FOLLOW CURSOR ---
function setupEyesFollowCursor() {
    // Mobile pixel face
    const pixelFaceSVG = document.getElementById('pixelFaceSVG');
    const leftPupilMobile = pixelFaceSVG ? pixelFaceSVG.querySelector('.left-pupil') : null;
    const rightPupilMobile = pixelFaceSVG ? pixelFaceSVG.querySelector('.right-pupil') : null;
    const leftPupilMobileScared = pixelFaceSVG ? pixelFaceSVG.querySelector('.left-pupil-scared') : null;
    const rightPupilMobileScared = pixelFaceSVG ? pixelFaceSVG.querySelector('.right-pupil-scared') : null;
    
    // Desktop pixel face
    const pixelFaceSVGDesktop = document.getElementById('pixelFaceSVGDesktop');
    const leftPupilDesktop = pixelFaceSVGDesktop ? pixelFaceSVGDesktop.querySelector('.left-pupil') : null;
    const rightPupilDesktop = pixelFaceSVGDesktop ? pixelFaceSVGDesktop.querySelector('.right-pupil') : null;
    const leftPupilDesktopScared = pixelFaceSVGDesktop ? pixelFaceSVGDesktop.querySelector('.left-pupil-scared') : null;
    const rightPupilDesktopScared = pixelFaceSVGDesktop ? pixelFaceSVGDesktop.querySelector('.right-pupil-scared') : null;
    
    if (!pixelFaceSVG && !pixelFaceSVGDesktop) return;
    
    document.addEventListener('mousemove', (e) => {
        // Update mobile pixel face
        if (pixelFaceSVG) {
            const rect = pixelFaceSVG.getBoundingClientRect();
            const faceX = rect.left + rect.width / 2;
            const faceY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angle = Math.atan2(mouseY - faceY, mouseX - faceX);
            const distance = 3;
            
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            // Update normal pupils
            if (leftPupilMobile && rightPupilMobile) {
                leftPupilMobile.setAttribute('transform', `translate(23, 23) translate(${offsetX}, ${offsetY})`);
                rightPupilMobile.setAttribute('transform', `translate(39, 23) translate(${offsetX}, ${offsetY})`);
            }
            
            // Update scared pupils
            if (leftPupilMobileScared && rightPupilMobileScared) {
                leftPupilMobileScared.setAttribute('transform', `translate(23, 23) translate(${offsetX}, ${offsetY})`);
                rightPupilMobileScared.setAttribute('transform', `translate(41, 23) translate(${offsetX}, ${offsetY})`);
            }
        }
        
        // Update desktop pixel face
        if (pixelFaceSVGDesktop) {
            const rectDesktop = pixelFaceSVGDesktop.getBoundingClientRect();
            const faceXDesktop = rectDesktop.left + rectDesktop.width / 2;
            const faceYDesktop = rectDesktop.top + rectDesktop.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angle = Math.atan2(mouseY - faceYDesktop, mouseX - faceXDesktop);
            const distance = 3;
            
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            // Update normal pupils
            if (leftPupilDesktop && rightPupilDesktop) {
                leftPupilDesktop.setAttribute('transform', `translate(23, 23) translate(${offsetX}, ${offsetY})`);
                rightPupilDesktop.setAttribute('transform', `translate(39, 23) translate(${offsetX}, ${offsetY})`);
            }
            
            // Update scared pupils
            if (leftPupilDesktopScared && rightPupilDesktopScared) {
                leftPupilDesktopScared.setAttribute('transform', `translate(23, 23) translate(${offsetX}, ${offsetY})`);
                rightPupilDesktopScared.setAttribute('transform', `translate(41, 23) translate(${offsetX}, ${offsetY})`);
            }
        }
    });
}

// --- PIXEL FACE MODES ---
const faceModes = ['standard', 'party', 'hacker', 'focus', 'spidey'];
let currentFaceModeIndex = 0;

function cycleFaceMode() {
    const desktopFace = document.querySelector('.pixel-face-widget');
    const mobileFace = document.querySelector('.n-pixel-face');
    const faces = [desktopFace, mobileFace].filter(f => f !== null);
    
    const oldMode = faceModes[currentFaceModeIndex];
    faces.forEach(face => face.classList.remove(`mode-${oldMode}`));
    
    currentFaceModeIndex = (currentFaceModeIndex + 1) % faceModes.length;
    const newMode = faceModes[currentFaceModeIndex];
    
    faces.forEach(face => {
        if (newMode !== 'standard') {
            face.classList.add(`mode-${newMode}`);
        }
    });
    
    const modeMessages = {
        'standard': "Standard Mode! Let's go! 😊",
        'party': "Party Mode! Let's dance! 🎉🎶",
        'hacker': "Hacker Mode activated... 💻🕶️",
        'focus': "Focus Mode... Zzz... 🤫",
        'spidey': "My Spidey-Sense is tingling! 🕸️🕷️ Click anywhere!"
    };
    
    let reaction = 'normal';
    if (newMode === 'party') reaction = 'excited';
    if (newMode === 'focus') reaction = 'sleeping';
    if (newMode === 'hacker') reaction = 'cool';
    if (newMode === 'spidey') reaction = 'excited';
    
    showPixelFaceMessage(modeMessages[newMode], 3000, reaction);
}

// --- PIXEL FACE EASTER EGGS & SPECIAL REACTIONS ---
function setupPixelFaceEasterEggs() {
    const speechBubble = document.getElementById('pixelFaceSpeechBubble');
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    const mobilePixelFace = document.querySelector('.n-pixel-face');
    
    const faces = [pixelFaceWidget, mobilePixelFace].filter(f => f !== null);
    
    // Right-click / Long-press reaction (context menu) to cycle modes
    faces.forEach(face => {
        face.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            cycleFaceMode();
        });
    });
    
    // Triple-click reaction
    let clickCount = 0;
    let clickTimeout;
    faces.forEach(face => {
        face.addEventListener('click', function(e) {
            if (this.classList.contains('dragging')) return;
            
            clickCount++;
            clearTimeout(clickTimeout);
            
            if (clickCount === 3) {
                const tripleClickMessages = [
                    "OKAY! THREE TIMES! I got it! 😱",
                    "Triple threat! 💥",
                    "Easy with the clicks! 🖱️",
                    "Wow, enthusiastic much? 😄",
                    "Triple punch? Respect! 👊👊👊"
                ];
                const msg = tripleClickMessages[Math.floor(Math.random() * tripleClickMessages.length)];
                showPixelFaceMessage(msg, 2500, 'shocked');
            } else if (clickCount >= 7) {
                const rageMessages = [
                    "STOP CLICKING ME!!! 🤬",
                    "THAT IS IT! I'M ANGRY! 😤",
                    "GIVE ME A BREAK!!! 🌋",
                    "ENOUGH IS ENOUGH! 💢"
                ];
                const msg = rageMessages[Math.floor(Math.random() * rageMessages.length)];
                showPixelFaceMessage(msg, 3500, 'angry');
                clickCount = 0; // reset
            }
            
            clickTimeout = setTimeout(() => {
                clickCount = 0;
            }, 500);
        });
    });
    
    // Time-based greetings
    function getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "☀️ Good morning! Ready to code?";
        } else if (hour < 17) {
            return "🌤️ Good afternoon! Keep up the work!";
        } else if (hour < 21) {
            return "🌆 Good evening! Almost done?";
        } else {
            return "🌙 Late night coder! Stay hydrated! 💧";
        }
    }
    
    // Show time-based message on load (randomly)
    if (Math.random() < 0.3) {
        setTimeout(() => {
            showPixelFaceMessage(getTimeBasedGreeting(), 3000, 'happy');
        }, 5000);
    }
    
    // Keyboard spam reaction
    let keyPressCount = 0;
    let keyPressTimeout;
    document.addEventListener('keydown', () => {
        keyPressCount++;
        
        if (keyPressCount === 20) {
            const spamMessages = [
                "Whoa! Slow down! 🔥",
                "Easy there, speedster! ⚡",
                "I'm getting dizzy from all these keys! 🌀",
                "That's a lot of typing! 📝",
                "Deep breaths! 🧘"
            ];
            const msg = spamMessages[Math.floor(Math.random() * spamMessages.length)];
            showPixelFaceMessage(msg, 2000, 'confused');
            keyPressCount = 0;
        }
        
        clearTimeout(keyPressTimeout);
        keyPressTimeout = setTimeout(() => {
            keyPressCount = 0;
        }, 2000);
    });
    
    // Window resize reaction
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (Math.random() < 0.4) {
                const resizeMessages = [
                    "Getting comfortable? 📐",
                    "Adjusting the view? 🖥️",
                    "New window size? Cool! 📱",
                    "Redecorating? 🎨"
                ];
                const msg = resizeMessages[Math.floor(Math.random() * resizeMessages.length)];
                showPixelFaceMessage(msg, 1500, 'curious');
            }
        }, 1000);
    });
    
    // Form submission reaction
    document.addEventListener('submit', (e) => {
        const formMessages = [
            "Submitting? Fingers crossed! 🤞",
            "Here we go! 🚀",
            "Send it! 📤",
            "Good luck! 🍀",
            "Let's do this! 💪"
        ];
        const msg = formMessages[Math.floor(Math.random() * formMessages.length)];
        showPixelFaceMessage(msg, 2000, 'excited');
    });
    
    // Mouseover text elements for extra personality
    const textElements = document.querySelectorAll('h1, h2, h3, .title-center');
    textElements.forEach(elem => {
        elem.addEventListener('mouseenter', function(e) {
            if (speechBubble.classList.contains('hidden') && Math.random() < 0.2) {
                const readingMessages = [
                    "Reading titles? 📖",
                    "Good text! 📝",
                    "I like that section! 👍",
                    "Interesting heading! 🤔"
                ];
                const msg = readingMessages[Math.floor(Math.random() * readingMessages.length)];
                showPixelFaceMessage(msg, 1500, 'curious');
            }
        });
    });
}

// --- PIXEL FACE DODGING & AUTO-MOVEMENT ---
let faceDodgeMode = false; // Toggle for dodge behavior
let faceAutoMoveInterval = null;

function getRandomPosition() {
    // Get viewport dimensions
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const faceSize = 120; // Face widget size
    const minMargin = 100; // Keep away from edges
    
    const minX = minMargin;
    const maxX = vw - faceSize - minMargin;
    const minY = minMargin;
    const maxY = vh - faceSize - minMargin;
    
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    
    return { x, y };
}

function moveFaceToPosition(x, y, duration = 0.5, callback = null) {
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    if (!pixelFaceWidget) return;
    
    // Use smooth transition
    pixelFaceWidget.style.transition = `all ${duration}s ease-in-out`;
    pixelFaceWidget.style.position = 'fixed';
    pixelFaceWidget.style.left = x + 'px';
    pixelFaceWidget.style.top = y + 'px';
    pixelFaceWidget.style.bottom = 'auto';
    pixelFaceWidget.style.right = 'auto';
    
    if (callback) {
        setTimeout(callback, duration * 1000);
    }
}

function startAutoMovement() {
    const moveMessages = [
        "I'm on the move! 🏃",
        "Catch me if you can! 🏃💨",
        "Wheee! 🚀",
        "Running around! 😄",
        "Chase time! 🎮",
        "Tag, you're it! 🏷️",
        "I'm a wanderer! 🗺️",
        "Exploring the page! 🔍"
    ];
    
    // Clear existing interval if any
    if (faceAutoMoveInterval) {
        clearInterval(faceAutoMoveInterval);
    }
    
    // Move every 5-8 seconds randomly
    faceAutoMoveInterval = setInterval(() => {
        if (!faceDodgeMode) return;
        
        const position = getRandomPosition();
        const duration = 0.4 + Math.random() * 0.3; // 0.4-0.7s
        
        moveFaceToPosition(position.x, position.y, duration, () => {
            // Random chance to show message
            if (Math.random() < 0.4) {
                const msg = moveMessages[Math.floor(Math.random() * moveMessages.length)];
                showPixelFaceMessage(msg, 2000, 'playful');
            }
        });
    }, 5000 + Math.random() * 3000); // 5-8 second intervals
}

function stopAutoMovement() {
    if (faceAutoMoveInterval) {
        clearInterval(faceAutoMoveInterval);
        faceAutoMoveInterval = null;
    }
}

function dodgeFromCursor(cursorX, cursorY) {
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    if (!pixelFaceWidget) return;
    
    const faceRect = pixelFaceWidget.getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;
    
    // Calculate angle away from cursor
    const angle = Math.atan2(faceCenterY - cursorY, faceCenterX - cursorX);
    
    // Calculate dodge distance
    const dodgeDistance = 150 + Math.random() * 100; // 150-250px
    
    const dodgeX = faceCenterX + Math.cos(angle) * dodgeDistance - faceRect.width / 2;
    const dodgeY = faceCenterY + Math.sin(angle) * dodgeDistance - faceRect.height / 2;
    
    // Clamp to viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const faceSize = 120;
    const minMargin = 50;
    
    const clampedX = Math.max(minMargin, Math.min(dodgeX, vw - faceSize - minMargin));
    const clampedY = Math.max(minMargin, Math.min(dodgeY, vh - faceSize - minMargin));
    
    moveFaceToPosition(clampedX, clampedY, 0.3);
}

function setupPixelFaceDodge() {
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    if (!pixelFaceWidget) return;
    
    const dodgeMessages = [
        "Haha! Missed me! 😝",
        "Not fast enough! ⚡",
        "You can't catch me! 🏃",
        "Nope nope nope! 🚫",
        "Almost there! 😄",
        "Try again! 🎯",
        "Butterfingers! 🍌",
        "Ha! I'm quick! ✨"
    ];
    
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    // Dodge on mouseover when dodge mode is active
    pixelFaceWidget.addEventListener('mouseover', function(e) {
        if (!faceDodgeMode) return;
        
        // 60% chance to dodge
        if (Math.random() < 0.6) {
            dodgeFromCursor(cursorX, cursorY);
            
            // 40% chance to show message
            if (Math.random() < 0.4) {
                const msg = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];
                showPixelFaceMessage(msg, 1500, 'playful');
            }
        }
    });
}

function toggleFaceDodgeMode() {
    faceDodgeMode = !faceDodgeMode;
    
    if (faceDodgeMode) {
        showPixelFaceMessage("Dodge mode activated! Try to catch me! 🏃💨", 2500, 'excited');
        startAutoMovement();
    } else {
        showPixelFaceMessage("Phew! I'm safe now! 😊", 2000, 'happy');
        stopAutoMovement();
    }
}

// --- PIXEL FACE PUNCH INTERACTION ---
function setupPixelFacePunch() {
    // Desktop pixel face
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    // Mobile pixel face
    const mobilePixelFace = document.querySelector('.n-pixel-face');
    
    const widgets = [pixelFaceWidget, mobilePixelFace].filter(w => w !== null);
    
    widgets.forEach(widget => {
        widget.style.cursor = 'pointer';
        let isPunching = false; // Flag to prevent overlapping punches
        
        widget.addEventListener('click', function(e) {
            // Prevent multiple punches at the same time
            if (isPunching) return;
            
            // Don't trigger punch if we're dragging (desktop only)
            if (this.classList.contains('dragging')) return;
            
            // Check if we're clicking in the middle area (the face)
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate distance from center
            const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
            const threshold = Math.min(rect.width, rect.height) / 2; // Approx face size
            
            // Only trigger punch if clicking near the center
            if (distance < threshold * 0.7) {
                isPunching = true;
                
                // Add punched class and animation
                this.classList.add('punched');
                this.style.animation = 'punchShake 0.3s ease-in-out';
                
                // Show varied punch reactions with different reaction types
                const punchReactions = [
                    { msg: "Ouch! That hurt! 😢", reaction: 'sad' },
                    { msg: "Hey! What was that for?! 😠", reaction: 'shocked' },
                    { msg: "Ow ow ow! 😭", reaction: 'sad' },
                    { msg: "Stop hitting me! 😫", reaction: 'shocked' },
                    { msg: "That one stung! 🤕", reaction: 'sad' },
                    { msg: "Easy with the fists! 😤", reaction: 'surprised' },
                    { msg: "Did we go to war? 💥", reaction: 'shocked' },
                    { msg: "Alright, I'm dizzy! 🌀", reaction: 'surprised' }
                ];
                const punchReaction = punchReactions[Math.floor(Math.random() * punchReactions.length)];
                showPixelFaceMessage(punchReaction.msg, 3000, punchReaction.reaction);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    this.classList.remove('punched');
                    this.style.animation = '';
                    isPunching = false;
                }, 3000);
            }
        });
    });
}

// --- PIXEL FACE HELPER MESSAGE SYSTEM ---
function showPixelFaceMessage(message, duration = 3000, reactionType = 'normal') {
    const speechBubble = document.getElementById('pixelFaceSpeechBubble');
    const speechText = document.getElementById('speechText');
    const mobileSpeechBubble = document.getElementById('mobilePixelFaceSpeechBubble');
    const mobileSpeechText = document.getElementById('mobileSpeechText');
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    const mobilePixelFace = document.querySelector('.n-pixel-face');
    const faces = [pixelFaceWidget, mobilePixelFace].filter(f => f !== null);
    
    // Clear any existing timeout
    if (window.faceMessageTimeout) {
        clearTimeout(window.faceMessageTimeout);
    }
    
    const reactionClasses = ['happy-reaction', 'curious-reaction', 'surprised-reaction', 'excited-reaction', 'confused-reaction', 'playful-reaction', 'sad-reaction', 'cute-reaction', 'cool-reaction', 'shocked-reaction', 'wondering-reaction', 'idle-reaction', 'angry-reaction', 'dizzy-reaction', 'loved-reaction'];
    
    // Apply reaction styling to BOTH faces
    faces.forEach(face => {
        reactionClasses.forEach(cls => face.classList.remove(cls));
        if (reactionType !== 'normal') {
            face.classList.add(reactionType + '-reaction');
        }
    });
    
    // Update text and show bubble for desktop
    if (speechBubble && speechText) {
        speechText.textContent = message;
        speechBubble.classList.remove('hidden');
    }
    
    // Update text and show bubble for mobile
    if (mobileSpeechBubble && mobileSpeechText) {
        mobileSpeechText.textContent = message;
        mobileSpeechBubble.classList.remove('hidden');
    }
    
    // Auto-hide after duration
    window.faceMessageTimeout = setTimeout(() => {
        if (speechBubble) speechBubble.classList.add('hidden');
        if (mobileSpeechBubble) mobileSpeechBubble.classList.add('hidden');
        faces.forEach(face => {
            reactionClasses.forEach(cls => face.classList.remove(cls));
        });
    }, duration);
}

function setupPixelFaceHelper() {
    const speechBubble = document.getElementById('pixelFaceSpeechBubble');
    const speechText = document.getElementById('speechText');
    const closeBtn = document.getElementById('closeSpeech');
    const pixelFaceWidget = document.querySelector('.pixel-face-widget');
    
    if (!speechBubble || !speechText || !closeBtn) return;
    
    // Idle reaction system
    let idleTimer = null;
    let isIdle = false;
    const IDLE_TIMEOUT = 8000; // 8 seconds before showing idle reaction
    
    const wonderingMessages = [
        "🤔 What are you up to?",
        "🤔 Still there?",
        "💭 Wondering about something?",
        "👀 Hello? Anyone there?",
        "🤔 What's on your mind?",
        "💭 I'm here whenever you need me!",
        "🤔 Taking a break?"
    ];
    
    function triggerIdleReaction() {
        if (!speechBubble.classList.contains('hidden') || isIdle) return;
        isIdle = true;
        
        const wonderMsg = wonderingMessages[Math.floor(Math.random() * wonderingMessages.length)];
        
        if (pixelFaceWidget) {
            pixelFaceWidget.classList.remove('happy-reaction', 'curious-reaction', 'surprised-reaction', 'excited-reaction', 'confused-reaction', 'playful-reaction', 'sad-reaction', 'cute-reaction', 'cool-reaction', 'shocked-reaction');
            pixelFaceWidget.classList.add('wondering-reaction');
        }
        
        speechBubble.classList.remove('hidden');
        speechText.textContent = wonderMsg;
    }
    
    function resetIdleTimer() {
        // Clear existing idle timer
        if (idleTimer) {
            clearTimeout(idleTimer);
        }
        
        // Reset idle state
        if (isIdle) {
            isIdle = false;
            speechBubble.classList.add('hidden');
            if (pixelFaceWidget) {
                pixelFaceWidget.classList.remove('wondering-reaction');
            }
        }
        
        // Set new idle timer
        idleTimer = setTimeout(() => {
            triggerIdleReaction();
        }, IDLE_TIMEOUT);
    }
    
    // Track all user interactions to reset idle timer
    const interactionEvents = ['click', 'mousemove', 'touchstart', 'keypress', 'wheel'];
    interactionEvents.forEach(event => {
        document.addEventListener(event, resetIdleTimer, true);
    });
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        speechBubble.classList.add('hidden');
        const mobileSpeechBubble = document.getElementById('mobilePixelFaceSpeechBubble');
        if (mobileSpeechBubble) mobileSpeechBubble.classList.add('hidden');
        if (window.faceMessageTimeout) {
            clearTimeout(window.faceMessageTimeout);
        }
        resetIdleTimer();
    });
    
    // Initial greeting after page loads
    setTimeout(() => {
        const greetings = [
            "Hey! I'm your helper! 👋 Explore the page, drag me around, or click me to see what happens!",
            "Welcome! 🎉 I'm here to guide you. Feel free to click or drag me!",
            "Hi there! 😊 Let's explore together!"
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        showPixelFaceMessage(randomGreeting, 5000, 'happy');
        resetIdleTimer();
    }, 800);
    
    // Add helper hints for interactive elements
    const setupHints = () => {
        // Terminal dock
        const dockTerminal = document.getElementById('dock-terminal');
        if (dockTerminal) {
            dockTerminal.addEventListener('mouseenter', () => {
                if (!speechBubble.classList.contains('hidden')) return;
                const terminalHints = [
                    "💻 Click here to open the terminal and explore my projects!",
                    "💻 Curious? The terminal has my projects and commands!",
                    "💻 Want to see some code? Open the terminal!"
                ];
                const hint = terminalHints[Math.floor(Math.random() * terminalHints.length)];
                showPixelFaceMessage(hint, 2500, 'curious');
            });
            
            dockTerminal.addEventListener('click', () => {
                showPixelFaceMessage("Terminal's opening! Exciting! 🤓", 1000, 'excited');
            });
        }
        
        // Music player dock
        const dockMusic = document.getElementById('dock-music');
        if (dockMusic) {
            dockMusic.addEventListener('mouseenter', () => {
                if (!speechBubble.classList.contains('hidden')) return;
                const musicHints = [
                    "🎵 Click here to open the music player and enjoy some tracks!",
                    "🎵 Let's listen to some music together!",
                    "🎵 Music makes me happy! 🎶"
                ];
                const hint = musicHints[Math.floor(Math.random() * musicHints.length)];
                showPixelFaceMessage(hint, 2500, 'happy');
            });
            
            dockMusic.addEventListener('click', () => {
                showPixelFaceMessage("Let the music play! 🎶✨", 1000, 'excited');
            });
        }
        
        // Desktop icon (Home folder)
        const homeIcon = document.querySelector('.desktop-icon');
        if (homeIcon) {
            homeIcon.addEventListener('mouseenter', () => {
                if (!speechBubble.classList.contains('hidden')) return;
                showPixelFaceMessage("📁 This is the home folder - your starting point.", 2000, 'normal');
            });
            
            homeIcon.addEventListener('click', () => {
                showPixelFaceMessage("📁 Home sweet home! 🏠", 1000, 'happy');
            });
        }
        
        // Pixel face widget itself - multiple interactions
        const pixelFaceWidget = document.querySelector('.pixel-face-widget');
        if (pixelFaceWidget) {
            let faceHoverCount = 0;
            
            pixelFaceWidget.addEventListener('mouseenter', () => {
                if (!speechBubble.classList.contains('hidden')) return;
                faceHoverCount++;
                
                let faceMessage;
                if (faceHoverCount > 3) {
                    faceMessage = "Stop tickling me! 😄";
                    faceHoverCount = 0;
                } else {
                    const faceHints = [
                        "You can drag me around! Or click me to punch! 👊",
                        "Try dragging me to a new spot!",
                        "Click me! Drag me! I'm interactive! 😊",
                        "💡 Press Ctrl+D to make me dodge! 🏃💨"
                    ];
                    faceMessage = faceHints[Math.floor(Math.random() * faceHints.length)];
                }
                showPixelFaceMessage(faceMessage, 2000, 'playful');
            });
            
            // Double-click reaction
            let lastClickTime = 0;
            pixelFaceWidget.addEventListener('dblclick', function(e) {
                const currentTime = new Date().getTime();
                if (currentTime - lastClickTime < 500) {
                    // This is actually a double click
                    const doubleClickMessages = [
                        "Wow, that tickles! 😂",
                        "Double punch? You're aggressive! 💥",
                        "Fast reflexes! 🏃",
                        "Easy, easy! 😅"
                    ];
                    const msg = doubleClickMessages[Math.floor(Math.random() * doubleClickMessages.length)];
                    showPixelFaceMessage(msg, 3000, 'surprised');
                }
                lastClickTime = currentTime;
            });
        }
        
        // Add hints for other pages if available
        const animeLink = document.querySelector('a[href="anime.html"]');
        if (animeLink) {
            animeLink.addEventListener('mouseenter', () => {
                if (!speechBubble.classList.contains('hidden')) return;
                const animeHints = [
                    "🎬 Click here to visit the anime recommendations page!",
                    "🎬 Want to see my favorite anime? Go there!",
                    "🎬 Anime lover? You'll love this section!"
                ];
                const hint = animeHints[Math.floor(Math.random() * animeHints.length)];
                showPixelFaceMessage(hint, 2500, 'excited');
            });
            
            animeLink.addEventListener('click', () => {
                showPixelFaceMessage("Have fun watching! 🍿✨", 1000, 'happy');
            });
        }
        
        // Profile switcher interactions
        const profileSwitcher = document.querySelector('.profile-switcher');
        if (profileSwitcher) {
            profileSwitcher.addEventListener('mouseenter', () => {
                if (!speechBubble.classList.contains('hidden')) return;
                showPixelFaceMessage("👤 Switch profiles to see different sides of me!", 2000, 'curious');
            });
            
            profileSwitcher.addEventListener('click', () => {
                const switchMessages = [
                    "New profile unlocked! 🎉",
                    "I wear many hats! 🎩",
                    "Different me, same charm! 😊",
                    "Profile switch activated! ⚡"
                ];
                const msg = switchMessages[Math.floor(Math.random() * switchMessages.length)];
                showPixelFaceMessage(msg, 1200, 'excited');
            });
        }
        
        // Social media links & external icons
        const socialLinks = {
            'github': { msg: "🐙 My GitHub! Check out my projects! Please follow me! 👉", reactions: ['excited', 'curious'] },
            'twitter': { msg: "🐦 Twitter! Follow for updates! Please follow me! 👉", reactions: ['playful', 'happy'] },
            'linkedin': { msg: "💼 LinkedIn! Professional vibes! Please follow me! 👉", reactions: ['cool', 'curious'] },
            'tiktok': { msg: "🎵 TikTok! Entertainment incoming! Please follow me! 👉", reactions: ['playful', 'happy'] },
            'instagram': { msg: "📸 Instagram! Visual stuff! Please follow me! 👉", reactions: ['happy', 'playful'] },
            'youtube': { msg: "📹 YouTube! Videos galore! Please follow me! 👉", reactions: ['excited', 'happy'] },
            'discord': { msg: "💬 Discord! Let's chat! Please follow me! 👉", reactions: ['playful', 'happy'] },
            'email': { msg: "📧 Send me an email!", reactions: ['curious', 'happy'] },
            'resume': { msg: "📄 Check out my resume!", reactions: ['cool', 'excited'] },
            'portfolio': { msg: "🎨 My portfolio! Art incoming!", reactions: ['excited', 'curious'] },
            'gmail': { msg: "📧 Gmail! Send me a message! Please follow me! 👉", reactions: ['curious', 'happy'] },
            'facebook': { msg: "👥 Facebook! Let's connect! Please follow me! 👉", reactions: ['playful', 'happy'] },
            'kaggle': { msg: "🏆 Kaggle! Check my competitions! Please follow me! 👉", reactions: ['excited', 'curious'] },
            'animehub': { msg: "🎬 AnimeHub! My anime timeline! Please follow me! 👉", reactions: ['excited', 'happy'] }
        };
        
        // Find and add hover descriptions for social links
        Object.keys(socialLinks).forEach(platform => {
            // Try common selectors for social icons
            const selectors = [
                `a[href*="${platform}"]`,
                `.${platform}`,
                `.${platform}-link`,
                `[data-platform="${platform}"]`,
                `.social-${platform}`,
                `i.fab.fa-${platform}`
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(elem => {
                    elem.addEventListener('mouseenter', () => {
                        if (!speechBubble.classList.contains('hidden')) return;
                        const reaction = socialLinks[platform].reactions[Math.floor(Math.random() * socialLinks[platform].reactions.length)];
                        showPixelFaceMessage(socialLinks[platform].msg, 2500, reaction);
                    });
                });
            });
        });
        
        // Also add hints for link icons with aria-labels or titles
        const iconLinks = document.querySelectorAll('a[aria-label], a[title]');
        iconLinks.forEach(link => {
            const label = (link.getAttribute('aria-label') || link.getAttribute('title') || '').toLowerCase();
            
            if (label.includes('github')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("🐙 My GitHub! Check out my projects! Please follow me! 👉", 2500, 'excited');
                });
            } else if (label.includes('twitter') || label.includes('x')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("🐦 Twitter! Follow for updates! Please follow me! 👉", 2500, 'playful');
                });
            } else if (label.includes('linkedin')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("💼 LinkedIn! Professional vibes! Please follow me! 👉", 2500, 'cool');
                });
            } else if (label.includes('tiktok')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("🎵 TikTok! Entertainment incoming! Please follow me! 👉", 2500, 'playful');
                });
            } else if (label.includes('instagram')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("📸 Instagram! Visual stuff! Please follow me! 👉", 2500, 'happy');
                });
            } else if (label.includes('youtube')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("📹 YouTube! Videos galore! Please follow me! 👉", 2500, 'excited');
                });
            } else if (label.includes('discord')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("💬 Discord! Let's chat! Please follow me! 👉", 2500, 'playful');
                });
            } else if (label.includes('email') || label.includes('mail')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("📧 Send me an email!", 2000, 'curious');
                });
            } else if (label.includes('gmail')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("📧 Gmail! Send me a message! Please follow me! 👉", 2500, 'curious');
                });
            } else if (label.includes('facebook')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("👥 Facebook! Let's connect! Please follow me! 👉", 2500, 'playful');
                });
            } else if (label.includes('kaggle')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("🏆 Kaggle! Check my competitions! Please follow me! 👉", 2500, 'excited');
                });
            } else if (label.includes('animehub')) {
                link.addEventListener('mouseenter', () => {
                    if (!speechBubble.classList.contains('hidden')) return;
                    showPixelFaceMessage("🎬 AnimeHub! My anime timeline! Please follow me! 👉", 2500, 'excited');
                });
            }
        });
        
        // Generic external links
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            link.addEventListener('mouseenter', function(e) {
                if (!speechBubble.classList.contains('hidden')) return;
                
                // Skip if we already have specific handling
                if (link.getAttribute('aria-label') || link.getAttribute('title')) return;
                
                // Generic message for unknown external links
                const linkText = this.textContent.toLowerCase();
                if (!linkText.includes('github') && !linkText.includes('twitter') && !linkText.includes('linkedin')) {
                    if (Math.random() < 0.3) {
                        const genericMessages = [
                            "🔗 Interesting link! 👀",
                            "Going somewhere? 🌐",
                            "External link! Check it out! 🚀",
                            "Adventuring outside? 🗺️"
                        ];
                        const msg = genericMessages[Math.floor(Math.random() * genericMessages.length)];
                        showPixelFaceMessage(msg, 500, 'curious');
                    }
                }
            });
        });
        
        // Random encouragement for dragging actions
        const pixelFaceWidgetForDrag = document.querySelector('.pixel-face-widget');
        if (pixelFaceWidgetForDrag) {
            const originalDragElement = window.dragElement;
            let isDragStarted = false;
            
            pixelFaceWidgetForDrag.addEventListener('mousedown', () => {
                isDragStarted = true;
                setTimeout(() => {
                    if (isDragStarted && !speechBubble.classList.contains('hidden')) {
                        const dragMessages = [
                            "Whoaaaa, I'm moving! 🚀",
                            "That's smooth dragging! 😎",
                            "Where are we going? 🗺️",
                            "Weeeee! 🎢",
                            "Please don't drag me! 😢",
                            "Gently! Gently! 😫",
                            "I'm getting dizzy! 🌀"
                        ];
                        const msg = dragMessages[Math.floor(Math.random() * dragMessages.length)];
                        showPixelFaceMessage(msg, 2000, 'playful');
                    }
                }, 500);
            });
            
            pixelFaceWidgetForDrag.addEventListener('mouseup', () => {
                isDragStarted = false;
            });
        }
    };
    
    // Setup hints after a short delay to ensure DOM is ready
    setTimeout(setupHints, 500);
    
    // Add dodge mode toggle to hints
    const dockMusic = document.getElementById('dock-music');
    if (dockMusic) {
        // Add keyboard shortcut hint
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'd' && e.ctrlKey) {
                e.preventDefault();
                toggleFaceDodgeMode();
            }
        });
    }
    
    // Add scroll reactions
    let lastScrollReaction = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollReaction > 3000) {
            lastScrollReaction = now;
            const scrollReactions = [
                "📜 Exploring the page, I see! 👀",
                "🔍 What are you looking for?",
                "📖 Keep scrolling! More to see! 📚",
                "👀 Interesting stuff down there! 👇",
                "Ooh, scrolling! 🎯"
            ];
            if (Math.random() < 0.3) {
                const msg = scrollReactions[Math.floor(Math.random() * scrollReactions.length)];
                showPixelFaceMessage(msg, 2000, 'curious');
            }
        }
    });
    
    // Add page visibility reactions
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            showPixelFaceMessage("See you later! 👋", 1500, 'playful');
        } else {
            const welcomeBackMessages = [
                "Welcome back! 👋✨",
                "You're back! What'd you do? 🤔",
                "Miss me? 😊",
                "I was waiting for you! 🎉",
                "Missed you! 💫"
            ];
            const msg = welcomeBackMessages[Math.floor(Math.random() * welcomeBackMessages.length)];
            showPixelFaceMessage(msg, 2500, 'happy');
        }
    });
    
    // Add reactions to input fields
    const inputs = document.querySelectorAll('input[type="text"], textarea, input[type="search"]');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (Math.random() < 0.4) {
                const typingHints = [
                    "Got something to type? 🤓",
                    "I'm listening! 👂✨",
                    "Type away! 💬",
                    "Share your thoughts! 🧠"
                ];
                const msg = typingHints[Math.floor(Math.random() * typingHints.length)];
                showPixelFaceMessage(msg, 2000, 'curious');
            }
        });
    });
    
    // Add random ambient reactions periodically
    setInterval(() => {
        if (!speechBubble.classList.contains('hidden')) return;
        if (Math.random() < 0.15) { // 15% chance every 10-15 seconds
            const ambientMessages = [
                "💭 Still there?",
                "👀 Whatcha doing?",
                "🎵 Having fun?",
                "😊 All good?",
                "🤔 Need anything?",
                "💫 I'm here! 👋"
            ];
            const msg = ambientMessages[Math.floor(Math.random() * ambientMessages.length)];
            showPixelFaceMessage(msg, 1500, 'playful');
        }
    }, 10000 + Math.random() * 5000);
}

// --- MOBILE SWIPE RIGHT GESTURE ---
function setupMobileSwipeGesture() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchStartElement = null;
    
    document.addEventListener('touchstart', (e) => {
        if (e.changedTouches.length > 0) {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
            touchStartElement = e.target;
        }
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (e.changedTouches.length > 0) {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
        }
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 80; // Minimum distance to trigger swipe (pixels)
        const verticalThreshold = 100; // Max vertical movement allowed
        const swipeDifference = touchEndX - touchStartX;
        const verticalDifference = Math.abs(touchEndY - touchStartY);
        
        // Check if swipe is horizontal enough
        if (Math.abs(swipeDifference) > swipeThreshold && verticalDifference < verticalThreshold) {
            // Check if touch started in carousel
            const carousel = document.getElementById('nAppCarousel');
            const isCarouselSwipe = carousel && carousel.contains(touchStartElement);
            
            if (isCarouselSwipe) {
                // Let native CSS scroll-snapping handle carousel swipes smoothly
                return;
            } else {
                // Handle page navigation
                if (swipeDifference > swipeThreshold) {
                    console.log('Swiped right: ' + swipeDifference + 'px');
                    
                    const currentPath = window.location.pathname;
                    console.log('Current path: ' + currentPath);
                    
                    if (currentPath.includes('anime.html')) {
                        // Swipe right on anime page goes back to index
                        window.location.href = 'index.html';
                    }
                }
            }
        }
    }
}

// --- SPIDER-MAN WEB SHOOTING LOGIC ---
function setupSpideyWebShooter() {
    document.addEventListener('click', (e) => {
        // Only shoot if spidey mode is active
        if (faceModes[currentFaceModeIndex] !== 'spidey') return;

        // Avoid shooting if clicking on the faces, windows, or docks themselves
        if (e.target.closest('.pixel-face-widget') || 
            e.target.closest('.n-pixel-face') || 
            e.target.closest('.window') || 
            e.target.closest('.panel') || 
            e.target.closest('.n-status-bar')) {
            return;
        }

        const desktopFace = document.querySelector('.pixel-face-widget');
        const mobileFace = document.querySelector('.n-pixel-face');
        
        let activeFace = (window.innerWidth > 768 && desktopFace) ? desktopFace : mobileFace;
        
        if (activeFace) {
            const rect = activeFace.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            const web = document.createElement('div');
            web.className = 'spidey-web-line';
            web.style.left = startX + 'px';
            web.style.top = startY + 'px';
            web.style.width = '0px'; 
            web.style.transform = `rotate(${angle}deg)`;
            document.body.appendChild(web);
            
            const splat = document.createElement('div');
            splat.className = 'spidey-web-splat';
            splat.style.left = (e.clientX - 15) + 'px';
            splat.style.top = (e.clientY - 15) + 'px';
            splat.style.transform = 'scale(0)';
            document.body.appendChild(splat);

            setTimeout(() => web.style.width = distance + 'px', 10);
            setTimeout(() => splat.style.transform = 'scale(1)', 150);

            // Web sound disabled - add your own web-shoot.mp3 if you want sound
            // const webSound = document.getElementById('web-sound');
            // if (webSound) {
            //     webSound.currentTime = 0;
            //     webSound.play().catch(err => console.warn('Web sound play failed:', err));
            // }

            if (Math.random() < 0.4) showPixelFaceMessage("Thwip! 🕸️", 1000, 'excited');

            setTimeout(() => {
                web.style.opacity = '0';
                splat.style.opacity = '0';
                setTimeout(() => { web.remove(); splat.remove(); }, 300);
            }, 1500);
        }
    });
}

// Initialize all functionality on page load (consolidated DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
    // Load playlist from JSON file
    loadPlaylist().then(() => {
        // Restore playback state if it exists
        const savedState = restorePlaybackState();
        
        // Update now playing with saved track
        if (savedState && savedState.trackIndex < playlist.length) {
            updateNowPlaying();
            
            // Wait for audio to be ready before restoring position
            if (audioPlayer) {
                const restorePosition = () => {
                    // Calculate elapsed time since state was saved
                    const elapsedTime = (Date.now() - (savedState.timestamp || Date.now())) / 1000;
                    const targetTime = Math.min((savedState.currentTime || 0) + elapsedTime, audioPlayer.duration - 1);
                    
                    audioPlayer.currentTime = targetTime;
                    audioPlayer.removeEventListener('canplay', restorePosition);
                    
                    // Auto-play if was playing before
                    if (savedState.isPlaying) {
                        audioPlayer.play().catch(err => {
                            console.warn('Could not auto-play audio:', err);
                            isPlaying = false;
                        });
                    }
                };
                
                // If audio is already ready, restore immediately
                if (audioPlayer.readyState >= 2) {
                    restorePosition();
                } else {
                    // Wait for canplay event
                    audioPlayer.addEventListener('canplay', restorePosition, { once: true });
                    
                    // Timeout fallback after 2 seconds
                    setTimeout(() => {
                        if (audioPlayer.readyState < 2) {
                            console.warn('Audio took too long to load, attempting restoration anyway');
                            restorePosition();
                        }
                    }, 2000);
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
    
    // Save state and sync volume when navigating to anime.html
    document.addEventListener('click', (e) => {
        // Check if clicked element is a link to anime.html
        const link = e.target.closest('a[href="anime.html"]');
        if (link) {
            syncPlaybackState();
            // Also sync the current volume to sessionStorage
            sessionStorage.setItem('currentVolume', currentVolume);
        }
    });
    
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
    
    // --- MOBILE VIEWPORT HEIGHT FIX ---
    setMobileHeight();
    window.addEventListener('resize', setMobileHeight);
    
    // --- TERMINAL INPUT ---
    initTerminalInput();
    
    // --- SHOW TERMINAL INTRO ON PAGE LOAD ---
    const terminalWindow = document.getElementById('terminal-window');
    if (terminalWindow) {
        terminalWindow.style.display = 'flex';
        // Add a small delay to ensure DOM is fully ready before displaying intro
        setTimeout(() => {
            typeTerminal();
        }, 100);
    }
    
    // --- AUTO-SAVE PLAYBACK STATE ---
    setupAutoSave();
    
    // --- PIXEL FACE EYES FOLLOW CURSOR ---
    setupEyesFollowCursor();
    
    // --- PIXEL FACE PUNCH INTERACTION ---
    setupPixelFacePunch();
    
    // --- PIXEL FACE DODGE & MOVEMENT ---
    setupPixelFaceDodge();
    
    // --- SPIDER-MAN WEB SHOOTING ---
    setupSpideyWebShooter();
    
    // --- PIXEL FACE EASTER EGGS & SPECIAL REACTIONS ---
    setupPixelFaceEasterEggs();
    
    // --- PIXEL FACE HELPER SYSTEM ---
    setupPixelFaceHelper();
    
    // --- MOBILE SWIPE RIGHT GESTURE ---
    setupMobileSwipeGesture();
    
    // --- SAVE STATE WHEN NAVIGATING TO ANIME PAGE ---
    const animeHubLink = document.querySelector('a[href="anime.html"]');
    if (animeHubLink) {
        animeHubLink.addEventListener('click', () => {
            syncPlaybackState();
        });
    }

    // --- CONNECT MOBILE APPS TO EXISTING WINDOWS ---
    const nTerminalApp = document.getElementById('n-terminal-app');
    const nMusicToggle = document.getElementById('n-music-toggle'); // The large widget
    const nMusicApp = document.getElementById('n-music-app');       // The new grid icon

    // Open Terminal from Mobile Grid
    if (nTerminalApp) {
        nTerminalApp.addEventListener('click', () => {
            if (terminalWindow) {
                terminalWindow.style.display = 'flex';
                terminalWindow.style.width = 'calc(100vw - 30px)';
                terminalWindow.style.height = 'calc(var(--vh, 1vh) * 100 - 150px)';
                terminalWindow.style.top = '60px';
                terminalWindow.style.left = '15px';
                terminalWindow.style.zIndex = '9999';
                enableTerminalInput();
            }
        });
    }

    // Function to open music player
    const openMobileMusicPlayer = () => {
        if (musicPlayerWindow) {
            musicPlayerWindow.style.display = 'flex';
            musicPlayerWindow.style.top = '60px';
            musicPlayerWindow.style.left = '50%';
            musicPlayerWindow.style.transform = 'translateX(-50%)';
            musicPlayerWindow.style.width = '280px';
            musicPlayerWindow.style.zIndex = '9999';
        }
    };

    // Toggle Music Player from either the Widget OR the App Grid icon
    if (nMusicToggle) nMusicToggle.addEventListener('click', openMobileMusicPlayer);
    if (nMusicApp) nMusicApp.addEventListener('click', openMobileMusicPlayer);
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
    
    // Mouse Shake reaction (Dizzy)
    let lastMouseX = 0;
    let shakeCount = 0;
    let shakeTimeout;
    document.addEventListener('mousemove', (e) => {
        const deltaX = Math.abs(e.clientX - lastMouseX);
        if (deltaX > 80) { // Fast movement
            shakeCount++;
            if (shakeCount > 15) {
                showPixelFaceMessage("Whoa! Slow down! I'm getting dizzy! 😵‍💫", 3000, 'dizzy');
                shakeCount = 0;
            }
            clearTimeout(shakeTimeout);
            shakeTimeout = setTimeout(() => shakeCount = 0, 400);
        }
        lastMouseX = e.clientX;
    });
    
    // Copy event reaction
    document.addEventListener('copy', () => {
        if (Math.random() < 0.7) {
            const copyMessages = [
                "Copying that? Good choice! 📋",
                "Ctrl+C detected! 🕵️",
                "Stole some text, did we? 🥷",
                "Clipboard updated! ✨"
            ];
            const msg = copyMessages[Math.floor(Math.random() * copyMessages.length)];
            showPixelFaceMessage(msg, 2000, 'cool');
        }
    });
    
    // Konami Code Reaction
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showPixelFaceMessage("🎮 CHEAT CODE ACTIVATED! UNLIMITED POWER! ⚡", 4000, 'excited');
                const faces = document.querySelectorAll('.pixel-face-widget, .n-pixel-face');
                faces.forEach(face => {
                    face.style.transition = 'transform 0.5s ease';
                    face.style.transform = 'scale(1.5) rotate(360deg)';
                    setTimeout(() => { face.style.transform = ''; }, 2000);
                });
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// --- MATRIX RAIN EFFECT ---
let matrixInterval = null;
function toggleMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
        canvas.style.display = 'none';
        showPixelFaceMessage("Matrix mode disabled! 🔙", 2000, 'normal');
        
        // Revert face mode if it was hacker
        const faces = document.querySelectorAll('.pixel-face-widget, .n-pixel-face');
        faces.forEach(face => {
            face.classList.remove('mode-hacker');
        });
        return;
    }

    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    let rainDrops = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = Math.floor(canvas.width / 16);
        for (let i = rainDrops.length; i < columns; i++) rainDrops[i] = 1;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0'; // Hacker Green
        ctx.font = '16px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * 16, rainDrops[i] * 16);
            if (rainDrops[i] * 16 > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
            rainDrops[i]++;
        }
    };

    matrixInterval = setInterval(draw, 30);
    
    // Enter Hacker mode and show message
    showPixelFaceMessage("Wake up, Neo... 🕶️💻", 3500, 'cool');
    const faces = document.querySelectorAll('.pixel-face-widget, .n-pixel-face');
    faces.forEach(face => {
        ['standard', 'party', 'focus'].forEach(m => face.classList.remove(`mode-${m}`));
        face.classList.add('mode-hacker');
    });
}

// --- NOTHING OS MOBILE LOGIC ---

// 1. Mobile Clock Updates
const nTime = document.getElementById('n-time');
const secondHand = document.getElementById('sec-hand');
const minuteHand = document.getElementById('min-hand');
const hourHand = document.getElementById('hour-hand');

function updateMobileClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    if (nTime) nTime.textContent = timeString;
    
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    
    if (secondHand) {
        const secondDegrees = (seconds / 60) * 360;
        secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    }
    
    if (minuteHand) {
        const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    }
    
    if (hourHand) {
        const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
        hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    }
}

setInterval(updateMobileClock, 1000);

// --- CHEAT CODE KEYBOARD LISTENERS ---
const loveCode = ['i', 'l', 'o', 'v', 'e', 'u'];
const hateCode = ['i', 'h', 'a', 't', 'e', 'u'];
let loveIndex = 0;
let hateIndex = 0;

document.addEventListener('keydown', (e) => {
    // I love U Code Reaction
    if (e.key.toLowerCase() === loveCode[loveIndex]) {
        loveIndex++;
        if (loveIndex === loveCode.length) {
            loveIndex = 0;
            const loveMessage = "Aww... I love you too! ❤️🥰";
            showPixelFaceMessage(loveMessage, 5000, 'loved');
            
            const faces = document.querySelectorAll('.pixel-face-widget, .n-pixel-face');
            faces.forEach(face => {
                face.style.transition = 'transform 0.3s ease';
                for (let i = 0; i < 6; i++) {
                    setTimeout(() => {
                        face.style.transform = i % 2 === 0 ? 'scale(1.15)' : 'scale(1)';
                    }, i * 150);
                }
                setTimeout(() => { face.style.transform = ''; }, 900);
            });
        }
    } else {
        if (loveCode[0] === e.key.toLowerCase()) {
            loveIndex = 1;
        } else {
            loveIndex = 0;
        }
    }
    
    // I hate U Code Reaction
    if (e.key.toLowerCase() === hateCode[hateIndex]) {
        hateIndex++;
        if (hateIndex === hateCode.length) {
            hateIndex = 0;
            const hateMessage = "Why would you say that... 😔💔";
            showPixelFaceMessage(hateMessage, 4500, 'sad');
            
            const faces = document.querySelectorAll('.pixel-face-widget, .n-pixel-face');
            faces.forEach(face => {
                face.classList.add('sad-reaction');
                setTimeout(() => face.classList.remove('sad-reaction'), 4500);
            });
        }
    } else {
        if (hateCode[0] === e.key.toLowerCase()) {
            hateIndex = 1;
        } else {
            hateIndex = 0;
        }
    }
}, true);  // Use capturing phase to work even when input fields are focused
updateMobileClock();