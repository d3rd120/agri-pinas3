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
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaPaperclip } from "react-icons/fa";
import "../css/BuyerPage/buyerMessagingComponent.css";
import { Link } from 'react-router-dom';


const FarmerTransactions = ({ room: initialRoom }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const messageContainerRef = useRef(null);
  const [userdata, setUserData] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { room } = useParams();
  const [currentRoom, setRoom] = useState(room);
  const { roomID } = useParams();

 useEffect(() => {
    console.log("Room ID:", roomID);
    // You can use roomID in the rest of your component logic
  }, [roomID]);
  
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;

    const userfullname = await getUserfullname(auth.currentUser.uid);

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: userfullname,
      room: room,
    });

    console.log("Room value after adding doc:", room);

    setNewMessage("");
  };

  useEffect(() => {
    console.log("Current room value:", room);
  }, [room]);

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
        ? `${otherUserUID}-${auth.currentUser.uid}`
        : `${auth.currentUser.uid}-${otherUserUID}`;

    console.log("Selected Contact:", contact);
    console.log("Other User UID:", otherUserUID);
    console.log("Room Name:", roomName);

    // Use navigate instead of returning a Link component
    navigate(`/messaging/${roomName}`);
  };
  
  

  useEffect(() => {
    console.log("Current room value:", room);
  }, [room]);

  const handleImageUpload = async () => {
    if (!image) return;

    const userfullname = await getUserfullname(auth.currentUser.uid);

    const storageRef = ref(storage, `images/${auth.currentUser.uid}/${image.name}`);

    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);

    addDoc(messagesRef, {
      imageUrl: downloadURL,
      createdAt: serverTimestamp(),
      user: userfullname,
      room: room,
    });
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
                        <img src={message.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '150px' }} />
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
                    <FaPaperclip className="mask-group-icon" onClick={handleImageUpload} />
                  </label>
                  <form onSubmit={handleSubmit} className="new-message-form">
                    <div className="compose-new-btn">
                      <input
                        type="file"
                        id="fileInput"
                        onChange={(event) => setImage(event.target.files[0])}
                        className="file-input"
                      />
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        style={{ color: "#f5e9cf" }}
                        className="type-a-message"
                        placeholder="Type a message"
                      />
                      <button type="button" onClick={handleImageUpload}>
                        Upload Image
                      </button>
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