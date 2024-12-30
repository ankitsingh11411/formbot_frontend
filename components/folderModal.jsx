import React, { useState } from 'react';
import styles from './folderModal.module.css';

const FolderModal = ({ isOpen, onClose, onSave }) => {
  const [folderName, setFolderName] = useState('');

  const handleSave = () => {
    if (!folderName.trim()) {
      alert('Folder name cannot be empty');
      return;
    }
    onSave(folderName);
    setFolderName('');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Folder</h2>
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className={styles.input}
        />
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;
