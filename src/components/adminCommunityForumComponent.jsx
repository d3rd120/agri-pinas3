import "../css/Components/adminCommunityForumComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, getDoc, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import ProfileVector1 from '../img/profileVector1.png';
import { FaComments, FaArchive, FaTrash } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ConfirmationDialog from './confirmationDialog';
import { v4 as uuidv4 } from 'uuid';

const AdminCommunityForumComponent = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(10); // Default display count
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1
  const [showArchiveConfirmation, setShowArchiveConfirmation] = useState(false);
  const [archivePostId, setArchivePostId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const session = uuidv4();
    setSessionId(session);
  }, []);

  
  const handleArchivePost = (postId) => {
    setArchivePostId(postId);
    setShowArchiveConfirmation(true);
  };
  
  // const handleDeletePost = (postId) => {
  //   setDeletePostId(postId);
  //   setShowDeleteConfirmation(true);
  // };

  
const handleOverlayClick = () => {
  setShowArchiveConfirmation(false); // Close the confirmation dialog without changing the language.
};


  


  const fetchUserDisplayName = async (uid) => {
    try {
      if (!uid || typeof uid !== 'string' || uid.trim() === '') {
        // If uid is not a non-empty string, return a default value
        return 'Anonymous';
      }
  
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
        post.user = post.user || {}; // Ensure that post.user is initialized as an object
  
        // Convert the timestamp to a numeric timestamp
        post.numericTimestamp = new Date(post.timestamp).getTime();
  
        const displayName = await fetchUserDisplayName(post.user?.uid);
        post.user.displayName = displayName; // Set a default value if userDisplayName is falsy
        post.id = doc.id;
  
        fetchedPosts.push(post);
      }
  
      // Sort the posts by numeric timestamp
      const sortedPosts = [...fetchedPosts].sort((a, b) => b.numericTimestamp - a.numericTimestamp);
  
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "CommunityForum"), () => {
      fetchPosts();
    });

    return () => unsubscribe();
  }, []);

  // Filter posts based on searchQuery for title, displayName, post.user, and post.user.displayName
  const filteredPosts = posts.filter((post) => {
    const title = post.title || '';
    const displayName = post.category || '';
    const userDisplayName = post.user && post.user.displayName ? post.user.displayName : '';
    const user = post.user && typeof post.user === 'string' ? post.user.toLowerCase() : '';
  
    // Check if title, displayName, userDisplayName, or user contains the searchQuery
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userDisplayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.includes(searchQuery.toLowerCase())
    );
  });
  

  // Function to split an array into chunks
  function chunkArray(arr, size) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  }

  // Event handler for changing the display count
  const handleDisplayCountChange = (event) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
    setCurrentPage(1); // Reset current page to 1 when changing display count
  };

  const handleConfirmArchive = async () => {
    try {
      const postRef = doc(db, 'CommunityForum', archivePostId);
      const postSnapshot = await getDoc(postRef);
  
      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
  
        await addDoc(collection(db, 'ArchiveCommunityForum'), {
          ...postData,
          archived: true,
        });
  
        await deleteDoc(postRef);
  
        setShowArchiveConfirmation(false);
        fetchPosts(); // You may need to update this function name if needed
      } else {
        console.warn('Post not found.');
      }
    } catch (error) {
      console.error('Error archiving post:', error);
    }
  };
  
  const handleCancelArchive = () => {
    setShowArchiveConfirmation(false);
  };
  
  // const handleConfirmDelete = async () => {
  //   try {
  //     const postRef = doc(db, 'CommunityForum', deletePostId);
  //     const postSnapshot = await getDoc(postRef);
  
  //     if (postSnapshot.exists()) {
  //       await deleteDoc(postRef);
  
  //       setShowDeleteConfirmation(false);
  //       fetchPosts(); // Update this function name if needed
  //     } else {
  //       console.warn('Post not found.');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };
  
  // const handleCancelDelete = () => {
  //   setShowDeleteConfirmation(false);
  // };

  const sortedPosts = [...filteredPosts].sort((a, b) => b.timestamp - a.timestamp);


  
  
  
  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumComponent">
        <AdminNavigation />
        <div className="adminCommunityForumComponentMainPanel">
          <div className="adminCommunityForumComponentTopSection">
            <div className="adminCommunityForumComponentMainText">
              <b className="adminCommunityForumComponentMainTextWrapper">
                <p className="adminCommunityForumComponentBlankLine">&nbsp;</p>
                <p className="adminCommunityForumComponentBlankLine">{t('text179')}</p>
              </b>
            </div>
          </div>

          <div className="adminCommunityForumComponentCard">
            <div className="adminCommunityForumComponentSubTitle"><FaComments /> {t('text180')}</div>
            <br />
            <div className="adminCommunityForumComponentShow">
              {t('text181')}

              <select className="adminCommunityForumComponentRowSelect" 
                      value={displayCount}
                      onChange={handleDisplayCountChange}>                
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
              </select>
              <input
                className="adminCommunityForumComponentRowSelect"
                type="text"
                placeholder={t('text182')}
                value={searchQuery} // Bind the input value to the searchQuery state
                onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state when the input changes
              />

            </div>
            <br />

            <div className="adminMarketplaceComponentMiddleSection">


            <div className="adminMarketplaceComponentFrameParent">
            {chunkArray(
  sortedPosts.slice((currentPage - 1) * displayCount, currentPage * displayCount),
  1
  ).map((postGroup, index) => (
    <div className="adminMarketplaceComponentFrameWrapper" key={index}>
      {postGroup.map((post) => (
        <a className="adminMarketplaceComponentRectangleParent" key={post.id}>
          <img
            className="buyerCommunityForumComponentFrameChild"
            alt=""
            src={post.image}
          />
          <div className="buyerCommunityForumComponentFrameGroup">
          <div className="adminCommunityForumComponentFrameContainer">
                        <div className="adminCommunityForumComponentSubText1Wrapper">
                          <b className="adminCommunityForumComponentSubText1">{post.title}</b>
                        </div>
                        <div className="adminCommunityForumComponentSubText2Wrapper2">                      
                        <div className="buyerCommunityForumComponentSubText2">
                          {post.content}
                        </div>
                        
                      {post.comments && post.comments.length > 0 && (
                        <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                          <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                            <p className="buyerCommunityForumComponentFullPostBlankLine">
                              <b>{t('text129')}</b>
                            </p>
                            {post.comments.map((comment, commentIndex) => (
                              <div key={commentIndex} className="buyerCommunityForumComponentFullPostComment">
                                <b>{comment.fullname}: </b>
                                <span>{comment.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <br></br>
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
                              
                        </div>
                      </div>
            
            <div className="adminMarketplaceComponentFrameItem" />
                          <div className="adminMarketplaceComponentDetails">
                            <button className="adminMarketplaceComponentButton" onClick={() => handleArchivePost(post.id)}>
                              <FaArchive className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('Archive')}</div>
                            </button>
                            {/* <button className="adminMarketplaceComponentButton" onClick={() => handleDeletePost(post.id)}>
                              <FaTrash className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('text178')}</div>
                            </button> */}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              </div>


            <div className="adminCommunityForumComponentForumNumber">
              {Array.from({ length: Math.ceil(filteredPosts.length / displayCount) }, (_, index) => (
                <div
                  className={`adminCommunityForumComponentForumContainer ${
                    index + 1 === currentPage ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{ cursor: 'pointer' }} // Add this line to set the cursor to pointer
                >
                  <div className="adminCommunityForumComponentForumNumberBox">{index + 1}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      {showArchiveConfirmation && (
  <ConfirmationDialog
    isOpen={showArchiveConfirmation}
    message="Are you sure you want to archive this post?"
    onConfirm={handleConfirmArchive}
    onCancel={handleCancelArchive}
    onOverlayClick={handleOverlayClick} // Pass the overlay click handler
    confirmLabel={t('Confirm')}
    cancelLabel={t('Cancel')}
  />
)}

{/* {showDeleteConfirmation && (
  <ConfirmationDialog
    isOpen={showDeleteConfirmation}
    message="Are you sure you want to delete this post?"
    onConfirm={handleConfirmDelete}
    onCancel={handleCancelDelete}
  />
)} */}

    </I18nextProvider>
  );
};

export default AdminCommunityForumComponent;