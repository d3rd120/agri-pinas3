import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponent.css';
import { auth, db } from './firebase';
import { collection, doc, getDocs, query, where, deleteDoc, getDoc, addDoc} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import BuyerProfileNav from '../components/buyerProfileNav';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Link, useNavigate} from 'react-router-dom';
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
  const [archivedPosts, setArchivedPosts] = useState([]);
  const navigate = useNavigate();

  const postsPerPage = 6;

// Filter the posts based on the search query
const filteredPosts = posts.filter((post) => {
  return (
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
});




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
    // console.error('Error fetching user posts:', error);
  }
};


const fetchArchivedPosts = async () => {
  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Assuming 'ForumActivityArchive' is the collection name for archived posts
      const archivePostsCollection = collection(db, 'ForumActivityArchive');
      
      // Add a where clause to filter by the current user's UID
      const archivePostsQuery = query(archivePostsCollection, where('uid', '==', currentUser.uid));
      
      const archivePostsSnapshot = await getDocs(archivePostsQuery);

      const fetchedArchivedPosts = archivePostsSnapshot.docs.map((doc) => {
        const post = doc.data();
        post.id = doc.id;
        return post;
      });

      setArchivedPosts(fetchedArchivedPosts);
    }
  } catch (error) {
    // Handle errors
    // console.error('Error fetching archived posts:', error);
  }
};


  useEffect(() => {
    fetchArchivedPosts(); // Fetch archived posts
  }, []);

  const handleUnarchivePost = async (archivedPostID) => {
    try {
      const archivedPostRef = doc(db, 'ForumActivityArchive', archivedPostID);
      const archivedPostSnapshot = await getDoc(archivedPostRef);

      if (archivedPostSnapshot.exists()) {
        const archivedPostData = archivedPostSnapshot.data();

        // Move the post from 'ForumActivityArchive' to 'CommunityForum'
        await addDoc(collection(db, 'CommunityForum'), {
          ...archivedPostData,
          archived: false, // Mark as unarchived
        });

        // Delete the post from 'ForumActivityArchive'
        await deleteDoc(archivedPostRef);

        fetchArchivedPosts(); // Fetch updated archived posts
        fetchUserPosts();

        // Use navigate to go to the forum activity page
        navigate('/forumactivity');
      } else {
        // console.warn('Archived post not found. Post ID:', archivedPostID);
      }
    } catch (error) {
      // console.error('Error unarchiving post:', error);
    }
  };

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

          
        
          {chunkArray(archivedPosts, 1).map((archivedPostChunk, chunkIndex) => (
            <div className="adminMarketplaceComponentFrameWrapper" key={chunkIndex}>
              {archivedPostChunk.map((archivedPost) => (
                <Link
                  className="buyerCommunityForumComponentRectangleParent"
                >
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={archivedPost.image}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                  
                    <div className="buyerCommunityForumComponentFrameContainer">
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1">
                          {archivedPost.title}
                        </b>
                      </div>
                      <div className="buyerCommunityForumComponentSubText2Wrapper2">
                        <div className="buyerCommunityForumComponentSubText2">
                          {archivedPost.content}
                        </div>
                      </div>
                    </div>
                    <div className="buyerCommunityForumComponentFrameItem" />
                    <div className="adminMarketplaceComponentDetails">
                    <button
                      className="adminMarketplaceComponentButton"
                      onClick={() => handleUnarchivePost(archivedPost.id)}
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