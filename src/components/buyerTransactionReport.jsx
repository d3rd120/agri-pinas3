import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import Popup from './validationPopup';

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get additional user info, such as full name
        const userDoc = await getDoc(doc(db, 'Users', user.uid));
        if (userDoc.exists()) {
          setUserInfo({
            uid: user.uid,
            fullname: userDoc.data().fullname,
          });
        }
      } else {
        // User is signed out
        setUserInfo({});
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const addReport = async () => {
    try {
      setIsSubmitting(true);

      if (!title || !content) {
        setValidationMessage('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }

      const docRef = await addDoc(collection(db, 'Reports'), {
        title,
        content,
        userId: userInfo.uid,
        fullname: userInfo.fullname,
        timestamp: new Date().toLocaleString(),
      });

      setValidationMessage('Report submitted successfully');
      console.log('Report added with ID: ', docRef.id);
      setIsSubmitting(false);

      // Reload the window after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error adding report: ', error);
      setValidationMessage('An error occurred while submitting the report.');
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setValidationMessage(''); // Clear previous validation message
    await addReport();
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerCommunityForumAddPostComponent">
        <div className="buyerCommunityForumAddPostComponentMainText">
          {t('Report')}
        </div>
        <div className="buyerCommunityForumAddPostComponentFrameParent">
          <div className="buyerCommunityForumAddPostComponentFrameGroup">
            <div className="buyerCommunityForumAddPostComponentInputParent">
              <div className="buyerCommunityForumAddPostComponentTitle">
                {t('Report Title')}
              </div>
              <input
                className="buyerCommunityForumAddPostComponentInput1"
                type="text"
                name="title"
                placeholder={t('Enter report Title')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="buyerCommunityForumAddPostComponentTitle">
              {t('Issue Description')}
            </div>
            <textarea
              className="buyerCommunityForumAddPostComponentInput4"
              name="content"
              placeholder={t('text118')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Popup message={validationMessage} onClose={() => setValidationMessage('')} isVisible={!!validationMessage} />
            <button
              className="buyerCommunityForumAddPostComponentButton"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <div className="buyerCommunityForumAddPostComponentButtonText">
                {isSubmitting ? t('Submitting...') : t('Report')}
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
