import "../css/Components/adminDashboardComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import Banner from '../img/bannerSample.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';





const AdminDashboard = () => {
  const { t } = useTranslation();




  return (
    <>   
      <div className="adminDashboardComponent">
        <AdminNavigation />      
        <div className="adminDashboardComponentMainPanel">         
          <div className="adminDashboardComponentTopSection">
            <div className="adminDashboardComponentMainText1">
              <b className="adminDashboardComponentMainText1Container">   
                <p className="adminDashboardComponentBlankLine">&nbsp;</p>                      
                <p className="adminDashboardComponentBlankLine">{t('adminPageDashboardText1')}</p>
              </b>
            </div>
          </div>
          <div className="adminDashboardComponentMiddleSection">
            <div className="adminDashboardComponentOverview">
              <div className="adminDashboardComponentMainText2">
              {t('adminPageDashboardText2')}
              </div>
              <button className="adminDashboardComponentButton">
                        <FaEdit className="adminDashboardComponentButtonIcon" />
                        <div className="adminDashboardComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>                     
              <div className="adminDashboardComponentCard">           
              <img className="farmerDashboardIcon" alt="" src={Banner} />
              </div>             
            </div>            
          </div>
        </div>
      </div>
    </>
  );
  
};

export default AdminDashboard;
