import { useCallback, useState } from "react";
import Logo from '../img/agriPinasLogo.png';
import "../css/Components/mainPageNavigation.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from "react-icons/fa";
import i18n from '../i18n';

const MainPageNavigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false); // Close the dropdown after language selection
  };

  const onAgriPinasTextClick = useCallback(() => {
    // Please sync "Student Homepage" to the project
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
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
              <a className="mainNavigationLink">{t('mainPageNavigationComponentText1')}</a>
              <a className="mainNavigationLink">{t('mainPageNavigationComponentText2')}</a>
              <a className="mainNavigationLink">{t('mainPageNavigationComponentText3')}</a>  
              <a className="mainNavigationLink">{t('mainPageNavigationComponentText4')}</a>           
              <div
                className="mainNavigationLink"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a className="mainNavigationLinkText">{t('mainPageNavigationComponentText5')}</a>                
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('fil')}>Filipino</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </I18nextProvider>
  );
};

export default MainPageNavigation;
