import React, { useState } from 'react';
import '../css/Components/buyerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { uploadImage, storage } from './firebase';

const FarmerCommunityForumAddPostComponent = ({ addPost, folderName }) => {
  const { t } = useTranslation();
  const [postDetails, setPostDetails] = useState({
    title: '',
    content: '',
    file: null, // To store the selected image file
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPostDetails((prevDetails) => ({ ...prevDetails, file }));
  };

  const handlePost = async () => {
    try {
      const newPost = {
        title: postDetails.title,
        content: postDetails.content,
      };
  
      // Upload the image and get the download URL
      if (postDetails.file) {
        const imageUrl = await uploadImage(postDetails.file, 'images'); // Specify 'images' folder
        newPost.image = imageUrl;
      }
  
      // Call the addPost function with the new post data
      addPost(newPost);
  
      // Clear form fields after successful post
      setPostDetails({
        title: '',
        content: '',
        file: null,
      });
    } catch (error) {
      console.error('Error uploading image or storing post:', error);
      alert(`Error uploading image or storing post: ${error.message}`);
    }
  };
  

  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerCommunityForumAddPostComponent">
        <div className="buyerCommunityForumAddPostComponentMainText">
          {t('farmerCommunityAddPostText1')}
        </div>
        <div className="buyerCommunityForumAddPostComponentFrameParent">
          <div className="buyerCommunityForumAddPostComponentFrameGroup">
            <div className="buyerCommunityForumAddPostComponentInputParent">
              <div className="buyerCommunityForumAddPostComponentTitle">
                {t('farmerCommunityAddPostText2')}
              </div>
              <input
                className="buyerCommunityForumAddPostComponentInput1"
                type="text"
                name="title"
                placeholder={t('farmerCommunityAddPostText3')}
                onChange={handleInputChange}
                value={postDetails.title}
              />
            </div>
            <div className="buyerCommunityForumAddPostComponentInputParent">
              <div className="buyerCommunityForumAddPostComponentTitle">
                {t('farmerCommunityAddPostText4')}
              </div>
              <input
                className="buyerCommunityForumAddPostComponentInput3"
                type="file"
                name="image"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
              />
            </div>
            <div className="buyerCommunityForumAddPostComponentTitle">
              {t('farmerCommunityAddPostText5')}
            </div>
            <textarea
              className="buyerCommunityForumAddPostComponentInput4"
              name="content"
              placeholder={t('farmerCommunityAddPostText6')}
              onChange={handleInputChange}
              value={postDetails.content}
            />
            <button className="buyerCommunityForumAddPostComponentButton" onClick={handlePost}>
              <div className="buyerCommunityForumAddPostComponentButtonText">
                {t('farmerPageButton8')}
              </div>
            </button>
            <div className="buyerCommunityForumAddPostComponentFormChild" />
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default FarmerCommunityForumAddPostComponent;
