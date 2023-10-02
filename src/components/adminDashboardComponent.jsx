import "../css/Components/adminDashboardComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import Banner from '../img/bannerSample.png';
import AdminDashboardComponentUpdate from '../components/adminDashboardComponentUpdate';
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFolderOpen, FaTimes } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';



const AdminDashboard = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };





  return (
    <>   
      <div className="adminDashboardComponent">
        <AdminNavigation />      
        <div className="adminDashboardComponentMainPanel">         
          <div className="adminDashboardComponentTopSection">
            <div className="adminDashboardComponentMainText1">
              <b className="adminDashboardComponentMainText1Container">   
                <p className="adminDashboardComponentBlankLine">&nbsp;</p>                      
                <p className="adminDashboardComponentBlankLine">{t('adminPageDashboardText1')}</p>
              </b>
            </div>
          </div>
          <div className="adminDashboardComponentMiddleSection">
            <div className="adminDashboardComponentOverview">
              <div className="adminDashboardComponentMainText2">
              {t('adminPageDashboardText2')}
              </div>

              <button
                className="buyerCommunityForumComponentButton1"
                onClick={handleButtonClick}
              >
                <FaEdit className="buyerCommunityForumComponentButtonIcon1" />
                <div className="buyerCommunityForumComponentButtonText1">
                  {t("I-update")}
                </div>
          </button>     

            {showPopup && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup}
                >
                  <FaTimes />
                </span>
                <AdminDashboardComponentUpdate/>
              </div>
            </div>
          )}    
              <div className="adminDashboardComponentCard">           
              <img className="farmerDashboardIcon" alt="" src={Banner} />
              </div>             
            </div>            
          </div>
        </div>
      </div>
    </>
  );
  
};

export default AdminDashboard;
