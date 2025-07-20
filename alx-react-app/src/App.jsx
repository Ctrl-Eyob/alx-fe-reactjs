// src/App.jsx

import { useState } from 'react';
import reactLogo from './assets/react.svg';        // relative path to assets inside src
import viteLogo from '/vite.svg';                  // absolute path (likely in public folder)
import './App.css';                                // CSS file in src folder
import Header from './components/Header';         // Header.jsx inside src/components
import MainContent from './components/MainContent'; // MainContent.jsx inside src/components
import Footer from './components/Footer';   


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Our custom component */}
      <WelcomeMessage />

      {/* Vite + React Starter Content */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Header />
      <MainContent />
      <Footer />
     </>
  );
}

export default App;


