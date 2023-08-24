import '../css/Components/adminAccountFarmerComponent.css';
import AdminNavigation from '../components/adminPageNavigation';
import { FaPeopleArrows, FaTrash, FaEdit} from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const AdminFarmerTransactions = () => {
  const { t } = useTranslation();
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
          <tr> 
                 <td>F001</td>
                 <td>Ryan Edward Amador</td>
                 <td>ryan@gmail.com</td>
                 <td>(+63)9123456789</td>
                 <td>Antipolo</td>
                 <td>01-01-1999</td>
                 <td>23</td>       
                 <td> <FaEdit /> </td>
                 <td> <FaTrash /> </td>               
           </tr>         

           <tr> 
                 <td>F002</td>
                 <td>Daniel Raymond Ribaya</td>
                 <td>daniel@gmail.com</td>
                 <td>(+63)9987654321</td>
                 <td>Rizal</td>
                 <td>02-02-1999</td>
                 <td>23</td>       
                 <td> <FaEdit /> </td>
                 <td> <FaTrash /> </td>               
           </tr>         

           <tr> 
                 <td>F003</td>
                 <td>Yagerobi Doria</td>
                 <td>yage@gmail.com</td>
                 <td>(+63)9876543219</td>
                 <td>Tondo, Manila</td>
                 <td>03-03-1999</td>
                 <td>23</td>       
                 <td> <FaEdit /> </td>
                 <td> <FaTrash /> </td>               
           </tr>         

           <tr> 
                 <td>F004</td>
                 <td>Enzio James Reyes</td>
                 <td>enzio@gmail.com</td>
                 <td>(+63)9765432198</td>
                 <td>Novaliches, Quezon City</td>
                 <td>04-04-1999</td>
                 <td>23</td>       
                 <td> <FaEdit /> </td>
                 <td> <FaTrash /> </td>               
           </tr>        
            
           <tr> 
                 <td>F005</td>
                 <td>Joebert Edward Torres</td>
                 <td>joebert@gmail.com</td>
                 <td>(+63)9654321987</td>
                 <td>Sta. Mesa, Manila</td>
                 <td>05-05-1999</td>
                 <td>23</td>       
                 <td> <FaEdit /> </td>
                 <td> <FaTrash /> </td>               
           </tr>         

           
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
