import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

// Initialize the Vimeo player
const player = new Vimeo('vimeo-player');

// Define the local storage key
const storageKey = 'videoplayer-current-time';

// Function to save playback time to local storage
function savePlaybackTime(time) {
    localStorage.setItem(storageKey, JSON.stringify(time));
}

// Function to get playback time from local storage
function getPlaybackTime() {
    const savedTime = localStorage.getItem(storageKey);
    return savedTime ? JSON.parse(savedTime) : 0;
}

// Set the current time of the player
function setCurrentTime(time) {
    player.setCurrentTime(time);
}

// Add event listener for timeupdate (throttled for once per second)
player.on('timeupdate', throttle((data) => {
    const currentTime = data.seconds;
    savePlaybackTime(currentTime);
}, 1000));

// Resume playback from the saved position
const savedTime = getPlaybackTime();
if (savedTime) {
    setCurrentTime(savedTime);
}

