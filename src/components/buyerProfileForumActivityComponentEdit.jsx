import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Popup from './validationPopup';
import { db, storage  } from './firebase';
import { doc, updateDoc,} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const FarmerCommunityForumAddPostComponent = ({ postId, postImage }) => {
  const { t } = useTranslation();
  const [validationMessage, setValidationMessage] = useState('');
  const [isValidationVisible, setIsValidationVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // State for visibility of success message
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedImage, setEditedImage] = useState(postImage);
  const [selectedFile, setSelectedFile] = useState(null);

  const closeValidationMessage = () => {
    setIsValidationVisible(false);
  };

  const closeSuccessMessage = () => {
    setIsSuccessVisible(false); // Close the success message
  };

  const handleUpdatePost = async () => {
    try {
      let imageUrl = editedImage; // Default: use the previously edited image URL
  
      // Check if a new file was selected for image change
      if (selectedFile) {
        const imageRef = ref(storage, `images/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(imageRef);
      }
  
      if (!postId) {
        console.error('Error updating post: Post ID is missing.');
        setValidationMessage('Failed to update post: Post ID is missing.');
        setIsValidationVisible(true);
        return; // Exit function early
      }
  
      const postRef = doc(db, 'CommunityForum', postId);
  
      if (postRef) {
        await updateDoc(postRef, {
          title: editedTitle,
          content: editedContent,
          image: imageUrl,
        });
  
        setSuccessMessage('Post updated successfully');
        setIsSuccessVisible(true);
      } else {
        console.error('Error updating post: Post reference is undefined.');
        setValidationMessage('Failed to update post: Post reference is undefined.');
        setIsValidationVisible(true);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setValidationMessage('Failed to update post');
      setIsValidationVisible(true);
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setEditedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumAddPostComponent">
        <div className="adminCommunityForumAddPostComponentMainText">
          {t('ext406')}
        </div>
        <div className="adminCommunityForumAddPostComponentFrameParent">
          <div className="adminCommunityForumAddPostComponentFrameGroup">
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('ext407')}
              </div>
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('ext408')}
              </div>
              <input
                className="adminCommunityForumAddPostComponentInput3"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div className="buyerCommunityForumAddPostComponentInputParent">
            <div className="buyerCommunityForumAddPostComponentTitle">
                {t('ext409')}
              </div>
              <input
                 className="buyerCommunityForumAddPostComponentInput3"
                 type="file"
                 accept="image/*"
                 onChange={handleImageChange}
               />
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('ext410')}
              </div>
              <textarea
                className="adminCommunityForumAddPostComponentInput3"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </div>
            <button className="adminCommunityForumAddPostComponentButton" onClick={handleUpdatePost}>
              <div className="adminCommunityForumAddPostComponentButtonText">
                {t('ext411')}
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