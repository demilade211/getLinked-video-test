// src/helpers/mediaHelpers.js

export const checkCameraAndMic = async () => {
    let cameraStatus = false;
    let micStatus = false;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        cameraStatus = true;
        micStatus = true;
        stream.getTracks().forEach(track => track.stop());
    } catch (err) {
        console.error('Error accessing media devices.', err);
        if (err.name === 'NotAllowedError' || err.name === 'NotFoundError') {
            cameraStatus = false;
            micStatus = false;
        }
    }

    return { cameraStatus, micStatus };
};

export const checkMicrophone = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        return false;
    }
};

export const checkInternetConnection = (setIsInternetStable) => {
    const checkConnection = () => {
        if (navigator.onLine) {
            fetch('https://www.google.com', { mode: 'no-cors' })
                .then(() => setIsInternetStable(true))
                .catch(() => setIsInternetStable(false));
        } else {
            setIsInternetStable(false);
        }
    };
    checkConnection();
    setInterval(checkConnection, 5000); // Check every 5 seconds
};

export const analyzeBrightness = (video, setIsBrightnessNormal) => {

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let totalBrightness = 0;
    for (let i = 0; i < frame.data.length; i += 4) {
        const r = frame.data[i];
        const g = frame.data[i + 1];
        const b = frame.data[i + 2];
        totalBrightness += (r + g + b) / 3;
    }
    const averageBrightness = totalBrightness / (frame.data.length / 4);
    setIsBrightnessNormal(averageBrightness > 50 && averageBrightness < 200); // Example threshold
};

export const containsPerson = (detections) => {
    return detections.some(detection => detection.class.toLowerCase() === 'person');
};

// Function to download a single image
export const downloadImage = async (imageUrl, fileName) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob])); 
        localStorage.setItem(fileName, url);
        //console.log('Image downloaded successfully:', fileName);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};
