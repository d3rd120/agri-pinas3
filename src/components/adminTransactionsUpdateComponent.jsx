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
                {t('farmerPageEditText2')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText3')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText6')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText7')}
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText10')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText11')}
                value={editedPackaging}
                onChange={(e) => setEditedPackaging(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText2')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText3')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText2')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText3')}
              />
            </div>
          </div>


          <div className="adminTransactionsEditProductComponentFrameGroup">
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText4')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput2"
                type="text"
                placeholder={t('farmerPageEditText5')}
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText8')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput2"
                type="text"
                placeholder={t('farmerPageEditText9')}
                value={editedKilogram}
                onChange={(e) => setEditedKilogram(e.target.value)}
              />
            </div>          
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText2')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText3')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('farmerPageEditText2')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('farmerPageEditText3')}
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