import styles from './formCard.module.css';

export default function FormCard({ form, onClick, onDelete }) {
  return (
    <div className={styles.formCard} onClick={() => onClick(form._id)}>
      <div className={styles.topRight}>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(form._id);
          }}
        >
          🗑️
        </button>
      </div>
      <span className={styles.formName}>{form.name}</span>
    </div>
  );
}
