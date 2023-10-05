import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponent.css';
import { auth, db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import BuyerCommunityForumComponentAddPost from '../components/buyerCommunityForumComponentAddPost';
import BuyerNavigation from './buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Link } from 'react-router-dom';
import { FaEdit, FaTimes } from 'react-icons/fa';
import OnionVector from '../img/onionVector.png';
import ProfileVector1 from '../img/profileVector1.png';

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

 const fetchUserDisplayName = async (uid) => {
    try {
      const userDocRef = doc(db, 'Users', uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const displayName = userData ? userData.fullname : 'Anonymous';

      return displayName;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return 'Anonymous';
    }
  };

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, 'CommunityForum');
      const snapshot = await getDocs(postsCollection);
      const fetchedPosts = [];

      for (const doc of snapshot.docs) {
        const post = doc.data();
        const userDisplayName = await fetchUserDisplayName(post.user.uid);
        post.user.displayName = userDisplayName;
        fetchedPosts.push(post);
      }


      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (newPost) => {
    try {
      const currentUser = auth.currentUser;
      
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Format both date and time
  
      const postWithUserInfo = {
        ...newPost,
        user: {
          displayName: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
        },
        timestamp: formattedDateTime, // Use the formatted date and time
      };
  
      // Save the post to Firestore
      const postsCollection = collection(db, 'CommunityForum');
      await addDoc(postsCollection, postWithUserInfo);
    } catch (error) {
      console.error('Error adding post:', error);
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
                  {t('farmerCommunityText1')}
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
              {t('farmerPageButton7')}
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
                <BuyerCommunityForumComponentAddPost
                  addPost={addPost}
                  folderName="user-uploads"
                />
              </div>
            </div>
          )}

          <div className="buyerCommunityForumComponentFrameWrapper">
          {posts.map((post, index) => (
                <Link
                  className="buyerCommunityForumComponentRectangleParent"
                  to={`/buyercommunityforumpost/${index}`}
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
                    {post.user && post.user.displayName && (
                      <div className="buyerCommunityForumComponentFrameAuthor">
                        <img
                          className="buyerCommunityForumComponentFrameIcon"
                          alt=""
                          src={ProfileVector1}
                        />
                        <div className="buyerCommunityForumComponentAuthorText">
                          <div className="buyerCommunityForumComponentAuthorName">
                            {post.user.displayName}
                          </div>
                          <div className="buyerCommunityForumComponentPostTime">
                            {post.timestamp}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
          </div>

          <div className="buyerCommunityForumComponentForumNumber">
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">
                1
              </div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">
                2
              </div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">
                3
              </div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">
                4
              </div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">
                5
              </div>
            </div>
            <div className="buyerCommunityForumComponentForumContainer">
              <div className="buyerCommunityForumComponentForumNumberBox">
                6
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default BuyerCommunityForumComponent;
