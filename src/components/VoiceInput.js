import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

const VoiceInput = ({ inputLang, setOriginalText, setTranslatedText, setTranslating }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const recognitionRef = useRef(null);

  if (!recognitionRef.current) {
    recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
  }

  const handleTranslate = useCallback(async (transcript) => {
    try {
      setTranslating(true);
      const response = await axios.post('http://localhost:5001/translate', {
        text: transcript,
      });
      setTranslatedText(response.data.translatedText);
    } catch (err) {
      setError('Translation failed. Please try again.');
      setTranslating(false);
      console.error('Translation error:', err);
    }
  }, [setTranslatedText, setTranslating]);

  useEffect(() => {
    const recognition = recognitionRef.current;
    recognition.lang = inputLang;

    const handleResult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setOriginalText(transcript);
      setError('');
      handleTranslate(transcript);
    };

    const handleError = (event) => {
      setError(
        'Speech recognition error: ' +
          (event.error === 'no-speech' ? 'No speech detected' : 'Check microphone permissions')
      );
      setIsListening(false);
      setTranslating(false);
    };

    recognition.onresult = handleResult;
    recognition.onerror = handleError;

    return () => {
      recognition.onresult = null;
      recognition.onerror = null;
    };
  }, [inputLang, setOriginalText, setTranslating, handleTranslate]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="text-center">
      <button className="btn btn-primary mb-3" onClick={toggleListening}>
        <i className="fas fa-microphone mr-2"></i>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default VoiceInput;