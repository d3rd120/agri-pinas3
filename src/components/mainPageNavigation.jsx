import { useCallback, useState } from "react";
import Logo from '../img/agriPinasLogo.png';
import "../css/Components/mainPageNavigation.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ConfirmationDialog from './confirmationDialog';
import i18n from '../i18n';

const MainPageNavigation = () => {
  const { i18n } = useTranslation();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const changeLanguage = (lng) => {
    localStorage.setItem('userLanguage', lng);    
    i18n.changeLanguage(lng);   
    setShowConfirmationDialog(false); // Close the confirmation dialog.
    window.location.reload();
  };
  const onAgriPinasTextClick = useCallback(() => {
    // Please sync "Student Homepage" to the project
  }, []);

  const handleLanguageLinkClick = () => {
    setShowConfirmationDialog(true);
  };

  const handleOverlayClick = () => {
    setShowConfirmationDialog(false); // Close the confirmation dialog without changing the language.
  };

  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <header className="mainNavigationHeader">
        <div className="mainNavigationContainer">
          <div className="mainNavigationLogo">
            <img
              className="mainNavigationLogoIcon"
              alt=""
              src={Logo}
            />
            <b className="mainNavigationMainText" onClick={onAgriPinasTextClick}>
              AgriPinas
            </b>
          </div>
          <div className="mainNavigationRightLinks">
            <div className="mainNavigationMenu">
              <Link className="mainNavigationLink" to='/'>{t('text1')}</Link>
              <Link className="mainNavigationLink" to='/about'>{t('text2')}</Link>
              <a className="mainNavigationLink" onClick={handleLanguageLinkClick}>
                {t('text3')}
              </a>
              <Link className="mainNavigationLink" to='/login'>{t('text4')}</Link>
            </div>
          </div>
        </div>
      </header>
      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        message={t('Ttext24')}
        onConfirm={() => changeLanguage('en')}
        onCancel={() => changeLanguage('fil')}
        onOverlayClick={handleOverlayClick} // Pass the overlay click handler
        confirmLabel={t('Ttext25')}
        cancelLabel={t('Ttext26')}
      />
    </I18nextProvider>
  );
};

export default MainPageNavigation;
