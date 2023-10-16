import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { uploadImage, storage } from './firebase';

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();
  const [sessionId, setSessionId] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: '',
    content: '',
    file: null,
    postId: '', // To store the selected image file
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
        sessionId: sessionId, // Add session ID
      };
  
      // Upload the image and get the download URL
      if (postDetails.file) {
        const imageUrl = await uploadImage(postDetails.file, 'images'); // Specify 'images' folder
        newPost.image = imageUrl;
        console.log('test', postDetails);
      }
  
      // Call the addPost function with the new post data
      addPost(newPost);
  
      // Clear form fields after successful post
      setPostDetails({
        title: '',
        content: '',
        file: null,
        postId: '',
      });
    } catch (error) {
      console.error('Error uploading image or storing post:', error);
      alert(`Error uploading image or storing post: ${error.message}`);
    }
  };
  
  
  useEffect(() => {
    const handleUserLogin = () => {
      // Logic to obtain or generate session ID
      const newSessionId = ('');
  
      // Set the session ID in the state
      setSessionId(newSessionId);
    };
  
    // Call the function when the component mounts or when user logs in
    handleUserLogin();
  }, []); // Add dependencies as needed
  

  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerCommunityForumAddPostComponent">
        <div className="buyerCommunityForumAddPostComponentMainText">
          {t('text113')}
        </div>
        <div className="buyerCommunityForumAddPostComponentFrameParent">
          <div className="buyerCommunityForumAddPostComponentFrameGroup">
            <div className="buyerCommunityForumAddPostComponentInputParent">
              <div className="buyerCommunityForumAddPostComponentTitle">
                {t('text114')}
              </div>
              <input
                className="buyerCommunityForumAddPostComponentInput1"
                type="text"
                name="title"
                placeholder={t('text115')}
                onChange={handleInputChange}
                value={postDetails.title}
              />
            </div>
            <div className="buyerCommunityForumAddPostComponentInputParent">
              <div className="buyerCommunityForumAddPostComponentTitle">
                {t('text116')}
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
              {t('text117')}
            </div>
            <textarea
              className="buyerCommunityForumAddPostComponentInput4"
              name="content"
              placeholder={t('text118')}
              onChange={handleInputChange}
              value={postDetails.content}
            />
            <button className="buyerCommunityForumAddPostComponentButton" onClick={handlePost}>
              <div className="buyerCommunityForumAddPostComponentButtonText">
                {t('text119')}
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
