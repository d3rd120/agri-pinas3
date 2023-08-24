import '../css/Components/farmerCropTrackerNavigation.css';
import { NavLink } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCropTrackerNavigation = () => {
    const { t } = useTranslation();
    return (
        <I18nextProvider i18n={i18n}>         
            <div className="farmerCropTrackerNavigation">
                <div className="farmerCropTrackerNavigationParent">
                    <NavLink activeClassName="active" className="farmerCropTrackerNavigationText" exact to='/farmercroptrackerharvest'>{t('farmerCropTrackerNavigationText1')}</NavLink>
                    <NavLink activeClassName="active" className="farmerCropTrackerNavigationText" exact to='/farmercroptrackerharvested'>{t('farmerCropTrackerNavigationText2')}</NavLink>                  
                </div>
            </div>
            </I18nextProvider>  
    );
};

export default FarmerCropTrackerNavigation;
