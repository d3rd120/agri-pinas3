import { FaEnvelope, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
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
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useLocation } from 'react-router-dom';



const CustomHeaderTitle = styled.div`
  background-color: #557153;
  color: white;
 
`;


const BuyerTopNav = ({ setSearchQuery, sessionId }) => {
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);  
  const [showChatBot, setShowChatBot] = useState(false);
  const [minimizedChatBot, setMinimizedChatBot] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [cartItems, setcartItems] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [isNewDataFetched, setIsNewDataFetched] = useState(false);
  const location = useLocation();



  


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

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

  

  

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleBellClick = () => {
    setShowNotifications((prevState) => !prevState);    
  };
  



  const handleEnvelopeClick = () => {
    setShowMessages(prevState => !prevState);
  };


  const fetchCartItems = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        // console.log('User is not authenticated.');
        return;
      }
  
      const userId = user.uid;
      // console.log('User ID:', userId);
  
      const ordersCollection = collection(db, 'Transaction');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
  
      // console.log('All orders data:', ordersData);
  
      // Filter orders for the current user with "Pending" status
      const userOrders = ordersData.filter((order) => {
        return (
          order.userId === userId &&
          order.orders &&
          order.orders.some((item) => item.status === 'Pending')
        );
      });
      
      const newUserOrders = userOrders.filter(order => !cartItems.some(cartItem => cartItem.id === order.id));
      setcartItems([...cartItems, ...newUserOrders]);
  
      if (newUserOrders.length > 0) {
        setIsNewDataFetched(true); // Set the state to true only if new items are fetched
      }
      // console.log('User-specific orders:', userOrders);
      setcartItems(userOrders);
  // Set the state to true when new data is fetched
    } catch (error) {
      // console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [sessionId]);
  

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerTopNavContainer">
     

      <div
        className="buyerComponentEllipseParent2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="iconGroup">       
          <NavLink to="/messaging">
            <FaEnvelope className="buyerComponentGroupChild2" />
          </NavLink>

          <NavLink to="/buyerprofile">
            <FaUser className="buyerComponentGroupChild3" />
          </NavLink>          
        </div>

        <FaBell
  className={`buyerComponentGroupInner2${showNotifications ? ' active' : ''}${isNewDataFetched ? ' newDataFetched' : ''}`}
  onClick={handleBellClick}
/>



        
        {/* <div className="buyerComponentGroupInner2" style={{ width: '100%', height: '100%', marginLeft: '-17rem', }}>        
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '250px' }}
        />  
         <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ width: '250px' }}
      />
      <button onClick={handleSearch}>Search</button>       
       
       </div> */}
        
      </div>

      {showNotifications && (
  <div className="notificationsModal">
    <h2>{t('ext437')}</h2>
    <ul className="notificationList">
      {cartItems.map((cartItem) => (
        cartItem.orders.map((item, itemIndex) => (
          <li key={item.orderId} className="notificationItem">
            <span className="notificationMessage">
            {
                
              }

              {`${t('ext438')} `}
              <strong>{item.orderId}</strong>
              {` ${t('ext439')}`}

            </span>
          </li>
        ))
      ))}
    </ul>
  </div>
)}




     {/* {showMessages && (
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
      )} */}

{/* {showChatBot && !minimizedChatBot && (
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
          )} */}

    </div>
    </I18nextProvider>
  );
};

export default BuyerTopNav;