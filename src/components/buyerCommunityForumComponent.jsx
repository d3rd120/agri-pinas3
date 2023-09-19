import "../css/Components/farmerCommunityForumComponent.css";
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


const FarmerCommunityForumComponent = () => {
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
      <div className="farmerCommunityForumComponent">
        <BuyerNavigation />
        <div className="farmerCommunityForumComponentMainPanel">
          <BuyerTopNav />
          <div className="farmerCommunityForumComponentTopSection">
            <div className="farmerCommunityForumComponentMainText1">
              <b className="farmerCommunityForumComponentMainText2">
                <p className="farmerCommunityForumComponentBlankLine">
                  {t("farmerCommunityText1")}
                </p>
              </b>
            </div>
          </div>

          <button
            className="farmerCommunityForumComponentButton1"
            onClick={handleButtonClick}
          >
            <FaEdit className="farmerCommunityForumComponentButtonIcon1" />
            <div className="farmerCommunityForumComponentButtonText1">
              {t("farmerPageButton7")}
            </div>
          </button>

          {showPopup && (
            <div
              id="farmerCommunityForumComponentPopupWindow"
              className="farmerCommunityForumComponentPopupWindow"
            >
              <div className="farmerCommunityForumComponentPopupContent">
                <span
                  className="farmerCommunityForumComponentCloseButton"
                  onClick={closePopup}
                >
                  <FaTimes />
                </span>
                <BuyerCommunityForumComponentAddPost addPost={addPost} />
              </div>
            </div>
          )}

          <div className="farmerCommunityForumComponentFrameWrapper">
            {posts.map((post, index) => (
              <Link
                className="farmerCommunityForumComponentRectangleParent"
                to={`/farmercommunityforumpost/${index}`}
                key={index}
              >
                <img
                  className="farmerCommunityForumComponentFrameChild"
                  alt=""
                  src={post.image}
                />
                <div className="farmerCommunityForumComponentFrameGroup">
                  <div className="farmerCommunityForumComponentFrameContainer">
                    <div className="farmerCommunityForumComponentSubText1Wrapper">
                      <b className="farmerCommunityForumComponentSubText1">
                        {post.title}
                      </b>
                    </div>
                    <div className="farmerCommunityForumComponentSubText2Wrapper2">
                      <div className="farmerCommunityForumComponentSubText2">
                        {post.content}
                      </div>
                    </div>
                  </div>
                  <div className="farmerCommunityForumComponentFrameItem" />
                  <div className="farmerCommunityForumComponentFrameAuthor">
                    <img
                      className="farmerCommunityForumComponentFrameIcon"
                      alt=""
                      src={ProfileVector1}
                    />
                    <div className="farmerCommunityForumComponentAuthorText">
                      <div className="farmerCommunityForumComponentAuthorName">
                      {post.user ? post.user.displayName || 'Anonymous' : 'Anonymous'}
                      </div>
                      <div className="farmerCommunityForumComponentPostTime">
                       {post.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>


            <div className="farmerCommunityForumComponentForumNumber">
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">1</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">2</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">3</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">4</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">5</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">6</div>
              </div>
            </div>
          </div>
        </div>
    </I18nextProvider>
  );
};

export default FarmerCommunityForumComponent;