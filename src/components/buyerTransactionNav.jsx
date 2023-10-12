import '../css/BuyerPage/buyerTransactionsNavigation.css';
import { NavLink } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const BuyerTransactionNav = () => {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}> 
          <div className="buyerTransactionsNavigation">
                <div className="buyerTransactionsNavigationParent">
                    <NavLink activeClassName="active" className="buyerTransactionsNavigationText" exact to='/buyertoreceive'>{t('text87')}</NavLink>
                    <NavLink activeClassName="active" className="buyerTransactionsNavigationText" exact to='/buyercomplete'>{t('text88')}</NavLink>
                    <NavLink activeClassName="active" className="buyerTransactionsNavigationText" exact to='/buyercancelled'>{t('text89')}</NavLink>
                </div>
                </div>
            </I18nextProvider>
    );
};

export default BuyerTransactionNav;
