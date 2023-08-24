import TransactionsNav from '../components/farmerTransactionsNavigation';
import "../css/Components/farmerTransactionsCompletedComponent.css";
import FarmerNavigation from '../components/farmerPageNavigation';
import FarmerTopNav from '../components/farmerTopNav';
import SquashVector from '../img/squash.png';
import CornVector from '../img/cornVector.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCommunityForumComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerTransactionsCompletedComponent">
      <FarmerNavigation />
      <div className="farmerTransactionsCompletedComponentMainPanel">
        <FarmerTopNav />
        <div className="farmerTransactionsCompletedComponentTopSection">
          <div className="farmerTransactionsCompletedComponentMainText">
            <b className="farmerTransactionsCompletedComponentMainTextWrapper">   
              <p className="farmerTransactionsCompletedComponentBlankLine">{t('farmerTransactionsText1')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="farmerTransactionsCompletedComponentCard">
          <div className="farmerTransactionsCompletedComponentSubTitle"><FaFolderOpen /> {t('farmerTransactionsText2')}</div>
          <br></br>
          <div className="farmerTransactionsCompletedComponentShow">{t('farmerTransactionsText3')}
            <select className="farmerTransactionsCompletedComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="farmerTransactionsCompletedComponentRowSelect"
            type = "text"
            placeholder ={t('farmerTransactionsText4')}>                    
            </input> 
          </div>
          <br></br>

          <div className="farmerTransactionsCompletedComponentMiddleSection">
            <div className="farmerTransactionsCompletedComponentFrameParent">

              <div className="farmerTransactionsCompletedComponentFrameWrapper">
                <a className="farmerTransactionsCompletedComponentRectangleParent">
                  <img
                    className="farmerTransactionsCompletedComponentFrameChild"
                    alt=""
                    src={SquashVector}
                  />
                  <div className="farmerTransactionsCompletedComponentFrameGroup">
                    <div className="farmerTransactionsCompletedComponentFrameContainer">
                      <div className="farmerTransactionsCompletedComponentSubText1Wrapper">
                        <b className="farmerTransactionsCompletedComponentSubText1">{t('farmerTransactionsText16')}</b>
                      </div>
                      <div className="farmerTransactionsCompletedComponentSubText2Wrapper2">
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B006
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N006
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Marievic Anes
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText14')}</b> Completed
                      </div>
                      </div>
                     
                    </div>
                  </div>
                </a>

                <a className="farmerTransactionsCompletedComponentRectangleParent">
                  <img
                    className="farmerTransactionsCompletedComponentFrameChild"
                    alt=""
                    src={CornVector}
                  />
                  <div className="farmerTransactionsCompletedComponentFrameGroup">
                    <div className="farmerTransactionsCompletedComponentFrameContainer">
                      <div className="farmerTransactionsCompletedComponentSubText1Wrapper">
                        <b className="farmerTransactionsCompletedComponentSubText1">{t('farmerTransactionsText17')}</b>
                      </div>
                      <div className="farmerTransactionsCompletedComponentSubText2Wrapper2">
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText7')}</b> B007
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText8')}</b> N007
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText9')}</b> Jenkins Mesina
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText10')}</b> 02 / 01 / 2023
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText11')}</b> 400
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText12')}</b> 2
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText13')}</b> 800
                      </div>
                        <div className="farmerTransactionsCompletedComponentSubText2">
                          <b>{t('farmerTransactionsText14')}</b> Completed
                      </div>
                      </div>
                     
                    </div>
                  </div>
                </a>
              </div>
             

              <div className="farmerTransactionsCompletedComponentForumNumber">
                <div className="farmerTransactionsCompletedComponentForumContainer">
                  <div className="farmerTransactionsCompletedComponentForumNumberBox">1</div>
                </div>
                <div className="farmerTransactionsCompletedComponentForumContainer">
                  <div className="farmerTransactionsCompletedComponentForumNumberBox">2</div>
                </div>
                <div className="farmerTransactionsCompletedComponentForumContainer">
                  <div className="farmerTransactionsCompletedComponentForumNumberBox">3</div>
                </div>
                <div className="farmerTransactionsCompletedComponentForumContainer">
                  <div className="farmerTransactionsCompletedComponentForumNumberBox">4</div>
                </div>
                <div className="farmerTransactionsCompletedComponentForumContainer">
                  <div className="farmerTransactionsCompletedComponentForumNumberBox">5</div>
                </div>
                <div className="farmerTransactionsCompletedComponentForumContainer">
                  <div className="farmerTransactionsCompletedComponentForumNumberBox">6</div>
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
