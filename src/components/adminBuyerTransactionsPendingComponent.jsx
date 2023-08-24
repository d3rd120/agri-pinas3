import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerPendingTransactionsComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import OkraVector from '../img/okra.png';
import SitawVector from '../img/sitaw.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminBuyerTransactionsPendingComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminBuyerTransactionsPendingComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsPendingComponentMainPanel">
        <div className="adminBuyerTransactionsPendingComponentTopSection">
          <div className="adminBuyerTransactionsPendingComponentMainText">
            <b className="adminBuyerTransactionsPendingComponentMainTextWrapper">
              <p className="adminBuyerTransactionsPendingComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsPendingComponentBlankLine">{t('Text15')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminBuyerTransactionsPendingComponentCard">
          <div className="adminBuyerTransactionsPendingComponentSubTitle">
            <FaFolderOpen /> {t('Text28')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsPendingComponentShow">
          {t('Text17')}
            <select className="adminBuyerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('Text18')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminBuyerTransactionsPendingComponentMiddleSection">
            <div className="adminBuyerTransactionsPendingComponentFrameParent">


              <div className="adminBuyerTransactionsPendingComponentFrameWrapper">
                <a className="adminBuyerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminBuyerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={OkraVector}
                  />
                  <div className="adminBuyerTransactionsPendingComponentFrameGroup">
                    <div className="adminBuyerTransactionsPendingComponentFrameContainer">
                      <div className="adminBuyerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminBuyerTransactionsPendingComponentSubText1">{t('Text26')}</b>
                      </div>
                      <div className="adminBuyerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText10')}:</b> 02 / 01 / 2023
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('Text23')}</b> Pending
                        </div>
                      </div>
                    </div>
                    <div className="adminBuyerTransactionsPendingComponentFrameItem" />
                    <div className="adminBuyerTransactionsPendingComponentDetails">
                    <button className="adminBuyerTransactionsPendingComponentButton">
                        <FaEdit className="adminBuyerTransactionsPendingComponentButtonIcon" />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>
                      <button className="adminBuyerTransactionsPendingComponentButton">
                        <FaTrash className="adminBuyerTransactionsPendingComponentButtonIcon" />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>
                  </div>
                </a>

                <a className="adminBuyerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminBuyerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={SitawVector}
                  />
                  <div className="adminBuyerTransactionsPendingComponentFrameGroup">
                    <div className="adminBuyerTransactionsPendingComponentFrameContainer">
                      <div className="adminBuyerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminBuyerTransactionsPendingComponentSubText1">{t('Text27')}</b>
                      </div>
                      <div className="adminBuyerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText10')}:</b> 02 / 01 / 2023
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminBuyerTransactionsPendingComponentSubText2">
                          <b>{t('Text23')}</b> Pending
                        </div>                     
                      </div>
                    </div>
                    <div className="adminBuyerTransactionsPendingComponentFrameItem" />
                    <div className="adminBuyerTransactionsPendingComponentDetails">
                    <button className="adminBuyerTransactionsPendingComponentButton">
                        <FaEdit className="adminBuyerTransactionsPendingComponentButtonIcon" />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>
                      <button className="adminBuyerTransactionsPendingComponentButton">
                        <FaTrash className="adminBuyerTransactionsPendingComponentButtonIcon" />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>
                  </div>
                </a>


              </div>

           



              <div className="adminBuyerTransactionsPendingComponentForumNumber">
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">1</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">2</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">3</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">4</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">5</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">6</div>
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

export default AdminBuyerTransactionsPendingComponent;
