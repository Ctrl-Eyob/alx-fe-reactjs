import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const blogPosts = {
  1: {
    id: 1,
    title: "Getting Started with React Router",
    content: "React Router is a powerful routing library for React that allows you to handle navigation in your single-page applications. In this post, we'll explore the basics of setting up routes, handling navigation, and creating dynamic routes.",
    author: "John Doe",
    date: "2024-01-15",
    category: "React"
  },
  2: {
    id: 2,
    title: "Advanced Routing Patterns",
    content: "Once you've mastered the basics of React Router, it's time to explore more advanced patterns. This post covers nested routes, protected routes, and route configuration best practices for large-scale applications.",
    author: "Jane Smith",
    date: "2024-01-20",
    category: "Advanced"
  }
};

const BlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPost(blogPosts[postId] || null);
      setLoading(false);
    }, 500);
  }, [postId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post Not Found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="back-btn">
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Go Back
      </button>
      
      <article className="post-article">
        <div className="post-header">
          <h2>{post.title}</h2>
          <div className="post-meta">
            <span className="post-author">By {post.author}</span>
            <span className="post-date">Posted on {post.date}</span>
            <span className="post-category">{post.category}</span>
          </div>
        </div>
        
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </article>
      
      <div className="post-navigation">
        <button 
          onClick={() => navigate(`/blog/${parseInt(postId) - 1}`)}
          disabled={parseInt(postId) <= 1}
          className="nav-btn prev"
        >
          ← Previous Post
        </button>
        <Link to="/" className="home-link">Home</Link>
        <button 
          onClick={() => navigate(`/blog/${parseInt(postId) + 1}`)}
          disabled={!blogPosts[parseInt(postId) + 1]}
          className="nav-btn next"
        >
          Next Post →
        </button>
      </div>
    </div>
  );
};

export default BlogPost;