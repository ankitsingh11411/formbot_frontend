import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/header';
import FolderCard from '../../components/folderCard';
import FormCard from '../../components/formCard';
import FolderModal from '../../components/folderModal';
import FormModal from '../../components/formModal';
import DeleteFormModal from '../../components/deleteformModal';
import DeleteFolderModal from '../../components/deletefolderModal';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null); // Null means dashboard view
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false);
  const [isDeleteFormModalOpen, setIsDeleteFormModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [formToDelete, setFormToDelete] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/folders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
        alert('Failed to fetch folders. Please refresh the page.');
      }
    };

    const fetchForms = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/forms/${selectedFolderId || 'null'}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
        alert('Failed to fetch forms. Please refresh the page.');
      }
    };

    fetchFolders();
    fetchForms();
  }, [selectedFolderId]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleDeleteFolder = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/folders/${folderToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder._id !== folderToDelete)
      );
      setSelectedFolderId(null);
      setIsDeleteFolderModalOpen(false);
    } catch (error) {
      console.error('Error deleting folder:', error);
      alert('Failed to delete folder. Please try again.');
    }
  };

  const handleDeleteForm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${formToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setForms((prevForms) =>
        prevForms.filter((form) => form._id !== formToDelete)
      );
      setIsDeleteFormModalOpen(false);
    } catch (error) {
      console.error('Error deleting form:', error);
      alert('Failed to delete form. Please try again.');
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/folders',
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setFolders((prevFolders) => [...prevFolders, data]);
      setIsFolderModalOpen(false);
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder. Please try again.');
    }
  };

  const handleCreateForm = async (formName) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/forms',
        { title: formName, folderId: selectedFolderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setForms((prevForms) => [...prevForms, data]);
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error creating form:', error);
      alert('Failed to create form. Please try again.');
    }
  };

  return (
    <div className={`${styles.dashboard} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className={styles.content}>
        <div className={styles.folderSection}>
          <button
            className={styles.createFolderButton}
            onClick={() => setIsFolderModalOpen(true)}
          >
            <span className={styles.iconadd}></span>
            Create Folder
          </button>
          <div className={styles.folders}>
            {folders.map((folder) => (
              <FolderCard
                key={folder._id}
                folder={folder}
                onClick={() => setSelectedFolderId(folder._id)}
                onDelete={(folderId) => {
                  setFolderToDelete(folderId);
                  setIsDeleteFolderModalOpen(true);
                }}
              />
            ))}
            <FolderCard
              folder={{ name: 'Dashboard', _id: null }}
              onClick={() => setSelectedFolderId(null)}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <button
            className={styles.createFormButton}
            onClick={() => setIsFormModalOpen(true)}
          >
            +<br />
            Create Form
          </button>
          <div className={styles.forms}>
            {forms.map((form) => (
              <FormCard
                key={form._id}
                form={form}
                onDelete={(formId) => {
                  setFormToDelete(formId);
                  setIsDeleteFormModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {isFolderModalOpen && (
        <FolderModal
          isOpen={isFolderModalOpen}
          onClose={() => setIsFolderModalOpen(false)}
          onSave={handleCreateFolder}
        />
      )}

      {isFormModalOpen && (
        <FormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleCreateForm}
        />
      )}

      {isDeleteFolderModalOpen && (
        <DeleteFolderModal
          isOpen={isDeleteFolderModalOpen}
          onClose={() => setIsDeleteFolderModalOpen(false)}
          onConfirm={handleDeleteFolder} // Updated to use onConfirm instead of onDelete
        />
      )}

      {isDeleteFormModalOpen && (
        <DeleteFormModal
          isOpen={isDeleteFormModalOpen}
          onClose={() => setIsDeleteFormModalOpen(false)}
          onConfirm={handleDeleteForm}
        />
      )}
    </div>
  );
}
