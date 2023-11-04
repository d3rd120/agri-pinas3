import React from 'react';
import '../css/Components/confirmationDialog.css';

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel, onOverlayClick, confirmLabel, cancelLabel }) => {
  const handleOverlayClick = () => {
    if (isOpen) {
      onOverlayClick(); // Call onOverlayClick when the overlay is clicked.
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-dialog-overlay" onClick={handleOverlayClick}>
      <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-dialog-content">
          <p>{message}</p>
          <button onClick={onConfirm}>{confirmLabel}</button>
          <button onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
