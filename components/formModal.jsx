import React, { useState } from 'react';
import styles from './formModal.module.css';

const FormModal = ({ isOpen, onClose, onSave, existingForm = null }) => {
  const [formName, setFormName] = useState(existingForm?.name || '');

  const handleSave = () => {
    if (!formName.trim()) {
      alert('Form name cannot be empty');
      return;
    }
    onSave(formName, existingForm?.id);
    setFormName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{existingForm ? 'Edit Form' : 'Create Form'}</h2>
        <input
          type="text"
          placeholder="Enter form name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
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

export default FormModal;
