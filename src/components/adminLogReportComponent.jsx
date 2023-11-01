import React, { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import AdminNavigation from '../components/adminPageNavigation';
import { FaCheckSquare, FaEdit, FaBook, FaTrash } from 'react-icons/fa';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(10); // Default to 5 rows
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1

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

  const filteredReports = reports.filter((report) => {
    const query = searchQuery.toLowerCase();  
    // Add null checks to ensure properties exist before using toLowerCase()
    return (
      (report.fullname && report.fullname.toLowerCase().includes(query)) ||
      (report.title && report.title.toLowerCase().includes(query)) ||
      (report.resolution && report.resolution.toLowerCase().includes(query)) ||
      (report.status && report.status.toLowerCase().includes(query)) ||
      (report.timestamp && report.timestamp.toLowerCase().includes(query))
    );
  });
  

    // Calculate the total number of pages based on the selected option (rows per page)
    const totalPages = Math.ceil(filteredReports.length / selectedOption);

    // Calculate the index of the last item in the current page
    const lastIndex = currentPage * selectedOption;
  
    // Calculate the index of the first item in the current page
    const firstIndex = lastIndex - selectedOption;
  
    // Get the current page's data
    const currentData = filteredReports.slice(firstIndex, lastIndex);
  
  



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
                value={selectedOption}
                onChange={(e) => setSelectedOption(parseInt(e.target.value))}
              >        
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>


              <input
                className="adminCommunityForumComponentRowSelect"
                type="text"
                placeholder={t('text231')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  <th>Save</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((report) => (
                  <tr key={report.id}>
                    <td>{report.timestamp}</td>
                    <td>{report.title}</td>
                    <td>{report.fullname}</td>
                    <td>
                      {isEditing && editedReport.id === report.id ? (
                        <input
                          type="text"
                          value={editedReport.status}
                          onChange={(e) =>
                            setEditedReport({ ...editedReport, status: e.target.value })
                          }
                        />
                      ) : (
                        report.status
                      )}
                    </td>
                    <td>
                    {isEditing && editedReport.id === report.id ? (
                      <select
                        value={editedReport.resolution}
                        onChange={(e) =>
                          setEditedReport({ ...editedReport, resolution: e.target.value })
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        {/* Add more resolution options as needed */}
                      </select>
                    ) : (
                      report.resolution
                    )}
                  </td>
                    <td>
                      {isEditing && editedReport.id === report.id ? (
                        <FaEdit onClick={handleSave} />
                      ) : (
                        <FaEdit onClick={() => handleEdit(report)} />
                      )}
                    </td>
                    <td>
                      {isEditing && editedReport.id === report.id && (
                        <FaCheckSquare onClick={handleSave} />
                      )}
                    </td>
                    <td>                      
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

        </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactions;
