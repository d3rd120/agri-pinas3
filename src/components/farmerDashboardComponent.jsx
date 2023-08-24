import "../css/Components/farmerDashboardComponent.css";
import FarmerNavigation from '../components/farmerPageNavigation';
import FarmerTopNav from '../components/farmerTopNav';
import ChatBot from 'react-simple-chatbot';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Banner from '../img/bannerSample.png';
import Weather from '../img/weatherAPI.png';





const FarmerDashboard = () => {
  const { t } = useTranslation();



 

 


  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerDashboardComponent">
      <FarmerNavigation />      
      <div className="farmerDashboardComponentMainPanel">  
      <FarmerTopNav />  
        <div className="farmerDashboardComponentTopSection">
          <div className="farmerDashboardComponentMainText1">
            <b className="farmerDashboardComponentMainText1Container">                         
              <p className="farmerDashboardComponentBlankLine">{t('farmerPageDashboardText1')}</p>
            </b>
          </div>
        </div>
        <div className="farmerDashboardComponentMiddleSection">
          <div className="farmerDashboardComponentOverview">
            <div className="farmerDashboardComponentMainText2">
            {t('farmerPageDashboardText2')}
            </div>   
            <div className="farmerDashboardComponentCard2">           
            <img className="farmerDashboardIcon2" alt="" src={Weather} />
            </div>      
            <div className="farmerDashboardComponentCard">           
            <img className="farmerDashboardIcon" alt="" src={Banner} />
            </div>                   
          </div>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default FarmerDashboard;
