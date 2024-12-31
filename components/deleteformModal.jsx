import React from 'react';
import styles from './deleteformModal.module.css';

const DeleteFormModal = ({ isOpen, onClose, onDelete }) => {
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

export default DeleteFormModal;
