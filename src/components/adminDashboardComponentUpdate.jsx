import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, uploadImage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import Popup from './validationPopup';

const FarmerCommunityForumAddPostComponent = ({ sessionId }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValidationVisible, setIsValidationVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // State for visibility of success message

  const handleAddPost = async () => {
    if (!title.trim() || !content.trim()) {
      setValidationMessage('Title and Content are required.');
      setIsValidationVisible(true);
      return;
    }

    try {
      const now = new Date();
      const formattedDateTime = now.toLocaleString();

      const newPost = {
        title,
        content,
        timestamp: formattedDateTime,
        sessionId,
      };

      const postsCollection = collection(db, 'Announcements');
      await addDoc(postsCollection, newPost);

      setTitle('');
      setContent('');
      setSuccessMessage('Content Posted Successfully!'); // Set success message
      setIsSuccessVisible(true);
      setTimeout(() => {
        window.location.reload();
      }, 500); // Show success message
    } catch (error) {
      console.error('Error adding post:', error);
      alert(error.message);
    }
  };

  const closeValidationMessage = () => {
    setIsValidationVisible(false);
  };

  const closeSuccessMessage = () => {
    setIsSuccessVisible(false); // Close the success message
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumAddPostComponent">
        <div className="adminCommunityForumAddPostComponentMainText">
          {t('Announcement')}
        </div>
        <div className="adminCommunityForumAddPostComponentFrameParent">
          <div className="adminCommunityForumAddPostComponentFrameGroup">
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Post your Announcement here')}
              </div>
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Title')}
              </div>
              <input
                className="adminCommunityForumAddPostComponentInput3"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Content')}
              </div>
              <textarea
                className="adminCommunityForumAddPostComponentInput3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              className="adminCommunityForumAddPostComponentButton"
              onClick={handleAddPost}
            >
              <div className="adminCommunityForumAddPostComponentButtonText">
                {t('Post')}
              </div>
            </button>
            <div className="adminCommunityForumAddPostComponentFormChild" />
          </div>
        </div>
      </div>
      {/* Display validation message */}
      <Popup message={validationMessage} onClose={closeValidationMessage} isVisible={isValidationVisible} />
      {/* Display success message */}
      <Popup message={successMessage} onClose={closeSuccessMessage} isVisible={isSuccessVisible} />
    </I18nextProvider>
  );
};

export default FarmerCommunityForumAddPostComponent;
