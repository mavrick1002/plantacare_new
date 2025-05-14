import { useState } from "react"
import { Link } from "react-router-dom"

const EditProfile = ({ user, updateUser }) => {
  const [editedUser, setEditedUser] = useState({ ...user })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (typeof updateUser === "function") {
      await updateUser(editedUser)
      alert("Profile updated successfully!")
    } else {
      alert("Update function not provided.")
    }
    console.log("Updated Profile:", editedUser)
  }

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
