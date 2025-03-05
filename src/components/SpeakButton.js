import React from 'react';

const SpeakButton = ({ text, lang }) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button className="btn btn-success" onClick={speak} disabled={!text}>
      <i className="fas fa-volume-up mr-2"></i>
      Speak
    </button>
  );
};

export default SpeakButton;