import React, { useEffect, useState } from "react"
import axios from "../api/axios"
import EditProfile from "./EditProfile"
import { Link } from "react-router-dom"

const UserProfile = () => {
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [sharedPosts, setSharedPosts] = useState([])
  const [preferences, setPreferences] = useState({
    eventNotifications: true,
    featureUpdates: true,
  })
  const [loadingPreferences, setLoadingPreferences] = useState(true)

  const updateUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Error updating profile:", data.message)
        return
      }

      setUser(data.user)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(response.data)
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        )
      }
    }
    fetchUserProfile()
  }, [])

  // Fetch shared posts
  useEffect(() => {
    const fetchSharedPosts = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get("/posts/shared", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setSharedPosts(response.data.posts)
      } catch (error) {
        console.error(
          "Error fetching shared posts:",
          error.response?.data || error.message
        )
      }
    }
    fetchSharedPosts()
  }, [])

  // Fetch email preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get("/users/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPreferences(response.data.preferences)
        setLoadingPreferences(false)
      } catch (error) {
        console.error("Error fetching preferences:", error.message)
        setLoadingPreferences(false)
      }
    }
    fetchPreferences()
  }, [])

  const handleUpdatePreferences = async () => {
    try {
      const token = localStorage.getItem("authToken")
      await axios.put("/users/preferences", preferences, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("Preferences updated!")
    } catch (error) {
      console.error("Error updating preferences:", error.message)
    }
  }

  if (isEditing) {
    return <EditProfile user={user} updateUser={updateUser} />
  }

  console.log("User Profile:", user)
  console.log("Shared Posts:", sharedPosts)

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
  

      {/* Profile Section */}
      <div className='flex-grow flex mt-32 items-center justify-center'>
        <div className='max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden'>
          <div className='bg-green-200 p-6 text-center'>
            <img
              src={"https://cdn-icons-png.flaticon.com/512/1253/1253756.png"}
              alt='User Avatar'
              className='w-24 h-24 mx-auto rounded-full border-4 border-green-400'
            />
            <h2 className='text-2xl font-bold text-green-800 mt-2'>
              {user.name}
            </h2>
          </div>
          <div className='p-6'>
            <h3 className='text-lg font-medium text-green-800'>
              Contact Information
            </h3>
            <p className='text-sm text-gray-700'>
              <strong>Email:</strong> {user.email}
            </p>
            <p className='text-sm text-gray-700'>
              <strong>Phone:</strong> {user.phone || "N/A"}
            </p>
            <p className='text-sm text-gray-700'>
              <strong>Address:</strong> {user.address || "N/A"}
            </p>
          </div>
          <div className='bg-green-100 p-4 text-center'>
            <button
              className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition'
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Shared Posts Section */}
      <h2 className='text-xl font-bold mt-8 px-6'>Shared Posts</h2>
      {sharedPosts.length > 0 ? (
        sharedPosts.map((post) => (
          <div className='flex flex-col items-center'>
            <div
              key={post._id}
              className='bg-white shadow-lg rounded-lg mb-6 w-2/3'
            >
              <div className='p-4'>
                <div className='flex items-center mb-2'>
                  <img
                    src={"https://via.placeholder.com/40"}
                    alt='User'
                    className='w-10 h-10 rounded-full'
                  />
                  <div className='ml-4'>
                    <h3 className='font-bold'>{user.name}</h3>
                    <p className='text-sm text-gray-500'>
                      {post.isShared && (
                        <span className='text-gray-400'>
                          Shared from {post.sharedFrom} •{" "}
                        </span>
                      )}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {post.photo && (
                  <div className='w-full flex justify-center'>
                    <img
                      src={post.photo}
                      alt='Post'
                      className='w-auto h-64 object-cover mt-4 rounded-lg'
                    />
                  </div>
                )}
                <p className='mt-4'>{post.text}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='px-6 text-gray-700'>No shared posts to display yet!</p>
      )}

      {/* Notification Preferences */}
      <div className='max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg p-6'>
        <h3 className='text-xl font-semibold mb-4'>
          Email Notifications Preferences
        </h3>
        {loadingPreferences ? (
          <p>Loading preferences...</p>
        ) : (
          <div>
            <label className='block mb-4'>
              <input
                type='checkbox'
                checked={preferences.eventNotifications}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    eventNotifications: !prev.eventNotifications,
                  }))
                }
                className='mr-2'
              />
              Receive event notifications
            </label>
            <label className='block mb-4'>
              <input
                type='checkbox'
                checked={preferences.featureUpdates}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    featureUpdates: !prev.featureUpdates,
                  }))
                }
                className='mr-2'
              />
              Receive feature updates
            </label>
            <button
              onClick={handleUpdatePreferences}
              className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
