const audioOutputSelect = document.getElementById('audioOutputSelect');
const preferredDevices = ["- MacBook Pro Speakers"]; // Change this

function setOutputDevice(selectedDeviceId) {
    if (typeof window.sounds.porcupine.setSinkId !== 'undefined') {
        for (let key in window.sounds) {
            try {
                window.sounds[key].setSinkId(selectedDeviceId);
                console.log(`Audio output for ${key} set to device: ${selectedDeviceId}`);
            } catch (err) {
                console.error(`Error setting audio output device for ${key}:`, err);
            }
        }
    } else {
        console.warn('Your browser does not support output device selection.');
    }
}

// Function to populate the select element with available audio output devices
function populateAudioOutputDevices(devices) {
    audioOutputSelect.innerHTML = '';
    devices.forEach(device => {
        if (device.kind === 'audiooutput') {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Speaker ${audioOutputSelect.length + 1}`;
            preferredDevices.forEach(label => {
                if (device.label.indexOf(label) > -1) {
                    console.log("YOOO");
                    console.log(device);
                    option.selected = true;
                    setOutputDevice(device.deviceId);
                }
            })

            audioOutputSelect.appendChild(option);
        }
    });
}

$(document).ready(function() {
  // Get available media devices
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        populateAudioOutputDevices(devices);
        console.log(devices);
    })
    .catch(err => {
        console.error('Error enumerating devices:', err);
    });
    $('#button').click(); // Start hotword recognition
});


// Change the audio output device for all sounds in window.sounds
audioOutputSelect.addEventListener('change', () => {
    const selectedDeviceId = audioOutputSelect.value;
    setOutputDevice(selectedDeviceId);
});
