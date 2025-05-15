import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        <div className='p-6 min-h-screen bg-gray-100'>
            {/* Navbar */}
            <nav className='bg-green-900 -m-8 pt-8 text-white'>
                <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>
                        <Link to='/h'>Plant Care</Link>
                    </h1>
                    <div className='flex space-x-4'>
                        <Link to='/home' className='hover:underline'>
                            Home
                        </Link>
                        <Link to='/research-work' className='hover:underline'>
                            Research
                        </Link>
                        <Link to='/video-tutorials' className='hover:underline'>
                            Tutorials
                        </Link>
                        <Link to='/plants' className='hover:underline'>
                            Plants
                        </Link>
                        <Link to='/marketplace' className='hover:underline'>
                            MarketplacePage
                        </Link>
                        <Link to='/profile' className='hover:underline'>
                            User
                        </Link>
                        <Link to='/session' className='hover:underline'>
                            Session
                        </Link>
                        <Link to='/' className='hover:underline'>
                            logout
                        </Link>
                        <Link to='/notification' className='hover:underline'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 17h5l-1.405-1.405A2.002 2.002 0 0018 13V8a6 6 0 00-12 0v5a2.002 2.002 0 00-.595 1.595L5 17h5m7 0a3 3 0 11-6 0'
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-b from-green-50 to-green-200">
                <h1 className="text-5xl font-extrabold mb-10 text-green-800">Plant Disease Detector</h1>
                <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center justify-center transition-all duration-300">
                    <div className="flex flex-col items-center w-full md:w-1/2 gap-6">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
                        />
                        <div className="w-72 h-72 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                            {image ? (
                                <img src={image} alt="Uploaded Plant" className="w-full h-full object-cover" />
                            ) : (
                                <p className="text-gray-400">No Image Uploaded</p>
                            )}
                        </div>
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
                    <div className="flex flex-col items-center w-full md:w-1/2 gap-6">
                        {isScanning && (
                            <div className="flex flex-col items-center">
                                <div className="loader mb-4"></div>
                                <p className="text-green-700 font-semibold text-lg">Scanning your plant...</p>
                            </div>
                        )}
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
        </div>
    );
}

export default PlantDiseaseDetector;