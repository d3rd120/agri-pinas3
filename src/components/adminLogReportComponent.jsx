import '../css/Components/adminLogReportComponent.css';
import AdminNavigation from '../components/adminPageNavigation';
import { FaPeopleArrows, FaTrash, FaEdit } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import React from 'react';
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

          <div className="adminFarmerAccountManagementCard">
            <div className="adminFarmerAccountManagementSubTitle">
              <FaPeopleArrows /> {t('Text33')}
            </div>
            <br></br>

            <div className="adminCommunityForumComponentShow">
              {t('Text3')}
              
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
              />
            </div>
            <br></br>
            
            <table className="adminFarmerAccountManagementTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Issue Description</th>
              <th>Reported by</th>          
              <th>Action Taken</th>
              <th>Status</th>           
              <th>Edit</th>             
            </tr>
          </thead>
          <tbody>
          <tr> 
                 <td>F001</td>
                 <td>Ryan Edward Amador</td>
                 <td>ryan@gmail.com</td>               
                 <td>Antipolo</td>                 
                 <td>23</td>       
                 <td> <FaEdit /> </td>                            
           </tr>       
             
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
