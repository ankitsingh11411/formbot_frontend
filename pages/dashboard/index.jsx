import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header';
import FolderCard from '../../components/folderCard';
import FormCard from '../../components/formCard';
import FolderModal from '../../components/folderModal';
import FormModal from '../../components/formModal';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [editingForm, setEditingForm] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: folderData } = await axios.get(
          'http://localhost:5000/api/folders',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setFolders(folderData);

        const { data: formData } = await axios.get(
          'http://localhost:5000/api/forms',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setForms(formData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.dashboard}>
        <div className={styles.folderSection}>
          <button
            className={styles.createFolderButton}
            onClick={() => setShowFolderModal(true)}
          >
            + Create Folder
          </button>
          <div className={styles.folders}>
            {folders.map((folder) => (
              <FolderCard
                key={folder._id}
                folder={folder}
                onRename={(id, name) => console.log(id, name)}
                onDelete={(id) => console.log(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
