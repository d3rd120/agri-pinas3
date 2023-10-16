import '../css/Components/buyerCommunityForumComponentFullPost.css';
import React, { useState, useEffect } from 'react';
import BuyerNavigation from './buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import SquashVector from '../img/squash.png';
import { FaThumbsUp } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase';
import { getDoc, doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';


const FarmerMarketplace = () => {
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(post ? post.likes : 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post ? post.comments : []);
  const [uid, setUid] = useState('');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (!postId || postId === 'undefined') {
          console.warn('Invalid postId:', postId);
          // Handle the invalid postId, maybe redirect to an error page
          return;
        }
  
        console.log('Fetching details for postId:', postId);
  
        const postRef = doc(db, 'CommunityForum', postId);
  
        const postDetails = await getDoc(postRef);
  
        if (postDetails.exists()) {
          const postDetailsData = postDetails.data();
          console.log('Post details:', postDetailsData);
          setPost(postDetailsData);
          setSelectedProduct(postDetailsData);
          setUid(postDetailsData.uid);

          setLikeCount(postDetailsData.likes ?? 0);
          setComments(postDetailsData.comments ?? []);
        } else {
          console.warn('Post not found.');
          // Handle the case where the post is not found, maybe redirect to an error page
        }
      } catch (error) {
        console.error('Error in fetchPostDetails:', error.message);
        setError(error.message); // Set an error message for UI
      }
    };
  
    // Log postId for debugging
    console.log('postId:', postId);
  
    // Fetch post details when the component mounts or when postId changes
    fetchPostDetails();
  }, [postId]);
  
  if (!post) {
    return <div>Loading...</div>; // You can display a loading state while fetching data
  }
  
  const handleLike = async () => {
    try {
      const userDocRef = doc(db, 'Users', post.user?.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const uid = userData && userData.uid ? userData.uid : 'Anonymous';

      // Add a new like document to the Likes collection
      await addDoc(collection(db, 'Likes'), {
        postId: postId,
        userId: uid,
      });

      // Update the like count locally
      setLikeCount(likeCount + 1);

      // Update the like count in the Firebase post document
      const postRef = doc(db, 'CommunityForum', postId);
      await updateDoc(postRef, {
        likes: likeCount + 1,
      });
    } catch (error) {
      console.error('Error adding like:', error.message);
    }
  };

  const handleComment = async () => {
    try {
      const userDocRef = doc(db, 'Users', post.user?.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      const uid = userData && userData.uid ? userData.uid : 'Anonymous';

      // Add a new comment document to the Comments collection
      await addDoc(collection(db, 'Comments'), {
        postId: postId,
        userId: uid,
        text: comment,
      });

      // Update the comments locally
      setComments([...comments, comment]);
      setComment('');

      // Update the comments in the Firebase post document
      const postRef = doc(db, 'CommunityForum', postId);
      await updateDoc(postRef, {
        comments: [...comments, comment],
      });
    } catch (error) {
      console.error('Error adding comment:', error.message);
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
              <p className="buyerCommunityForumComponentFullPostBlankLine">{t('farmerCommunityText1')}</p>
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
                        <b className="buyerCommunityForumComponentFullPostSmallCardsMainText">{t('farmerCommunityPostText1')}</b>
                        <b className="buyerCommunityForumComponentFullPostSmallCardsDescription1">{post.user?.displayName}</b>
                      </div>
                      <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                        <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                          {t('farmerCommunityPostText3')}
                        </div>
                      </div>
                      <b className="buyerCommunityForumComponentFullPostSmallCardsDescription2">24 {t('text126')}</b>
                      <button className="buyerCommunityForumComponentFullPostButton" onClick={handleLike}>
                      <FaThumbsUp className="buyerCommunityForumComponentFullPostButtonIcon" />
                      <div className="buyerCommunityForumComponentFullPostButtonText">{t('text127')}</div>
                      <div className="buyerCommunityForumComponentFullPostButtonText">{likeCount}</div>
                    </button>
                    </div>
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="buyerCommunityForumComponentFullPostCommentInput"
                      type="text"
                      placeholder={t('text128')}
                    />
                    <button className="buyerCommunityForumComponentFullPostButton" onClick={handleComment}>
                      {t('Add Comment')}
                    </button>
                    <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                      <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                        <p className="buyerCommunityForumComponentFullPostBlankLine">
                          <b>{t('text129')}</b>
                        </p>
                        {comments.map((comment, index) => (
                          <div key={index} className="buyerCommunityForumComponentFullPostComment">
                            <b>{`User ${index + 1}: `}</b>
                            <span>{comment}</span>
                          </div>
                        ))}
                        <p className="buyerCommunityForumComponentFullPostBlankLine">
                          <b>{`Ryan Edward Amador: `}</b>
                          <span>{t('farmerCommunityPostText7')}</span>
                        </p>
                        <p className="buyerCommunityForumComponentFullPostBlankLine">
                          <b>&nbsp;</b>
                        </p>
                        <p className="buyerCommunityForumComponentFullPostBlankLine">
                          <b>{`Marievic Anes: `}</b>
                          <span>
                            {t('farmerCommunityPostText8')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="buyerCommunityForumComponentFullPostNewCard">
          <div className="buyerCommunityForumComponentFullPostNewCardMainText">{t('text130')}</div>
          <div className="buyerCommunityForumComponentFullPostNewCardText">
            <button className="buyerCommunityForumComponentFullPostNewCardButton">
              <img
                className="buyerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={CornVector}
              />
              <div className="buyerCommunityForumComponentFullPostNewCardDetails">
                <div className="buyerCommunityForumComponentFullPostNewCardInner">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="buyerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText4')}</div>
                  </div>
                </div>
              </div>
            </button>

            <button className="buyerCommunityForumComponentFullPostNewCardButton">
              <img
                className="buyerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={RiceVector}
              />
              <div className="buyerCommunityForumComponentFullPostNewCardDetails">
                <div className="buyerCommunityForumComponentFullPostNewCardInner">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="buyerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText6')}</div>
                  </div>
                </div>
              </div>
            </button>             

            <button className="buyerCommunityForumComponentFullPostNewCardButton">
              <img
                className="buyerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={SquashVector}
              />
              <div className="buyerCommunityForumComponentFullPostNewCardDetails">
                <div className="buyerCommunityForumComponentFullPostNewCardInner">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="buyerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText8')}</div>
                  </div>
                </div>
              </div>
            </button> 
           
          </div>
        </div>
      </div>
    </div>
  </I18nextProvider>
);

};

export default FarmerMarketplace;
