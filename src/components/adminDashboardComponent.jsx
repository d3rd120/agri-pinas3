import "../css/Components/adminDashboardComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import AdminDashboardComponentUpdate from '../components/adminDashboardComponentUpdate';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaFolderOpen, FaTimes } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore';


const AdminDashboard = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const postsCollection = collection(db, 'Announcements');
        const snapshot = await getDocs(postsCollection);
        const announcementsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);



  return (
    <>   
      <div className="adminDashboardComponent">
        <AdminNavigation />      
        <div className="adminDashboardComponentMainPanel">         
          <div className="adminDashboardComponentTopSection">
            <div className="adminDashboardComponentMainText1">
              <b className="adminDashboardComponentMainText1Container">   
                <p className="adminDashboardComponentBlankLine">&nbsp;</p>                      
                <p className="adminDashboardComponentBlankLine">{t('text142')}</p>
              </b>
            </div>
          </div>
          <div className="adminDashboardComponentMiddleSection">
            <div className="adminDashboardComponentOverview">
              <div className="adminDashboardComponentMainText2">
              {t('text143')}
              </div>

              <button
                className="buyerCommunityForumComponentButton1"
                onClick={handleButtonClick}
              >
                <FaEdit className="buyerCommunityForumComponentButtonIcon1" />
                <div className="buyerCommunityForumComponentButtonText1">
                  {t('text144')}
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
                <AdminDashboardComponentUpdate/>
              </div>
            </div>
          )}    
                <div className="adminDashboardComponentCard">
                {announcements.map((announcement) => (
                  <div key={announcement.id}>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.content}</p>
                    {announcement.imageUrl && (
                      <img
                        className="announcementImage"
                        alt={announcement.title}
                        src={announcement.imageUrl}
                      />
                    )}
                  </div>
                ))}
               
              </div>             
            </div>            
          </div>
        </div>
      </div>
    </>
  );
  
};

export default AdminDashboard;