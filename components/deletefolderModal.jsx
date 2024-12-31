import React from 'react';
import styles from './deletefolderModal.module.css';

const DeleteFolderModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Delete Folder</h2>
        <p>
          Are you sure you want to delete this folder? This action cannot be
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

export default DeleteFolderModal;
