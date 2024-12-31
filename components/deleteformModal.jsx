import React from 'react';
import styles from './deleteformModal.module.css';

const DeleteFormModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Delete Form</h2>
        <p>
          Are you sure you want to delete this form? This action cannot be
          undone.
        </p>
        <div className={styles.modalActions}>
          <button
            onClick={onConfirm} // Call the onConfirm function when Confirm is clicked
            className={styles.saveButton}
          >
            Confirm
          </button>
          <div className={styles.divider}></div>
          <button
            onClick={onClose} // Close the modal without deleting
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFormModal;
