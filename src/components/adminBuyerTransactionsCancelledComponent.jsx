import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerTransactionsCancelledComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import RiceVector from '../img/riceCardImage.png';
import SiliVector from '../img/sili.png';
import SquashVector from '../img/squash.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminBuyerTransactionsCancelledComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
    <div className="adminBuyerTransactionsCancelledComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsCancelledComponentMainPanel">
        <div className="adminBuyerTransactionsCancelledComponentTopSection">
          <div className="adminBuyerTransactionsCancelledComponentMainText">
            <b className="adminBuyerTransactionsCancelledComponentMainTextWrapper">
              <p className="adminBuyerTransactionsCancelledComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsCancelledComponentBlankLine">{t('Text15')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminBuyerTransactionsCancelledComponentCard">
          <div className="adminBuyerTransactionsCancelledComponentSubTitle">
            <FaFolderOpen /> {t('Text28')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsCancelledComponentShow">
          {t('Text17')}
            <select className="adminBuyerTransactionsCancelledComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsCancelledComponentRowSelect"
            type = "text"
            placeholder =   {t('Text18')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminBuyerTransactionsCancelledComponentMiddleSection">
            <div className="adminBuyerTransactionsCancelledComponentFrameParent">


              <div className="adminBuyerTransactionsCancelledComponentFrameWrapper">
                <a className="adminBuyerTransactionsCancelledComponentRectangleParent">
                  <img
                    className="adminBuyerTransactionsCancelledComponentFrameChild"
                    alt=""
                    src={SiliVector}
                  />
                  <div className="adminBuyerTransactionsCancelledComponentFrameGroup">
                    <div className="adminBuyerTransactionsCancelledComponentFrameContainer">
                      <div className="adminBuyerTransactionsCancelledComponentSubText1Wrapper">
                        <b className="adminBuyerTransactionsCancelledComponentSubText1">  {t('Text30')}</b>
                      </div>
                      <div className="adminBuyerTransactionsCancelledComponentSubText2Wrapper2">
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('Text23')}</b> Cancelled
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </a>

                <a className="adminBuyerTransactionsCancelledComponentRectangleParent">
                  <img
                    className="adminBuyerTransactionsCancelledComponentFrameChild"
                    alt=""
                    src={SquashVector}
                  />
                  <div className="adminBuyerTransactionsCancelledComponentFrameGroup">
                    <div className="adminBuyerTransactionsCancelledComponentFrameContainer">
                      <div className="adminBuyerTransactionsCancelledComponentSubText1Wrapper">
                        <b className="adminBuyerTransactionsCancelledComponentSubText1">  {t('Text31')}</b>
                      </div>
                      <div className="adminBuyerTransactionsCancelledComponentSubText2Wrapper2">
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B001
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N001
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Ryan Edward Amador
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('Text22')}</b> Arriane Gatpo
                        </div>
                        <div className="adminBuyerTransactionsCancelledComponentSubText2">
                          <b>{t('Text23')}</b> Cancelled
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </a>


              </div>



              <div className="adminBuyerTransactionsCancelledComponentForumNumber">
                <div className="adminBuyerTransactionsCancelledComponentForumContainer">
                  <div className="adminBuyerTransactionsCancelledComponentForumNumberBox">1</div>
                </div>
                <div className="adminBuyerTransactionsCancelledComponentForumContainer">
                  <div className="adminBuyerTransactionsCancelledComponentForumNumberBox">2</div>
                </div>
                <div className="adminBuyerTransactionsCancelledComponentForumContainer">
                  <div className="adminBuyerTransactionsCancelledComponentForumNumberBox">3</div>
                </div>
                <div className="adminBuyerTransactionsCancelledComponentForumContainer">
                  <div className="adminBuyerTransactionsCancelledComponentForumNumberBox">4</div>
                </div>
                <div className="adminBuyerTransactionsCancelledComponentForumContainer">
                  <div className="adminBuyerTransactionsCancelledComponentForumNumberBox">5</div>
                </div>
                <div className="adminBuyerTransactionsCancelledComponentForumContainer">
                  <div className="adminBuyerTransactionsCancelledComponentForumNumberBox">6</div>
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

export default AdminBuyerTransactionsCancelledComponent;
