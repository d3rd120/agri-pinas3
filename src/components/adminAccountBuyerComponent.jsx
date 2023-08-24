import '../css/Components/adminAccountBuyerComponent.css';
import AdminNavigation from './adminPageNavigation';
import { FaPeopleArrows, FaEdit, FaTrash} from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminFarmerTransactions = () => {
  const { t } = useTranslation();
  const [registeredUsers, setRegisteredUsers] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        users.push(user);
      });
      setRegisteredUsers(users);
    });

    
    return () => unsubscribe();
  }, []);
  
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
              <th>User ID</th>
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
            {registeredUsers.map((user) => (
              <tr key={user.uid}>
                <td>{user.uid}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td>{user.birthdate}</td>
                <td>{user.age}</td>
                <td><FaEdit /></td>
                <td><FaTrash /></td>
              </tr>
            ))} 

            <tr> 
                 <td>B002</td>
                 <td>Romeo London III</td>
                 <td>romeo@gmail.com</td>
                 <td>(+63)9234567891</td>
                 <td>Sampaloc, Manila</td>
                 <td>07-12-1999</td>
                 <td>23</td>       
                 <td><FaEdit /></td>  
                 <td><FaTrash /> </td>   
                                
           </tr>          

           <tr> 
                 <td>B003</td>
                 <td>Daniella Tungol</td>
                 <td>daniella@gmail.com</td>
                 <td>(+63)9234567891</td>
                 <td>Tandang Sora, Quezon City</td>
                 <td>12-15-1999</td>
                 <td>23</td>       
                 <td><FaEdit /></td> 
                 <td><FaTrash /> </td>  
                                  
           </tr>    

           <tr> 
                 <td>B004</td>
                 <td>Marievic Anes</td>
                 <td>marievic@gmail.com</td>
                 <td>(+63)9234567891</td>
                 <td>East Avenue, Quezon City</td>
                 <td>08-12-2000</td>
                 <td>22</td>       
                 <td><FaEdit /></td> 
                 <td><FaTrash /> </td>               
                     
           </tr>    

           <tr> 
                 <td>B005</td>
                 <td>Jenkins Mesina</td>
                 <td>jenkins@gmail.com</td>
                 <td>(+63)9234567891</td>
                 <td>Sta Mesa, Manila City</td>
                 <td>01-15-1999</td>
                 <td>23</td>       
                 <td><FaEdit /></td> 
                 <td><FaTrash /> </td>  
                                  
           </tr>    
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
