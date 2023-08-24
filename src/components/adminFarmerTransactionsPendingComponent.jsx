import TransactionsNav from '../components/adminFarmerTransactionsNavigation';
import "../css/Components/adminFarmerTransactionsPendingComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import RiceVector from '../img/riceCardImage.png';
import CornVector from '../img/cornVector.png';
import SiliVector from '../img/sili.png';
import SquashVector from '../img/squash.png';
import OnionVector from '../img/onionVector.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';

const AdminFarmerTransactionsPendingComponent = () => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminFarmerTransactionsPendingComponent">
      <AdminNavigation />
      <div className="adminFarmerTransactionsPendingComponentMainPanel">
        <div className="adminFarmerTransactionsPendingComponentTopSection">
          <div className="adminFarmerTransactionsPendingComponentMainText">
            <b className="adminFarmerTransactionsPendingComponentMainTextWrapper">
              <p className="adminFarmerTransactionsPendingComponentBlankLine">&nbsp;</p>
              <p className="adminFarmerTransactionsPendingComponentBlankLine">{t('Text15')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminFarmerTransactionsPendingComponentCard">
          <div className="adminFarmerTransactionsPendingComponentSubTitle">
            <FaFolderOpen /> {t('Text16')}
          </div>
          <br></br>
          <div className="adminFarmerTransactionsPendingComponentShow">
          {t('Text17')}
            <select className="adminFarmerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminFarmerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('Text18')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminFarmerTransactionsPendingComponentMiddleSection">
            <div className="adminFarmerTransactionsPendingComponentFrameParent">


              <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={SiliVector}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{t('Text19')}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> F002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Text23')}</b> Pending
                        </div>
                      </div>
                    </div>
                    <div className="adminFarmerTransactionsPendingComponentFrameItem" />
                    <div className="adminFarmerTransactionsPendingComponentDetails">
                    <button className="adminFarmerTransactionsPendingComponentButton">
                        <FaEdit className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>
                      <button className="adminFarmerTransactionsPendingComponentButton">
                        <FaTrash className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>
                  </div>
                </a>

                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={RiceVector}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{t('Text20')}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> F002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Text23')}</b> Pending
                        </div>
                      </div>
                    </div>
                    <div className="adminFarmerTransactionsPendingComponentFrameItem" />
                    <div className="adminFarmerTransactionsPendingComponentDetails">
                    <button className="adminFarmerTransactionsPendingComponentButton">
                        <FaEdit className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>
                      <button className="adminFarmerTransactionsPendingComponentButton">
                        <FaTrash className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>
                  </div>
                </a>

              </div>              

             

              
              <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={SquashVector}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{t('Text21')}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> F002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N002
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Text23')}</b> Pending
                        </div>
                      </div>
                    </div>
                    <div className="adminFarmerTransactionsPendingComponentFrameItem" />
                    <div className="adminFarmerTransactionsPendingComponentDetails">
                    <button className="adminFarmerTransactionsPendingComponentButton">
                        <FaEdit className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>
                      <button className="adminFarmerTransactionsPendingComponentButton">
                        <FaTrash className="adminFarmerTransactionsPendingComponentButtonIcon" />
                        <div className="adminFarmerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>
                  </div>
                </a>

                <a className="adminFarmerTransactionsPendingComponentRectangleParent">                  
                </a>
              </div>              
           

              <div className="adminFarmerTransactionsPendingComponentForumNumber">
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">1</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">2</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">3</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">4</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">5</div>
                </div>
                <div className="adminFarmerTransactionsPendingComponentForumContainer">
                  <div className="adminFarmerTransactionsPendingComponentForumNumberBox">6</div>
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

export default AdminFarmerTransactionsPendingComponent;
