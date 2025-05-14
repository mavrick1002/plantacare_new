import React, { useState, useEffect } from "react"
import axios from "../api/axios"
import { FaThumbsUp, FaShare } from "react-icons/fa"
import { Link } from "react-router-dom"

const DashboardPage = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ text: "", photo: "" })
  const [error, setError] = useState("")
  const [commentText, setCommentText] = useState({})
  const [shareSuccess, setShareSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetchCurrentUser()
    fetchPosts()
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCurrentUser(response.data)
    } catch (err) {
      console.error("Failed to fetch current user:", err)
    }
  }

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.get("/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Ensure user data is included for each post and comment
      const postsWithUsers = await Promise.all(
        response.data.map(async (post) => {
          // If userId is an object ID instead of populated user object
          if (post.userId && typeof post.userId === "string") {
            try {
              const userResponse = await axios.get(`/users/${post.userId}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              post.userId = userResponse.data
            } catch (err) {
              console.error(`Failed to fetch user for post ${post._id}:`, err)
            }
          }

          // Handle comments
          if (post.comments && post.comments.length > 0) {
            const updatedComments = await Promise.all(
              post.comments.map(async (comment) => {
                if (comment.userId && typeof comment.userId === "string") {
                  try {
                    const userResponse = await axios.get(
                      `/users/${comment.userId}`,
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    return { ...comment, userId: userResponse.data }
                  } catch (err) {
                    console.error(`Failed to fetch user for comment:`, err)
                    return comment
                  }
                }
                return comment
              })
            )
            post.comments = updatedComments
          }

          return post
        })
      )

      setPosts(postsWithUsers)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch posts")
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.text) {
      setError("Text is required to create a post")
      return
    }

    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.post("/posts", newPost, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Add current user info to the new post
      const newPostWithUser = {
        ...response.data,
        userId: currentUser,
      }

      setPosts([newPostWithUser, ...posts])
      setNewPost({ text: "", photo: "" })
      setError("")
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message)
      setError("Failed to create post")
    }
  }

  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.put(
        `/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Find the original post to preserve all user data
      const originalPost = posts.find((p) => p._id === postId)

      if (originalPost) {
        // Create updated post with preserved user data
        const updatedPost = {
          ...response.data,
          userId: originalPost.userId,
          // Most importantly, preserve the comment user data
          comments: response.data.comments.map((newComment, index) => {
            // Try to find matching comment in the original post
            const originalComment =
              originalPost.comments && index < originalPost.comments.length
                ? originalPost.comments[index]
                : null

            // If we found a matching comment, preserve its user data
            if (originalComment && originalComment.userId) {
              return {
                ...newComment,
                userId: originalComment.userId,
              }
            }
            return newComment
          }),
        }

        setPosts((prev) =>
          prev.map((post) => (post._id === postId ? updatedPost : post))
        )
      } else {
        // Fallback if original post isn't found
        setPosts((prev) =>
          prev.map((post) => (post._id === postId ? response.data : post))
        )
      }
    } catch (err) {
      console.error(err)
      setError("Failed to like/unlike post")
    }
  }

  const handleAddComment = async (postId) => {
    const comment = commentText[postId]
    if (!comment) return

    try {
      const token = localStorage.getItem("authToken")
      const response = await axios.post(
        `/posts/${postId}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Find original post to preserve existing comment user data
      const originalPost = posts.find((p) => p._id === postId)

      if (originalPost) {
        // Create updated post with preserved user data
        const updatedPost = {
          ...response.data,
          userId: originalPost.userId,
          comments: response.data.comments.map((newComment, index) => {
            // For existing comments, preserve user data
            if (index < originalPost.comments.length) {
              return {
                ...newComment,
                userId: originalPost.comments[index].userId,
              }
            }
            // For the new comment (the last one), add current user data
            if (index === response.data.comments.length - 1) {
              return {
                ...newComment,
                userId: currentUser,
              }
            }
            return newComment
          }),
        }

        setPosts((prev) =>
          prev.map((post) => (post._id === postId ? updatedPost : post))
        )
      } else {
        // Fallback if original post isn't found
        setPosts((prev) =>
          prev.map((post) => (post._id === postId ? response.data : post))
        )
      }

      setCommentText((prev) => ({ ...prev, [postId]: "" }))
      setError("")
    } catch (err) {
      console.error(err)
      setError("Failed to add comment")
    }
  }

  const handleSharePost = async (postId) => {
    try {
      const token = localStorage.getItem("authToken")

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `/posts/${postId}/share`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      // Update the UI to increment share count on the original post
      setPosts(
        posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              shareCount: (post.shareCount || 0) + 1,
            }
          }
          return post
        })
      )

      // Show success message
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)
      setError("")
    } catch (err) {
      console.error(
        "Error sharing post:",
        err.response?.data?.message || err.message
      )
      setError(err.response?.data?.message || "Failed to share post")
    }
  }

  const getUserDisplayName = (user) => {
    if (!user) return "Unknown User"
    return user.name || user.username || user.email || "Unknown User"
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
  

      {/* Success Message */}
      {shareSuccess && (
        <div className='fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg'>
          Post shared successfully to your profile!
        </div>
      )}

      {/* New Post Form */}
      <div className='flex items-center mt-20 justify-center mb-6'>
        <div className='bg-white shadow-lg rounded-lg p-4 flex space-x-4 items-center w-3/4'>
          <textarea
            placeholder='Write something...'
            value={newPost.text}
            onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
            className='flex-grow p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Photo URL (optional)'
            value={newPost.photo}
            onChange={(e) => setNewPost({ ...newPost, photo: e.target.value })}
            className='p-2 border rounded'
          />
          <button
            onClick={handleCreatePost}
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className='flex flex-col items-center'>
        {posts.map((post) => (
          <div
            key={post._id}
            className='bg-white shadow-lg rounded-lg mb-6 w-2/3'
          >
            <div className='p-4'>
              <div className='flex items-center mb-2'>
                <img
                  src={"https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"}
                  alt='User'
                  className='w-10 h-10 rounded-full'
                />
                <div className='ml-4'>
                  <h3 className='font-bold'>
                    {getUserDisplayName(post.userId)}
                  </h3>
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
              <div className='flex items-center justify-between mt-4 px-2'>
                <button
                  onClick={() => handleLikePost(post._id)}
                  className='text-blue-500 hover:text-blue-700 flex items-center space-x-2'
                >
                  <FaThumbsUp /> <span>{post.likes?.length || 0} Likes</span>
                </button>
                <button
                  onClick={() => handleSharePost(post._id)}
                  className='text-blue-500 hover:text-blue-700 flex items-center space-x-2'
                >
                  <FaShare /> <span>{post.shareCount || 0} Shares</span>
                </button>
              </div>
              <div className='mt-4'>
                {post.comments?.map((comment, index) => (
                  <p
                    key={index}
                    className='text-sm bg-gray-100 p-2 rounded-lg mb-2'
                  >
                    <strong>{getUserDisplayName(comment.userId)}:</strong>{" "}
                    {comment.text}
                  </p>
                ))}
              </div>
              <div className='flex items-center mt-4'>
                <input
                  type='text'
                  placeholder='Write a comment...'
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value,
                    })
                  }
                  className='w-full p-2 border rounded'
                />
                <button
                  onClick={() => handleAddComment(post._id)}
                  className='bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600'
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default DashboardPage
