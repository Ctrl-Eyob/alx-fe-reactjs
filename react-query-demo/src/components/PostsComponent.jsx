import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import './PostsComponent.css';

// API fetch function
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const PostsComponent = () => {
  const queryClient = useQueryClient();
  
  // Using TanStack Query's useQuery hook
  const { 
    data: posts, 
    isLoading, 
    error, 
    refetch,
    isFetching,
    isError 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="error-container">
        <h3>Error Loading Posts</h3>
        <p>{error?.message || 'An error occurred'}</p>
        <button onClick={() => refetch()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  // Handle manual refetch
  const handleRefetch = () => {
    refetch();
  };

  // Handle cache invalidation
  const handleInvalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  return (
    <div className="posts-component">
      <div className="controls">
        <button 
          onClick={handleRefetch} 
          className="btn btn-primary"
          disabled={isFetching}
        >
          {isFetching ? 'Refetching...' : 'Refetch Posts'}
        </button>
        <button 
          onClick={handleInvalidateCache} 
          className="btn btn-secondary"
        >
          Invalidate Cache
        </button>
        {isFetching && <span className="fetching-indicator">Updating...</span>}
      </div>

      <div className="posts-stats">
        <p>Total Posts: {posts?.length || 0}</p>
        <p>Data Status: {isFetching ? 'Fetching...' : 'Cached'}</p>
      </div>

      <div className="posts-grid">
        {posts?.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-footer">
              <small>Post ID: {post.id}</small>
              <small>User ID: {post.userId}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="cache-info">
        <h4>Cache Information</h4>
        <p>Navigate away and come back - data loads from cache if within 60 seconds</p>
        <p>Check the Network tab in DevTools to see reduced API calls</p>
      </div>
    </div>
  );
};

export default PostsComponent;
