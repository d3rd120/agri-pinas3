import React from 'react';
import '../css/Components/Popup.css';

function Popup({ message, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <span>{message}</span>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
