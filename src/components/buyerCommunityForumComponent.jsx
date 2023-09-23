import "../css/Components/buyerCommunityForumComponent.css";
import BuyerNavigation from './buyerNavigation';
import OnionVector from '../img/onionVector.png';
import ProfileVector1 from '../img/profileVector1.png';
import {Link} from 'react-router-dom';
import { FaEdit, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { auth, db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import BuyerCommunityForumComponentAddPost from '../components/buyerCommunityForumComponentAddPost';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const BuyerCommunityForumComponent = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const createPost = async (newPost) => {
    try {
      const currentUser = auth.currentUser;
      const postWithUserInfo = {
        ...newPost,
        user: {
          displayName: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
        },
        timestamp: new Date().toString(),
      };

      // Save the post to Firestore
      const postsCollection = collection(db, "CommunityForum");
      await addDoc(postsCollection, postWithUserInfo);
    } catch (error) {
      console.error("Error adding post:", error);
      alert(error.message);
    }
  };

  const addPost = (newPost) => {
    // Call createPost to add the post to Firestore
    createPost(newPost);

    // Update the local state with the new post
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    // Fetch posts from Firestore when the component mounts
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "CommunityForum"); 
        const snapshot = await getDocs(postsCollection); 
        const fetchedPosts = snapshot.docs.map((doc) => doc.data());
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  

  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerCommunityForumComponent">
        <BuyerNavigation />
        <div className="buyerCommunityForumComponentMainPanel">
          <BuyerTopNav />
          <div className="buyerCommunityForumComponentTopSection">
            <div className="buyerCommunityForumComponentMainText1">
              <b className="buyerCommunityForumComponentMainText2">
                <p className="buyerCommunityForumComponentBlankLine">
                  {t("farmerCommunityText1")}
                </p>
              </b>
            </div>
          </div>
  
          <button
            className="buyerCommunityForumComponentButton1"
            onClick={handleButtonClick}
          >
            <FaEdit className="buyerCommunityForumComponentButtonIcon1" />
            <div className="buyerCommunityForumComponentButtonText1">
              {t("farmerPageButton7")}
            </div>
          </button>
  
          {showPopup && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup}
                >
                  <FaTimes />
                </span>
                <BuyerCommunityForumComponentAddPost addPost={addPost} />
              </div>
            </div>
          )}
  
          <div className="buyerCommunityForumComponentFrameWrapper">
            {posts.map((post, index) => (
              <Link
                className="buyerCommunityForumComponentRectangleParent"
                to={`/buyercommunityforumpost`}
                // to={`/buyercommunityforumpost/${index}`}
                key={index}
              >
                <img
                  className="buyerCommunityForumComponentFrameChild"
                  alt=""
                  src={post.image}
                />
                <div className="buyerCommunityForumComponentFrameGroup">
                  <div className="buyerCommunityForumComponentFrameContainer">
                    <div className="buyerCommunityForumComponentSubText1Wrapper">
                      <b className="buyerCommunityForumComponentSubText1">
                        {post.title}
                      </b>
                    </div>
                    <div className="buyerCommunityForumComponentSubText2Wrapper2">
                      <div className="buyerCommunityForumComponentSubText2">
                        {post.content}
                      </div>
                    </div>
                  </div>
                  <div className="buyerCommunityForumComponentFrameItem" />
                  <div className="buyerCommunityForumComponentFrameAuthor">
                    <img
                      className="buyerCommunityForumComponentFrameIcon"
                      alt=""
                      src={ProfileVector1}
                    />
                    <div className="buyerCommunityForumComponentAuthorText">
                      <div className="buyerCommunityForumComponentAuthorName">
                        {post.user ? post.user.displayName || 'Anonymous' : 'Anonymous'}
                      </div>
                      <div className="buyerCommunityForumComponentPostTime">
                        {post.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
  
          <div className="buyerCommunityForumComponentForumNumber">
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">1</div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">2</div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">3</div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">4</div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">5</div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">6</div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};  

export default BuyerCommunityForumComponent;