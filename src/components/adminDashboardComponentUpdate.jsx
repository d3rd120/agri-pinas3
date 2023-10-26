import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, uploadImage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

 

  const handleAddPost = async () => {
    try {
     
  
  
      
      const now = new Date();
      const formattedDateTime = now.toLocaleString();
  
      
      const newPost = {
        title,
        content,
       
      
        timestamp: formattedDateTime, 
      };
  
   
      const postsCollection = collection(db, 'Announcements'); 
      await addDoc(postsCollection, newPost);
  

      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding post:', error);
      alert(error.message);
    }
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
  </I18nextProvider>
);
};

export default FarmerCommunityForumAddPostComponent;