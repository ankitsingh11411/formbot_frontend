import React, { useState } from 'react';
import styles from './folderCard.module.css';

const FolderCard = ({ folder, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(folder.name);

  const handleRename = () => {
    if (!newName.trim()) {
      alert('Folder name cannot be empty');
      return;
    }
    onRename(folder._id, newName);
    setIsEditing(false);
  };

  return (
    <div className={styles.folderCard}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={styles.renameInput}
          />
          <button onClick={handleRename} className={styles.saveButton}>
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className={styles.folderName}>{folder.name}</h3>
          <div className={styles.actions}>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.renameButton}
            >
              Rename
            </button>
            <button
              onClick={() => onDelete(folder._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderCard;
