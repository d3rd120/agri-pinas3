import '../css/Components/farmerMarketplaceComponentDeleteProduct.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'



const FarmerMarketplaceComponenteDeleteProduct = ({ closePopup }) => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerMarketplaceComponenteDeleteProduct">
      <div className="farmerMarketplaceComponentDeleteProductMainText">{t('farmerPageDeleteText1')}</div>
      <div className="farmerMarketplaceComponentDeleteProductSubText">
      {t('farmerPageDeleteText2')}
      </div>
      <div className="farmerMarketplaceComponentDeleteProductButtonContainer">
        <button className="farmerMarketplaceComponentDeleteProductButton">
          <div className="farmerMarketplaceComponentDeleteProductButtonText">{t('farmerPageButton5')}</div>
        </button>
        <button className="farmerMarketplaceComponentDeleteProductButton" onClick={closePopup}>
          <div className="farmerMarketplaceComponentDeleteProductButtonText">{t('farmerPageButton6')}</div>
        </button>
      </div>
    </div>
    </I18nextProvider>
  );
};


export default FarmerMarketplaceComponenteDeleteProduct;
