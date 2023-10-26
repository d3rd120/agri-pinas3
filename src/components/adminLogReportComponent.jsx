import '../css/Components/adminLogReportComponent.css';
import AdminNavigation from '../components/adminPageNavigation';
import { FaPeopleArrows, FaTrash, FaEdit, FaBook } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import React from 'react';
import i18n from '../i18n';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const AdminFarmerTransactions = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState({
    id: '',
    timestamp: '',
    title: '',
    fullname: '',
    status: '',
    resolution: '',
    actionTaken: '', 
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Reports'));
        const reportsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports: ', error);
      }
    };

    fetchReports();
  }, []);

  const handleEdit = (report) => {
    setIsEditing(true);
    setEditedReport(report);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'Reports', editedReport.id), {
        title: editedReport.title,
        fullname: editedReport.fullname,
        status: editedReport.status,
        resolution: editedReport.resolution,
        actionTaken: editedReport.actionTaken, 
      });

      setIsEditing(false);
      setEditedReport({
        id: '',
        timestamp: '',
        title: '',
        fullname: '',
        status: '',
        resolution: '',
        actionTaken: '',
      });


      const querySnapshot = await getDocs(collection(db, 'Reports'));
      const reportsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportsData);
    } catch (error) {
      console.error('Error updating report: ', error);
    }
  };


  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminAccountFarmerComponent">
        <AdminNavigation />
        <div className="adminAccountFarmerComponentMainPanel">
          <div className="adminAccountFarmerComponentTopSection">
            <div className="adminAccountFarmerComponentMainText">
              <b className="adminAccountFarmerComponentMainTextContainer">
                <p className="adminAccountFarmerComponentBlankLine">&nbsp;</p>
                <p className="adminAccountFarmerComponentBlankLine">{t('text240')}</p>
              </b>
            </div>
          </div>

          <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle">
              <FaBook /> {t('text241')}
            </div>
            <br></br>

            <div className="adminCommunityForumComponentShow">
              {t('text242')}
              
              <select
                className="adminCommunityForumComponentRowSelect"               
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <input
                className="adminCommunityForumComponentRowSelect"
                type="text"  
                placeholder = {t('text243')}            
              />
            </div>
            <br></br>
            
            <table className="adminFarmerAccountManagementTable">
          <thead>
            <tr>
              <th>{t('text244')}</th>
              <th>{t('text245')}</th>
              <th>{t('text246')}</th>          
              <th>{t('text247')}</th>
              <th>{t('text248')}</th>           
              <th>{t('text249')}</th>             
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.timestamp}</td>
                <td>{isEditing && editedReport.id === report.id ? (
                  <input
                    type="text"
                    value={editedReport.title}
                    onChange={(e) => setEditedReport({ ...editedReport, title: e.target.value })}
                  />
                ) : (
                  report.title
                )}</td>
                <td>{isEditing && editedReport.id === report.id ? (
                  <input
                    type="text"
                    value={editedReport.fullname}
                    onChange={(e) => setEditedReport({ ...editedReport, fullname: e.target.value })}
                  />
                ) : (
                  report.fullname
                )}</td>
                <td>{isEditing && editedReport.id === report.id ? (
                  <input
                    type="text"
                    value={editedReport.status}
                    onChange={(e) => setEditedReport({ ...editedReport, status: e.target.value })}
                  />
                ) : (
                  report.status
                )}</td>
                <td>{isEditing && editedReport.id === report.id ? (
                  <input
                    type="text"
                    value={editedReport.resolution}
                    onChange={(e) => setEditedReport({ ...editedReport, resolution: e.target.value })}
                  />
                ) : (
                  report.resolution
                )}</td>
                <td>{isEditing && editedReport.id === report.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedReport.actionTaken}
                      onChange={(e) => setEditedReport({ ...editedReport, actionTaken: e.target.value })}
                    />
                    <FaEdit onClick={handleSave} />
                  </div>
                ) : (
                  <FaEdit onClick={() => handleEdit(report)} />
                )}</td>
              </tr>
            ))}
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


        </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactions;