import React, { useState } from "react";
import { Link } from "react-router-dom";
// ...existing code...

const PlantMoodMatcher = () => {
  const [mood, setMood] = useState("");

  const plants = {
    happy: {
      name: "Gerbera Daisy",
      description: "Bright and colorful Gerberas symbolize cheerfulness and happiness.",
      image: "https://images.ctfassets.net/1d9ajmvjpuhw/LIYEZtbgEZCUtV2ni67rg/3af547e3c10b50c4a77f75e016e5f7d3/1694177827737-3._Daisy_flower.jpg?w=1280&h=1280&fm=webp&q=75",
      quote: "Happiness blooms from within.",
      careTips: "Water weekly, prefers sunlight.",
      funFact: "Gerberas are the fifth most popular flower in the world!"
    },
    stressed: {
      name: "Peace Lily",
      description: "Peace Lilies purify the air and create a calm, stress-free environment.",
      image: "https://media.istockphoto.com/id/536772045/photo/st-josephs-lily.jpg?s=612x612&w=0&k=20&c=phVSk64gd2-98N_2uXM2ziF0CQwrpcShiONZ__78OyA=",
      quote: "Peace begins with a single breath.",
      careTips: "Water when soil feels dry, indirect light.",
      funFact: "Peace lilies are known for their air-purifying properties."
    },
    tired: {
      name: "Money Plant",
      description: "Money Plants are known for bringing good luck and prosperity, perfect for recharging your tired spirit.",
      image: "https://gachwala.in/wp-content/uploads/2022/06/IMAGE-1-13.webp",
      quote: "Wealth grows where you water it.",
      careTips: "Water when soil is dry, indirect sunlight.",
      funFact: "Money plants are believed to bring financial prosperity and good fortune."
    },
    creative: {
      name: "Spider Plant",
      description: "Spider plants are lively and encourage creativity with their fresh growth.",
      image: "https://www.houseplant.co.uk/cdn/shop/files/Chlorophytum_Comosum_-_Curly_Spider_Plant_Bonnie.jpg?v=1731498395&width=1445",
      quote: "Creativity is intelligence having fun.",
      careTips: "Water moderately, bright indirect light.",
      funFact: "Spider plants can help purify the air."
    }
  };

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const resetMood = () => {
    setMood("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-green-800 text-center tracking-wide">
        🌿 Find Your Perfect Plant Based on Your Mood!
      </h1>

      <div className="mb-6 flex space-x-4">
        <select
          className="p-3 border-2 border-green-400 rounded-lg shadow-lg text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleMoodChange}
          value={mood}
        >
          <option value="">-- Choose Your Mood --</option>
          <option value="happy">Happy 😊</option>
          <option value="stressed">Stressed 😟</option>
          <option value="tired">Tired 😴</option>
          <option value="creative">Creative 🎨</option>
        </select>

        {mood && (
          <button
            onClick={resetMood}
            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
          >
            Reset
          </button>
        )}
      </div>

      {mood && (
        <div className="bg-white shadow-2xl rounded-lg p-6 flex flex-col items-center w-full max-w-md transition-all duration-500 transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">{plants[mood].name}</h2>

          {/* Animated Image */}
          <img
            src={plants[mood].image}
            alt={plants[mood].name}
            className="w-full h-auto max-w-xs object-cover rounded-lg mb-6 transition-opacity duration-500 ease-in-out"
            style={{ opacity: 0, transition: "opacity 1s" }}
            onLoad={(e) => e.target.style.opacity = 1} // Fade-in effect on image load
          />

          <p className="text-gray-700 text-center mb-4">{plants[mood].description}</p>
          <p className="italic text-green-600 text-center">"{plants[mood].quote}"</p>

          {/* Additional Features */}
          <div className="mt-4 text-gray-600 text-sm text-center space-y-2">
            <p><strong>Care Tips:</strong> {plants[mood].careTips}</p>
            <p><strong>Fun Fact:</strong> {plants[mood].funFact}</p>
          </div>
        </div>

        
      )}
 <div className="text-3xl mt-10 text-right mb-10">
          <Link
            to="/marketplace"
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
          >
           Want To Buy? 🤔


          </Link>
        </div>               




    </div>
  );
};

export default PlantMoodMatcher;