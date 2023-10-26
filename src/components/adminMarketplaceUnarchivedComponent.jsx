import '../css/Components/adminMarketplaceDeleteComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'



const FarmerMarketplaceComponenteDeleteProduct = ({ closePopup }) => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}> 
      <div className="adminMarketplaceComponenteDeleteProduct">
        <div className="adminMarketplaceComponentDeleteProductMainText">{t('Unarchive this Product')}</div>
        <div className="adminMarketplaceComponentDeleteProductSubText">
          {t('Are you sure you want to Unarchive this?')}
        </div>
        <div className="adminMarketplaceComponentDeleteProductButtonContainer">
          <button className="adminMarketplaceComponentDeleteProductButton">
            <div className="adminMarketplaceComponentDeleteProductButtonText">{t('text175')}</div>
          </button>
          <button className="adminMarketplaceComponentDeleteProductButton" onClick={closePopup}>
            <div className="adminMarketplaceComponentDeleteProductButtonText">{t('text176')}</div>
          </button>
        </div>
      </div>
    </I18nextProvider>
  );
  
};


export default FarmerMarketplaceComponenteDeleteProduct;
