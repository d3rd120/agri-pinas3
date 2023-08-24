import React from 'react';
import { FaUsers, FaGlobe, FaHome, FaWallet, FaStore } from 'react-icons/fa';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import '../css/Components/farmerPageNavigation.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


import Logo from '../img/agriPinasLogo.png';

const FarmerNavigation = () => {
  
  const { t } = useTranslation();

  
  return (
    <I18nextProvider i18n={i18n}> 

    <div className="farmerPageNavigation">
      <div className="farmerPageNavigationLogoParent">
        <img className="farmerPageNavigationLogoIcon" alt="" src={Logo} />
        <div className="farmerPageNavigationMainText">AgriPinas</div>
      </div>
      <div className="farmerPageNavigationGroupParent">
      <NavLink
          className="farmerPageNavigationLink1"
          to="/farmercommunityforum"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('farmerPageNavgationText3')}</div>
          <FaUsers className="farmerPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="farmerPageNavigationLink2"
          to="/farmercroptrackerharvest"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('farmerPageNavgationText4')}</div>
          <FaGlobe className="farmerPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="farmerPageNavigationLink3"
          to="/farmerdashboard"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('farmerPageNavgationText1')}</div>
          <FaHome className="farmerPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="farmerPageNavigationLink4"
          to="/farmermarketplace"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('farmerPageNavgationText2')}</div>
          <FaWallet className="farmerPageNavigationLinksIcon" />
        </NavLink>
        <NavLink
            className="farmerPageNavigationLink5"
            to="/farmertransactionspending"
            activeClassName="active"
          >
            <div className="farmerPageNavigationLinks">{t('farmerPageNavgationText5')}</div>
            <FaStore className="farmerPageNavigationLinksIcon" />
      </NavLink>
      </div>     
    </div>
    </I18nextProvider>
  );
};

export default FarmerNavigation;
