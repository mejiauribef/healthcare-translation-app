import React from 'react';
import SpeakButton from './SpeakButton';

const TranscriptDisplay = ({ originalText, translatedText, outputLang, translating }) => (
  <div className="row">
    <div className="col-md-6 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Original</h5>
          <p className="card-text">{originalText || 'Waiting for input...'}</p>
        </div>
      </div>
    </div>
    <div className="col-md-6 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Translated</h5>
          <p className="card-text">
            {translating ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Translating...</span>
              </div>
            ) : (
              translatedText || 'Translation pending...'
            )}
          </p>
          <SpeakButton text={translatedText} lang={outputLang} />
        </div>
      </div>
    </div>
  </div>
);

export default TranscriptDisplay;