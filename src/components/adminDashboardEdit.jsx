import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Popup from './validationPopup';

const FarmerCommunityForumAddPostComponent = ({ selectedAnnouncement }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValidationVisible, setIsValidationVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // State for visibility of success message

  const updateAnnouncement = async ({ title, content }) => {
    try {
      if (!selectedAnnouncement) {
        console.error('No announcement selected for update');
        return;
      }

      if (!title.trim() || !content.trim()) {
        setValidationMessage('Title and Content are required.');
        setIsValidationVisible(true);
        return;
      }

      const announcementRef = doc(db, 'Announcements', selectedAnnouncement.id);

      await updateDoc(announcementRef, { title, content });

      setSuccessMessage('Content Edited Successfully!'); // Set success message
      setIsSuccessVisible(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);  // Show success message
    } catch (error) {
      console.error('Error updating announcement:', error);
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
          {t('ext123')}
        </div>
        <div className="adminCommunityForumAddPostComponentFrameParent">
          <div className="adminCommunityForumAddPostComponentFrameGroup">
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('ext124')}
              </div>
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('ext125')}
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
                {t('ext126')}
              </div>
              <textarea
                className="adminCommunityForumAddPostComponentInput3"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              className="adminCommunityForumAddPostComponentButton"
              onClick={() =>
                updateAnnouncement({ title: title?.toString() ?? '', content: content?.toString() ?? '' })
              }
            >
              <div className="adminCommunityForumAddPostComponentButtonText">
                {t('ext127')}
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
