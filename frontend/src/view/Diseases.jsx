import React, { useState } from "react";

function PlantDiseaseDetector() {
    const [image, setImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState("");
    const [diseaseImage, setDiseaseImage] = useState("");

    const diseaseDatabase = {
        "Powdery Mildew": "https://greenhouse.cornell.edu/files/2020/07/Gerbera-PM-flower-spots-2019.jpg",
        "Leaf Spot": "https://www.cardinallawns.com/wp-content/uploads/2018/04/leaf-spots.jpg",
        "Root Rot": "https://i.insider.com/620eb221462ff20019c58e35?width=700",
        "Blight": "https://www.espoma.com/wp-content/uploads/2016/05/hydrangeas-898043_1920.jpg",
    };

    const fakeDiseases = [
        "No Disease Detected",
        "Powdery Mildew",
        "Leaf Spot",
        "Root Rot",
        "Blight",
    ];

    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setResult("");
            setDiseaseImage("");
        }
    };

    const handleScan = () => {
        if (!image) return;

        setIsScanning(true);
        setResult("");
        setDiseaseImage("");

        setTimeout(() => {
            setIsScanning(false);
            const randomDisease = fakeDiseases[Math.floor(Math.random() * fakeDiseases.length)];
            setResult(randomDisease);

            if (randomDisease !== "No Disease Detected") {
                setDiseaseImage(diseaseDatabase[randomDisease]);
            }
        }, 3000);
    };

    const handleReset = () => {
        setImage(null);
        setResult("");
        setIsScanning(false);
        setDiseaseImage("");
    };

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-b from-green-50 to-green-200">
            {/* Title */}
            <h1 className="text-5xl font-extrabold mb-10 text-green-800">Plant Disease Detector</h1>

            {/* Main Card */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center justify-center transition-all duration-300">

                {/* Left Side: Image Upload and Preview */}
                <div className="flex flex-col items-center w-full md:w-1/2 gap-6">
                    {/* Upload Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
                    />

                    {/* Uploaded Image Preview */}
                    <div className="w-72 h-72 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                        {image ? (
                            <img src={image} alt="Uploaded Plant" className="w-full h-full object-cover" />
                        ) : (
                            <p className="text-gray-400">No Image Uploaded</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-4 justify-center">
                        <button
                            onClick={handleScan}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
                            disabled={!image}
                        >
                            Scan
                        </button>
                        <button
                            onClick={handleScan}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
                            disabled={!image}
                        >
                            Rescan
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Right Side: Result and Disease Image */}
                <div className="flex flex-col items-center w-full md:w-1/2 gap-6">
                    {/* Scan Status */}
                    {isScanning && (
                        <div className="flex flex-col items-center">
                            <div className="loader mb-4"></div>
                            <p className="text-green-700 font-semibold text-lg">Scanning your plant...</p>
                        </div>
                    )}

                    {/* Result */}
                    {!isScanning && result && (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-green-800 mb-2">Diagnosis Result</h2>
                            <p className="text-lg text-green-700 mb-6">{result}</p>

                            {diseaseImage && (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={diseaseImage}
                                        alt="Detected Disease"
                                        className="w-64 h-48 object-cover rounded-xl shadow-lg mb-2"
                                    />
                                    <p className="text-gray-500 text-sm">(Example image of detected disease)</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Loader CSS */}
            <style>
                {`
                    .loader {
                        border: 6px solid #d4d4d4;
                        border-top: 6px solid #34d399;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}

export default PlantDiseaseDetector;