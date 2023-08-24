import React, { useState } from 'react';
import { FaUsers, FaGlobe, FaHome, FaWallet, FaStore, FaUserCircle, FaBell, FaAngleDown } from 'react-icons/fa';
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
          <div className="adminPageNavigationLinks">{t('farmerPageNavgationText3')}</div>
          <FaUsers className="adminPageNavigationLinksIcon" />
        </NavLink>

        <div
          className={`adminPageNavigationLink2 ${
            showDropdown2 ? 'active' : ''
          }`}
          onMouseEnter={toggleDropdown2}
          onMouseLeave={toggleDropdown2}
        >
          <div className="adminPageNavigationLinks">{t('farmerPageNavgationText5')}&nbsp;<FaAngleDown /></div>
          <FaGlobe className="adminPageNavigationLinksIcon" />
          {showDropdown2 && (
            <div className="dropdown">
              <NavLink
                to="/adminfarmerpendingtransactions"
                activeClassName="active"
              >
                Farmer
              </NavLink>
              <NavLink
                to="/adminbuyerpendingtransactions"
                activeClassName="active"
              >
                Buyer
              </NavLink>
            </div>
          )}
        </div>

        <NavLink
          className="adminPageNavigationLink3"
          to="/admindashboard"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('farmerPageNavgationText1')}</div>
          <FaHome className="adminPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="adminPageNavigationLink4"
          to="/adminmarketplace"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('farmerPageNavgationText2')}</div>
          <FaWallet className="adminPageNavigationLinksIcon" />
        </NavLink>
        <div
          className={`adminPageNavigationLink5 ${
            showDropdown5 ? 'active' : ''
          }`}
          onMouseEnter={toggleDropdown5}
          onMouseLeave={toggleDropdown5}
        >
          <div className="adminPageNavigationLinks">{t('farmerPageNavgationText6')}&nbsp;<FaAngleDown /></div>
          <FaStore className="adminPageNavigationLinksIcon" />
          {showDropdown5 && (
            <div className="dropdown">
              <NavLink
                to="/adminaccountfarmer"
                activeClassName="active"
              >
                Farmer
              </NavLink>
              <NavLink
                to="/adminaccountbuyer"
                activeClassName="active"
              >
                Buyer
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <NavLink className="adminPageNavigationProfileParent" to = '/login'>       
            Log Out           
      </NavLink>
    </div>
    </I18nextProvider>
  );
};

export default AdminNavigation;
