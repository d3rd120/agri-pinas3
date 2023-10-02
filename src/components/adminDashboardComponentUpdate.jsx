import React, { useState } from 'react';
import '../css/Components/adminDashboardComponentUpdate.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { uploadImage } from './firebase';

const FarmerCommunityForumAddPostComponent = ({ addPost }) => {
  const { t } = useTranslation();


  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumAddPostComponent">
        <div className="adminCommunityForumAddPostComponentMainText">
          {t('Maglagay ng Anunsyo')}
        </div>
        <div className="adminCommunityForumAddPostComponentFrameParent">
          <div className="adminCommunityForumAddPostComponentFrameGroup">
            <div className="adminCommunityForumAddPostComponentInputParent">
              <div className="adminCommunityForumAddPostComponentTitle">
                {t('I-upload ang iyong Pubmat')}
              </div>
              <input
                className="adminCommunityForumAddPostComponentInput3"
                type="file"
                name="image"
                accept="image/*" // Accept only image files
              />
            </div>
            <button className="adminCommunityForumAddPostComponentButton">
              <div className="adminCommunityForumAddPostComponentButtonText">
                {t('I-update')}
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
