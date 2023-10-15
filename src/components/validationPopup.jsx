import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../css/Components/validationPopup.css';

function Popup({ message, onClose, isVisible }) {
  return (
    <div className={`popup ${isVisible ? 'visible' : ''}`}>
      <div className="popup-content">
        <div className="close-button" onClick={onClose}>
          <FaTimes />
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Popup;
