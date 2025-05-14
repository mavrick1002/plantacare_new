import React, { useState } from "react"

const EditProfile = ({ user, updateUser }) => {
  const [editedUser, setEditedUser] = useState({ ...user })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser(editedUser)
    console.log("Updated Profile:", editedUser)
  }

  return (
    <div className='bg-green-50 min-h-screen'>
      {/* Navigation Bar */}
      <nav className='bg-green-900 -m-8 pt-8 text-white'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>
            <a href='/'>Plant Care</a>
          </h1>
          <div className='flex space-x-4'>
            <a href='/home' className='hover:underline'>
              Home
            </a>
            <a href='/research-work' className='hover:underline'>
              Research
            </a>
            <a href='/video-tutorials' className='hover:underline'>
              Tutorials
            </a>
            <a href='/plants' className='hover:underline'>
              Plants
            </a>
            <a href='/marketplace' className='hover:underline'>
              MarketplacePage
            </a>
            <a href='/profile' className='hover:underline'>
              User
            </a>
          </div>
        </div>
      </nav>

      {/* Edit Profile Form */}
      <div className='flex items-center justify-center min-h-screen'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden p-6'>
          <h2 className='text-2xl font-bold text-green-800 mb-4 text-center'>
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-medium'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={editedUser.name}
                onChange={handleInputChange}
                className='w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>

            {/* Email Field */}
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 font-medium'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={editedUser.email}
                onChange={handleInputChange}
                className='w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>

            {/* Photo Field */}
            <div className='mb-4'>
              <label
                htmlFor='photo'
                className='block text-gray-700 font-medium'
              >
                Photo
              </label>
              <input
                type='tel'
                id='photo'
                name='photo'
                value={editedUser.photo}
                onChange={handleInputChange}
                className='w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-gray-700 font-medium mb-1'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={editedUser.password}
                onChange={handleInputChange}
                className='w-full p-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                required
              />
            </div>

            {/* Save Button */}
            <div className='text-center'>
              <button
                type='submit'
                className='bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
