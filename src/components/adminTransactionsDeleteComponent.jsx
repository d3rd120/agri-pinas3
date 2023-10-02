import '../css/Components/adminTransactionsDeleteComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'



const FarmerMarketplaceComponenteDeleteProduct = ({ closePopup }) => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}> 
      <div className="adminTransactionsComponentDeleteProduct">
        <div className="adminTransactionsComponentDeleteProductMainText">{t('farmerPageDeleteText1')}</div>
        <div className="adminTransactionsComponentDeleteProductSubText">
          {t('farmerPageDeleteText2')}
        </div>
        <div className="adminTransactionsComponentDeleteProductButtonContainer">
          <button className="adminTransactionsComponentDeleteProductButton">
            <div className="adminTransactionsComponentDeleteProductButtonText">{t('farmerPageButton5')}</div>
          </button>
          <button className="adminTransactionsComponentDeleteProductButton" onClick={closePopup}>
            <div className="adminTransactionsComponentDeleteProductButtonText">{t('farmerPageButton6')}</div>
          </button>
        </div>
      </div>
    </I18nextProvider>
  );

};


export default FarmerMarketplaceComponenteDeleteProduct;
