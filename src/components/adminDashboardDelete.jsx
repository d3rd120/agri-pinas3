import '../css/Components/adminMarketplaceDeleteComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import i18n from '../i18n'
import { db } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const FarmerMarketplaceComponenteDeleteProduct = ({ closePopup, selectedAnnouncement }) => {
  const { t } = useTranslation();


  const handleDelete = async () => {
    try {
      if (!selectedAnnouncement) {
        // console.error('No announcement selected for deletion');
        return;
      }

      // Use selectedAnnouncement.id to identify the announcement to delete
      await deleteDoc(doc(db, 'Announcements', selectedAnnouncement.id));
      // Close the popup or perform other actions after successful delete
      setTimeout(() => {
        window.location.href = '/admindashboard';
      },); // Show success message 
    } catch (error) {
      // console.error('Error deleting announcement:', error);
    }
  };

  return (
    <I18nextProvider i18n={i18n}> 
      <div className="adminMarketplaceComponenteDeleteProduct"onClick={handleDelete}>      
        <div className="adminMarketplaceComponentDeleteProductSubText">
          {t('ext128')}
        </div>
        <div className="adminMarketplaceComponentDeleteProductButtonContainer">
          <button className="adminMarketplaceComponentDeleteProductButton">
            <div className="adminMarketplaceComponentDeleteProductButtonText">{t('ext129')}</div>
          </button>
          <button className="adminMarketplaceComponentDeleteProductButton" onClick={closePopup}>
            <div className="adminMarketplaceComponentDeleteProductButtonText">{t('ext130')}</div>
          </button>
        </div>
      </div>
    </I18nextProvider>
  );
  
};


export default FarmerMarketplaceComponenteDeleteProduct;
