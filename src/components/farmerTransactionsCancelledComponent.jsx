import TransactionsNav from '../components/farmerTransactionsNavigation';
import "../css/Components/farmerTransactionsCancelledComponent.css";
import FarmerNavigation from '../components/farmerPageNavigation';
import FarmerTopNav from '../components/farmerTopNav';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import {FaEdit, FaTrash,FaFolderOpen} from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCommunityForumComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerTransactionsCancelledComponent">
      <FarmerNavigation />
      <div className="farmerTransactionsCancelledComponentMainPanel">
        <FarmerTopNav />
        <div className="farmerTransactionsCancelledComponentTopSection">
          <div className="farmerTransactionsCancelledComponentMainText">
            <b className="farmerTransactionsCancelledComponentMainTextWrapper">  
              <p className="farmerTransactionsCancelledComponentBlankLine">{t('farmerTransactionsText1')}</p>
            </b>
          </div>
        </div>    
        <TransactionsNav />

        
        <div className="farmerTransactionsCancelledComponentCard">
            <div className="farmerTransactionsCancelledComponentSubTitle"><FaFolderOpen /> {t('farmerTransactionsText2')}
            </div>
            <br></br>
           <div className = "farmerTransactionsCancelledComponentShow">{t('farmerTransactionsText3')}  
           <select className="farmerTransactionsCancelledComponentRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="farmerTransactionsCancelledComponentRowSelect"
            type = "text"
            placeholder = {t('farmerTransactionsText4')}>                    
            </input> 
            </div> 
            <br></br>     
    
     

        <div className="farmerTransactionsCancelledComponentMiddleSection">
        <div className="farmerTransactionsCancelledComponentFrameParent">


            <div className="farmerTransactionsCancelledComponentFrameWrapper">
              <a className="farmerTransactionsCancelledComponentRectangleParent">
                <img
                  className="farmerTransactionsCancelledComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="farmerTransactionsCancelledComponentFrameGroup">
                  <div className="farmerTransactionsCancelledComponentFrameContainer">
                    <div className="farmerTransactionsCancelledComponentSubText1Wrapper">
                      <b className="farmerTransactionsCancelledComponentSubText1">{t('farmerTransactionsText15')}</b>
                    </div>
                    <div className="farmerTransactionsCancelledComponentSubText2Wrapper2">
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText7')}</b> B005
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText8')}</b> N005
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText9')}</b> Marco Pangilinan
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText11')}</b> 400
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText12')}</b> 2
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText13')}</b> 800
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText14')}</b> Cancelled
                      </div>
                    </div>
                  </div>              
                  <div className="farmerTransactionsCancelledComponentDetails">                 
                </div>         
                </div>
              </a> 

              <a className="farmerTransactionsCancelledComponentRectangleParent">
                <img
                  className="farmerTransactionsCancelledComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="farmerTransactionsCancelledComponentFrameGroup">
                  <div className="farmerTransactionsCancelledComponentFrameContainer">
                    <div className="farmerTransactionsCancelledComponentSubText1Wrapper">
                      <b className="farmerTransactionsCancelledComponentSubText1">{t('farmerTransactionsText15')}</b>
                    </div>
                    <div className="farmerTransactionsCancelledComponentSubText2Wrapper2">
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText7')}</b> B005
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText8')}</b> N005
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText9')}</b> Marco Pangilinan
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText11')}</b> 400
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText12')}</b> 2
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText13')}</b> 800
                      </div>
                      <div className="farmerTransactionsCancelledComponentSubText2">
                       <b>{t('farmerTransactionsText14')}</b> Cancelled
                      </div>
                    </div>
                  </div>              
                  <div className="farmerTransactionsCancelledComponentDetails">                 
                </div>         
                </div>
              </a> 

              
            
            </div>      
               


            <div className="farmerTransactionsCancelledComponentForumNumber">
              <div className="farmerTransactionsCancelledComponentForumContainer">
                <div className="farmerTransactionsCancelledComponentForumNumberBox">1</div>
              </div>
              <div className="farmerTransactionsCancelledComponentForumContainer">
                <div className="farmerTransactionsCancelledComponentForumNumberBox">2</div>
              </div>
              <div className="farmerTransactionsCancelledComponentForumContainer">
                <div className="farmerTransactionsCancelledComponentForumNumberBox">3</div>
              </div>
              <div className="farmerTransactionsCancelledComponentForumContainer">
                <div className="farmerTransactionsCancelledComponentForumNumberBox">4</div>
              </div>
              <div className="farmerTransactionsCancelledComponentForumContainer">
                <div className="farmerTransactionsCancelledComponentForumNumberBox">5</div>
              </div>
              <div className="farmerTransactionsCancelledComponentForumContainer">
                <div className="farmerTransactionsCancelledComponentForumNumberBox">6</div>
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
