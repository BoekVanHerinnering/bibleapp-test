document.addEventListener('DOMContentLoaded', () => {
    const pushToTalkButton = document.getElementById('pushToTalkButton');
    const statusMessages = document.getElementById('statusMessages');
    let mediaRecorder;
    let audioChunks = [];

    function logStatus(message) {
        statusMessages.innerHTML = `<p>${message}</p>`;
        console.log(message);
    }

    async function getMicrophoneAccess() {
        logStatus('Requesting microphone access...');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            logStatus('Microphone access granted.');
            // Placeholder for WebRTC: Initialize MediaRecorder for local feedback or early testing
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = () => {
                // For now, let's just log that we have audio data.
                // In a real app, this is where you'd send it over WebRTC.
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                audioChunks = [];
                logStatus(`Audio captured. Size: ${audioBlob.size} bytes. Ready to send (locally).`);
                // Optional: Play back locally for testing
                // const audioUrl = URL.createObjectURL(audioBlob);
                // const audio = new Audio(audioUrl);
                // audio.play();
            };
            return stream; // Return the stream for potential WebRTC use
        } catch (error) {
            logStatus(`Microphone access denied: ${error.message}`);
            console.error('Error accessing microphone:', error);
            return null;
        }
    }

    // Call once at the start to request permissions
    getMicrophoneAccess();

    // Placeholder functions for WebRTC logic (to be implemented later)
    function startConnection() {
        logStatus('Attempting to start WebRTC connection...');
        // Actual WebRTC setup will go here
    }

    function sendAudioData(data) {
        logStatus('Sending audio data (placeholder)...');
        // Actual WebRTC data channel or stream sending will go here
    }

    function stopAudioData() {
        logStatus('Stopping audio data transmission (placeholder)...');
        // Logic to signal end of transmission or clean up
    }


    // Event listeners for the push-to-talk button
    if (pushToTalkButton) {
        pushToTalkButton.addEventListener('mousedown', () => {
            if (mediaRecorder && mediaRecorder.state === 'inactive') {
                mediaRecorder.start();
                logStatus('Recording audio... Release to send.');
                // Placeholder for actual WebRTC transmission start
                // sendAudioData("start_signal");
            } else if (!mediaRecorder) {
                logStatus('Microphone not available or permission denied.');
            }
        });

        pushToTalkButton.addEventListener('mouseup', () => {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                // Placeholder for actual WebRTC transmission stop
                // stopAudioData();
            }
        });

        // For touch devices
        pushToTalkButton.addEventListener('touchstart', (event) => {
            event.preventDefault(); // Prevent mouse event emulation
            if (mediaRecorder && mediaRecorder.state === 'inactive') {
                mediaRecorder.start();
                logStatus('Recording audio... Release to send.');
            } else if (!mediaRecorder) {
                logStatus('Microphone not available or permission denied.');
            }
        }, { passive: false });

        pushToTalkButton.addEventListener('touchend', (event) => {
            event.preventDefault();
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
            }
        });
    } else {
        logStatus('Error: Push-to-talk button not found.');
    }

    // Initialize WebRTC connection placeholder
    // startConnection(); // We'll call this more appropriately later
});
