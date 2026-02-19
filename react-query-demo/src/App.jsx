import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // Data considered fresh for 30 seconds
      gcTime: 60000, // Cache persists for 60 seconds (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="app-header">
          <h1>React Query Demo</h1>
          <p>Fetching posts from JSONPlaceholder API</p>
        </header>
        <main>
          <PostsComponent />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;