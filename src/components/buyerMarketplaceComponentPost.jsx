import React, { useState } from 'react';
import "../css/BuyerPage/buyermarketplace.css"
import BuyerNavigation from "./buyerNavigation";
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import TomatoVector from '../img/tomatoVector.png';
import talong from '../img/talong.png';
import { FaCartArrowDown, FaCartPlus, FaCommentDots, FaComments, FaEdit, FaTrash } from 'react-icons/fa';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { RiChat1Line } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const CustomHeaderTitle = styled.div`
  background-color: #557153;
  color: white;
 
`;

const BuyerMarketplace = () => {
  const { t } = useTranslation();
  const theme = {
    background: 'white',
    headerBgColor: '#9DC08B',
    headerFontSize: '20px',
    botBubbleColor: '#e0e0e0',
    headerFontColor: 'white',
    botFontColor: 'black',
    userBubbleColor: 'white',
    userFontColor: 'black',
  };

  const [showChatBot, setShowChatBot] = useState(false);
  const [minimizedChatBot, setMinimizedChatBot] = useState(false);

  const handleChatButtonClick = () => {
    setShowChatBot(!showChatBot);
    setMinimizedChatBot(false);
  };

  const handleChatBotClose = () => {
    setShowChatBot(false);
    setMinimizedChatBot(false);
  };

  const handleChatBotMinimize = () => {
    setMinimizedChatBot(true);
  };

  const handleEnd = () => {
    setShowChatBot(false);
    setMinimizedChatBot(false);
  };

  const handleAddToCart = () => {
    var popupMessage = document.getElementById("popupMessage");
    popupMessage.style.display = "block";

    setTimeout(function () {
      popupMessage.style.display = "none";
    }, 2000);
  };

  
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerMarketplaceComponentPost">
      <BuyerNavigation />
      <div className="farmerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="farmerCommunityForumComponentTopSection">
          <div className="farmerCommunityForumComponentMainText1">
            <b className="farmerCommunityForumComponentMainText2">             
              <p className="farmerCommunityForumComponentBlankLine">{t('buyerPageNavigationText1')}</p>
            </b>
          </div>
        </div>
        <div className="buyerMarketplaceComponentPostMiddleSection">
          <div className="buyerMarketplaceComponentPostCardsContainer">
            <div className="buyerMarketplaceComponentPostCard1">
              <img
                className="buyerMarketplaceComponentPostCard1Image"
                alt=""
                src={CornVector}
              />
            </div>
            <div className="buyerMarketplaceComponentPostSmallCards">
              <div className="buyerMarketplaceComponentPostSmallCardsDescription">
                <div className="buyerMarketplaceComponentPostSmallCardsContent">
                  <div className="buyerMarketplaceComponentPostSmallCardsHeading">
                    <div className="buyerMarketplaceComponentPostSmallCardsDetails">
                      <b className="buyerMarketplaceComponentPostSmallCardsProductName">Corn</b>
                      <b className="buyerMarketplaceComponentPostSmallCardsBuyerName">{t('buyerPageUserRole2')} Jenkins Mesina</b>
                    </div>
                    
                    <div className="buyerMarketplaceComponentPostSmallCardsDescriptionWrapper">
                      <div className="buyerMarketplaceComponentPostSmallCardsFullDescription">
                        <p className="buyerMarketplaceComponentPostBlankLine">
                          <b>{t('buyerPageCategory')} </b>
                          <span className="buyerMarketplaceComponentPostBlankLine">Vegetable</span>
                        </p>
                        <p className="buyerMarketplaceComponentPostBlankLine">
                          <b>{t('buyerPagePackaging')} </b>
                          <span className="buyerMarketplaceComponentPostCategory">Sack</span>
                        </p>
                        <p className="buyerMarketplaceComponentPostBlankLine">
                          <b className="buyerMarketplaceComponentPostCategory">{t('buyerPagePrice')} </b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentPostBlankLine">
                          <b>{t('buyerPageKilogram')} </b>
                          <span className="buyerMarketplaceComponentPostCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentPostBlankLine">
                          <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageDescription')} </b>
                          <span>
                          {t('buyerPageDescriptionText2')}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="buyerMarketplaceComponentPostButtonContainer">
  <div className="buyerMarketplaceComponentPostButtonRow">
    <button className="buyerMarketplaceComponentPostButton outlinedButton" onClick={handleChatButtonClick}>
      <FaCommentDots className="buyerMarketplaceComponentPostButtonIcon" />
      <div className="buyerMarketplaceComponentPostButtonText">{t('farmerPageButton14')}</div>
    </button>
    <div id="popupMessage" className="popupMessage">
      <span className="popupText">{t('buyerPagePopup')}</span>
    </div>
    <button className="buyerMarketplaceComponentPostButton outlinedButton" onClick={handleAddToCart}>
      <FaCartArrowDown className="buyerMarketplaceComponentPostButtonIcon" />
      <div className="buyerMarketplaceComponentPostButtonText">{t('farmerPageButton15')}</div>
    </button>
    <a href="/shoppingcart" style={{ textDecoration: 'none' }}>
      <button className="buyerMarketplaceComponentPostButton1">
        <div className="buyerMarketplaceComponentPostButtonText1">{t('farmerPageButton16')}</div>
      </button>
    </a>
  </div>
</div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buyerMarketplaceComponentPostButtonNew">
          <div className="buyerMarketplaceComponentPostButtonNewTitle">{t('buyerPageDescriptionText3')}</div>
          <div className="buyerMarketplaceComponentPostButtonNewCourses">
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost'style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image" 
                alt=""
                src={TomatoVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerPageDescriptionText4')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱5,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={OnionVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerPageDescriptionText5')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱3,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={talong}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerPageDescriptionText6')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱2,000</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          


        </div>
      </div>
      {showChatBot && !minimizedChatBot && (
            <div className="chatbot-container">
              <ThemeProvider theme={theme}>
              <ChatBot
                steps={[
                  {
                    id: '1',
                    message: 'Hi, how are you?',
                    trigger: '2',
                  },
                  {
                    id: '2',
                    user: true,
                    trigger: '3',
                  },
                  {
                    id: '3',
                    message: 'You said: {previousValue}',
                    trigger: '2',
                  },
                ]}
                handleEnd={handleEnd}
                botDelay={300}
                opened={showChatBot}
                hideUserAvatar 
                headerTitle="Arriane Gatpo"
                hideHeader={false}
                floating={true}
                floatingIcon={<RiChat1Line />}
                customHeaderComponent={<CustomHeaderTitle />}
                
              />
              </ThemeProvider>
            </div>
          )}
          {minimizedChatBot && (
            <div className="chatbot-minimized">
              <button className="chatbot-minimized-button" onClick={() => setMinimizedChatBot(false)}>
                <RiChat1Line className="chatbot-minimized-icon" />
              </button>
            </div>
          )}
    </div>
    </I18nextProvider>
  );
};

export default BuyerMarketplace;
