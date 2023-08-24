import '../css/Components/farmerTransactionsNavigation.css';
import { NavLink } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerTransactionsNavigation = () => {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}> 
            <div className="farmerTransactionsNavigation">
                <div className="farmerTransactionsNavigationParent">
                    <NavLink activeClassName="active" className="farmerTransactionsNavigationText" exact to='/farmertransactionspending'>{t('farmerTransactionsNavigationText1')}</NavLink>
                    <NavLink activeClassName="active" className="farmerTransactionsNavigationText" exact to='/farmertransactionscancelled'>{t('farmerTransactionsNavigationText2')}</NavLink>
                    <NavLink activeClassName="active" className="farmerTransactionsNavigationText" exact to='/farmertransactionscompleted'>{t('farmerTransactionsNavigationText3')}</NavLink>
                </div>
            </div>
         </I18nextProvider>
    );
};

export default FarmerTransactionsNavigation;
