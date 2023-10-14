import '../css/Components/adminLogReportComponent.css';
import AdminNavigation from '../components/adminPageNavigation';
import { FaPeopleArrows, FaTrash, FaEdit, FaBook } from 'react-icons/fa';
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
          <tr> 
                 <td>10/10/2023</td>
                 <td>Inaccurate Delivered Products</td>
                 <td>Arrianne Clarisse Gatpo</td>               
                 <td>Taking it to the Advisor</td>                 
                 <td>Pending</td>       
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
