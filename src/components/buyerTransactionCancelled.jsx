import BuyerTransactionNav from '../components/buyerTransactionNav';
import "../css/BuyerPage/buyerTransactionsCancelledComponent.css";
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';

import pakwan from '../img/pakwan.png';
import {FaEdit, FaTrash,FaFolderOpen} from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const BuyerTransanctionCancelled = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerTransactionsCancelledComponent">
      <BuyerNavigation />
      <div className="buyerTransactionsCancelledComponentMainPanel">
      <BuyerTopNav /> 
      <div className="buyerTransactionsCancelledComponentTopSection">
        <div className="buyerTransactionsCancelledComponentMainText">
          <b className="buyerTransactionsCancelledComponentMainTextWrapper">  
            <p className="buyerTransactionsCancelledComponentBlankLine">{t('buyerTransactionText1')}</p>
          </b>
        </div>
      </div>
        <BuyerTransactionNav/>

        
        <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle"><FaFolderOpen /> {t('buyerTransactionText2')}
            </div>
            <br></br>
           <div className = "buyerTransactionsCancelledComponentShow">{t('buyerTransactionText3')}   
           <select className="buyerTransactionsCancelledComponentRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>     
    
     

        <div className="buyerTransactionMiddleSection">
        <div className="buyerTransactionFrameParent">
        <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={pakwan}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{t('Text19')}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Date: ')}</b> July 2, 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Farmer's Name: </b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Category: </b> Fruit
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Packaging: ')}</b> Sack
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Quantity: </b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Overall Price</b> 10,000
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Status: </b> Cancelled
                        </div>
                      </div>
                    </div>                                    
                  </div>
                </a>             
                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={pakwan}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{t('Text19')}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Date: ')}</b> July 2, 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Farmer's Name: </b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Category: </b> Fruit
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Packaging: ')}</b> Sack
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Quantity: </b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Overall Price</b> 10,000
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>Status: </b> Cancelled
                        </div>
                      </div>
                    </div>                                    
                  </div>
                </a>             
              </div>     


    
            <div className="buyerTransactionForumNumber">
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">1</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">2</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">3</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">4</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">5</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">6</div>
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

export default BuyerTransanctionCancelled;
