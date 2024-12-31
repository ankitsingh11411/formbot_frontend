import React from 'react';
import styles from './formCard.module.css';

export default function FormCard({ form, onDelete }) {
  return (
    <div className={styles.formCard}>
      <div className={styles.topRight}>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(form._id); // Pass the form ID to delete
          }}
        >
          <span className={styles.deleteIcon}></span>
        </button>
      </div>
      <span className={styles.formName}>{form.title}</span>
    </div>
  );
}
