import '../css/Components/adminAccountFarmerComponent.css';
import AdminNavigation from '../components/adminPageNavigation';
import { FaPeopleArrows, FaTrash, FaEdit} from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import i18n from '../i18n';

const AdminFarmerTransactions = () => {
  const { t } = useTranslation();
  const [farmerAccounts, setFarmerAccounts] = useState([]);

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

  const saveChanges = async (user) => {
    const userRef = doc(db, 'Users', user.uid);
    try {
      await updateDoc(userRef, {
        fullname: user.fullname,
        email: user.email,
        contact: user.contact,
        address: user.address,
        birthdate: user.birthdate,
        age: calculateAge(user.birthdate),
      });
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

      

            
        <div className="adminAccountFarmerComponentMiddleSection">
        <div className="adminFarmerAccountManagementPageLayout1">     
            <div className="adminFarmerAccountManagementPageLayout2">
        <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle"><FaPeopleArrows /> {t('Text33')}
            </div>
            <br></br>
           <div className = "adminFarmerAccountManagementShow">{t('Text3')}  
           <select className="adminFarmerAccountManagementRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="adminFarmerAccountManagementRowSelect"
            type = "text"
            placeholder = "Search">                    
            </input>
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
                      {farmerAccounts.map((user) => (
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
        </div>
      </div>
      <div className="adminAccountFarmerComponentCategories">
              <div className="adminAccountFarmerComponentPaginationContainer">
                <div className="adminAccountFarmerComponentPaginationNumber">1</div>
              </div>
              <div className="adminAccountFarmerComponentPaginationContainer">
                <div className="adminAccountFarmerComponentPaginationNumber">2</div>
              </div>
              <div className="adminAccountFarmerComponentPaginationContainer">
                <div className="adminAccountFarmerComponentPaginationNumber">3</div>
              </div>
              <div className="adminAccountFarmerComponentPaginationContainer">
                <div className="adminAccountFarmerComponentPaginationNumber">4</div>
              </div>
              <div className="adminAccountFarmerComponentPaginationContainer">
                <div className="adminAccountFarmerComponentPaginationNumber">5</div>
              </div>
              <div className="adminAccountFarmerComponentPaginationContainer">
                <div className="adminAccountFarmerComponentPaginationNumber">6</div>
              </div>
            </div>
    </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactions;