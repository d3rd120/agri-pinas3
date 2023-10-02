import '../css/Components/adminMarketplaceDeleteComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'



const FarmerMarketplaceComponenteDeleteProduct = ({ closePopup }) => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}> 
      <div className="adminMarketplaceComponenteDeleteProduct">
        <div className="adminMarketplaceComponentDeleteProductMainText">{t('farmerPageDeleteText1')}</div>
        <div className="adminMarketplaceComponentDeleteProductSubText">
          {t('farmerPageDeleteText2')}
        </div>
        <div className="adminMarketplaceComponentDeleteProductButtonContainer">
          <button className="adminMarketplaceComponentDeleteProductButton">
            <div className="adminMarketplaceComponentDeleteProductButtonText">{t('farmerPageButton5')}</div>
          </button>
          <button className="adminMarketplaceComponentDeleteProductButton" onClick={closePopup}>
            <div className="adminMarketplaceComponentDeleteProductButtonText">{t('farmerPageButton6')}</div>
          </button>
        </div>
      </div>
    </I18nextProvider>
  );
  
};


export default FarmerMarketplaceComponenteDeleteProduct;
