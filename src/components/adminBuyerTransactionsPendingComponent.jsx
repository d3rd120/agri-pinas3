import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerPendingTransactionsComponent.css";
import AdminTransactionsUpdateComponent from '../components/adminTransactionsUpdateComponent';
import AdminTransactionsDeleteComponent from '../components/adminTransactionsDeleteComponent';
import AdminNavigation from '../components/adminPageNavigation';
import SitawVector from '../img/sitaw.png';
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFolderOpen, FaTimes } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminBuyerTransactionsPendingComponent = () => {
  
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
    <div className="adminBuyerTransactionsPendingComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsPendingComponentMainPanel">
        <div className="adminBuyerTransactionsPendingComponentTopSection">
          <div className="adminBuyerTransactionsPendingComponentMainText">
            <b className="adminBuyerTransactionsPendingComponentMainTextWrapper">
              <p className="adminBuyerTransactionsPendingComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsPendingComponentBlankLine">{t('text183')}</p>
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

        <div className="adminBuyerTransactionsPendingComponentCard">
          <div className="adminBuyerTransactionsPendingComponentSubTitle">
            <FaFolderOpen /> {t('text226')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsPendingComponentShow">
          {t('text188')}
            <select className="adminBuyerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('text189')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminBuyerTransactionsPendingComponentMiddleSection">
            <div className="adminBuyerTransactionsPendingComponentFrameParent">


              <div className="adminBuyerTransactionsPendingComponentFrameWrapper">               

                <a className="adminBuyerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminBuyerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={SitawVector}
                  />
                  <div className="adminBuyerTransactionsPendingComponentFrameGroup">
                    <div className="adminBuyerTransactionsPendingComponentFrameContainer">
                      <div className="adminBuyerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminBuyerTransactionsPendingComponentSubText1">{t('Text27')}</b>
                      </div>
                      <div className="adminBuyerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text190')}</b> B001
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text191')}</b> N001
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text192')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text193')}:</b> 02 / 01 / 2023
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text194')}</b> 400
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text195')}</b> 2
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text196')}</b> 800
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text197')}</b> Arriane Gatpo
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('text198')}</b> Pending
                        </div>                     
                      </div>
                    </div>
                    <div className="adminBuyerTransactionsPendingComponentFrameItem" />
                    <div className="adminBuyerTransactionsPendingComponentDetails">
                    <button className="adminBuyerTransactionsPendingComponentButton"
                     onClick={handleButtonClick1}>
                        <FaEdit className="adminBuyerTransactionsPendingComponentButtonIcon"
                          />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('text199')}</div>
                      </button>
                      <button className="adminBuyerTransactionsPendingComponentButton"
                       onClick={handleButtonClick2}>
                        <FaTrash className="adminBuyerTransactionsPendingComponentButtonIcon"                         />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('text200')}</div>
                      </button>
                    </div>
                  </div>
                </a>              


              </div>

           



              <div className="adminBuyerTransactionsPendingComponentForumNumber">
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">1</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">2</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">3</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">4</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">5</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">6</div>
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

export default AdminBuyerTransactionsPendingComponent;
