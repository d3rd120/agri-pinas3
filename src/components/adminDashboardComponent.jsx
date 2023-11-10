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
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedOption, setSelectedOption] = useState(10);
 


  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleButtonClick2 = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

  
  const handleButtonClick3 = (announcement) => {
    setSelectedAnnouncement(announcement);
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
  
        // Sort the announcements by timestamp in descending order (latest first)
        announcementsData.sort((a, b) => {
          // Assuming your timestamp format is 'YYYY-MM-DD HH:mm:ss'
          const timestampA = a.timestamp;
          const timestampB = b.timestamp;
  
          if (timestampA < timestampB) return 1;
          if (timestampA > timestampB) return -1;
          return 0;
        });
  
        setAnnouncements(announcementsData);
      } catch (error) {
        // console.error('Error fetching announcements:', error);
      }
    };
  
    fetchAnnouncements();
  }, []);
  
  
  // Filter announcements based on search query
    const filteredAnnouncements = announcements.filter((item) => {
    const itemText = `${item.title} ${item.content} ${item.timestamp}`;
    return itemText.toLowerCase().includes(searchQuery.toLowerCase());
  });

    // Calculate the total number of pages based on the selected option (rows per page)
    const totalPages = Math.ceil(filteredAnnouncements.length / selectedOption);

    // Calculate the index of the last item in the current page
    const lastIndex = currentPage * selectedOption;
  
    // Calculate the index of the first item in the current page
    const firstIndex = lastIndex - selectedOption;
  
    // Get the current page's data
    const currentData = filteredAnnouncements.slice(firstIndex, lastIndex);
  


  return (
    <>   
      <div className="adminDashboardComponent">
        <AdminNavigation />      
        <div className="adminDashboardComponentMainPanel">         
          <div className="adminDashboardComponentTopSection">
            <div className="adminDashboardComponentMainText1">
              <b className="adminDashboardComponentMainText1Container">   
                <p className="adminDashboardComponentBlankLine">&nbsp;</p>                      
                <p className="adminDashboardComponentBlankLine">{t('ext107')}</p>
              </b>
            </div>
          </div>

          <div className="adminDashboardComponentMiddleSection">
            <div className="adminDashboardComponentOverview">
              <div className="adminDashboardComponentMainText2">
              {t('ext108')}
              </div>
              <button
                className="buyerCommunityForumComponentButton1"
                onClick={handleButtonClick}
              >
                <FaEdit className="buyerCommunityForumComponentButtonIcon1" />
                <div className="buyerCommunityForumComponentButtonText1">
                  {t('ext109')}
                </div>
          </button>     

            
           <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle">
              <FaClipboardList /> {t('ext110')}
            </div>
            <br></br>

            <div className="adminCommunityForumComponentShow">
              {t('ext111')}

              <select
                className="adminCommunityForumComponentRowSelect"
                value={selectedOption}
                onChange={(e) => setSelectedOption(parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <input
                  className="adminCommunityForumComponentRowSelect"
                  type="text"
                  placeholder= {t('ext112')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <br></br>

            <table className="adminFarmerAccountManagementTable">
          <thead>
            <tr>
              <th> {t('ext113')}</th>
              <th> {t('ext114')}</th>
              <th> {t('ext115')}</th>          
              <th> {t('ext116')}</th>
              <th> {t('ext117')}</th>                           
            </tr>
          </thead>
          <tbody>
          {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.timestamp}</td>
                <td className="adminDashboardButtons" onClick={() => handleButtonClick3(item)}>
                  <FaEdit />
                </td>
                <td className="adminDashboardButtons" onClick={() => handleButtonClick2(item)}>
                  <FaTrash />
                </td>
              </tr>
            ))}
                </tbody>
              </table>
              </div> 

              <div className="adminAccountBuyerComponentCategories">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                className={`adminAccountBuyerComponentPaginationContainer ${
                  index + 1 === currentPage ? 'active' : ''
                }`}
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{ cursor: 'pointer' }}
              >
                <div className="adminAccountBuyerComponentPaginationNumber">
                  {index + 1}
                </div>
              </div>
            ))}
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
                <AdminDashboardDelete closePopup={closePopup2} selectedAnnouncement={selectedAnnouncement} />
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
                <AdminDashboardEdit selectedAnnouncement={selectedAnnouncement} />
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