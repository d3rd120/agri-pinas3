import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { db, auth} from '../components/firebase';
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import ProfileVector1 from '../img/profileVector1.png';
import ProfileVector2 from '../img/profileVector2.png';
import { FaPaperclip } from "react-icons/fa";
import '../css/BuyerPage/buyerMessagingComponent.css';


const FarmerTransactions = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messageContainerRef = useRef(null);
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const q = query(usersCollection, where('role', '==', "Farmer"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDataArray = querySnapshot.docs.map(doc => doc.data());
          setUserData(userDataArray);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      const roomName = `room_${selectedContact.id}`;
      const queryMessages = query(
        messagesRef,
        where("room", "==", roomName),
        orderBy("createdAt")
      );

      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [selectedContact]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "" || !selectedContact) return;

    // Retrieve the user's first name from the 'Users' collection based on their UID
    const userFirstName = await getUserFirstName(auth.currentUser.uid);

    const roomName = `room_${selectedContact.id}`;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userFirstName,
      room: roomName,
    });

    setNewMessage("");
  };

  // Function to get user's first name based on UID from the 'Users' collection
  const getUserFirstName = async (uid) => {
    try {
      const userQuery = query(
        collection(db, "Users"),
        where("UID", "==", uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        return userData.firstName;
      } else {
        return "Unknown User";
      }
    } catch (error) {
      console.error("Error fetching user's first name:", error);
      return "Error Fetching Name";
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };


  return (
    <div className="farmertransactions">
    <BuyerNavigation />
    <div className="main-panel">
      <BuyerTopNav />
      <br />
      <div className="user-messages">
        <div className="contacts">
          <b className="messages">Messages</b>
          <div className="conversation">
            {userdata.map((contact) => (
              <div
                key={contact.id}
                className={`contact-card ${selectedContact && selectedContact.id === contact.id ? "selected" : ""}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="photoauto-layout">
                  <img
                    className="photoauto-layout-child"
                    alt=""
                    src={ProfileVector2}
                  />
                  <div className="nametext">
                    <b className="messages">Jenkins</b>
                    <div className="omg-this-is">{contact.message}</div>
                  </div>
                </div>
                <div className="omg-this-is">{contact.time}</div>
              </div>
            ))}
          </div>
        </div>
        {selectedContact && (
          <div className="messages1">
            <div className="messageheader">
              <div className="title">
                <b className="messages">{selectedContact.name}</b>
              </div>
            </div>
            <div className="messagescontainer">
              {messages.map((message) => (
                // Ikaw yung nag rereply dito
                <div 
                  key={message.id}
                  className={`contactmessage ${message.user === auth.currentUser.email ? "sent" : "received"}`}
                >
                  <div className="conversation-bubble">
                    <div className="what-do-you">{message.text}</div>
                  </div>
                </div>
              ))}             
              {/* Eto yung Message na yung kausap mo yung nag rereply */}
               <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
              </div>
               <div className="messageinput">
              <div className="compose-new-btn">
                <FaPaperclip
                  className="mask-group-icon"      
                />
                 <form onSubmit={handleSubmit} className="new-message-form">
                <div className="compose-new-btn">
                  <FaPaperclip className="mask-group-icon" />
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    style={{ color: "#f5e9cf" }}
                    className="type-a-message"
                    placeholder="Type a message"
                  />
                </div>               
              </form>           
               
              </div>
            </div>
              
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default FarmerTransactions;
