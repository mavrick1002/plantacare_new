import React from "react";
import { Link } from 'react-router-dom';

const VideoTutorials = ({ navigate }) => {
  const videos = [
    "https://www.youtube.com/embed/LZhnCxG5c6s?si=95Pg6v09JsodkKeU",
    "https://www.youtube.com/embed/f3F9ThmQQP4?si=fQHa8csCGFBHeQk9",
    "https://www.youtube.com/embed/MucqGCYA2H8?si=r2SULMs_uoWrpiip",
    "https://www.youtube.com/embed/MHnQeCVfSb0?si=vIJrRaSfj8UQisOL",
    "https://www.youtube.com/embed/yxmwVG7Dy1A?si=DYiXftAgKzB9eNhT",
    "https://www.youtube.com/embed/g6FErRqDnAI?si=J-Elt5seOmINWCvR",
  ];

  return (
      <div className='p-6 min-h-screen bg-gray-100'>
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
              {/* add notifiaction bell  */}
  
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
  
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mt-16 text-green-800">
        Video Tutorials
      </h1>

      {/* Video Grid */}
      <div className="grid mx-20 mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden">
            <iframe
              width="100%"
              height="200"
              src={video}
              title={`Tutorial ${index + 1}`}
              className="rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      {/* Learn Vocabularies Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={() => window.open("https://www.youtube.com/", "_blank")}
        >
          Find more on Youtube
        </button>
      </div>
    </div>
  );
};

export default VideoTutorials;
