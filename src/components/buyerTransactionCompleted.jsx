import BuyerTransactionNav from '../components/buyerTransactionNav';
import "../css/BuyerPage/buyerTransactionsCompletedComponent.css";
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import ProfileVector2 from '../img/profileVector2.png';
import pechay from '../img/pechay.png'
import sili from '../img/sili.png';
import RiceVector from '../img/riceCardImage.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const BuyerTransanctionCompleted = () => {
  
const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerTransactionsCompletedComponent">
      <BuyerNavigation />
      <div className="buyerTransactionsCompletedComponentMainPanel">
      <BuyerTopNav /> 
        <div className="buyerTransactionsCompletedComponentTopSection">
          <div className="buyerTransactionsCompletedComponentMainText">
            <b className="buyerTransactionsCompletedComponentMainTextWrapper">   
              <p className="buyerTransactionsCompletedComponentBlankLine">{t('text90')}</p>
            </b>
          </div>
        </div>
        <BuyerTransactionNav />

        <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle"><FaFolderOpen /> {t('text91')}
            </div>
            <br></br>   
            <div className="adminBuyerTransactionsPendingComponentShow">
          {t('Search: ')}         
            <input 
            className="adminBuyerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('text189')}>                    
            </input>
          </div>
                  
            <br></br>     
    
     

        <div className="buyerTransactionMiddleSection">
        <div className="buyerTransactionFrameParent">

        <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
                 <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={sili}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">Sili</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text93')}</b> July 2, 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text94')} </b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text95')} </b> Fruit
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text96')}</b> Sack
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text97')} </b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text98')}</b> 10,000
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text99')} </b> Received
                        </div>
                      </div>
                    </div>                                    
                  </div>
                </a>            
               
              </div>     


           
          </div>
          </div> 
        </div>
      </div>
    </div>
    </I18nextProvider>

  );
};

export default BuyerTransanctionCompleted;
