import TransactionsNav from '../components/adminFarmerTransactionsNavigation';
import "../css/Components/adminFarmerTransactionsCancelledComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import SitawVector from '../img/sitaw.png';
import OkraVector from '../img/okra.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminFarmerTransactionsCancelledComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminFarmerTransactionsCancelledComponent">
      <AdminNavigation />
      <div className="adminFarmerTransactionsCancelledComponentMainPanel">
        <div className="adminFarmerTransactionsCancelledComponentTopSection">
          <div className="adminFarmerTransactionsCancelledComponentMainText">
            <b className="adminFarmerTransactionsCancelledComponentMainTextWrapper">
              <p className="adminFarmerTransactionsCancelledComponentBlankLine">&nbsp;</p>
              <p className="adminFarmerTransactionsCancelledComponentBlankLine">{t('Text15')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminFarmerTransactionsCancelledComponentCard">
          <div className="adminFarmerTransactionsCancelledComponentSubTitle">
            <FaFolderOpen /> {t('Text16')}
          </div>
          <br></br>
          <div className="adminFarmerTransactionsCancelledComponentShow">
          {t('Text17')}
            <select className="adminFarmerTransactionsCancelledComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminFarmerTransactionsCancelledComponentRowSelect"
            type = "text"
            placeholder = {t('Text18')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminFarmerTransactionsCancelledComponentMiddleSection">
            <div className="adminFarmerTransactionsCancelledComponentFrameParent">


              <div className="adminFarmerTransactionsCancelledComponentFrameWrapper">
                <a className="adminFarmerTransactionsCancelledComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsCancelledComponentFrameChild"
                    alt=""
                    src={OkraVector}
                  />
                  <div className="adminFarmerTransactionsCancelledComponentFrameGroup">
                    <div className="adminFarmerTransactionsCancelledComponentFrameContainer">
                      <div className="adminFarmerTransactionsCancelledComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsCancelledComponentSubText1">{t('Text26')}</b>
                      </div>
                      <div className="adminFarmerTransactionsCancelledComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('Text23')}</b> Cancelled
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </a>

                <a className="adminFarmerTransactionsCancelledComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsCancelledComponentFrameChild"
                    alt=""
                    src={SitawVector}
                  />
                  <div className="adminFarmerTransactionsCancelledComponentFrameGroup">
                    <div className="adminFarmerTransactionsCancelledComponentFrameContainer">
                      <div className="adminFarmerTransactionsCancelledComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsCancelledComponentSubText1">{t('Text27')}</b>
                      </div>
                      <div className="adminFarmerTransactionsCancelledComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsCancelledComponentSubText2">
                          <b>{t('Text23')}</b> Cancelled
                        </div>
                      </div>
                    </div>                    
                  </div>
                </a>


              </div>
                 
            
            
              <div className="adminFarmerTransactionsCancelledComponentForumNumber">
                <div className="adminFarmerTransactionsCancelledComponentForumContainer">
                  <div className="adminFarmerTransactionsCancelledComponentForumNumberBox">1</div>
                </div>
                <div className="adminFarmerTransactionsCancelledComponentForumContainer">
                  <div className="adminFarmerTransactionsCancelledComponentForumNumberBox">2</div>
                </div>
                <div className="adminFarmerTransactionsCancelledComponentForumContainer">
                  <div className="adminFarmerTransactionsCancelledComponentForumNumberBox">3</div>
                </div>
                <div className="adminFarmerTransactionsCancelledComponentForumContainer">
                  <div className="adminFarmerTransactionsCancelledComponentForumNumberBox">4</div>
                </div>
                <div className="adminFarmerTransactionsCancelledComponentForumContainer">
                  <div className="adminFarmerTransactionsCancelledComponentForumNumberBox">5</div>
                </div>
                <div className="adminFarmerTransactionsCancelledComponentForumContainer">
                  <div className="adminFarmerTransactionsCancelledComponentForumNumberBox">6</div>
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

export default AdminFarmerTransactionsCancelledComponent;
