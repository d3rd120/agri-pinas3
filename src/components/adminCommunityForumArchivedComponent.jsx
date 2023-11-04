import "../css/Components/adminCommunityForumComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import React, { useState, useEffect } from 'react';
import {collection, getDoc, doc, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { FaComments, FaArchive, FaTrash } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ProfileVector1 from '../img/profileVector1.png';
import ConfirmationDialog from "./confirmationDialog";

const AdminCommunityForumComponentArchived = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(10); // Default display count
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1
  const [archivedPosts, setArchivedPosts] = useState([]); 
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    message: '',
    onConfirm: null,
  });
  const openConfirmationDialog = (message, onConfirm) => {
    setConfirmationDialog({
      isOpen: true,
      message,
      onConfirm,
    });
  };  
  

  
   
  const fetchArchivedPosts = async () => {
    try {
      const archivedPostsCollection = collection(db, 'ArchiveCommunityForum');
      const archivedPostsSnapshot = await getDocs(archivedPostsCollection);
  
      if (archivedPostsSnapshot.empty) {
        console.warn('No archived posts found.');
        return;
      }
  
      const archivedPostsData = archivedPostsSnapshot.docs.map((doc) => {
        const post = doc.data();
        post.user = post.user || {}; // Ensure that post.user is initialized as an object
        post.numericTimestamp = new Date(post.timestamp).getTime();
        return {
          id: doc.id,
          ...post,
        };
      });
  
      // Sort archived posts by numericTimestamp in descending order
      const sortedArchivedPosts = archivedPostsData.sort((a, b) => b.numericTimestamp - a.numericTimestamp);
  
      console.log('Fetched archived posts:', sortedArchivedPosts);
      setArchivedPosts(sortedArchivedPosts);
    } catch (error) {
      console.error('Error retrieving archived posts:', error);
    }
  };
  

  useEffect(() => {
    fetchArchivedPosts();
  }, []);
    

  // Filter posts based on searchQuery for title, displayName, post.user, and post.user.displayName
  const filteredPosts = archivedPosts.filter((archivedPost) => {
    const title = archivedPost.title || '';
    const displayName = archivedPost.category || '';
    const userDisplayName = archivedPost.user && archivedPost.user.displayName ? archivedPost.user.displayName : '';
    const user = archivedPost.user && typeof archivedPost.user === 'string' ? archivedPost.user.toLowerCase() : '';

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

 
  const handleUnarchiveButtonClick = async (postId) => {
    openConfirmationDialog('Are you sure you want to unarchive this post?', async () => {
      try {
        const archivedPostRef = doc(db, 'ArchiveCommunityForum', postId);
        const archivedPostSnapshot = await getDoc(archivedPostRef);
  
        if (archivedPostSnapshot.exists()) {
          const archivedPostData = archivedPostSnapshot.data();
  
          // Move the post from 'ArchiveCommunityForum' to 'CommunityForum'
          await addDoc(collection(db, 'CommunityForum'), {
            ...archivedPostData,
            archived: false, // Mark as unarchived
          });
  
          // Delete the post from 'ArchiveCommunityForum'
          await deleteDoc(archivedPostRef);
  
          setShowPopup1(true);
          fetchArchivedPosts();
          setTimeout(() => {
            window.location.reload();
          },);  // Show success message // Fetch updated archived posts
        } else {
          console.warn('Archived post not found. Post ID:', postId); // Log the postId
        }
      } catch (error) {
        console.error('Error unarchiving post:', error);
      }
    });
  };
  
  const handleDeleteArchivedPost = async (archivedPostId) => {
    openConfirmationDialog('Are you sure you want to delete this archived post?', async () => {
      try {
        const archivedPostRef = doc(db, 'ArchiveCommunityForum', archivedPostId);
        const archivedPostSnapshot = await getDoc(archivedPostRef);
  
        if (archivedPostSnapshot.exists()) {
          await deleteDoc(archivedPostRef);
  
          setShowPopup2(true);
          fetchArchivedPosts(); 
          setTimeout(() => {
            window.location.reload();
          },); // Update this function name if needed
        } else {
          console.warn('Archived post not found.');
        }
      } catch (error) {
        console.error('Error deleting archived post:', error);
      }
    });
  };

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
                <p className="adminCommunityForumComponentBlankLine">{t('Community Forum Archived')}</p>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <br />

            <div className="adminMarketplaceComponentMiddleSection">


                    <div className="adminMarketplaceComponentFrameParent">
                    {chunkArray(
                    sortedPosts.slice((currentPage - 1) * displayCount, currentPage * displayCount),
                    1
                    ).map((archivedPosts, index) => (
                    <div className="adminMarketplaceComponentFrameWrapper" key={index}>
                    {archivedPosts.map((archivedPost) => (
                    <a className="adminMarketplaceComponentRectangleParent" key={archivedPost.id}>
                    <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={archivedPost.image}
                    />
                    <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="adminCommunityForumComponentFrameContainer">
                                <div className="adminCommunityForumComponentSubText1Wrapper">
                                  <b className="adminCommunityForumComponentSubText1">{archivedPost.title}</b>
                                </div>
                                <div className="adminCommunityForumComponentSubText2Wrapper2">                      
                                <div className="buyerCommunityForumComponentSubText2">
                                  {archivedPost.content}
                                </div>
                                
                              {archivedPost.comments && archivedPost.comments.length > 0 && (
                                <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                                  <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                                    <p className="buyerCommunityForumComponentFullPostBlankLine">
                                      <b>{t('text129')}</b>
                                    </p>
                                    {archivedPost.comments.map((comment, commentIndex) => (
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
                                          {archivedPost.user.displayName}
                                        </div>
                                        <div className="buyerCommunityForumComponentPostTime">
                                          {archivedPost.timestamp}
                                        </div>
                                      </div>
                                    </div>
                                      
                                </div>
                              </div>

                    <div className="adminMarketplaceComponentFrameItem" />
                    <div className="adminMarketplaceComponentDetails">                
                        <button className="adminMarketplaceComponentButton" onClick={() => handleUnarchiveButtonClick (archivedPost.id)}>
                          <FaArchive className="adminMarketplaceComponentButtonIcon" />
                          <div className="adminMarketplaceComponentButtonText">{t('Unarchive')}</div>
                        </button>
                        {/* <button className="adminMarketplaceComponentButton" onClick={() => handleDeleteArchivedPost(archivedPost.id)}>
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
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        message={confirmationDialog.message}
        onConfirm={() => {
          confirmationDialog.onConfirm();
          setConfirmationDialog({ isOpen: false, message: '', onConfirm: null });
        }}
        onCancel={() => setConfirmationDialog({ isOpen: false, message: '', onConfirm: null })}
      />

    </I18nextProvider>
  );
};

export default AdminCommunityForumComponentArchived;