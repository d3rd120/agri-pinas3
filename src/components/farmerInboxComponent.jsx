import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import React, { useState } from 'react';
import FarmerNavigation from '../components/farmerPageNavigation';
import '../css/Components/farmerInboxComponent.css';
import FarmerTopNav from '../components/farmerTopNav';

const FarmerInboxComponent = () => {
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
    
  const [userInput, setUserInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleInboxMessageClick = (message) => {
    setSelectedMessage(message);
  };

  // Sample messages for the inbox
  const inboxMessages = [
    {
      id: 1,
      sender: 'Yagerobi Doria',
      message: 'Do you sale corn as wholesale?',
      timestamp: '9:00 AM',
    },
    {
      id: 2,
      sender: 'Daniella Tungol',
      message: 'I have a question about my recent order.',
      timestamp: '9:15 AM',
    },

    {
        id: 3,
        sender: 'Jenkins Mesina',
        message: 'Do you have onions',
        timestamp: '9:15 AM',
      },

      {
        id: 4,
        sender: 'Arriane Gatpo',
        message: 'Hey friend whats up',
        timestamp: '9:15 AM',
      },

      {
        id: 5,
        sender: 'Marievic Anes',
        message: 'Do you have any idea about the el nino?',
        timestamp: '9:15 AM',
      },
      {
        id: 6,
        sender: 'Mark Parayno',
        message: 'How to harvest squash',
        timestamp: '9:15 AM',
      },
      {
        id: 7,
        sender: 'Ryan Edward Amador',
        message: 'How to plant rice efficiently',
        timestamp: '9:15 AM',
      },
    // Add more messages here...
  ];

  // Render the inbox messages
  const renderInboxMessages = () => {
    return inboxMessages.map((message) => (
      <div
        key={message.id}
        className={`inbox-message ${selectedMessage === message ? 'selected' : ''}`}
        onClick={() => handleInboxMessageClick(message)}
      >
        <div className="sender">{message.sender}</div>
        <div className="message">{message.message}</div>
        <div className="timestamp">{message.timestamp}</div>
      </div>
    ));
  };

  return (
    <div className="farmerInboxComponent">
    <FarmerNavigation />      
    <div className="farmerInboxComponentMainPanel">   
    <FarmerTopNav />   
    <div className="farmerInboxComponentMainPanel2">  
    <div className="farmer-inbox-component">
      <div className="inbox">{renderInboxMessages()}</div>
      <div className="chatbot">
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="Yagerobi Doria"
            headerTitleStyle={{ color: 'white' }}
            steps={[
              {
                id: '1',
                message: 'Do you sale corn as wholesale?',
                trigger: '2',
              },
              {
                id: '2',
                message: selectedMessage ? selectedMessage.message : 'How can I assist you?',
                user: true,
                trigger: '3',
              },
              {
                id: '3',
                message: 'You typed: {previousValue}',
                trigger: '2',
                end: true,
              },
            ]}
          
            userInput={userInput}
            handleUserInput={handleUserInput}
          />
        </ThemeProvider>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default FarmerInboxComponent;
