import React from 'react';
import TranslatorPanel from './components/TranslatorPanel';
import './index.css';

function App() {
  return (
    <>
      <div className="bg-mesh"></div>
      <div className="app-container">
        <header className="header">
          <h1>Ethereal Translate</h1>
          <p>Seamlessly translate Kannada to English powered by AI</p>
        </header>
        <TranslatorPanel />
      </div>
    </>
  );
}

export default App;
