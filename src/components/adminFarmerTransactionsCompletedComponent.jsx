import TransactionsNav from '../components/adminFarmerTransactionsNavigation';
import "../css/Components/adminFarmerTransactionsCompletedComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminFarmerTransactionsCompletedComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminFarmerTransactionsCompletedComponent">
      <AdminNavigation />
      <div className="adminFarmerTransactionsCompletedComponentMainPanel">
        <div className="adminFarmerTransactionsCompletedComponentTopSection">
          <div className="adminFarmerTransactionsCompletedComponentMainText">
            <b className="adminFarmerTransactionsCompletedComponentMainTextWrapper">
              <p className="adminFarmerTransactionsCompletedComponentBlankLine">&nbsp;</p>
              <p className="adminFarmerTransactionsCompletedComponentBlankLine">{t('Text15')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminFarmerTransactionsCompletedComponentCard">
          <div className="adminFarmerTransactionsCompletedComponentSubTitle">
            <FaFolderOpen /> {t('Text16')}
          </div>
          <br></br>
          <div className="adminFarmerTransactionsCompletedComponentShow">
          {t('Text17')}
            <select className="adminFarmerTransactionsCompletedComponentRowSelect" onChange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminFarmerTransactionsCompletedComponentRowSelect"
            type = "text"
            placeholder = {t('Text18')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminFarmerTransactionsCompletedComponentMiddleSection">
            <div className="adminFarmerTransactionsCompletedComponentFrameParent">


              <div className="adminFarmerTransactionsCompletedComponentFrameWrapper">
                <a className="adminFarmerTransactionsCompletedComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsCompletedComponentFrameChild"
                    alt=""
                    src={CornVector}
                  />
                  <div className="adminFarmerTransactionsCompletedComponentFrameGroup">
                    <div className="adminFarmerTransactionsCompletedComponentFrameContainer">
                      <div className="adminFarmerTransactionsCompletedComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsCompletedComponentSubText1">{t('Text24')}</b>
                      </div>
                      <div className="adminFarmerTransactionsCompletedComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('Text23')}</b> Completed
                        </div>
                      </div>
                    </div>
                 
                  </div>
                </a>

                <a className="adminFarmerTransactionsCompletedComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsCompletedComponentFrameChild"
                    alt=""
                    src={OnionVector}
                  />
                  <div className="adminFarmerTransactionsCompletedComponentFrameGroup">
                    <div className="adminFarmerTransactionsCompletedComponentFrameContainer">
                      <div className="adminFarmerTransactionsCompletedComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsCompletedComponentSubText1">{t('Text25')}</b>
                      </div>
                      <div className="adminFarmerTransactionsCompletedComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminFarmerTransactionsCompletedComponentSubText2">
                          <b>{t('Text23')}</b> Completed
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </a>

              </div>


               
              


              <div className="adminFarmerTransactionsCompletedComponentForumNumber">
                <div className="adminFarmerTransactionsCompletedComponentForumContainer">
                  <div className="adminFarmerTransactionsCompletedComponentForumNumberBox">1</div>
                </div>
                <div className="adminFarmerTransactionsCompletedComponentForumContainer">
                  <div className="adminFarmerTransactionsCompletedComponentForumNumberBox">2</div>
                </div>
                <div className="adminFarmerTransactionsCompletedComponentForumContainer">
                  <div className="adminFarmerTransactionsCompletedComponentForumNumberBox">3</div>
                </div>
                <div className="adminFarmerTransactionsCompletedComponentForumContainer">
                  <div className="adminFarmerTransactionsCompletedComponentForumNumberBox">4</div>
                </div>
                <div className="adminFarmerTransactionsCompletedComponentForumContainer">
                  <div className="adminFarmerTransactionsCompletedComponentForumNumberBox">5</div>
                </div>
                <div className="adminFarmerTransactionsCompletedComponentForumContainer">
                  <div className="adminFarmerTransactionsCompletedComponentForumNumberBox">6</div>
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

export default AdminFarmerTransactionsCompletedComponent;
