
import "../css/Components/adminCommunityForumComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import RiceVector from '../img/riceCardImage.png';
import CornVector from '../img/cornVector.png';
import SiliVector from '../img/sili.png';
import OnionVector from '../img/onionVector.png';
import SquashVector from '../img/squash.png';
import TomatoVector from '../img/tomatoVector.png';
import { FaTrash, FaComments, FaEdit } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminCommunityForumComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminCommunityForumComponent">
      <AdminNavigation />
      <div className="adminCommunityForumComponentMainPanel">   
        <div className="adminCommunityForumComponentTopSection">
          <div className="adminCommunityForumComponentMainText">
            <b className="adminCommunityForumComponentMainTextWrapper">       
            <p className="adminCommunityForumComponentBlankLine">&nbsp;</p>
              <p className="adminCommunityForumComponentBlankLine">{t('Text1')}</p>
            </b>
          </div>
        </div>    
    
        
        <div className="adminCommunityForumComponentCard">
            <div className="adminCommunityForumComponentSubTitle"><FaComments /> {t('Text2')}
            </div>
            <br></br>
           <div className="adminCommunityForumComponentShow">{t('Text3')}   
           <select className="adminCommunityForumComponentRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="adminCommunityForumComponentRowSelect"
            type = "text"
            placeholder = {t('Text4')}>                    
            </input>
            </div> 
            <br></br>     
    
     

        <div className="adminCommunityForumComponentMiddleSection">
        <div className="adminCommunityForumComponentFrameParent">


            <div className="adminCommunityForumComponentFrameWrapper">
              <a className="adminCommunityForumComponentRectangleParent">
                <img
                  className="adminCommunityForumComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="adminCommunityForumComponentFrameGroup">
                  <div className="adminCommunityForumComponentFrameContainer">
                    <div className="adminCommunityForumComponentSubText1Wrapper">
                      <b className="adminCommunityForumComponentSubText1">{t('Text5')}</b>
                    </div>
                    <div className="adminCommunityForumComponentSubText2Wrapper2">
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text9')}</b> B001
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text10')}</b> Buyer
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text11')}</b> Jenkins Mesina
                      </div>                           
                    </div>
                  </div>
                  <div className="adminCommunityForumComponentFrameItem" />
                  <div className="adminCommunityForumComponentDetails">      
                  <button className="adminCommunityForumComponentButton">
                    <FaEdit className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton13')}</div>
                  </button>          
                  <button className="adminCommunityForumComponentButton">
                    <FaTrash className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 

              <a className="adminCommunityForumComponentRectangleParent">
                <img
                  className="adminCommunityForumComponentFrameChild"
                  alt=""
                  src={SquashVector}
                />
                <div className="adminCommunityForumComponentFrameGroup">
                  <div className="adminCommunityForumComponentFrameContainer">
                    <div className="adminCommunityForumComponentSubText1Wrapper">
                      <b className="adminCommunityForumComponentSubText1">{t('Text6')}</b>
                    </div>
                    <div className="adminCommunityForumComponentSubText2Wrapper2">
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text9')}</b> B001
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text10')}</b> Buyer
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text11')}</b> Jenkins Mesina
                      </div>                           
                    </div>
                  </div>
                  <div className="adminCommunityForumComponentFrameItem" />
                  <div className="adminCommunityForumComponentDetails">      
                  <button className="adminCommunityForumComponentButton">
                    <FaEdit className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton13')}</div>
                  </button>          
                  <button className="adminCommunityForumComponentButton">
                    <FaTrash className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 


            </div>  

            <div className="adminCommunityForumComponentFrameWrapper">
              <a className="adminCommunityForumComponentRectangleParent">
                <img
                  className="adminCommunityForumComponentFrameChild"
                  alt=""
                  src={CornVector}
                />
                <div className="adminCommunityForumComponentFrameGroup">
                  <div className="adminCommunityForumComponentFrameContainer">
                    <div className="adminCommunityForumComponentSubText1Wrapper">
                      <b className="adminCommunityForumComponentSubText1">{t('Text7')}</b>
                    </div>
                    <div className="adminCommunityForumComponentSubText2Wrapper2">
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text9')}</b> B001
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text10')}</b> Buyer
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text11')}</b> Jenkins Mesina
                      </div>                           
                    </div>
                  </div>
                  <div className="adminCommunityForumComponentFrameItem" />
                  <div className="adminCommunityForumComponentDetails">      
                  <button className="adminCommunityForumComponentButton">
                    <FaEdit className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton13')}</div>
                  </button>          
                  <button className="adminCommunityForumComponentButton">
                    <FaTrash className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 

              <a className="adminCommunityForumComponentRectangleParent">
                <img
                  className="adminCommunityForumComponentFrameChild"
                  alt=""
                  src={RiceVector}
                />
                <div className="adminCommunityForumComponentFrameGroup">
                  <div className="adminCommunityForumComponentFrameContainer">
                    <div className="adminCommunityForumComponentSubText1Wrapper">
                      <b className="adminCommunityForumComponentSubText1">{t('Text8')}</b>
                    </div>
                    <div className="adminCommunityForumComponentSubText2Wrapper2">
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text9')}</b> B001
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text10')}</b> Buyer
                      </div>
                      <div className="adminCommunityForumComponentSubText2">
                       <b>{t('Text11')}</b> Jenkins Mesina
                      </div>                           
                    </div>
                  </div>
                  <div className="adminCommunityForumComponentFrameItem" />
                  <div className="adminCommunityForumComponentDetails">      
                  <button className="adminCommunityForumComponentButton">
                    <FaEdit className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton13')}</div>
                  </button>          
                  <button className="adminCommunityForumComponentButton">
                    <FaTrash className="adminCommunityForumComponentButtonIcon" />
                    <div className="adminCommunityForumComponentButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 
            </div>                

            
         
            <div className="adminCommunityForumComponentForumNumber">
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">1</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">2</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">3</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">4</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">5</div>
              </div>
              <div className="adminCommunityForumComponentForumContainer">
                <div className="adminCommunityForumComponentForumNumberBox">6</div>
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

export default AdminCommunityForumComponent;
