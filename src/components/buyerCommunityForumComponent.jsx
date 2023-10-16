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
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionId, setSessionId] = useState(null);

  const postsPerPage = 6;

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
        post.id = doc.id; // Add the id property
  
        if (post.user) {
          const userDisplayName = await fetchUserDisplayName(post.user.uid);
          post.user.displayName = userDisplayName;
        }
  
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
        sessionId: sessionId, // Add session ID
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



  useEffect(() => {
    const handleUserLogin = () => {
      // Logic to obtain or generate session ID
      const newSessionId = ('');
  
      // Set the session ID in the state
      setSessionId(newSessionId);
    };
  
    // Call the function when the component mounts or when user logs in
    handleUserLogin();
  }, []); // Add dependencies as needed

  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const chunkedPosts = chunkArray(currentPosts, 3); // Chunk the current page's posts
  const [lastClickedProductId, setLastClickedProductId] = useState(null);

  const handleProductClick = (post) => {
    try {
      // Set the last clicked product ID
      setLastClickedProductId(post.id);
      console.log('Last Clicked', post);
      // Fetch the detailed product information based on the product ID
      // You may want to use this information to display the detailed view in BuyerMarketplacePost
    } catch (error) {
      console.error('Error handling product click:', error);
    }
  };
  

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
                  {t('text111')}
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
              {t('text112')}
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

          {chunkedPosts.map((chunk, chunkIndex) => (
            <div className="buyerCommunityForumComponentFrameWrapper" key={chunkIndex}>
              {chunk.map((post, index) => (
                <Link
                  className="buyerCommunityForumComponentRectangleParent"
                  to={`/buyercommunityforumpost/${post.id}`}
                  key={index.id}
                  onClick={() => handleProductClick(post.id)}
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
          ))}

          <div className="buyerCommunityForumComponentForumNumber">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
              <div
                className={`buyerCommunityForumComponentForumContainer ${currentPage === index + 1 ? 'active' : ''}`}
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                <div className="buyerCommunityForumComponentForumNumberBox">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default BuyerCommunityForumComponent;
