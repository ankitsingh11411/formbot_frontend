import React from 'react';
import styles from './formCard.module.css';

const FormCard = ({ form, onEdit, onDelete }) => {
  return (
    <div className={styles.formCard}>
      <h3 className={styles.formName}>{form.name}</h3>
      <div className={styles.actions}>
        <button onClick={() => onEdit(form)} className={styles.editButton}>
          Edit
        </button>
        <button
          onClick={() => onDelete(form._id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FormCard;
