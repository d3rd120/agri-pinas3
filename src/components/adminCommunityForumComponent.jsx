import "../css/Components/adminCommunityForumComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, getDoc, doc, getDocs  } from 'firebase/firestore';
import { db } from './firebase';
import { Link } from 'react-router-dom';
import ProfileVector1 from '../img/profileVector1.png';
import { FaComments } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const AdminCommunityForumComponent = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState("5");

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
        const userDisplayName = await fetchUserDisplayName(post.user.uid);
        post.user.displayName = userDisplayName;
        fetchedPosts.push(post);
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

  // Create a new array to store displayed posts based on selectedOption
  const displayedPosts = posts
    .filter((post) => {
      const postTitleIncludesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const userNameIncludesQuery = (post.user ? post.user.displayName || 'Anonymous' : 'Anonymous')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return postTitleIncludesQuery || userNameIncludesQuery;
    })
    .slice(0, parseInt(selectedOption, 10));

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminCommunityForumComponent">
        <AdminNavigation />
        <div className="adminCommunityForumComponentMainPanel">
          <div className="adminCommunityForumComponentTopSection">
            <div className="adminCommunityForumComponentMainText">
              <b className="adminCommunityForumComponentMainTextWrapper">
                <p className="adminCommunityForumComponentBlankLine">&nbsp;</p>
                <p className="adminCommunityForumComponentBlankLine">{t('Text1')}</p>
              </b>
            </div>
          </div>

          <div className="adminCommunityForumComponentCard">
            <div className="adminCommunityForumComponentSubTitle"><FaComments /> {t('Text2')}</div>
            <br></br>
            <div className="adminCommunityForumComponentShow">
              {t('Text3')}
              <select
                className="adminCommunityForumComponentRowSelect"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <input
                className="adminCommunityForumComponentRowSelect"
                type="text"
                placeholder={t('Text4')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <br></br>

            <div className="buyerCommunityForumComponentFrameWrapper">
          {posts.map((post, index) => (
                <Link
                  className="buyerCommunityForumComponentRectangleParent"
                  to={`/buyercommunityforumpost/${index}`}
                  key={index}
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

            <div className="adminCommunityForumComponentForumNumber">
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">1</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">2</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">3</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">4</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">5</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminCommunityForumComponent;
