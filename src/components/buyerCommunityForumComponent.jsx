import React, { useState, useEffect } from 'react';
import '../css/Components/buyerCommunityForumComponent.css';
import { auth, db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import BuyerCommunityForumComponentAddPost from '../components/buyerCommunityForumComponentAddPost';
import BuyerNavigation from './buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTimes } from 'react-icons/fa';




const BuyerCommunityForumComponent = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionId, setSessionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 6;

// Filter the posts based on the search query
const filteredPosts = posts.filter((post) => {
  return (
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
});



const handleButtonClick = () => {
  setShowPopup(true);
};

const closePopup = () => {
  setShowPopup(false);
};


const fetchPosts = async () => {
  try {
    const postsCollection = collection(db, 'CommunityForum');
    const snapshot = await getDocs(postsCollection);
    const fetchedPosts = [];

    for (const docSnap of snapshot.docs) {
      const post = docSnap.data();
      post.id = docSnap.id;

      // Fetch user details for each post
      const userSnapshot = await getDoc(doc(db, 'Users', post.uid));
      const userData = userSnapshot.data();

      if (userData) {
        post.profileImageUrl = userData.profileImageUrl;
      }
      fetchedPosts.push(post);
    }

    // console.log('Fetched Posts:', fetchedPosts);

    setPosts(fetchedPosts);
  } catch (error) {
    // console.error('Error fetching posts:', error);
  }
};


const createPost = async (newPost) => {
  try {
    const currentUser = auth.currentUser;

    
    if (!currentUser) {
      // console.error('User is undefined.');
    
      return;
    }

   
    const userSnapshot = await getDoc(doc(db, 'Users', currentUser.uid));
    const userData = userSnapshot.data();

    if (userData) {
     
      const { fullname } = userData;

      if (fullname) {
    
        const now = new Date();
        const formattedDateTime = now.toLocaleString();

        const postWithUserInfo = {
          ...newPost,
          
            fullname: fullname,
            uid: currentUser.uid,
          sessionId: sessionId, 
          timestamp: formattedDateTime, 
          
        };

     
        const postsCollection = collection(db, 'CommunityForum');
        await addDoc(postsCollection, postWithUserInfo);
        // console.log('postWithUserInfo',postWithUserInfo)
      } else {
        // console.error('User fullname is undefined.');
     
      }
    } else {
      // console.error('User data not available.');
      // You can set a default value or return, depending on your use case
    }
  } catch (error) {
    // console.error('Error adding post:', error);
    alert(error.message);
  }
};


const addPost = async (newPost) => {
  try {
    // Call createPost to add the post to Firestore
    await createPost(newPost);

    // Update the local state with the new post
    setPosts([...posts, newPost]);

    // Close the popup after a delay (3 seconds in this example)
    setTimeout(() => {
      closePopup();
    }, 1500); // 3000 milliseconds = 3 seconds
  } catch (error) {
    // Handle error
    // console.error('Error adding post:', error);
    alert(error.message);
  }
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
      // console.log('Last Clicked', post);
      // Fetch the detailed product information based on the product ID
      // You may want to use this information to display the detailed view in BuyerMarketplacePost
    } catch (error) {
      // console.error('Error handling product click:', error);
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
                  {t('ext357')}
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
              {t('ext358')}
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

<input
  type="text"
  placeholder={t('ext359')}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{ width: '250px' }}
/>



        

          {chunkedPosts.map((chunk, chunkIndex) => (
  <div className="buyerCommunityForumComponentFrameWrapper" key={chunkIndex}>
    {chunk.map((post, index) => (
      <NavLink
        className="buyerCommunityForumComponentRectangleParent"
        to={`/buyercommunityforumpost/${post.id}`}
        key={post.id}
        onClick={() => handleProductClick(post.id)}
        activeClassName="active"
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
          <div className="buyerCommunityForumComponentFrameAuthor">
          <img
            className="buyerCommunityForumComponentFrameIcon"
            alt=""
            src={post.profileImageUrl}
          />
          <div className="buyerCommunityForumComponentAuthorText">
            <div className="buyerCommunityForumComponentAuthorName">
              {post.fullname}
            </div>
            <div className="buyerCommunityForumComponentPostTime">
              {post.timestamp}
            </div>
          </div>
        </div>

        </div>
      </NavLink>
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
