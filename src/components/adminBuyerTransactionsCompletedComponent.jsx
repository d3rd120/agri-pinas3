import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerTransactionsCompletedComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import RiceVector from '../img/riceCardImage.png';
import CornVector from '../img/cornVector.png';
import OnionVector from '../img/onionVector.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminBuyerTransactionsCompletedComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminBuyerTransactionsCompletedComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsCompletedComponentMainPanel">
        <div className="adminBuyerTransactionsCompletedComponentTopSection">
          <div className="adminBuyerTransactionsCompletedComponentMainText">
            <b className="adminBuyerTransactionsCompletedComponentMainTextWrapper">
              <p className="adminBuyerTransactionsCompletedComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsCompletedComponentBlankLine">{t('text183')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminBuyerTransactionsCompletedComponentCard">
          <div className="adminBuyerTransactionsCompletedComponentSubTitle">
            <FaFolderOpen /> {t('text187')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsCompletedComponentShow">
          {t('text188')}
            <select className="adminBuyerTransactionsCompletedComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsCompletedComponentRowSelect"
            type = "text"
            placeholder ={t('text189')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminBuyerTransactionsCompletedComponentMiddleSection">
            <div className="adminBuyerTransactionsCompletedComponentFrameParent">


              <div className="adminBuyerTransactionsCompletedComponentFrameWrapper">
                {/* <a className="adminBuyerTransactionsCompletedComponentRectangleParent">
                  <img
                    className="adminBuyerTransactionsCompletedComponentFrameChild"
                    alt=""
                    src={OnionVector}
                  />
                  <div className="adminBuyerTransactionsCompletedComponentFrameGroup">
                    <div className="adminBuyerTransactionsCompletedComponentFrameContainer">
                      <div className="adminBuyerTransactionsCompletedComponentSubText1Wrapper">
                        <b className="adminBuyerTransactionsCompletedComponentSubText1">{t('Text25')}</b>
                      </div>
                      <div className="adminBuyerTransactionsCompletedComponentSubText2Wrapper2">
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text190')}</b> B001
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text191')}</b> N001
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text192')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text193')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text194')}</b> 400
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text195')}</b> 2
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text196')}</b> 800
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text197')}</b> Arriane Gatpo
                        </div>
                        <div className="adminBuyerTransactionsCompletedComponentSubText2">
                          <b>{t('text198')}</b> Completed
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </a> */}            

              </div>

                
             


              <div className="adminBuyerTransactionsCompletedComponentForumNumber">
                <div className="adminBuyerTransactionsCompletedComponentForumContainer">
                  <div className="adminBuyerTransactionsCompletedComponentForumNumberBox">1</div>
                </div>
                <div className="adminBuyerTransactionsCompletedComponentForumContainer">
                  <div className="adminBuyerTransactionsCompletedComponentForumNumberBox">2</div>
                </div>
                <div className="adminBuyerTransactionsCompletedComponentForumContainer">
                  <div className="adminBuyerTransactionsCompletedComponentForumNumberBox">3</div>
                </div>
                <div className="adminBuyerTransactionsCompletedComponentForumContainer">
                  <div className="adminBuyerTransactionsCompletedComponentForumNumberBox">4</div>
                </div>
                <div className="adminBuyerTransactionsCompletedComponentForumContainer">
                  <div className="adminBuyerTransactionsCompletedComponentForumNumberBox">5</div>
                </div>
                <div className="adminBuyerTransactionsCompletedComponentForumContainer">
                  <div className="adminBuyerTransactionsCompletedComponentForumNumberBox">6</div>
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

export default AdminBuyerTransactionsCompletedComponent;
