// CommunityForumPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const CommunityForumPage = () => {
  return (
    <div className="min-h-screen bg-green-100 p-6">
      {/* Navigation Bar */}
      <nav className="bg-green-900 -m-2 pt-2 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Plant Care</Link>
          </h1>
          <div className="flex space-x-4">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/research-work" className="hover:underline">Research</Link>
            <Link to="/video-tutorials" className="hover:underline">Tutorials</Link>
            <Link to="/plants" className="hover:underline">Plants</Link>
            <Link to="/marketplace" className="hover:underline">Marketplace</Link>
            <Link to="/profile" className="hover:underline">User</Link>
            <Link to="/session" className="hover:underline">Session</Link>
            <Link to="/community" className="underline">Community Forum</Link>
          </div>
        </div>
      </nav>

      {/* Google Form Embed */}
      <div className="mt-10 max-w-4xl mx-auto bg-white shadow-md rounded p-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-800">Community Forum</h2>
        <p className="text-center text-gray-700 mb-4">
          Share your thoughts, suggestions, or questions in our community!
        </p>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScrDvTuKr-f53TTlEI7pmOwi4zqTyHskU2dDMUn-a-St3ytyQ/viewform?embedded=true"
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Community Forum Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default CommunityForumPage;