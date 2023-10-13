import React, { useState } from 'react';
import { FaUsers, FaGlobe, FaHome, FaWallet, FaStore, FaBook, FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../css/Components/adminPageNavigation.css';
import Logo from '../img/agriPinasLogo.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminNavigation = () => {
  const { t } = useTranslation();
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown5, setShowDropdown5] = useState(false);

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  const toggleDropdown5 = () => {
    setShowDropdown5(!showDropdown5);
  };

  return (
    <I18nextProvider i18n={i18n}> 
    
    <div className="adminPageNavigation">
      <div className="adminPageNavigationLogoParent">
        <img className="adminPageNavigationLogoIcon" alt="" src={Logo} />
        <div className="adminPageNavigationMainText">AgriPinas</div>
      </div>
      <div className="adminPageNavigationGroupParent">

        <NavLink
          className="adminPageNavigationLink1"
          to="/admincommunityforum"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('text133')}</div>
          <FaUsers className="adminPageNavigationLinksIcon" />
        </NavLink>


        <NavLink
          className="adminPageNavigationLink6"
          to="/adminlogreport"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('text140')}</div>
          <FaBook className="adminPageNavigationLinksIcon" />
        </NavLink>  

        <div
          className={`adminPageNavigationLink2 ${
            showDropdown2 ? 'active' : ''
          }`}
          onMouseEnter={toggleDropdown2}
          onMouseLeave={toggleDropdown2}
        >
          <div className="adminPageNavigationLinks">{t('text134')}&nbsp;<FaAngleDown /></div>
          <FaGlobe className="adminPageNavigationLinksIcon" />
          {showDropdown2 && (
            <div className="dropdown">
              <NavLink
                to="/adminfarmerpendingtransactions"
                activeClassName="active"
              >
                {t('text135')}
              </NavLink>
              <NavLink
                to="/adminbuyerpendingtransactions"
                activeClassName="active"
              >
                {t('text136')}
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          className="adminPageNavigationLink3"
          to="/admindashboard"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('text131')}</div>
          <FaHome className="adminPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="adminPageNavigationLink4"
          to="/adminmarketplace"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('text132')}</div>
          <FaWallet className="adminPageNavigationLinksIcon" />
        </NavLink>
        <div
          className={`adminPageNavigationLink5 ${
            showDropdown5 ? 'active' : ''
          }`}
          onMouseEnter={toggleDropdown5}
          onMouseLeave={toggleDropdown5}
        >
          <div className="adminPageNavigationLinks">{t('text137')}&nbsp;<FaAngleDown /></div>
          <FaStore className="adminPageNavigationLinksIcon" />
          {showDropdown5 && (
            <div className="dropdown">
              <NavLink
                to="/adminaccountfarmer"
                activeClassName="active"
              >
                {t('text138')}
              </NavLink>
              <NavLink
                to="/adminaccountbuyer"
                activeClassName="active"
              >
                {t('text139')}
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <NavLink className="adminPageNavigationProfileParent" to = '/login'>       
      {t('text141')}          
      </NavLink>
    </div>
    </I18nextProvider>
  );
};

export default AdminNavigation;
