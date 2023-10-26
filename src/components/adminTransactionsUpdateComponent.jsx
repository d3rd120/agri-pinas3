import React, { useState } from 'react';
import '../css/Components/adminTransactionsUpdateComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerMarketplaceEditProductComponent = ({ closePopup1 }) => {
  const { t } = useTranslation(); 
 
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminTransactionsComponentDeleteProduct">
      <div className="adminTransactionsComponentDeleteProductMainText">{t('Archive this Product')}</div>
      <div className="adminTransactionsComponentDeleteProductSubText">
        {t('Are you sure you want to archive this?')}
      </div>
      <div className="adminTransactionsComponentDeleteProductButtonContainer">
        <button className="adminTransactionsComponentDeleteProductButton">
          <div className="adminTransactionsComponentDeleteProductButtonText">{t('text224')}</div>
        </button>
        <button className="adminTransactionsComponentDeleteProductButton" onClick={closePopup1}>
          <div className="adminTransactionsComponentDeleteProductButtonText">{t('text225')}</div>
        </button>
      </div>
    </div>
  </I18nextProvider>
  );

};

export default FarmerMarketplaceEditProductComponent;