import React, { useState } from 'react';
import '../css/Components/adminTransactionsUpdateComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerMarketplaceEditProductComponent = ({ closePopup1, handleSave }) => {
  const { t } = useTranslation();
  const [editedCategory, setEditedCategory] = useState('');
  const [editedPackaging, setEditedPackaging] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedKilogram, setEditedKilogram] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleSaveClick = () => {
  
    handleSave(editedCategory, editedPackaging, editedPrice, editedKilogram, editedDescription);
    closePopup1();
  };
  return (
    <I18nextProvider i18n={i18n}> 
      <div className="adminTransactionsEditProductComponent">
        <div className="adminTransactionsEditProductComponentMainText">
          {t('I-update ang iyong produkto')}
        </div>
        <div className="adminTransactionsEditProductComponentFrameParent">
          <div className="adminTransactionsEditProductComponentFrameGroup">
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('ID ng User')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Ilagay ang ID ng User')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('ID ng Item')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Ilagay ang ID ng Item')}
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Pangalan ng Bumili')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Ilagay ang Pangalan ng Bumili')}
                value={editedPackaging}
                onChange={(e) => setEditedPackaging(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Petsa ng Pag-Order')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Ilagay ang Petsa ng Pag-Order')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Presyo kada Yunit')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Ilagay ang Presyo kada Yunit')}
              />
            </div>
          </div>


          <div className="adminTransactionsEditProductComponentFrameGroup">
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Dami ng Pag-order')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput2"
                type="text"
                placeholder={t('Ilagay ang Dami ng Pag-order')}
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Kabuuang Halaga')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput2"
                type="text"
                placeholder={t('Ilagay ang Kabuuang Halaga')}
                value={editedKilogram}
                onChange={(e) => setEditedKilogram(e.target.value)}
              />
            </div>          
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Pangalan ng Magsasaka')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Ilagay ang Pangalan ng Magsasaka')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('Kalagayan')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('Pending')}
              />
            </div>
          </div>
        </div>
        
      
        <div className="adminTransactionsEditProductComponentButtonGroup">
          <button
            className="adminTransactionsEditProductComponentButton"
            onClick={handleSaveClick}
          >
            <div className="adminTransactionsEditProductComponentButtonText">
              {t('farmerPageButton3')}
            </div>
          </button>
          <button
            className="adminTransactionsEditProductComponentButton"
            onClick={closePopup1}
          >
            <div className="adminTransactionsEditProductComponentButtonText">
              {t('farmerPageButton4')}
            </div>
          </button>
        </div>
        <div className="adminTransactionsEditProductComponentFormChild" />
      </div>
    </I18nextProvider>
  );

};

export default FarmerMarketplaceEditProductComponent;