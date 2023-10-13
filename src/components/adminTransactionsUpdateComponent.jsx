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
          {t('text201')}
        </div>
        <div className="adminTransactionsEditProductComponentFrameParent">
          <div className="adminTransactionsEditProductComponentFrameGroup">
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text202')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text203')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text204')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text205')}
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text206')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text207')}
                value={editedPackaging}
                onChange={(e) => setEditedPackaging(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text208')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text209')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text210')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text211')}
              />
            </div>
          </div>


          <div className="adminTransactionsEditProductComponentFrameGroup">
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text212')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput2"
                type="text"
                placeholder={t('text213')}
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text214')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput2"
                type="text"
                placeholder={t('text215')}
                value={editedKilogram}
                onChange={(e) => setEditedKilogram(e.target.value)}
              />
            </div>          
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text216')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text217')}
              />
            </div>
            <div className="adminTransactionsEditProductComponentInputParent">
              <div className="adminTransactionsEditProductComponentTitle">
                {t('text218')}
              </div>
              <input
                className="adminTransactionsEditProductComponentInput1"
                type="text"
                placeholder={t('text219')}
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
              {t('text220')}
            </div>
          </button>
          <button
            className="adminTransactionsEditProductComponentButton"
            onClick={closePopup1}
          >
            <div className="adminTransactionsEditProductComponentButtonText">
              {t('text221')}
            </div>
          </button>
        </div>
        <div className="adminTransactionsEditProductComponentFormChild" />
      </div>
    </I18nextProvider>
  );

};

export default FarmerMarketplaceEditProductComponent;