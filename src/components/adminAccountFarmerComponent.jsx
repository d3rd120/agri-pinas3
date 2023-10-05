import '../css/Components/adminAccountFarmerComponent.css';
import AdminNavigation from '../components/adminPageNavigation';
import { FaPeopleArrows, FaTrash, FaEdit } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  setDoc, // Import setDoc from Firebase
  getDoc, // Import getDoc from Firebase
} from 'firebase/firestore';
import { db } from './firebase';
import i18n from '../i18n';

const AdminFarmerTransactions = () => {
  const { t } = useTranslation();
  const [farmerAccounts, setFarmerAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsToShow, setRowsToShow] = useState(5); // Default to 5 rows

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        users.push(user);
      });
  
      const filteredFarmerAccounts = users.filter((user) => user.role === 'Farmer');
      setFarmerAccounts(filteredFarmerAccounts);
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
    const updatedAccounts = farmerAccounts.map((account) =>
      account.uid === user.uid ? { ...account, editing: true } : account
    );
    setFarmerAccounts(updatedAccounts);
  };

  const cancelEditing = (user) => {
    const updatedAccounts = farmerAccounts.map((account) =>
      account.uid === user.uid ? { ...account, editing: false } : account
    );
    setFarmerAccounts(updatedAccounts);
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
  
        // Update the user document with the new data, using { merge: true } to update only the specified fields
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
    const userRef = doc(db, 'Users', user.uid);
    try {
      await handleSaveUserData(user, userRef);
      const updatedAccounts = farmerAccounts.map((account) =>
        account.uid === user.uid ? { ...account, editing: false } : account
      );
      setFarmerAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const deleteUser = async (user) => {
    const userRef = doc(db, 'Users', user.uid);
    try {
      await deleteDoc(userRef);
      const updatedAccounts = farmerAccounts.filter((account) => account.uid !== user.uid);
      setFarmerAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredFarmerAccounts = farmerAccounts
    .filter((user) => {
      // Convert all user properties to lowercase for case-insensitive search
      const searchableProperties = [
        'fullname',
        'email',
        'contact',
        'address',
        'birthdate',
        'age', // You can add more properties here
      ];

      return searchableProperties.some((property) =>
        user[property].toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .slice(0, rowsToShow);

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminAccountFarmerComponent">
        <AdminNavigation />
        <div className="adminAccountFarmerComponentMainPanel">
          <div className="adminAccountFarmerComponentTopSection">
            <div className="adminAccountFarmerComponentMainText">
              <b className="adminAccountFarmerComponentMainTextContainer">
                <p className="adminAccountFarmerComponentBlankLine">&nbsp;</p>
                <p className="adminAccountFarmerComponentBlankLine">{t('Text32')}</p>
              </b>
            </div>
          </div>

          <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle">
              <FaPeopleArrows /> {t('Text33')}
            </div>
            <br></br>

            <div className="adminCommunityForumComponentShow">
              {t('Text3')}

              
              <select
                className="adminCommunityForumComponentRowSelect"
                value={rowsToShow}
                onChange={(e) => setRowsToShow(parseInt(e.target.value))}
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

            <table className="adminFarmerAccountManagementTable">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact No.</th>
                  <th>Address</th>
                  <th>Birthday</th>
                  <th>Age</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmerAccounts.map((user) => (
                  <tr key={user.uid}>
                    <td>
                      {user.editing ? (
                        <input
                          value={user.fullname}
                          onChange={(e) =>
                            setFarmerAccounts((prevAccounts) =>
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
                            setFarmerAccounts((prevAccounts) =>
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
                            setFarmerAccounts((prevAccounts) =>
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
                            setFarmerAccounts((prevAccounts) =>
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
                            setFarmerAccounts((prevAccounts) =>
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
                    <td>
                      {user.editing ? (
                        <div>
                          <button onClick={() => saveChanges(user)}>Save</button>
                        </div>
                      ) : (
                        <div>
                          <FaEdit onClick={() => startEditing(user)} />
                        </div>
                      )}
                    </td>
                    <td>
                      {user.editing ? (
                        <div>
                          <button onClick={() => cancelEditing(user)}>Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <FaTrash onClick={() => deleteUser(user)} />
                        </div>
                      )}
                    </td>
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
