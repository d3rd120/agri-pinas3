import React, { useState } from 'react';
import '../css/Components/farmerMarketplaceComponentEditProduct.css';
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
    <div className="farmerMarketplaceEditProductComponent">
      <div className="farmerMarketplaceEditProductComponentMainText">
      {t('farmerPageEditText1')}
      </div>
      <div className="farmerMarketplaceEditProductComponentFrameParent">
        <div className="farmerMarketplaceEditProductComponentFrameGroup">
          <div className="farmerMarketplaceEditProductComponentInputParent">
            <div className="farmerMarketplaceEditProductComponentTitle">
              {t('farmerPageEditText2')}
            </div>
            <input
              className="farmerMarketplaceEditProductComponentInput1"
              type="text"
              placeholder = {t('farmerPageEditText3')}
            />
          </div>
          <div className="farmerMarketplaceEditProductComponentInputParent">
            <div className="farmerMarketplaceEditProductComponentTitle">
            {t('farmerPageEditText6')}
            </div>
            <input
              className="farmerMarketplaceEditProductComponentInput1"
              type="text"
              placeholder={t('farmerPageEditText7')}
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
          </div>
          <div className="farmerMarketplaceEditProductComponentInputParent">
            <div className="farmerMarketplaceEditProductComponentTitle">
            {t('farmerPageEditText10')}
            </div>
            <input
              className="farmerMarketplaceEditProductComponentInput1"
              type="text"
              placeholder={t('farmerPageEditText11')}
              value={editedPackaging}
              onChange={(e) => setEditedPackaging(e.target.value)}
            />
          </div>
        </div>
        <div className="farmerMarketplaceEditProductComponentFrameGroup">
          <div className="farmerMarketplaceEditProductComponentInputParent">
            <div className="farmerMarketplaceEditProductComponentTitle">
            {t('farmerPageEditText4')}
            </div>
            <input
              className="farmerMarketplaceEditProductComponentInput2"
              type="text"
              placeholder={t('farmerPageEditText5')}
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
            />
          </div>
          <div className="farmerMarketplaceEditProductComponentInputParent">
            <div className="farmerMarketplaceEditProductComponentTitle">
            {t('farmerPageEditText8')}
            </div>
            <input
              className="farmerMarketplaceEditProductComponentInput2"
              type="text"
              placeholder={t('farmerPageEditText9')}
              value={editedKilogram}
              onChange={(e) => setEditedKilogram(e.target.value)}
            />
          </div>
          <div className="farmerMarketplaceEditProductComponentInputParent">
            <div className="farmerMarketplaceEditProductComponentTitle">
            {t('farmerPageEditText12')}
            </div>
            <input
              className="farmerMarketplaceEditProductComponentInput3"
              type="file"
              required
            />
          </div>
        </div>
      </div>
      <div className="farmerMarketplaceEditProductComponentTitle">
      {t('farmerPageEditText13')}
      </div>
      <textarea
        className="farmerMarketplaceEditProductComponentInput4"
        placeholder={t('farmerPageEditText14')}
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <div className="farmerMarketplaceEditProductComponentButtonGroup">
        <button
          className="farmerMarketplaceEditProductComponentButton"
          onClick={handleSaveClick}
        >
          <div className="farmerMarketplaceEditProductComponentButtonText">
          {t('farmerPageButton3')}
          </div>
        </button>
        <button
          className="farmerMarketplaceEditProductComponentButton"
          onClick={closePopup1}
        >
          <div className="farmerMarketplaceEditProductComponentButtonText">
          {t('farmerPageButton4')}
          </div>
        </button>
      </div>
      <div className="farmerMarketplaceEditProductComponentFormChild" />
    </div>
    </I18nextProvider>
  );
};

export default FarmerMarketplaceEditProductComponent;