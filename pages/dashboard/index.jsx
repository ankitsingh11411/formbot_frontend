import { useState, useEffect } from 'react';
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
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editingForm, setEditingForm] = useState(null);

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
      }
    };

    const fetchForms = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/forms', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchFolders();
    fetchForms();
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleDeleteFolder = async (folderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/folders/${folderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder._id !== folderId)
      );
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleDeleteForm = async (formId) => {
    try {
      await axios.delete(`http://localhost:5000/api/forms/${formId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error('Error deleting form:', error);
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
    }
  };

  const handleCreateForm = async (formName) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/forms',
        { name: formName, folderId: selectedFolderId },
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
    }
  };

  const handleEditForm = (form) => {
    setEditingForm(form);
    setIsFormModalOpen(true);
  };

  const handleSaveForm = async (formName) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/forms/${editingForm._id}`,
        { name: formName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === editingForm._id ? { ...form, name: data.name } : form
        )
      );
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <div className={isDarkMode ? styles.darkMode : styles.lightMode}>
      <Header />
      <div className={styles.dashboard}>
        <div className={styles.folderSection}>
          <button
            className={styles.createFolderButton}
            onClick={() => setIsFolderModalOpen(true)}
          >
            Create a Folder
          </button>
          <div className={styles.folders}>
            {folders.map((folder) => (
              <FolderCard
                key={folder._id}
                folder={folder}
                onClick={() => setSelectedFolderId(folder._id)}
                onDelete={handleDeleteFolder}
              />
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <button
            className={styles.createFormButton}
            onClick={() => setIsFormModalOpen(true)}
          >
            +
            <br />
            Create a Typebot
          </button>
          <div className={styles.forms}>
            {forms
              .filter(
                (form) =>
                  !selectedFolderId || form.folderId === selectedFolderId
              )
              .map((form) => (
                <FormCard
                  key={form._id}
                  form={form}
                  onEdit={handleEditForm}
                  onDelete={handleDeleteForm}
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
          onSave={handleSaveForm}
          initialFormName={editingForm?.name || ''}
        />
      )}
    </div>
  );
}
