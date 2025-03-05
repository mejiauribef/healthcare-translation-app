import React, { useState } from 'react';
import VoiceInput from './components/VoiceInput';
import TranscriptDisplay from './components/TranscriptDisplay';
import './styles.css';

function App() {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translating, setTranslating] = useState(false);

  const INPUT_LANG = 'en-US'; // English
  const OUTPUT_LANG = 'es-ES'; // Spanish

  const handleTranslatedText = (text) => {
    setTranslating(false);
    setTranslatedText(text);
  };

  return (
    <div className="container my-4">
      <header className="bg-primary text-white text-center py-3">
        <h1>Healthcare Translation App</h1>
      </header>
      <main className="mt-4">
        <VoiceInput
          inputLang={INPUT_LANG}
          setOriginalText={setOriginalText}
          setTranslatedText={handleTranslatedText}
          setTranslating={setTranslating}
        />
        <TranscriptDisplay
          originalText={originalText}
          translatedText={translatedText}
          outputLang={OUTPUT_LANG}
          translating={translating}
        />
      </main>
      <footer className="bg-light text-center py-3 mt-4">
        <p>Powered by HuggingFace</p>
      </footer>
    </div>
  );
}

export default App;