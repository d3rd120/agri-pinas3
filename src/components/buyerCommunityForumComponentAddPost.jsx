import React, { useState } from 'react';
import '../css/Components/farmerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { uploadImage } from './firebase';

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
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
        const imageUrl = await uploadImage(postDetails.file);
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
      <div className="farmerCommunityForumAddPostComponent">
        <div className="farmerCommunityForumAddPostComponentMainText">
          {t('farmerCommunityAddPostText1')}
        </div>
        <div className="farmerCommunityForumAddPostComponentFrameParent">
          <div className="farmerCommunityForumAddPostComponentFrameGroup">
            <div className="farmerCommunityForumAddPostComponentInputParent">
              <div className="farmerCommunityForumAddPostComponentTitle">
                {t('farmerCommunityAddPostText2')}
              </div>
              <input
                className="farmerCommunityForumAddPostComponentInput1"
                type="text"
                name="title"
                placeholder={t('farmerCommunityAddPostText3')}
                onChange={handleInputChange}
                value={postDetails.title}
              />
            </div>
            <div className="farmerCommunityForumAddPostComponentInputParent">
              <div className="farmerCommunityForumAddPostComponentTitle">
                {t('farmerCommunityAddPostText4')}
              </div>
              <input
                className="farmerCommunityForumAddPostComponentInput3"
                type="file"
            name="image"
            accept="image/*" // Accept only image files
            onChange={handleFileChange}
              />
            </div>
            <div className="farmerCommunityForumAddPostComponentTitle">
              {t('farmerCommunityAddPostText5')}
            </div>
            <textarea
              className="farmerCommunityForumAddPostComponentInput4"
              name="content"
              placeholder={t('farmerCommunityAddPostText6')}
              onChange={handleInputChange}
              value={postDetails.content}
            />
            <button className="farmerCommunityForumAddPostComponentButton" onClick={handlePost}>
              <div className="farmerCommunityForumAddPostComponentButtonText">
                {t('farmerPageButton8')}
              </div>
            </button>
            <div className="farmerCommunityForumAddPostComponentFormChild" />
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default FarmerCommunityForumAddPostComponent;
