import React, { useState } from 'react';
import '../css/Components/adminMarketplaceUpdateComponent.css';
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
      <div className="adminMarketplaceEditProductComponent">
        <div className="adminMarketplaceEditProductComponentMainText">
          {t('text157')}
        </div>
        <div className="adminMarketplaceEditProductComponentFrameParent">
          <div className="adminMarketplaceEditProductComponentFrameGroup">
            <div className="adminMarketplaceEditProductComponentInputParent">
              <div className="adminMarketplaceEditProductComponentTitle">
                {t('text158')}
              </div>
              <input
                className="adminMarketplaceEditProductComponentInput1"
                type="text"
                placeholder={t('text159')}
              />
            </div>
            <div className="adminMarketplaceEditProductComponentInputParent">
              <div className="adminMarketplaceEditProductComponentTitle">
                {t('text160')}
              </div>
              <input
                className="adminMarketplaceEditProductComponentInput1"
                type="text"
                placeholder={t('text161')}
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              />
            </div>
            <div className="adminMarketplaceEditProductComponentInputParent">
              <div className="adminMarketplaceEditProductComponentTitle">
                {t('text162')}
              </div>
              <input
                className="adminMarketplaceEditProductComponentInput1"
                type="text"
                placeholder={t('text163')}
                value={editedPackaging}
                onChange={(e) => setEditedPackaging(e.target.value)}
              />
            </div>
          </div>
          <div className="adminMarketplaceEditProductComponentFrameGroup">
            <div className="adminMarketplaceEditProductComponentInputParent">
              <div className="adminMarketplaceEditProductComponentTitle">
                {t('text166')}
              </div>
              <input
                className="adminMarketplaceEditProductComponentInput2"
                type="text"
                placeholder={t('text167')}
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </div>
            <div className="adminMarketplaceEditProductComponentInputParent">
              <div className="adminMarketplaceEditProductComponentTitle">
                {t('text168')}
              </div>
              <input
                className="adminMarketplaceEditProductComponentInput2"
                type="text"
                placeholder={t('text169')}
                value={editedKilogram}
                onChange={(e) => setEditedKilogram(e.target.value)}
              />
            </div>
            <div className="adminMarketplaceEditProductComponentInputParent">
              <div className="adminMarketplaceEditProductComponentTitle">
                {t('text170')}
              </div>
              <input
                className="adminMarketplaceEditProductComponentInput3"
                type="file"
                required
              />
            </div>
          </div>
        </div>
        <div className="adminMarketplaceEditProductComponentTitle">
          {t('text164')}
        </div>
        <textarea
          className="adminMarketplaceEditProductComponentInput4"
          placeholder={t('text165')}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <div className="adminMarketplaceEditProductComponentButtonGroup">
          <button
            className="adminMarketplaceEditProductComponentButton"
            onClick={handleSaveClick}
          >
            <div className="adminMarketplaceEditProductComponentButtonText">
              {t('text171')}
            </div>
          </button>
          <button
            className="adminMarketplaceEditProductComponentButton"
            onClick={closePopup1}
          >
            <div className="adminMarketplaceEditProductComponentButtonText">
              {t('text172')}
            </div>
          </button>
        </div>
        <div className="adminMarketplaceEditProductComponentFormChild" />
      </div>
    </I18nextProvider>
  );
  
};

export default FarmerMarketplaceEditProductComponent;