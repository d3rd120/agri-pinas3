import "../css/Components/adminCommunityForumComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import {Link} from 'react-router-dom';
import ProfileVector1 from '../img/profileVector1.png';
import { FaComments } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminCommunityForumComponent = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "CommunityForum"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

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
            <div className="adminCommunityForumComponentSubTitle"><FaComments /> {t('Text2')}
            </div>
            <br></br>
           <div className="adminCommunityForumComponentShow">{t('Text3')}   
           <select className="adminCommunityForumComponentRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="adminCommunityForumComponentRowSelect"
            type = "text"
            placeholder = {t('Text4')}>                    
            </input>
            </div> 
            <br></br>     
    
     

            <div className="adminCommunityForumComponentFrameWrapper">
  {posts.map((post, index) => (
    <Link
      className="adminCommunityForumComponentRectangleParent"
      to={`/admincommunityforumpost/${index}`}
      key={index}
    >
      <img
        className="adminCommunityForumComponentFrameChild"
        alt=""
        src={post.imageUrl}
      />
      <div className="adminCommunityForumComponentFrameGroup">
        <div className="adminCommunityForumComponentFrameContainer">
          <div className="adminCommunityForumComponentSubText1Wrapper">
            <b className="adminCommunityForumComponentSubText1">
              {post.title}
            </b>
          </div>
          <div className="adminCommunityForumComponentSubText2Wrapper2">
            <div className="adminCommunityForumComponentSubText2">
              {post.content}
            </div>
          </div>
        </div>
        <div className="adminCommunityForumComponentFrameItem" />
        <div className="adminCommunityForumComponentFrameAuthor">
          <img
            className="adminCommunityForumComponentFrameIcon"
            alt=""
            src={ProfileVector1}
          />
          <div className="adminCommunityForumComponentAuthorText">
            <div className="adminCommunityForumComponentAuthorName">
              {post.user ? post.user.displayName || 'Anonymous' : 'Anonymous'}
            </div>
            <div className="adminCommunityForumComponentPostTime">
              {post.timestamp}
            </div>
          </div>
        </div>
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
