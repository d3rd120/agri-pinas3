import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from "../components/firebase";
import BuyerNavigation from "../components/buyerNavigation";
import BuyerTopNav from "../components/buyerTopNav";
import ProfileVector2 from "../img/profileVector2.png";
import { FaPaperclip } from "react-icons/fa";
import "../css/BuyerPage/buyerMessagingComponent.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerTransactions = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messageContainerRef = useRef(null);
  const [userdata, setUserData] = useState([]);
  const [room, setRoom] = useState("");
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, "Users");
        const q = query(usersCollection, where("role", "==", "Farmer"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDataArray = querySnapshot.docs.map((doc) => doc.data());
          setUserData(userDataArray);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      const queryMessages = query(
        messagesRef,
        where("room", "==", room),
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
  }, [room]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };


  // Function to get user's first name based on UID from the 'Users' collection
  const getUserfullname = async (uid) => {
    try {
      const userQuery = query(collection(db, "Users"), where("uid", "==", uid));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        return userData.fullname;
      } else {
        return "Unknown User";
      }
    } catch (error) {
      console.error("Error fetching user's first name:", error);
      return "Error Fetching Name";
    }
  };

  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
  
    const otherUserUID = contact.uid;
  
    const roomName =
      otherUserUID < auth.currentUser.uid
        ? `${otherUserUID} and ${auth.currentUser.uid}`
        : `${auth.currentUser.uid} and ${otherUserUID}`;
  
    console.log("Selected Contact:", contact);
    console.log("Other User UID:", otherUserUID);
    console.log("Room Name:", roomName);
  
    
    setRoom(roomName);
    console.log("Room value after setting:", room);
  
    
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!newMessage && !image) return;
  
    const userfullname = await getUserfullname(auth.currentUser.uid);
  
    if (image) {
      const storageRef = ref(
        storage,
        `files/${auth.currentUser.uid}/${image.name}`
      );
  
      const fileType = image.type.split('/')[1]; // Extract file type (e.g., 'jpeg', 'pdf', 'docx', etc.)
  
      if (fileType === 'pdf' || fileType === 'docx') {
        // Handle PDF and DOCX files
        await uploadBytes(storageRef, image);
      } else {
        // Handle images (you can extend this for other file types)
        await uploadBytes(storageRef, image);
      }
  
      const downloadURL = await getDownloadURL(storageRef);
  
      await addDoc(messagesRef, {
        fileUrl: downloadURL,
        fileType: fileType,
        createdAt: serverTimestamp(),
        user: userfullname,
        room: room,
      });
    } else {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: userfullname,
        room: room,
      });
    }
  
    console.log("Room value after adding doc:", room);
  
    // Reset the new message input and image
    setNewMessage("");
    setImage(null); // Clear the image state
  };
  

 
  
  return (
    <I18nextProvider i18n={i18n}>
    <div className="farmertransactions">
      <BuyerNavigation />
      <div className="main-panel">
        <BuyerTopNav />
        <br />
        <div className="user-messages">
          <div className="contacts">
            <b className="messages">{t('ext373')}</b>
            <div className="conversation">
              {userdata.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-card ${
                    selectedContact && selectedContact.uid === contact.uid
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="photoauto-layout">
                    <img
                      className="photoauto-layout-child"
                      alt=""
                      src={ProfileVector2}
                    />
                    <div className="nametext">
                      <b className="messages">{contact.fullname}</b>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {selectedContact && (
            <div className="messages1">
              <div className="messageheader">
                <div className="title">
                  <b className="messages">{selectedContact.fullname}</b>
                </div>
              </div>
              <div className="messagescontainer">
  {messages.map((message) => (
    <div
      key={message.id}
      className={`contactmessage ${
        message.user === auth.currentUser.email ? "sent" : "received"
      }`}
    >
      <span className="user" style={{ color: "#f5e9cf" }}>
        {message.user}:
      </span>{" "}
      <div className="conversation-bubble">
        {message.imageUrl ? (
          <img
            src={message.imageUrl}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '150px' }}
          />
        ) : message.fileUrl ? (
          <div>
            {message.fileType === 'pdf' ? (
              <embed
                src={message.fileUrl}
                type="application/pdf"
                width="100%"
                height="150"
              />
            ) : message.fileType === 'docx' ? (
              <p>Displaying DOCX files is more complex and requires additional handling.</p>
            ) : (
              <p>Unsupported file type</p>
            )}
          </div>
        ) : (
          <div className="what-do-you">{message.text}</div>
        )}
      </div>
    </div>
  ))}
</div>
              <div className="messageinput">
                <div className="compose-new-btn">
                <label htmlFor="fileInput" className="file-input-label">
              <div
                className="mask-group-icon"
                onClick={() => document.getElementById('fileInput').click()}
                style={{ cursor: 'pointer', fontSize: '24px' }}
              >
                <FaPaperclip />
              </div>
              <input
                type="file"
                id="fileInput"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                  // Optionally, you can include logic to show a preview of the selected image here.
                }}
                className="file-input"
                style={{ display: 'none' }}
              />

              <form onSubmit={handleSubmit} className="new-message-form">
                <div className="compose-new-btn">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                      style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }}
                    />
                  )}
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    style={{ color: '#f5e9cf', width: 'calc(100% - 60px)' }}
                    className="type-a-message"
                    placeholder="Type a message"
                  />
                </div>
              </form>
            </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default FarmerTransactions;