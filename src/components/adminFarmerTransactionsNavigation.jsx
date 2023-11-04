import '../css/Components/adminBuyerTransactionsNavigation.css';
import { NavLink } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const FarmerTransactionsNavigation = () => {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}> 
            <div className="adminBuyerTransactionsNavigation">
                <div className="adminBuyerTransactionsNavigationParent">
                    <NavLink activeClassName="active" className="adminBuyerTransactionsNavigationText" exact to='/adminfarmerpendingtransactions'>{t('Pending')}</NavLink>
                    <NavLink activeClassName="active" className="adminBuyerTransactionsNavigationText" exact to='/adminfarmercancelledtransactions'>{t('Cancelled')}</NavLink>
                    <NavLink activeClassName="active" className="adminBuyerTransactionsNavigationText" exact to='/adminfarmercompletedtransactions'>{t('Completed')}</NavLink>
                </div>
            </div>
            </I18nextProvider>
    );
};

export default FarmerTransactionsNavigation;
