import React from 'react';
import '../css/Components/confirmationDialog.css';

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <div className="confirmation-dialog-content">
          <p>{message}</p>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
