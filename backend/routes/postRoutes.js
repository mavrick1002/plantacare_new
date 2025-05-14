const express = require("express")
const Post = require("../models/post")
const protect = require("../middleware/authMiddleware")
const User = require("../models/user")
const router = express.Router()

// Create a new post
router.post("/", protect, async (req, res) => {
  try {
    const { text, photo } = req.body
    if (!text) {
      return res
        .status(400)
        .json({ message: "Text is required to create a post" })
    }

    const post = new Post({ userId: req.userId, text, photo })
    const savedPost = await post.save()
    res.status(201).json(savedPost)
  } catch (err) {
    console.error("Error creating post:", err.message)
    res.status(500).json({ message: "Failed to create post" })
  }
})

// Fetch all posts
router.get("/", protect, async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name")
      .populate("comments.userId", "name")
    res.status(200).json(posts)
  } catch (err) {
    console.error("Error fetching posts:", err.message)
    res.status(500).json({ message: "Failed to fetch posts" })
  }
})

// Fetch all shared posts by a user
router.get("/shared", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "sharedPosts",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "userId",
        select: "username profilePicture",
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const sharedPosts = user.sharedPosts

    res.status(200).json({
      success: true,
      count: sharedPosts.length,
      posts: sharedPosts,
    })
  } catch (error) {
    console.error("Error fetching shared posts:", error.message)
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch shared posts" })
  }
})

// Like/Unlike a post
router.put("/:postId/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) return res.status(404).json({ message: "Post not found" })

    const index = post.likes.indexOf(req.userId)
    if (index === -1) {
      post.likes.push(req.userId) // Add like
    } else {
      post.likes.splice(index, 1) // Remove like
    }
    await post.save()
    res.status(200).json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to like/unlike post" })
  }
})

// Add a comment to a post
router.post("/:postId/comment", protect, async (req, res) => {
  try {
    const { text } = req.body

    // Validate if text is provided
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" })
    }

    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    // Create a new comment object
    const newComment = { userId: req.userId, text }

    // Push the comment to the post
    post.comments.push(newComment)

    // Save the post with the new comment
    await post.save()

    // Populate the user info in the comments before sending back
    const updatedPost = await Post.findById(req.params.postId).populate(
      "comments.userId",
      "name"
    ) // Populating user details for comments

    // Send back the updated post
    res.status(200).json(updatedPost)
  } catch (err) {
    console.error("Error adding comment:", err.message)
    res.status(500).json({ message: "Failed to add comment" })
  }
})

// Share a post
router.post("/:postId/share", protect, async (req, res) => {
  try {
    const { postId } = req.params

    // Find the original post
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    // Add the shared post to the user's shared posts
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.sharedPosts.push(postId)
    await user.save()

    // Need to update the post's share count
    post.shareCount = (post.shareCount || 0) + 1
    post.isShared = true // Mark the post as shared
    await post.save()

    res.status(200).json({ message: "Post shared successfully", post })
  } catch (error) {
    console.error("Error sharing post:", error.message)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
