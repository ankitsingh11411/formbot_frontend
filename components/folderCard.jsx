import React from 'react';
import styles from './folderCard.module.css';

export default function FolderCard({ folder, onClick, onDelete }) {
  return (
    <div className={styles.folderCard} onClick={() => onClick(folder._id)}>
      <div className={styles.topRight}>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(folder._id);
          }}
        >
          <span className={styles.deleteIcon}></span>
        </button>
      </div>
      <span className={styles.folderName}>{folder.name}</span>
    </div>
  );
}
