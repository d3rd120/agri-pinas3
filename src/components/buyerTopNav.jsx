import { FaEnvelope, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import React, { useState } from "react";
import '../css/BuyerPage/buyerTopNav.css';
import profile1 from '../img/profileVector1.png';
import profile2 from '../img/profileVector2.png';
import { NavLink, Link } from 'react-router-dom';
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


const BuyerTopNav = () => {
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

  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  
  const [showChatBot, setShowChatBot] = useState(false);
  const [minimizedChatBot, setMinimizedChatBot] = useState(false);

  const handleEnd = () => {
    setShowChatBot(false);
    setMinimizedChatBot(false);
  };

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

  const [messages, setMessages] = useState([
    {
      sender: 'Jenkins Mesina',
      senderImage: profile1,
      content: 'Your order has beem shipped',
      timestamp: '2h ago',
    },
    {
      sender: 'Arriane Gatpo',
      senderImage: profile2,
      content: 'You have a new message',
      timestamp: '4h ago',
    },
    {
      sender: 'Romeo London',
      senderImage: profile1,
      content: 'New deals are available',
      timestamp: '8h ago',
    },
  ]);

  const handleDismiss = () => {
    setMessages([]);
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
    <div className="buyerTopNavContainer">
      <div className="searchBar" style={{ width: '300px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: '100%' }}
        />
        <FaSearch className="searchIcon" />
      </div>

      <div
        className="buyerComponentEllipseParent2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="iconGroup">
          <FaEnvelope
            className={`buyerComponentGroupChild2${showMessages ? ' active' : ''}`}
            onClick={handleEnvelopeClick}
          />
          <NavLink to="/buyerprofile">
            <FaUser className="buyerComponentGroupChild3" />
          </NavLink>
        </div>
        <FaBell
          className={`buyerComponentGroupInner2${showNotifications ? ' active' : ''}`}
          onClick={handleBellClick}
        />
      </div>

      {showNotifications && (
        <div className="notificationsModal">
          <h2>{t('buyerTopNavText1')}</h2>
          <ul className="notificationList">
            <li className="notificationItem">
              <span className="notificationMessage">{t('buyerTopNavText2')}</span>
              <span className="notificationTime">{t('buyerTopNavText3')}</span>
            </li>
            <li className="notificationItem">
              <span className="notificationMessage">{t('buyerTopNavText4')}</span>
              <span className="notificationTime">{t('buyerTopNavText5')}</span>
            </li>
            <li className="notificationItem">
              <span className="notificationMessage">{t('buyerTopNavText4')}</span>
              <span className="notificationTime">{t('buyerTopNavText5')}</span>
            </li>            
          </ul>
        </div>
      )}
     {showMessages && (
      <div className="notificationsModal">
      <h2>Messages</h2>
      <ul className="notificationList">
        
      <div className="notification-body">
        {messages.map((message, index) => (
          <div key={index} className="message" onClick = {handleChatButtonClick}>
            <div className="message-sender">
              <img src={message.senderImage} alt="Sender" className="sender-image" />
              {message.sender}
            </div>
            
            <span className="message-content">{message.content}</span>
            <span className="message-time">{message.timestamp}</span>
          </div>
          
           ))}
           </div>
        
        
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
                headerTitle="Jenkins Mesina"
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

export default BuyerTopNav;
