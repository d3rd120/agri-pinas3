import "../css/Components/adminDashboardComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import AdminDashboardComponentUpdate from '../components/adminDashboardComponentUpdate';
import AdminDashboardDelete from '../components/adminDashboardDelete';
import AdminDashboardEdit from '../components/adminDashboardEdit';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaTimes, FaClipboardList } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase'; // Import Firebase Firestore
import { collection, getDocs } from 'firebase/firestore';


const AdminDashboard = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);
  const [announcements, setAnnouncements] = useState([]);


  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleButtonClick2 = () => {
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

  
  const handleButtonClick3 = () => {
    setShowPopup3(true);
  };

  const closePopup3 = () => {
    setShowPopup3(false);
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
              {t('Post Announcement')}
              </div>
              <button
                className="buyerCommunityForumComponentButton1"
                onClick={handleButtonClick}
              >
                <FaEdit className="buyerCommunityForumComponentButtonIcon1" />
                <div className="buyerCommunityForumComponentButtonText1">
                  {t('Post')}
                </div>
          </button>     

            
           <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle">
              <FaClipboardList /> {t('Announcements')}
            </div>
            <br></br>

            <div className="adminCommunityForumComponentShow">
              {t('Text3')}

              <select
                className="adminCommunityForumComponentRowSelect"               
              >             
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <input
                className="adminCommunityForumComponentRowSelect"
                type="text"              
              />
            </div>
            <br></br>

            <table className="adminFarmerAccountManagementTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Date</th>          
              <th>Edit</th>
              <th>Delete</th>                           
            </tr>
          </thead>
          <tbody>
          <tr> 
                 <td>Palay Giveaway</td>
                 <td>Sa dadating na nobyembre, mag papamigay kami ng palay na higit kumulang isang hectares</td>
                 <td>12/07/2023</td>                           
                 <td class = "adminDashboardButtons"onClick={handleButtonClick3}> <FaEdit /> </td>              
                 <td class = "adminDashboardButtons"onClick={handleButtonClick2}><FaTrash/> </td>                             
           </tr>       

                </tbody>
              </table>
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

          {showPopup2 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup2}
                >
                  <FaTimes />
                </span>
                <AdminDashboardDelete />
              </div>
            </div>
          )}

          {showPopup3 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup3}
                >
                  <FaTimes />
                </span>
                <AdminDashboardEdit/>
              </div>
            </div>
          )}   

            </div>            
          </div>
        </div>
      </div>
    </>
  );
  
};

export default AdminDashboard;