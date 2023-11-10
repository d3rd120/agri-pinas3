import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponent.css';
import { auth, db } from './firebase';
import { collection, doc, getDocs, query, where, deleteDoc} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import BuyerProfileNav from '../components/buyerProfileNav';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Link } from 'react-router-dom';
import { FaArchive, FaTimes } from 'react-icons/fa';
import ConfirmationDialog from '../components/confirmationDialog';



const BuyerProfileForumActivityComponent = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  
  const postsPerPage = 6;

// Filter the posts based on the search query
const filteredPosts = posts.filter((post) => {
  return (
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
});


const handleArchiveClick = (postId) => {
  setSelectedPostId(postId);
  setShowConfirmationDialog(true);
};



const fetchUserPosts = async () => {
  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userPostsCollection = collection(db, 'CommunityForum');
      const userPostsQuery = query(userPostsCollection, where('uid', '==', currentUser.uid));
      const userPostsSnapshot = await getDocs(userPostsQuery);

      const fetchedUserPosts = userPostsSnapshot.docs.map((doc) => {
        const post = doc.data();
        post.id = doc.id;
        return post;
      });

      setPosts(fetchedUserPosts);
    }
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
};

useEffect(() => {
  fetchUserPosts(); // Fetch only the posts of the current user
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  {t('eext403')}
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
                      onClick={() => handleArchiveClick(post.id)}
                    >
                      <FaArchive className="adminMarketplaceComponentButtonIcon" />
                      <div className="adminMarketplaceComponentButtonText">{t('eext404')}</div>
                    </button>
                 
                          </div>
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
      <ConfirmationDialog
          isOpen={showConfirmationDialog}
          message= {t('ext412')}
          onConfirm={() => {
            // Add logic to delete the post using selectedPostId
            // Call fetchUserPosts() to refresh the posts after deletion
            // Hide the confirmation dialog
            setShowConfirmationDialog(false);
          }}
          onCancel={() => setShowConfirmationDialog(false)}
          onOverlayClick={() => setShowConfirmationDialog(false)}
          confirmLabel= {t('ext413')}
          cancelLabel= {t('ext414')}
        />
    </I18nextProvider>
  );
};

export default BuyerProfileForumActivityComponent;