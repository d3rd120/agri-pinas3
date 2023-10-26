import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();  


  return (
    <I18nextProvider i18n={i18n}>
    <div className="adminCommunityForumAddPostComponent">
      <div className="adminCommunityForumAddPostComponentMainText">
        {t('Edit Announcement')}
      </div>
      <div className="adminCommunityForumAddPostComponentFrameParent">
        <div className="adminCommunityForumAddPostComponentFrameGroup">
          <div className="adminCommunityForumAddPostComponentInputParent">
            <div className="adminCommunityForumAddPostComponentTitle">
              {t('Edit your Announcement')}
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
  </I18nextProvider>
);
};

export default FarmerCommunityForumAddPostComponent;