import React, { useState } from 'react';

const TranslatorPanel = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          from: 'kn',
          to: 'en'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to translate');
      }

      setOutputText(data.translated);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="translator-panel">
      <div className="panels-container">
        <div className="text-area-box">
          <span className="lang-label">Kannada</span>
          <textarea 
            placeholder="ಇಲ್ಲಿ ಬರೆಯಿರಿ..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        
        <div className="text-area-box">
          <span className="lang-label">English</span>
          <textarea 
            placeholder="Translation will appear here..." 
            value={outputText}
            readOnly
          />
        </div>
      </div>
      
      <div className="controls">
        <button 
          className="translate-btn"
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? <div className="loader"></div> : 'Translate'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TranslatorPanel;
