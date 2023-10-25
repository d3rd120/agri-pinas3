import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, uploadImage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddPost = async () => {
    try {
      // Upload the image to Firebase Storage
      const imageUrl = await uploadImage(image);
  
  
      // Get current date and time
      const now = new Date();
      const formattedDateTime = now.toLocaleString();
  
      // Create post object with user info
      const newPost = {
        title,
        content,
        imageUrl,
      
        timestamp: formattedDateTime, 
      };
  
      // Save the post to Firestore
      const postsCollection = collection(db, 'Announcements'); // Assuming 'announcements' is the collection name
      await addDoc(postsCollection, newPost);
  
      // Clear the form
      setImage(null);
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
        {t('text145')}
      </div>
      <div className="adminCommunityForumAddPostComponentFrameParent">
        <div className="adminCommunityForumAddPostComponentFrameGroup">
          <div className="adminCommunityForumAddPostComponentInputParent">
            <div className="adminCommunityForumAddPostComponentTitle">
              {t('text146')}
            </div>
            <input
              className="adminCommunityForumAddPostComponentInput3"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
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
              {t('text147')}
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