import { FaEnvelope, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import React, { useState } from "react";
import '../css/Components/farmerTopNav.css';
import profile1 from '../img/profileVector1.png';
import profile2 from '../img/profileVector2.png';
import { NavLink, Link } from 'react-router-dom';
import { FaCartArrowDown, FaCartPlus, FaCommentDots, FaComments, FaEdit, FaTrash } from 'react-icons/fa';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { RiChat1Line } from 'react-icons/ri';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const CustomHeaderTitle = styled.div`
  background-color: #557153;
  color: white;
 
`;

const FarmerTopNav = () => {
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

  const handleEnd = () => {
    setShowChatBot(false);
    setMinimizedChatBot(false);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBellClick = () => {
    setShowNotifications(prevState => !prevState);
  };

  const handleEnvelopeClick = () => {
    setShowMessages(prevState => !prevState);
  };

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerTopNavContainer">       
      <div className="farmersearchBar" style={{ width: '300px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '100%' }}
        />
        <FaSearch className="farmersearchIcon" />
      </div>

      <div
        className="farmerComponentEllipseParent2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="farmericonGroup">
          <FaEnvelope
            className={`farmerComponentGroupChild2${showMessages ? ' active' : ''}`}
            onClick={handleEnvelopeClick}
          />
          <NavLink to="/farmerprofile">
            <FaUser className="farmerComponentGroupChild3" />
          </NavLink>
        </div>
        <FaBell
          className={`farmerComponentGroupInner2${showNotifications ? ' active' : ''}`}
          onClick={handleBellClick}
        />
      </div>

      {showNotifications && (
  <div className="farmernotificationsModal">
    <h2>{t('farmerTopNavText1')}</h2>
    <ul className="farmernotificationList">
      <li className="farmernotificationItem">
        <span className="farmernotificationMessage">{t('farmerTopNavText2')}</span>
        <span className="farmernotificationTime">{t('farmerTopNavText3')}</span>
      </li>     
      <li className="farmernotificationItem">
        <span className="farmernotificationMessage">{t('farmerTopNavText4')}</span>
        <span className="farmernotificationTime">{t('farmerTopNavText5')}</span>
      </li> 
      <li className="farmernotificationItem">
        <span className="farmernotificationMessage">{t('farmerTopNavText4')}</span>
        <span className="farmernotificationTime">{t('farmerTopNavText5')}</span>
      </li>       
    </ul>
  </div>
)}
{showMessages && (
  <div className="farmernotificationsModal">
    <h2>{t('farmerTopNavText6')}</h2>
    <ul className="farmernotificationList">
      <li className="farmernotificationItem" onClick={handleChatButtonClick}>
        <div className="farmernotificationProfile">
          <img src={profile1} className="farmerprofileImage" />
          <span className="farmernotificationSender">Yagerobi Doria</span>
        </div>
        <div className="farmernotificationContent">
          <span className="farmernotificationMessage">{t('farmerTopNavText7')}</span>
          <span className="farmernotificationTime">2h ago</span>
        </div>
      </li>
      <li className="farmernotificationItem" onClick={handleChatButtonClick}>
        <div className="farmernotificationProfile">
          <img src={profile2} alt="Profile" className="farmerprofileImage" />
          <span className="farmernotificationSender">Daniella Tungol</span>
        </div>
        <div className="farmernotificationContent">
          <span className="farmernotificationMessage">{t('farmerTopNavText8')}</span>
          <span className="farmernotificationTime">1d ago</span>
        </div>
      </li>   
      <li className="farmernotificationItem" >        
        <div className="farmernotificationContent">
          <NavLink className="farmernotificationMessage2" to = '/farmerinbox'>{t('farmerTopNavText9')}</NavLink>         
        </div>
      </li>     
    </ul>
  </div>
)}

{showChatBot && !minimizedChatBot && (
            <div className="chatbot-container">
              <ThemeProvider theme={theme}>
              <ChatBot
                steps={[
                  {
                    id: '1',
                    message: 'Do you sale corn as wholesale?',
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
                headerTitle="Yagerobi Doria"
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

export default FarmerTopNav;
