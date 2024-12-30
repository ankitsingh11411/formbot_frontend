import React, { useState, useEffect } from 'react';
import styles from './formModal.module.css';

const FormModal = ({ isOpen, onClose, onSave, initialFormName }) => {
  const [formName, setFormName] = useState(initialFormName);

  useEffect(() => {
    if (isOpen) {
      setFormName(initialFormName);
    }
  }, [isOpen, initialFormName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formName);
  };

  if (!isOpen) {
    console.log('Modal is closed');
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Form Name</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
