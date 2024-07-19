import React, { useState, useRef, useEffect } from 'react';

const ScanOrder = () => {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleCameraToggle = async () => {
    if (cameraEnabled) {
      // Turn off the camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setCameraEnabled(false);
    } else {
      // Turn on the camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(error => console.error('Error playing video:', error));
          };
        }
        streamRef.current = stream;
        setCameraEnabled(true);
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    }
  };

  // Clean up the stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col  items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white dark:bg-customBlue shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Scan Product Barcode</h2>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center mb-4 overflow-hidden">
          {cameraEnabled ? (
            <video 
              ref={videoRef} 
              className="absolute top-0 left-0 w-full h-full object-cover" 
              autoPlay 
              playsInline
              onPlay={() => console.log('Video is playing')}
            ></video>
          ) : (
            <p className="text-gray-500">Camera not enabled</p>
          )}
        </div>
        <button
          onClick={handleCameraToggle}
          className="w-full bg-btnBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {cameraEnabled ? "Disable Camera" : "Enable Camera"}
        </button>
      </div>
    </div>
  );
};

export default ScanOrder;
