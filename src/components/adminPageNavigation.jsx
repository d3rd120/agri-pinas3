import React, { useState } from 'react';
import { FaUsers, FaGlobe, FaHome, FaWallet, FaStore, FaBook, FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import '../css/Components/adminPageNavigation.css';
import Logo from '../img/agriPinasLogo.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ConfirmationDialog from './confirmationDialog'; // Make sure to provide the correct import path.


const AdminNavigation = () => {
  const { t } = useTranslation();
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown5, setShowDropdown5] = useState(false);
  const [showMarketplaceDropdown, setShowMarketplaceDropdown] = useState(false); // Add state for the marketplace dropdown
  const [showCommunityForumDropdown, setShowCommunityForumDropdown] = useState(false);
  const [isLogoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);



  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  const toggleDropdown5 = () => {
    setShowDropdown5(!showDropdown5);
  };

  const toggleMarketplaceDropdown = () => { // Function to toggle the marketplace dropdown
    setShowMarketplaceDropdown(!showMarketplaceDropdown);
  };

  const toggleCommunityForumDropdown = () => {
    setShowCommunityForumDropdown(!showCommunityForumDropdown);
  };

  const openLogoutConfirmation = () => {
    setLogoutConfirmationOpen(true);
  };
  
  const closeLogoutConfirmation = () => {
    setLogoutConfirmationOpen(false);
  };
  
  const handleLogout = () => {
    window.location.href = '/login'; 
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
            className={`adminPageNavigationLink1 ${showCommunityForumDropdown ? 'active' : ''}`}
            to="/admincommunityforum"
            activeClassName="active"
            onMouseEnter={toggleCommunityForumDropdown}
            onMouseLeave={toggleCommunityForumDropdown}
          >
            <div className="adminPageNavigationLinks">{t('ext255')} <FaAngleDown /></div>
            <FaUsers className="adminPageNavigationLinksIcon" />
            {showCommunityForumDropdown && (
              <div className="horizontal-dropdown">
                <NavLink to="/admincommunityforumarchived">{t('ext256')}</NavLink>               
              </div>
            )}
          </NavLink>



        <NavLink
          className="adminPageNavigationLink6"
          to="/adminlogreport"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('ext263')}</div>
          <FaBook className="adminPageNavigationLinksIcon" />
        </NavLink>  

        <div
          className={`adminPageNavigationLink2 ${
            showDropdown2 ? 'active' : ''
          }`}
          onMouseEnter={toggleDropdown2}
          onMouseLeave={toggleDropdown2}
        >
          <div className="adminPageNavigationLinks">{t('ext257')}&nbsp;<FaAngleDown /></div>
          <FaGlobe className="adminPageNavigationLinksIcon" />
          {showDropdown2 && (
            <div className="dropdown">
              <NavLink
                to="/adminfarmerpendingtransactions"
                activeClassName="active"
              >
                {t('ext258')}
              </NavLink>
              <NavLink
                to="/adminbuyerpendingtransactions"
                activeClassName="active"
              >
                {t('ext259')}
              </NavLink>
            </div>
          )}
        </div>
        <NavLink
          className="adminPageNavigationLink3"
          to="/admindashboard"
          activeClassName="active"
        >
          <div className="adminPageNavigationLinks">{t('ext252')}</div>
          <FaHome className="adminPageNavigationLinksIcon" />
        </NavLink>

        <NavLink
          className={`adminPageNavigationLink4 ${showMarketplaceDropdown ? 'active' : ''}`}
          to="/adminmarketplace"
          activeClassName="active"
          onMouseEnter={toggleMarketplaceDropdown}
          onMouseLeave={toggleMarketplaceDropdown}
        >
          <div className="adminPageNavigationLinks">{t('ext253')} <FaAngleDown /></div>
          <FaWallet className="adminPageNavigationLinksIcon" />
          {showMarketplaceDropdown && (
            <div className="horizontal-dropdown">             
              <NavLink to="/adminmarketplacearchived">{t('ext254')}</NavLink>
             
            </div>
          )}
        </NavLink>
        <div
          className={`adminPageNavigationLink5 ${
            showDropdown5 ? 'active' : ''
          }`}
          onMouseEnter={toggleDropdown5}
          onMouseLeave={toggleDropdown5}
        >
          <div className="adminPageNavigationLinks">{t('ext260')}&nbsp;<FaAngleDown /></div>
          <FaStore className="adminPageNavigationLinksIcon" />
          {showDropdown5 && (
            <div className="dropdown">
              <NavLink
                to="/adminaccountfarmer"
                activeClassName="active"
              >
                {t('ext261')}
              </NavLink>
              <NavLink
                to="/adminaccountbuyer"
                activeClassName="active"
              >
                {t('ext262')}
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <NavLink className="adminPageNavigationProfileParent" onClick={openLogoutConfirmation}>
      {t('ext264')}
    </NavLink>

    </div>
              <ConfirmationDialog
            isOpen={isLogoutConfirmationOpen}
            message={t('ext265')}
            onConfirm={handleLogout}
            onCancel={closeLogoutConfirmation}
            onOverlayClick={closeLogoutConfirmation}
            confirmLabel={t('ext266')}
            cancelLabel={t('ext267')}
          />
    </I18nextProvider>
  );
};

export default AdminNavigation;
