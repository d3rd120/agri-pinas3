import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

const FarmerCommunityForumAddPostComponent = ({ selectedAnnouncement }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const updateAnnouncement = async ({ title, content }) => {
    try {
      if (!selectedAnnouncement) {
        console.error('No announcement selected for update');
        return;
      }
  
      const announcementRef = doc(db, 'Announcements', selectedAnnouncement.id);
  
      console.log('Before update', { title, content });
  
      await updateDoc(announcementRef, { title, content });
  
      console.log('After update');
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };
  

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumAddPostComponent">
        <div className="adminCommunityForumAddPostComponentMainText">
          {t('Edit Announcement')}
        </div>
        <div className="adminCommunityForumAddPostComponentFrameParent">
          <div className="adminCommunityForumAddPostComponentFrameGroup">
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Edit your Announcement')}
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
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              className="adminCommunityForumAddPostComponentButton"
              onClick={() => updateAnnouncement({ title: title?.toString() ?? '', content: content?.toString() ?? '' })}
            >
              <div className="adminCommunityForumAddPostComponentButtonText">
                {t('Update')}
              </div>
            </button>
            <div className="adminCommunityForumAddPostComponentFormChild" />
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default FarmerCommunityForumAddPostComponent;
