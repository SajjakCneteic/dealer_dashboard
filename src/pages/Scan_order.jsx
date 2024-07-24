import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const ScanOrder = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setError(null);
      setIsCameraOpen(false);

      const newWindow = window.open(data.text, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;

    }
  };

  const handleError = (err) => {
    setError(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white dark:bg-customBlue shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Scan Product Barcode</h2>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center mb-4 overflow-hidden">
          {isCameraOpen ? (
            <QrScanner
              delay={300}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          ) : (
            <p className="text-gray-500">Camera not enabled</p>
          )}
        </div>
        <button
          onClick={() => setIsCameraOpen((pre) => !pre)}
          className="w-full bg-btnBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isCameraOpen ? 'Disable Camera' : 'Enable Camera'}
        </button>
        <button
          className="w-full mt-4 bg-btnBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Upload From Device
        </button>
      </div>
      {scanResult && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg">
          <p className="font-bold">Scan Result:</p>
          <a href={scanResult}>{scanResult}</a>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
          <p className="font-bold">Error:</p>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default ScanOrder;
