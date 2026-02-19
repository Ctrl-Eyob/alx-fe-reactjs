import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import './PostsComponent.css';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PostsComponent = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error, refetch } = useQuery(
    'posts',
    fetchPosts,
    {
      staleTime: 30000, // Data stays fresh for 30 seconds
      cacheTime: 60000, // Cache persists for 1 minute
      onSuccess: (data) => {
        console.log('Data fetched successfully:', data.length, 'posts');
      },
      onError: (error) => {
        console.error('Error fetching data:', error);
      }
    }
  );

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="posts-container">
      <div className="controls">
        <button 
          onClick={() => refetch()} 
          className="refetch-btn"
        >
          Refetch Posts
        </button>
        <button 
          onClick={() => {
            // Invalidate and refetch
            queryClient.invalidateQueries('posts');
          }} 
          className="invalidate-btn"
        >
          Invalidate Cache
        </button>
      </div>

      <div className="posts-grid">
        <div className="posts-list">
          <h2>Posts ({posts?.length || 0})</h2>
          {posts?.slice(0, 10).map(post => (
            <div 
              key={post.id} 
              className={`post-item ${selectedPost?.id === post.id ? 'selected' : ''}`}
              onClick={() => setSelectedPost(post)}
            >
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 50)}...</p>
            </div>
          ))}
        </div>

        {selectedPost && (
          <div className="post-detail">
            <h2>Post Details</h2>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
            <p><small>Post ID: {selectedPost.id}</small></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsComponent;
