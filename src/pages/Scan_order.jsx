
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const ScanOrder = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      setError(null);
      setIsCameraOpen(false);
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
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   <h1 className="text-3xl font-bold mb-4">Scan Your QR Code</h1>
    //   {isCameraOpen ?
    //     <div className=" flex items-center justify-center bg-black bg-opacity-50 z-50">
    //       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
    //         {/* <h2 className="text-xl font-bold mb-4">Scan QR Code</h2> */}
    //         <QrScanner
    //           delay={300}
    //           style={previewStyle}
    //           onError={handleError}
    //           onScan={handleScan}
    //         />
    //         <button
    //           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700"
    //           onClick={() => setIsCameraOpen(false)}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>:
     
    //   <button
    //     className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
    //     onClick={() => setIsCameraOpen(true)}
    //   >
    //     Open Camera to Scan
    //   </button> }
    //   {scanResult && (
    //     <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg">
    //       <p className="font-bold">Scan Result:</p>
    //       <p>{scanResult}</p>
    //     </div>
    //   )}
    //   {error && (
    //     <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
    //       <p className="font-bold">Error:</p>
    //       <p>{error.message}</p>
    //     </div>
    //   )}

     

    // </div>

    <div className="flex flex-col  items-center justify-center  bg-gray-100 p-4">
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
           onClick={() => setIsCameraOpen((pre)=>!pre)}
          className="w-full bg-btnBlue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isCameraOpen ? "Disable Camera" : "Enable Camera"}
        </button>
      </div>
       {scanResult && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg">
          <p className="font-bold">Scan Result:</p>
          <p>{scanResult}</p>
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
