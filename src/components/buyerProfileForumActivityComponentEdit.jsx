import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Popup from './validationPopup';


const FarmerCommunityForumAddPostComponent = ({  }) => {
  const { t } = useTranslation();
  const [validationMessage, setValidationMessage] = useState('');
  const [isValidationVisible, setIsValidationVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // State for visibility of success message


  const closeValidationMessage = () => {
    setIsValidationVisible(false);
  };

  const closeSuccessMessage = () => {
    setIsSuccessVisible(false); // Close the success message
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumAddPostComponent">
        <div className="adminCommunityForumAddPostComponentMainText">
          {t('Edit your Post')}
        </div>
        <div className="adminCommunityForumAddPostComponentFrameParent">
          <div className="adminCommunityForumAddPostComponentFrameGroup">
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Edit your Post here')}
              </div>
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Title')}
              </div>
              <input
                className="adminCommunityForumAddPostComponentInput3"
                type="text"              
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
              />
            </div>
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('Content')}
              </div>
              <textarea
                className="adminCommunityForumAddPostComponentInput3"                
              />
            </div>
            <button
              className="adminCommunityForumAddPostComponentButton"          
            >
              <div className="adminCommunityForumAddPostComponentButtonText">
                {t('Update')}
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