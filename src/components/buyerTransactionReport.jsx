import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import Popup from './validationPopup';

const FarmerCommunityForumAddPostComponent = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [validationMessage, setValidationMessage] = useState('');
  const [orderRefId, setOrderRefId] = useState(null);

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

          // Add transaction document
          const orders = []; // Replace with your actual orders
          const orderRef = await addDoc(collection(db, 'Transaction'), {
            userId: user.uid,
            orders,
          });

          // Set the orderRef.id to state
          setOrderRefId(orderRef.id);
          
        }
      } else {
        // User is signed out
        setUserInfo({});
        setOrderRefId(null); // Reset orderRefId when user signs out
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const addReport = async () => {
    try {
      setIsSubmitting(true);
  
      if (!title || !content) {
        setValidationMessage(t('ext432'));
        setIsSubmitting(false);
        return;
      }
  
      // Check if orderRefId is available
      if (!orderRefId) {
        setValidationMessage('Order ID is missing');
        setIsSubmitting(false);
        return;
      }
  
      const docRef = await addDoc(collection(db, 'Reports'), {
        title,
        content,
        orderId: orderRefId, // Use orderRefId instead of setOrderRefId
        userId: userInfo.uid,
        fullname: userInfo.fullname,
        timestamp: new Date().toLocaleString(),
      });
  
      setValidationMessage(t('ext433'));
      // console.log('Report added with ID: ', docRef.id);
      setIsSubmitting(false);
  
      // Reload the window after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      // console.error('Error adding report: ', error);
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
          {t('ext426')}
        </div>
        <div className="buyerCommunityForumAddPostComponentFrameParent">
          <div className="buyerCommunityForumAddPostComponentFrameGroup">
            <div className="buyerCommunityForumAddPostComponentInputParent">
              <div className="buyerCommunityForumAddPostComponentTitle">
                {t('ext427')}
              </div>
              <input
                className="buyerCommunityForumAddPostComponentInput1"
                type="text"
                name="title"
                placeholder={t('ext428')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="buyerCommunityForumAddPostComponentTitle">
              {t('ext429')}
            </div>
            <textarea
              className="buyerCommunityForumAddPostComponentInput4"
              name="content"
              placeholder={t('ext430')}
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
                {isSubmitting ? t('Submitting...') : t('ext431')}
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
