import React from 'react';
import { FaUsers, FaGlobe, FaHome, FaWallet, FaStore, FaShoppingBag, FaCartPlus, FaEnvelope, FaUserCircle, FaBell } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import '../css/BuyerPage/buyerPageNavigation.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

import Logo from '../img/agriPinasLogo.png';

const BuyerNavigation = () => {
  const { t } = useTranslation();
 

  return (
    <I18nextProvider i18n={i18n}> 
      <div className="buyerPageNavigation">
        <div className="buyerPageNavigationLogoParent">
          <img className="buyerPageNavigationLogoIcon" alt="" src={Logo} />
          <div className="buyerPageNavigationMainText">AgriPinas</div>
        </div>
        <div className="buyerPageNavigationGroupParent">
          <NavLink
            className="buyerPageNavigationLink1"
            to="/buyertoreceive"
            activeClassName="active"
          >
            <div className="buyerPageNavigationLinks">{t('buyerPageNavigationText3')}</div>
            <FaWallet className="buyerPageNavigationLinksIcon" />
          </NavLink>
  
          <NavLink
            className="buyerPageNavigationLink2"
            to="/buyercommunityforum"
            activeClassName="active"
          >
            <div className="buyerPageNavigationLinks">{t('buyerPageNavigationText4')}</div>
            <FaUsers className="buyerPageNavigationLinksIcon" />
          </NavLink>
  
          <NavLink
            className="buyerPageNavigationLink3"
            to="/buyermarketplace"
            activeClassName="active"
          >
            <div className="buyerPageNavigationLinks">{t('buyerPageNavigationText1')}</div>
            <FaShoppingBag className="buyerPageNavigationLinksIcon" />
          </NavLink>
  
          <NavLink
            className="buyerPageNavigationLink4"
            to="/shoppingcart"
            activeClassName="active"
          >
            <div className="buyerPageNavigationLinks">{t('buyerPageNavigationText2')}</div>
            <FaCartPlus className="buyerPageNavigationLinksIcon" />
          </NavLink>
        </div>
      </div>
    </I18nextProvider>
  );
  
};

export default BuyerNavigation;
