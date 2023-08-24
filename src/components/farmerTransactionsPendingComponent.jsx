import TransactionsNav from '../components/farmerTransactionsNavigation';
import "../css/Components/farmerTransactionsPendingComponent.css";
import FarmerNavigation from '../components/farmerPageNavigation';
import FarmerTopNav from '../components/farmerTopNav';
import SitawVector from '../img/sitaw.png';
import TomatoVector from '../img/tomatoVector.png';
import RiceVector from '../img/riceCardImage.png';
import {FaEdit, FaTrash,FaFolderOpen} from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCommunityForumComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerTransactionsPendingComponent">
      <FarmerNavigation />
      <div className="farmerTransactionsPendingComponentMainPanel">
        <FarmerTopNav />
        <div className="farmerTransactionsPendingComponentTopSection">
          <div className="farmerTransactionsPendingComponentMainText">
            <b className="farmerTransactionsPendingComponentMainTextWrapper">       
              <p className="farmerTransactionsPendingComponentBlankLine">{t('farmerTransactionsText1')}</p>
            </b>
          </div>
        </div>    
        <TransactionsNav />

        
        <div className="farmerTransactionsPendingComponentCard">
            <div className="farmerTransactionsPendingComponentSubTitle"><FaFolderOpen />{t('farmerTransactionsText2')}
            </div>
            <br></br>
           <div className = "farmerTransactionsPendingComponentShow">{t('farmerTransactionsText3')}   
           <select className="farmerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="farmerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('farmerTransactionsText4')}>                    
            </input> 
            </div> 
            <br></br>     
    
     

        <div className="farmerTransactionsPendingComponentMiddleSection">
        <div className="farmerTransactionsPendingComponentFrameParent">


            <div className="farmerTransactionsPendingComponentFrameWrapper">
              <a className="farmerTransactionsPendingComponentRectangleParent">
                <img
                  className="farmerTransactionsPendingComponentFrameChild"
                  alt=""
                  src={SitawVector}
                />
                <div className="farmerTransactionsPendingComponentFrameGroup">
                  <div className="farmerTransactionsPendingComponentFrameContainer">
                    <div className="farmerTransactionsPendingComponentSubText1Wrapper">
                      <b className="farmerTransactionsPendingComponentSubText1">{t('farmerTransactionsText5')}</b>
                    </div>
                    <div className="farmerTransactionsPendingComponentSubText2Wrapper2">
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText7')}</b> B001
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText8')}</b> N001
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText11')}</b> 400
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText12')}</b> 2
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText13')}</b> 800
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText14')}</b> Pending
                      </div>
                    </div>
                  </div>
                  <div className="farmerTransactionsPendingComponentFrameItem" />
                  <div className="farmerTransactionsPendingComponentDetails">
                  <button className="farmerTransactionsPendingComponentButton">
                    <FaEdit className="farmerTransactionsPendingComponentButtonIcon" />
                    <div className="farmerTransactionsPendingComponentButtonText">{t('farmerPageButton1')}</div>
                  </button>
                  <button className="farmerTransactionsPendingComponentButton">
                    <FaTrash className="farmerTransactionsPendingComponentButtonIcon" />
                    <div className="farmerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 

              <a className="farmerTransactionsPendingComponentRectangleParent">
                <img
                  className="farmerTransactionsPendingComponentFrameChild"
                  alt=""
                  src={TomatoVector}
                />
                <div className="farmerTransactionsPendingComponentFrameGroup">
                  <div className="farmerTransactionsPendingComponentFrameContainer">
                    <div className="farmerTransactionsPendingComponentSubText1Wrapper">
                      <b className="farmerTransactionsPendingComponentSubText1">{t('farmerTransactionsText6')}</b>
                    </div>
                    <div className="farmerTransactionsPendingComponentSubText2Wrapper2">
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText7')}</b> B002
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText8')}</b> N002
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText9')}</b> Yagerobi Doria
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText11')}</b> 400
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText12')}</b> 2
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText13')}</b> 800
                      </div>
                      <div className="farmerTransactionsPendingComponentSubText2">
                       <b>{t('farmerTransactionsText14')}</b> Pending
                      </div>
                    </div>
                  </div>
                  <div className="farmerTransactionsPendingComponentFrameItem" />
                  <div className="farmerTransactionsPendingComponentDetails">
                  <button className="farmerTransactionsPendingComponentButton">
                    <FaEdit className="farmerTransactionsPendingComponentButtonIcon" />
                    <div className="farmerTransactionsPendingComponentButtonText">{t('farmerPageButton1')}</div>
                  </button>
                  <button className="farmerTransactionsPendingComponentButton">
                    <FaTrash className="farmerTransactionsPendingComponentButtonIcon" />
                    <div className="farmerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 

            </div>
       
          
               


            <div className="farmerTransactionsPendingComponentForumNumber">
              <div className="farmerTransactionsPendingComponentForumContainer">
                <div className="farmerTransactionsPendingComponentForumNumberBox">1</div>
              </div>
              <div className="farmerTransactionsPendingComponentForumContainer">
                <div className="farmerTransactionsPendingComponentForumNumberBox">2</div>
              </div>
              <div className="farmerTransactionsPendingComponentForumContainer">
                <div className="farmerTransactionsPendingComponentForumNumberBox">3</div>
              </div>
              <div className="farmerTransactionsPendingComponentForumContainer">
                <div className="farmerTransactionsPendingComponentForumNumberBox">4</div>
              </div>
              <div className="farmerTransactionsPendingComponentForumContainer">
                <div className="farmerTransactionsPendingComponentForumNumberBox">5</div>
              </div>
              <div className="farmerTransactionsPendingComponentForumContainer">
                <div className="farmerTransactionsPendingComponentForumNumberBox">6</div>
              </div>
            </div>
          </div>
          </div> 
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default FarmerCommunityForumComponent;
