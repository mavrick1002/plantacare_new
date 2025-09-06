import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";


const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [sharedPosts, setSharedPosts] = useState([]);
  const [preferences, setPreferences] = useState({
    eventNotifications: true,
    featureUpdates: true,
  });
  const [loadingPreferences, setLoadingPreferences] = useState(true);

  // Updated to use axios consistently with the rest of the code
  const updateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("/users/profile", updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setUser(response.data.user);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
      }
    };
    fetchUserProfile();
  }, []);

  // Fetch shared posts
  useEffect(() => {
    const fetchSharedPosts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/posts/shared", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSharedPosts(response.data.posts);
      } catch (error) {
        console.error(
          "Error fetching shared posts:",
          error.response?.data || error.message
        );
      }
    };
    fetchSharedPosts();
  }, []);

  // Fetch email preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/users/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPreferences(response.data.preferences);
        setLoadingPreferences(false);
      } catch (error) {
        console.error("Error fetching preferences:", error.message);
        setLoadingPreferences(false);
      }
    };
    fetchPreferences();
  }, []);

  const handleUpdatePreferences = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put("/users/preferences", preferences, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Preferences updated!");
    } catch (error) {
      console.error("Error updating preferences:", error.message);
    }
  };

  if (isEditing) {
    return <EditProfile user={user} updateUser={updateUser} />;
  }

  return (
      <div className='bg-gradient-to-r from-green-200 to-blue-300'>
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

        

      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="flex items-center justify-center mt-8">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-200 p-6 text-center">
              <img
                src={
                  user.photo ||
                  "https://cdn-icons-png.flaticon.com/512/1253/1253756.png"
                }
                alt="User Avatar"
                className="w-24 h-24 mx-auto rounded-full border-4 border-green-400 object-cover"
              />
              <h2 className="text-2xl font-bold text-green-800 mt-2">
                {user.name || "User Name"}
              </h2>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-green-800 mb-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700 flex items-center">
                  <span className="font-semibold w-20">Email:</span>
                  <span>{user.email || "Not available"}</span>
                </p>
                {/* <p className="text-gray-700 flex items-center">
                  <span className="font-semibold w-20">Phone:</span>
                  <span>{user.phone || "Not available"}</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-semibold w-20">Address:</span>
                  <span>{user.address || "Not available"}</span>
                </p> */}
              </div>
            </div>
            <div className="bg-green-100 p-4 text-center">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-800">
            Email Notifications
          </h3>
          {loadingPreferences ? (
            <p className="text-gray-600">Loading preferences...</p>
          ) : (
            <div className="space-y-4">
              <label className="flex items-center space-x-3 py-2 px-3 rounded hover:bg-green-50 transition">
                <input
                  type="checkbox"
                  checked={preferences.eventNotifications}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      eventNotifications: !prev.eventNotifications,
                    }))
                  }
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span>Receive event notifications</span>
              </label>
              <label className="flex items-center space-x-3 py-2 px-3 rounded hover:bg-green-50 transition">
                <input
                  type="checkbox"
                  checked={preferences.featureUpdates}
                  onChange={() =>
                    setPreferences((prev) => ({
                      ...prev,
                      featureUpdates: !prev.featureUpdates,
                    }))
                  }
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span>Receive feature updates</span>
              </label>
              <div className="pt-2">
                <button
                  onClick={handleUpdatePreferences}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shared Posts Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
            My Shared Posts
          </h2>
          {sharedPosts.length > 0 ? (
            <div className="flex flex-col items-center space-y-6">
              {sharedPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl transition-all hover:shadow-xl"
                >
                  <div className="p-5">
                    <div className="flex items-center mb-4">
                      <img
                        src={
                          user.photo ||
                          "https://cdn-icons-png.flaticon.com/512/1253/1253756.png"
                        }
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                      />
                      <div className="ml-4">
                        <h3 className="font-bold text-green-800">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {post.isShared && (
                            <span className="text-gray-400">
                              Shared from {post.sharedFrom} •
                            </span>
                          )}{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{post.text}</p>

                    {post.photo && (
                      <div className="w-full flex justify-center">
                        <img
                          src={post.photo}
                          alt="Post"
                          className="w-full h-auto max-h-80 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
              <p className="text-gray-700">You haven't shared any posts yet!</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;