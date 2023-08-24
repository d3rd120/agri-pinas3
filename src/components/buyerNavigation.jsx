import React from 'react';
import { FaUsers, FaGlobe, FaHome, FaWallet, FaStore, FaShoppingBag, FaCartPlus, FaEnvelope, FaUserCircle, FaBell } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import '../css/Components/farmerPageNavigation.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

import Logo from '../img/agriPinasLogo.png';

const BuyerNavigation = () => {
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
          to="/buyertoreceive"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('buyerPageNavigationText3')}</div>
          <FaWallet className="farmerPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="farmerPageNavigationLink2"
          to="/buyercommunityforum"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('buyerPageNavigationText4')}</div>
          <FaUsers className="farmerPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="farmerPageNavigationLink3"
          to="/buyermarketplace"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('buyerPageNavigationText1')}</div>
          <FaShoppingBag className="farmerPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className="farmerPageNavigationLink4"
          to="/shoppingcart"
          activeClassName="active"
        >
          <div className="farmerPageNavigationLinks">{t('buyerPageNavigationText2')}</div>
          <FaCartPlus className="farmerPageNavigationLinksIcon" />
        </NavLink>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default BuyerNavigation;
