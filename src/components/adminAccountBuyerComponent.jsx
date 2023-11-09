import '../css/Components/adminAccountBuyerComponent.css';
import AdminNavigation from './adminPageNavigation';
import { FaPeopleArrows, FaEdit, FaTrash } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import {
  doc as firestoreDoc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ConfirmationDialog from './confirmationDialog';

const AdminBuyerTransactions = () => {
  const { t } = useTranslation();
  const [buyerAccounts, setBuyerAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(10); // Default selected option
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);

  const handleOverlayClick = () => {
    setDeleteConfirmationDialogOpen(false); // Close the confirmation dialog without changing the language.
  }; 


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        users.push(user);
      });

      const filteredBuyerAccounts = users.filter((user) => user.role === 'Buyer');
      setBuyerAccounts(filteredBuyerAccounts);
    });

    return () => unsubscribe();
  }, []);

  const calculateAge = (birthdate) => {
    const birthdateParts = birthdate.split('-');
    const birthYear = parseInt(birthdateParts[0]);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const startEditing = (user) => {
    const updatedAccounts = buyerAccounts.map((account) =>
      account.uid === user.uid ? { ...account, editing: true } : account
    );
    setBuyerAccounts(updatedAccounts);
  };

  const cancelEditing = (user) => {
    const updatedAccounts = buyerAccounts.map((account) =>
      account.uid === user.uid ? { ...account, editing: false } : account
    );
    setBuyerAccounts(updatedAccounts);
  };

  const handleSaveUserData = async (user, userRef) => {
    const userId = user.uid;

    try {
      // Check if the user document exists
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User document exists, proceed with the update
        const userData = {
          fullname: user.fullname,
          contact: user.contact,
          email: user.email,
          birthdate: user.birthdate,
        };

        // Update the user document with the new data
        await setDoc(userRef, userData, { merge: true });

        console.log('User data updated successfully!');
      } else {
        // Handle the case where the user document does not exist
        console.error('User document does not exist. Cannot update.');

        // Depending on your application's logic, you can choose to display an error message or take other actions here.
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const saveChanges = async (user) => {
    const userRef = firestoreDoc(db, 'Users', user.uid);
    try {
      await handleSaveUserData(user, userRef);
      const updatedAccounts = buyerAccounts.map((account) =>
        account.uid === user.uid ? { ...account, editing: false } : account
      );
      setBuyerAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const deleteUser = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete);
        const updatedAccounts = buyerAccounts.filter((account) => account.uid !== userToDelete.uid);
        setBuyerAccounts(updatedAccounts);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  
    // Close the confirmation dialog
    setDeleteConfirmationDialogOpen(false);
  };
  
  

  // Filter buyerAccounts based on searchQuery
  const filteredBuyerAccounts = buyerAccounts.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.fullname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.contact.toLowerCase().includes(query) ||
      user.address.toLowerCase().includes(query) ||
      user.birthdate.toLowerCase().includes(query) ||
      user.age.toString().includes(query)
    );
  });

  // Calculate the total number of pages based on the selected option (rows per page)
  const totalPages = Math.ceil(filteredBuyerAccounts.length / selectedOption);

  // Calculate the index of the last item in the current page
  const lastIndex = currentPage * selectedOption;

  // Calculate the index of the first item in the current page
  const firstIndex = lastIndex - selectedOption;

  // Get the current page's data
  const currentData = filteredBuyerAccounts.slice(firstIndex, lastIndex);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminAccountBuyerComponent">
        <AdminNavigation />
        <div className="adminAccountBuyerComponentMainPanel">
          <div className="adminAccountBuyerComponentTopSection">
            <div className="adminAccountBuyerComponentMainText">
              <b className="adminAccountBuyerComponentMainTextContainer">
                <p className="adminAccountBuyerComponentBlankLine">&nbsp;</p>
                <p className="adminAccountBuyerComponentBlankLine">{t('ext218')}</p>
              </b>
            </div>
          </div>

          <div className="adminBuyerAccountManagementCard">
            <div className="adminBuyerAccountManagementSubTitle">
              <FaPeopleArrows /> {t('ext219')}
            </div>
            <br />

            <div className="adminCommunityForumComponentShow">
              {t('ext220')}

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
                placeholder={t('ext221')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <br />

            <table className="adminBuyerAccountManagementTable">
              <thead>
                <tr>
                  <th>{t('ext222')}</th>
                  <th>{t('ext223')}</th>
                  <th>{t('ext224')}</th>
                  <th>{t('ext225')}</th>
                  <th>{t('ext226')}</th>
                  <th>{t('ext227')}</th>
                  {/* <th>{t('text238')}</th> */}
                  <th>{t('ext228')}</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((user) => (
                  <tr key={user.uid}>
                    <td>
                      {user.editing ? (
                        <input
                          value={user.fullname}
                          onChange={(e) =>
                            setBuyerAccounts((prevAccounts) =>
                              prevAccounts.map((account) =>
                                account.uid === user.uid
                                  ? { ...account, fullname: e.target.value }
                                  : account
                              )
                            )
                          }
                        />
                      ) : (
                        user.fullname
                      )}
                    </td>
                    <td>
                      {user.editing ? (
                        <input
                          value={user.email}
                          onChange={(e) =>
                            setBuyerAccounts((prevAccounts) =>
                              prevAccounts.map((account) =>
                                account.uid === user.uid
                                  ? { ...account, email: e.target.value }
                                  : account
                              )
                            )
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {user.editing ? (
                        <input
                          value={user.contact}
                          onChange={(e) =>
                            setBuyerAccounts((prevAccounts) =>
                              prevAccounts.map((account) =>
                                account.uid === user.uid
                                  ? { ...account, contact: e.target.value }
                                  : account
                              )
                            )
                          }
                        />
                      ) : (
                        user.contact
                      )}
                    </td>
                    <td>
                      {user.editing ? (
                        <input
                          value={user.address}
                          onChange={(e) =>
                            setBuyerAccounts((prevAccounts) =>
                              prevAccounts.map((account) =>
                                account.uid === user.uid
                                  ? { ...account, address: e.target.value }
                                  : account
                              )
                            )
                          }
                        />
                      ) : (
                        user.address
                      )}
                    </td>
                    <td>
                      {user.editing ? (
                        <input
                          type="date"
                          value={user.birthdate}
                          onChange={(e) =>
                            setBuyerAccounts((prevAccounts) =>
                              prevAccounts.map((account) =>
                                account.uid === user.uid
                                  ? {
                                      ...account,
                                      birthdate: e.target.value,
                                      age: calculateAge(e.target.value),
                                    }
                                  : account
                              )
                            )
                          }
                        />
                      ) : (
                        user.birthdate
                      )}
                    </td>
                    <td>{user.age}</td>
                    {/* <td>
                      {user.editing ? (
                        <div>
                          <button onClick={() => saveChanges(user)}>Save</button>
                        </div>
                      ) : (
                        <div>
                          <FaEdit onClick={() => startEditing(user)} />
                        </div>
                      )}
                    </td> */}
                <td>
                  {user.editing ? (
                    <div>
                      <button onClick={() => cancelEditing(user)} style={{ cursor: 'pointer' }}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <FaTrash onClick={() => deleteUser(user)} style={{ cursor: 'pointer' }} />
                    </div>
                  )}
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
          isOpen={isDeleteConfirmationDialogOpen}
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDeleteUser}
          onCancel={() => setDeleteConfirmationDialogOpen(false)}
          onOverlayClick={handleOverlayClick} // Pass the overlay click handler
          confirmLabel={t('Confirm')}
          cancelLabel={t('Cancel')}
        />
    </I18nextProvider>
  );
};

export default AdminBuyerTransactions;
