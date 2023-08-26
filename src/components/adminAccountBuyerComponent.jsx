import '../css/Components/adminAccountBuyerComponent.css';
import AdminNavigation from './adminPageNavigation';
import { FaPeopleArrows, FaEdit, FaTrash} from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminFarmerTransactions = () => {
  const { t } = useTranslation();
  const [buyerAccounts, setBuyerAccounts] = useState([]);


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
      const updatedAccounts = buyerAccounts.map((account) =>
        account.uid === user.uid ? { ...account, editing: false } : account
      );
      setBuyerAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const deleteUser = async (user) => {
    const userRef = doc(db, 'Users', user.uid);
    try {
      await deleteDoc(userRef);
      const updatedAccounts = buyerAccounts.filter((account) => account.uid !== user.uid);
      setBuyerAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminAccountBuyerComponent">
      <AdminNavigation />
      <div className="adminAccountBuyerComponentMainPanel">
        <div className="adminAccountBuyerComponentTopSection">
          <div className="adminAccountBuyerComponentMainText">
            <b className="adminAccountBuyerComponentMainTextContainer">              
              <p className="adminAccountBuyerComponentBlankLine">&nbsp;</p>
              <p className="adminAccountBuyerComponentBlankLine">{t('Text32')}</p>
            </b>
          </div>
        </div>

     
        <div className="adminAccountBuyerComponentMiddleSection">            
        <div className="adminBuyerAccountManagementPageLayout1">    
            <div className="adminBuyerAccountManagementPageLayout2">
        <div className="adminBuyerAccountManagementCard">
            <div className="adminBuyerAccountManagementSubTitle"><FaPeopleArrows /> {t('Text34')}
            </div>
            <br></br>
           <div className = "adminBuyerAccountManagementShow">{t('Text3')}   
           <select className="adminBuyerAccountManagementRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerAccountManagementRowSelect"
            type = "text"
            placeholder = "Search">                    
            </input>
            </div> 
            <br></br>
           
            <table className="adminBuyerAccountManagementTable">
          <thead>
            <tr>  
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Address</th>
              <th>Birthday</th>
              <th>Age</th>      
              <th></th>       
              <th></th> 
              
            </tr>
          </thead>
          <tbody>
                      {buyerAccounts.map((user) => (
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
                          <td>
                            {user.editing ? (
                              <div>
                                <button onClick={() => saveChanges(user)}>Save</button>
                                <button onClick={() => cancelEditing(user)}>Cancel</button>
                              </div>
                            ) : (
                              <div>
                                <FaEdit onClick={() => startEditing(user)} />
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
        <div className="adminAccountBuyerComponentCategories">
              <div className="adminAccountBuyerComponentPaginationContainer">
                <div className="adminAccountBuyerComponentPaginationNumber">1</div>
              </div>
              <div className="adminAccountBuyerComponentPaginationContainer">
                <div className="adminAccountBuyerComponentPaginationNumber">2</div>
              </div>
              <div className="adminAccountBuyerComponentPaginationContainer">
                <div className="adminAccountBuyerComponentPaginationNumber">3</div>
              </div>
              <div className="adminAccountBuyerComponentPaginationContainer">
                <div className="adminAccountBuyerComponentPaginationNumber">4</div>
              </div>
              <div className="adminAccountBuyerComponentPaginationContainer">
                <div className="adminAccountBuyerComponentPaginationNumber">5</div>
              </div>
              <div className="adminAccountBuyerComponentPaginationContainer">
                <div className="adminAccountBuyerComponentPaginationNumber">6</div>
              </div>
            </div>
      </div>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactions;
