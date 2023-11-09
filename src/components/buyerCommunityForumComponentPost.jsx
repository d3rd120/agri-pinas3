import '../css/Components/buyerCommunityForumComponentFullPost.css';
import React, { useState, useEffect } from 'react';
import BuyerNavigation from './buyerNavigation';
import { FaThumbsUp } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import { getDoc, doc, addDoc, collection, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { useParams, Link} from 'react-router-dom';
import Popup from './validationPopup';


const FarmerMarketplace = () => {
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [likeCount, setLikeCount] = useState(post ? post.likes : 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post ? post.comments : []);
  const [commentUsers, setCommentUsers] = useState({});
  const [otherPosts, setOtherPosts] = useState([]);
  const [loadingOtherPosts, setLoadingOtherPosts] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);


  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (!postId || postId === 'undefined') {
          console.warn('Invalid postId:', postId);
          return;
        }
  
        const postRef = doc(db, 'CommunityForum', postId);
        const postDetails = await getDoc(postRef);
  
        if (postDetails.exists()) {
          const postDetailsData = postDetails.data();
  
          // Ensure that likes is an array or initialize it as an empty array
          const likes = postDetailsData.likes ?? [];
  
          setPost({
            ...postDetailsData,
            likes, // Updated likes
          });
          setLikeCount(likes.length); // Update like count
          setComments(postDetailsData.comments ?? []);
  
          fetchOtherPosts(postId);
        } else {
          console.warn('Post not found.');
        }
      } catch (error) {
        console.error('Error in fetchPostDetails:', error.message);
      }
    };
  
    const fetchOtherPosts = async (postId) => {
      try {
        const postsCollectionRef = collection(db, 'CommunityForum');
        const otherPostsQuery = await getDocs(postsCollectionRef);
  
        const filteredOtherPosts = otherPostsQuery.docs
          .filter((doc) => doc.id !== postId)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .slice(0, 3);
  
        setOtherPosts([...filteredOtherPosts]);
      } catch (error) {
        console.error('Error fetching other posts:', error.message);
      } finally {
        setLoadingOtherPosts(false); // Set loading state to false regardless of success or failure
      }
    };
  
    if (postId && postId !== 'undefined') {
      fetchPostDetails();
    }
  }, [postId]);


  if (!postId) {
    console.warn('Invalid postId:', postId);
    return <div>{t('Invalid postId')}</div>;
  }

 
  if (!post) {
    return <div>{t('Loading...')}</div>;
  }
  
  
  
  const handleLike = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        console.warn('User is not authenticated.');
        // You can redirect the user to the login page or show a message
        return;
      }
  
      const uid = user.uid;
      const postRef = doc(db, 'CommunityForum', postId);
  
      // Check if the user has already liked the post
      const postDoc = await getDoc(postRef);
      let postLikes = postDoc.data()?.likes;
  
      // Ensure that postLikes is an array or initialize it as an empty array
      if (!Array.isArray(postLikes)) {
        console.warn('Invalid or missing likes data in the post document. Initializing likes as an empty array.');
        postLikes = [];
      }
  
      if (!postLikes.includes(uid)) {
        // Add the user's ID to the likes array
        await updateDoc(postRef, {
          likes: [...postLikes, uid],
        });
  
        // Update the local state
        setLikeCount((prevCount) => prevCount + 1);
      } else {
        console.warn('User has already liked this post.');
      }
    } catch (error) {
      console.error('Error adding like:', error.message);
    }
  };
  
  
  
  
  
  

  const handleComment = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        setPopupMessage('User is not authenticated.');
        setPopupVisible(true);
        return;
      }
  
      const uid = user.uid;
      const userDocRef = doc(db, 'Users', uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const fullname = userData && userData.fullname ? userData.fullname : 'Anonymous';
  
      if (comment.trim() === '') {
        setPopupMessage('This field cannot be empty. Please enter your comment.');
        setPopupVisible(true);
        return;
      }
  
      await addDoc(collection(db, 'Comments'), {
        postId: postId,
        fullname: fullname,
        text: comment,
      });
  
      setComments((prevComments) => [...prevComments, { fullname, text: comment }]);
      setComment('');
  
      const postRef = doc(db, 'CommunityForum', postId);
      await updateDoc(postRef, {
        comments: [...comments, { fullname, text: comment }],
      });
  
      setCommentUsers({
        ...commentUsers,
        [fullname]: userData,
      });
    } catch (error) {
      setPopupMessage(`Error adding comment: ${error.message}`);
      setPopupVisible(true);
    }
  };
  
  
  
 

  
  

 return (
  <I18nextProvider i18n={i18n}> 
    <div className="buyerCommunityForumComponentFullPost">
      <BuyerNavigation />      
      <div className="buyerCommunityForumComponentFullPostMainPanel">
        <BuyerTopNav />
        <div className="buyerCommunityForumComponentFullPostTopSection">
          <div className="buyerCommunityForumComponentFullPostMainTextContainer">
            <b className="buyerCommunityForumComponentFullPostMainText1">              
              <p className="buyerCommunityForumComponentFullPostBlankLine">{t('ext367')}</p>
            </b>
          </div>
        </div>
        <div className="buyerCommunityForumComponentFullPostMiddleSection">
            <div className="buyerCommunityForumComponentFullPostCardsContainer">
              <div className="buyerCommunityForumComponentFullPostCard1">
              {post.image && (
                  <img
                    className="buyerCommunityForumComponentFullPostCard1Image"
                    alt=""
                    src={post.image}
                  />
                )}
              </div>
              <div className="buyerCommunityForumComponentFullPostSmallCards">
                <div className="buyerCommunityForumComponentFullPostSmallCardsDescription">
                  <div className="buyerCommunityForumComponentFullPostSmallCardsContent">
                    <div className="buyerCommunityForumComponentFullPostSmallCardsHeading">
                      <div className="buyerCommunityForumComponentFullPostSmallCardsDetails">
                        <b className="buyerCommunityForumComponentFullPostSmallCardsMainText">{post.title}</b>
                        <b className="buyerCommunityForumComponentFullPostSmallCardsDescription1">{post.user?.displayName}</b>
                      </div>
                      <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                        <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                          {post.content}
                        </div>
                      </div>
                      <b className="buyerCommunityForumComponentFullPostSmallCardsDescription2">  {likeCount} {t('ext368')}</b>
                      <button className="buyerCommunityForumComponentFullPostButton" onClick={handleLike}>
                      <FaThumbsUp className="buyerCommunityForumComponentFullPostButtonIcon" />
                      <div className="buyerCommunityForumComponentFullPostButtonText"> {t('ext369')}</div>
                      <div className="buyerCommunityForumComponentFullPostButtonText"></div>
                    </button>
                    </div>
                    <input
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="buyerCommunityForumComponentFullPostCommentInput"
                          type="text"
                          placeholder={t('ext370')}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleComment();
                            }
                          }}
                        />           
                    <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                      <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                        <p className="buyerCommunityForumComponentFullPostBlankLine">
                          <b>{t('ext371')}</b>
                        </p>
                        {comments.map((comment, index) => (
                        <div key={index} className="buyerCommunityForumComponentFullPostComment">
                          <b>{commentUsers[comment.fullname]?.fullname || comment.fullname}: </b>
                          <span>{comment.text}</span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="buyerCommunityForumComponentFullPostNewCard">
  <div className="buyerCommunityForumComponentFullPostNewCardMainText">{t('ext372')}</div>
  <div className="buyerCommunityForumComponentFullPostNewCardText">
  {otherPosts.map((otherPost, index) => (
  <Link
    className="buyerCommunityForumComponentFullPostNewCardButton"
    to={`/buyercommunityforumpost/${otherPost.id}`}
    key={`image-${index}`}
  >
    <img
      alt=""
      src={otherPost.image}
      className="buyerCommunityForumComponentFullPostNewCardImage"
    />
    <div className="buyerCommunityForumComponentFullPostNewCardDetails">
      <div className="buyerCommunityForumComponentFullPostNewCardInner">
        <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
          <div className="buyerCommunityForumComponentFullPostNewCardTitle">
            {otherPost.title}
          </div>
        </div>
      </div>
    </div>
  </Link>
))}
  </div>
        </div>
      </div>
    </div>
    {isPopupVisible && (
    <Popup message={popupMessage} onClose={() => setPopupVisible(false)} isVisible={isPopupVisible} />
  )}
  </I18nextProvider>
);

};

export default FarmerMarketplace;