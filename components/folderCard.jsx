import styles from './folderCard.module.css';

export default function FolderCard({ folder, onClick, onDelete }) {
  return (
    <div className={styles.folderCard} onClick={() => onClick(folder._id)}>
      <div className={styles.topRight}>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the folder click
            onDelete(folder._id);
          }}
        >
          🗑️
        </button>
      </div>
      <span className={styles.folderName}>{folder.name}</span>
    </div>
  );
}
