import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { uploadImage, storage } from './firebase';
import Popup from './validationPopup'; // Import the Popup component

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();
  const [sessionId, setSessionId] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: '',
    content: '',
    file: null,
    postId: '', // To store the selected image file
  });

  const [popupMessage, setPopupMessage] = useState(''); // For displaying popup messages
  const [isPopupVisible, setPopupVisible] = useState(false); // For controlling popup visibility

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPopupMessage('Please select an image file.');
      setPopupVisible(true);
    } else if (!file.type.startsWith('image/')) {
      setPopupMessage('Please select a valid image file.');
      setPopupVisible(true);
    } else {
      setPostDetails((prevDetails) => ({ ...prevDetails, file }));
    }
  };

  const handlePost = async () => {
    try {
      if (!postDetails.title || !postDetails.content) {
        setPopupMessage('Please fill in all required fields.');
        setPopupVisible(true);
        return;
      }

      if (!postDetails.file) {
        setPopupMessage('Please upload an image.');
        setPopupVisible(true);
        return;
      }

      const newPost = {
        title: postDetails.title,
        content: postDetails.content,
        sessionId: sessionId,
      };

      if (postDetails.file) {
        const imageUrl = await uploadImage(postDetails.file, 'images');
        newPost.image = imageUrl;
      }

      addPost(newPost);

      setPopupMessage('Post written successfully!');
      setPopupVisible(true);

      // Clear form fields
      setPostDetails({
        title: '',
        content: '',
        file: null,
        postId: '',
      });

      setTimeout(() => {       
        window.location.reload();
      }, 1000);

    } catch (error) {
      setPopupMessage(`Error uploading image or storing post: ${error.message}`);
      setPopupVisible(true);
    }
  };

  useEffect(() => {
    const handleUserLogin = () => {
      // Logic to obtain or generate session ID
      const newSessionId = ('');

      // Set the session ID in the state
      setSessionId(newSessionId);
    };

    // Call the function when the component mounts or when the user logs in
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
      <Popup message={popupMessage} onClose={() => setPopupVisible(false)} isVisible={isPopupVisible} />
    </I18nextProvider>
  );
};

export default FarmerCommunityForumAddPostComponent;
