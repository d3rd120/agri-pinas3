import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponent.css';
import { auth, db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import BuyerProfileActivityEdit from '../components/buyerProfileForumActivityComponentEdit';
import BuyerProfileNav from '../components/buyerProfileNav';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import ConfirmationDialog from '../components/confirmationDialog';




const BuyerProfileForumActivityComponent = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const postsPerPage = 6;

// Filter the posts based on the search query
const filteredPosts = posts.filter((post) => {
  return (
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
});

  

const handleButtonClick2 = () => {
  setShowConfirmationDialog(true);
};

const handleButtonClick = () => {
  setShowPopup(true);
};

const closePopup = () => {
  setShowPopup(false);
};

const fetchUserDetails = async (uid) => {
  try {
    const userDocRef = doc(db, 'Users', uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();

    if (userData) {
      const { fullname, profileImageUrl } = userData;
      return { displayName: fullname, profileImageUrl };
    } else {
      return { fullname: 'Anonymous', profileImageUrl: '' };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { fullname: 'Anonymous', profileImageUrl: '' };
  }
};


const fetchPosts = async () => {
  try {
    const postsCollection = collection(db, 'CommunityForum');
    const snapshot = await getDocs(postsCollection);
    const fetchedPosts = [];

    for (const doc of snapshot.docs) {
      const post = doc.data();
      post.id = doc.id; 

      if (post.user) {
        const userDetails = await fetchUserDetails(post.user.uid);
        post.user.displayName = userDetails.displayName;
        post.user.profileImageUrl = userDetails.profileImageUrl;
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
        fullname: currentUser.displayName, // Update this line
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
  // Logic to obtain or generate session ID
  const newSessionId = uuidv4(); // Generate a new session ID

  // Set the session ID in the state
  setSessionId(newSessionId);
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
  const currentPosts = filteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  
  const chunkedPosts = chunkArray(currentPosts, 2); // Chunk the filtered posts

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
        <BuyerProfileNav />
        <div className="buyerCommunityForumComponentMainPanel">
          <BuyerTopNav />
          <div className="buyerCommunityForumComponentTopSection">
            <div className="buyerCommunityForumComponentMainText1">
              <b className="buyerCommunityForumComponentMainText2">
                <p className="buyerCommunityForumComponentBlankLine">
                  {t('Forum Activity')}
                </p>
              </b>                                          
            </div>
          </div>

          {chunkedPosts.map((chunk, chunkIndex) => (
            <div className="buyerCommunityForumComponentFrameWrapper" key={chunkIndex}>
              {chunk.map((post, index) => (
                <Link
                  className="buyerCommunityForumComponentRectangleParent"                
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
                    <div className="adminMarketplaceComponentDetails">
                    <button
                            className="adminMarketplaceComponentButton"
                            onClick={handleButtonClick} // Add this onClick handler
                          >
                            <FaEdit className="adminMarketplaceComponentButtonIcon" />
                            <div className="adminMarketplaceComponentButtonText">{t('Edit')}</div>
                          </button>
                          <button
                              className="adminMarketplaceComponentButton"
                              onClick={handleButtonClick2} // Show the confirmation dialog
                            >
                              <FaTrash className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('Delete')}</div>
                            </button>
                          </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}

                {showPopup && (
                  <div
                    id="buyerCommunityForumComponentPopupWindow"
                    className="buyerCommunityForumComponentPopupWindow"
                  >
                    <div className="buyerCommunityForumComponentPopupContent">
                      <span
                        className="buyerCommunityForumComponentCloseButton"
                        onClick={closePopup} // Add this onClick handler to close the popup
                      >
                        <FaTimes />
                      </span>
                      <BuyerProfileActivityEdit />
                    </div>
                  </div>
                )}

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
      {showConfirmationDialog && (
  <ConfirmationDialog
    isOpen={showConfirmationDialog}
    message={t('Are you sure you want to delete this post?')}
    onConfirm={() => setShowConfirmationDialog(false)} // Close the dialog
    onCancel={() => setShowConfirmationDialog(false)} // Close the dialog
    onOverlayClick={() => setShowConfirmationDialog(false)} // Close the dialog
    confirmLabel={t('Confirm')}
    cancelLabel={t('Cancel')}
  />
)}
    </I18nextProvider>
  );
};

export default BuyerProfileForumActivityComponent;