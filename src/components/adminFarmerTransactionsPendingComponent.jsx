import TransactionsNav from '../components/adminFarmerTransactionsNavigation';
import "../css/Components/adminFarmerTransactionsPendingComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import AdminTransactionsUpdateComponent from '../components/adminTransactionsUpdateComponent';
import AdminTransactionsDeleteComponent from '../components/adminTransactionsDeleteComponent';
import { FaEdit, FaTrash, FaFolderOpen, FaTimes } from 'react-icons/fa';
import SiliVector from '../img/sili.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import i18n from '../i18n';



const AdminFarmerTransactionsPendingComponent = () => {
  const { t } = useTranslation();

  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  

  const handleButtonClick1 = () => {
    setShowPopup1(true);
  };

  const closePopup1 = () => {
    setShowPopup1(false);
  };

  const handleButtonClick2 = () => {
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };


  return (
    
    <I18nextProvider i18n={i18n}> 
    <div className="adminFarmerTransactionsPendingComponent">
      <AdminNavigation />
      <div className="adminFarmerTransactionsPendingComponentMainPanel">
        <div className="adminFarmerTransactionsPendingComponentTopSection">
          <div className="adminFarmerTransactionsPendingComponentMainText">
            <b className="adminFarmerTransactionsPendingComponentMainTextWrapper">
              <p className="adminFarmerTransactionsPendingComponentBlankLine">&nbsp;</p>
              <p className="adminFarmerTransactionsPendingComponentBlankLine">{t('text183')}</p>
            </b>
          </div>
        </div>

        {showPopup1 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup1}
                >
                  <FaTimes />
                </span>
                <AdminTransactionsUpdateComponent/>
              </div>
            </div>
          )}    

            {showPopup2 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup2}
                >
                  <FaTimes />
                </span>
                <AdminTransactionsDeleteComponent/>
              </div>
            </div>
          )}    

          
        <TransactionsNav />

        <div className="adminFarmerTransactionsPendingComponentCard">
          <div className="adminFarmerTransactionsPendingComponentSubTitle">
            <FaFolderOpen /> {t('text187')}
          </div>
          <br></br>
          <div className="adminFarmerTransactionsPendingComponentShow">
          {t('text188')}
            <select className="adminFarmerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminFarmerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('text189')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminFarmerTransactionsPendingComponentMiddleSection">
            <div className="adminFarmerTransactionsPendingComponentFrameParent">


              <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={SiliVector}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{t('Text19')}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text190')}</b> F002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text191')}</b> N002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text192')}</b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text193')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text194')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text195')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text196')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text197')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text198')}</b> Pending
                        </div>
                      </div>
                    </div>
                    <div className="adminFarmerTransactionsPendingComponentFrameItem" />
                    <div className="adminFarmerTransactionsPendingComponentDetails">
                    <button className="adminFarmerTransactionsPendingComponentButton"
                     onClick={handleButtonClick1}>
                        <FaEdit className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('text199')}</div>
                      </button>
                      <button className="adminFarmerTransactionsPendingComponentButton"
                       onClick={handleButtonClick2}>
                        <FaTrash className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('text200')}</div>
                      </button>
                    </div>
                  </div>
                </a>             
              </div>             

             

       

              <div className="adminFarmerTransactionsPendingComponentForumNumber">
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">1</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">2</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">3</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">4</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">5</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">6</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactionsPendingComponent;
