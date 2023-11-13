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
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();
    
    // Filter contacts based on the search query
    const filteredContacts = userdata.filter((contact) =>
    contact.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          // console.error("Error fetching user data:", error);
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
        // console.error("Error fetching user's first name:", error);
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
    
      // console.log("Selected Contact:", contact);
      // console.log("Other User UID:", otherUserUID);
      // console.log("Room Name:", roomName);
    
      
      setRoom(roomName);
      // console.log("Room value after setting:", room);
    
      
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (!newMessage && !image) return;
    
      const userfullname = await getUserfullname(auth.currentUser.uid);
    
      try {
        if (image) {
          const storageRef = ref(storage, `files/${auth.currentUser.uid}/${image.name}`);
          const fileType = image.type.split('/')[1];
    
          // Handle PDF or any other file types (including images)
          await uploadBytes(storageRef, image);
    
          const downloadURL = await getDownloadURL(storageRef);
    
          await addDoc(messagesRef, {
            fileUrl: downloadURL,
            fileType,
            createdAt: serverTimestamp(),
            user: userfullname,
            room,
            fileName: image.name, // Ensure that this line is correctly setting the file name
          });
        } else {
          await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: userfullname,
            room,
          });
        }
            
        console.log("File Name:", image.name);
        setNewMessage("");
        setImage(null);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error as needed (e.g., show an error message to the user)
     
      }
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
            <b className="messages" style={{ fontSize: '2rem' }}>{t('ext373')}</b>
            
            <input
                type="text"
                placeholder={t('ext419')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '250px' }}
              />
            

              <div className="conversation">
              {filteredContacts.map((contact) => (
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
      <span className="user" style={{ color: "black" }}>
        {message.user}:
      </span>{" "}
      <div className="conversation-bubble">
        {message.imageUrl ? (
          <div>
           
            <img
              src={message.imageUrl}
              alt="Uploaded"
              style={{ maxWidth: '100%', maxHeight: '150px' }}
            />
          </div>
        ) : message.fileUrl ? (
          <div>
            {['png', 'jpg', 'jpeg', 'gif'].includes(message.fileType.toLowerCase()) ? (
              <img
                src={message.fileUrl}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '150px' }}
              />
            ) : (
              <div>
               {message.fileType === 'pdf' ? (
                  <div>
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                       {message.fileName}
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View {message.fileType.toUpperCase()}
                    </a>
                    {message.fileName && <p>File Name: {message.fileName}</p>}
                  </div>
                )}
              </div>
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
                </div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                    // Optionally, you can include logic to show a preview of the selected image here.
                  }}
                  className="file-input"
                  // style={{ display: 'none' }}
                />

                <form onSubmit={handleSubmit} className="new-message-form">
                  <div className="compose-new-btn">
                    {/* {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected"
                        style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }}
                      />
                    )} */}
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(event) => setNewMessage(event.target.value)}
                      style={{ color: 'black', width: 'calc(100% - 60px)' }}
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