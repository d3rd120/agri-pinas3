import React, { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import AdminNavigation from '../components/adminPageNavigation';
import { FaCheckSquare, FaEdit, FaBook, FaTrash } from 'react-icons/fa';
import ConfirmationDialog from './confirmationDialog';

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
    actionTaken: '',
    orderId: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(10); // Default to 5 rows
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1
  const [deletedReportId, setDeletedReportId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  
  const handleOverlayClick = () => {
    setShowConfirmation(false); // Close the confirmation dialog without changing the language.
  }; 

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
        // console.error('Error fetching reports: ', error);
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
        title: editedReport.title || '',
        fullname: editedReport.fullname || '',
        status: editedReport.status || '',
        actionTaken: editedReport.actionTaken || '',
        orderId: editedReport.orderId || '', // Update orderId field
      });

      setIsEditing(false);
      setEditedReport({
        id: '',
        timestamp: '',
        title: '',
        fullname: '',
        status: '',
        actionTaken: '',
        orderId: '',
      });

      const querySnapshot = await getDocs(collection(db, 'Reports'));
      const reportsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(reportsData);
    } catch (error) {
      // console.error('Error updating report: ', error);
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
  

    // Sort the reports in descending order based on timestamp (lexicographical order)
    reports.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    
    // Calculate the total number of pages based on the selected option (rows per page)
    const totalPages = Math.ceil(filteredReports.length / selectedOption);

    // Calculate the index of the last item in the current page
    const lastIndex = currentPage * selectedOption;
  
    // Calculate the index of the first item in the current page
    const firstIndex = lastIndex - selectedOption;
  
    // Get the current page's data
    const currentData = filteredReports.slice(firstIndex, lastIndex);
  
  
    const handleDelete = (reportId) => {
      // Set the report to delete and open the confirmation dialog
      setReportToDelete(reportId);
      setShowConfirmation(true);
    };

    const confirmDelete = async () => {
      if (reportToDelete) {
        try {
          await deleteDoc(doc(db, 'Reports', reportToDelete));
          setDeletedReportId(reportToDelete);
    
          // Fetch the updated reports after deletion
          const querySnapshot = await getDocs(collection(db, 'Reports'));
          const reportsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReports(reportsData);
        } catch (error) {
          // console.error('Error deleting report: ', error);
        } finally {
          // Close the confirmation dialog
          setShowConfirmation(false);
        }
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
                <p className="adminAccountFarmerComponentBlankLine">{t('ext240')}</p>
              </b>
            </div>
          </div>

          <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle">
              <FaBook /> {t('ext241')}
            </div>
            <br></br>

            <div className="adminCommunityForumComponentShow">
              {t('ext242')}

            
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
                placeholder={t('ext243')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <br></br>

         
            <table className="adminFarmerAccountManagementTable">
              <thead>
                <tr>
                  <th>{t('ext244')}</th>
                  <th>{t('ext245')}</th>
                  <th>{t('ext246')}</th>
                  <th>{t('ext247')}</th>
                  <th>{t('ext248')}</th>
                  <th>{t('ext249')}</th>
                  <th>{t('ext250')}</th>
                  {/* <th>Save</th> */}
                  <th>{t('ext251')}</th>
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
                      value={editedReport.actionTaken}
                      onChange={(e) =>
                        setEditedReport({ ...editedReport, actionTaken: e.target.value })
                      }
                    />
                  ) : (
                    report.actionTaken
                  )}
                </td>
                <td>
                  {isEditing && editedReport.id === report.id ? (
                    <select
                      value={editedReport.status}
                      onChange={(e) =>
                        setEditedReport({ ...editedReport, status: e.target.value })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      {/* Add more status options as needed */}
                    </select>
                  ) : (
                    report.status
                  )}
                </td>
                <td>
                  {isEditing && editedReport.id === report.id ? (
                    <FaEdit onClick={handleSave} />
                  ) : (
                    <FaEdit onClick={() => handleEdit(report)} />
                  )}
                </td>
                <td>{report.orderId}</td> {/* Display orderId in the table */}
                {/* <td>
                  {isEditing && editedReport.id === report.id && (
                    <FaCheckSquare onClick={handleSave} />
                  )}
                </td>                */}
                <td>
                <FaTrash
                    onClick={() => handleDelete(report.id)}
                    style={{ cursor: 'pointer' }}
                  />
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
      <ConfirmationDialog
            isOpen={showConfirmation}
            message="Are you sure you want to delete this report?"
            onConfirm={confirmDelete}
            onCancel={() => setShowConfirmation(false)}
            onOverlayClick={handleOverlayClick} // Pass the overlay click handler
            confirmLabel={t('Confirm')}
            cancelLabel={t('Cancel')}
          />

    </I18nextProvider>
  );
};

export default AdminFarmerTransactions;
