// import { VimeoPlayer }from 'vimeo-player'; // Import the Vimeo player library
// Import the lodash throttle function
import { set, get } from 'local-storage'; // Import local storage utilities
import { throttle } from 'lodash';
// import { throttle } from 'lodash';
const iframe = document.getElementById('vimeo-player');
const vimeoPlayer = new Vimeo.Player(iframe);

// Function to save playback time to local storage
// function savePlaybackTime(time) {
//   localStorage.setItem('videoplayer-current-time', time);
// }

// Function to retrieve playback time from local storage
function getSavedPlaybackTime() {
  return localStorage.getItem('videoplayer-current-time') || 0;
}

// Update playback time in local storage using throttle
const updatePlaybackTimeThrottled = throttle((time) => {
  savePlaybackTime(time);
}, 1000); // Throttle to once every second

// Add an event listener for the "timeupdate" event
vimeoPlayer.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  // Update playback time in local storage using throttle
  updatePlaybackTimeThrottled(currentTime);
});

// Get the saved playback time and set it in the player
const savedPlaybackTime = getSavedPlaybackTime();
vimeoPlayer.setCurrentTime(savedPlaybackTime);
