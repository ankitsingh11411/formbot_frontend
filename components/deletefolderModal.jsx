import React from 'react';
import styles from './deletefolderModal.module.css';

const DeleteFolderModal = ({ isOpen, onClose, onDelete }) => {
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
          <button onClick={onDelete} className={styles.saveButton}>
            Confirm
          </button>
          <div className={styles.divider}></div>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFolderModal;
