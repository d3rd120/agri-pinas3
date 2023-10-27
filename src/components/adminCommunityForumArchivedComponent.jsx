import "../css/Components/adminCommunityForumComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, getDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import SquashVector from '../img/squash.png';
import { FaComments, FaArchive, FaTrash } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const AdminCommunityForumComponent = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(10); // Default display count
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1

  const handleButtonClick1 = () => {
    setShowPopup1(true);
  };

  const closePopup1 = () => {
    setShowPopup1(false);
  };

  const handleButtonClick2 = () => {
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
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

        const userDisplayName = await fetchUserDisplayName(post.user?.uid);
        post.user.displayName = userDisplayName || 'Anonymous'; // Set a default value if userDisplayName is falsy
        fetchedPosts.push(post);
        post.id = doc.id;
      }

      setPosts(fetchedPosts);
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

            <div className="adminCommunityForumComponentFrameWrapper">          

              <a className="adminCommunityForumComponentRectangleParent">
                <img
                  className="adminCommunityForumComponentFrameChild"
                  alt=""
                  src={SquashVector}
                />
                <div className="adminCommunityForumComponentFrameGroup">
                  <div className="adminCommunityForumComponentFrameContainer">
                    <div className="adminCommunityForumComponentSubText1Wrapper">
                      <b className="adminCommunityForumComponentSubText1">{t('Text6')}</b>
                    </div>
                    <div className="adminCommunityForumComponentSubText2Wrapper2">
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text9')}</b> B001
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text10')}</b> Buyer
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text11')}</b> Jenkins Mesina
                      </div>                           
                    </div>
                  </div>
                  <div className="adminMarketplaceComponentFrameItem" />
                          <div className="adminMarketplaceComponentDetails">
                            <button className="adminMarketplaceComponentButton" onClick={handleButtonClick1}>
                              <FaArchive className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('Archive')}</div>
                            </button>
                            <button className="adminMarketplaceComponentButton" onClick={handleButtonClick2}>
                              <FaTrash className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('text178')}</div>
                            </button>
                          </div>
  
                </div>
              </a> 
            </div>  

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
    </I18nextProvider>
  );
};

export default AdminCommunityForumComponent;