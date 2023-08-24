import "../css/Components/farmerCropTrackerComponentHarvest.css";
import FarmerNavigation from '../components/farmerPageNavigation';
import FarmerTopNav from '../components/farmerTopNav';
import CropTrackerNav from '../components/farmerCropTrackerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import SitawVector from '../img/sitaw.png';
import SquashVector from '../img/squash.png';
import SiliVector from '../img/sili.png';
import {FaEdit, FaTrash,FaFolderOpen,FaHandHoldingMedical, FaPlus, FaTimes} from 'react-icons/fa';
import FarmerCropTrackerAdd from '../components/farmerCropTrackerComponentAdd';
import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCommunityForumComponent = () => {
  const { t } = useTranslation();


  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

 
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerCropTrackerComponentHarvest">
      <FarmerNavigation />
      <div className="farmerCropTrackerComponentHarvestMainPanel">
        <FarmerTopNav />
        <div className="farmerCropTrackerComponentHarvestTopSection">
          <div className="farmerCropTrackerComponentHarvestMainText">
            <b className="farmerCropTrackerComponentHarvestMainTextWrapper">          
              <p className="farmerCropTrackerComponentHarvestBlankLine">{t('farmerCropTrackerText1')}</p>
            </b>
          </div>
        </div>    
          
        <CropTrackerNav />
      

        {showPopup && (
          <div id="farmerCropTrackerComponentPopupWindow" className="farmerCropTrackerComponentPopupWindow">
            <div className="farmerCropTrackerComponentPopupContent">      
              <span className="farmerCropTrackerComponentCloseButton" onClick={closePopup}><FaTimes/></span>          
              <FarmerCropTrackerAdd/>                     
            </div>
          </div>
        )}



        
        <div className="farmerCropTrackerComponentHarvestCard">
            <div className="farmerCropTrackerComponentHarvestSubTitle"><FaFolderOpen /> {t('farmerCropTrackerText2')}
            </div>
            <br></br>
           <div className = "farmerCropTrackerComponentHarvestShow">{t('farmerCropTrackerText3')}   
           <select className="farmerCropTrackerComponentHarvestRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            <input 
            className="farmerCropTrackerComponentHarvestRowSelect"
            type = "text"
            placeholder = {t('farmerCropTrackerText4')}>                    
            </input>    
            <button className="farmerCropTrackerComponentHarvestRowSelect2" onClick={handleButtonClick}>         
          <div className="farmerCropTrackerComponentButtonText1">{t('farmerPageButton10')}</div>
           </button>     
            
            </div> 
            <br></br>     
    
     

        <div className="farmerCropTrackerComponentHarvestMiddleSection">
        <div className="farmerCropTrackerComponentHarvestFrameParent">


            <div className="farmerCropTrackerComponentHarvestFrameWrapper">
              <a className="farmerCropTrackerComponentHarvestRectangleParent">
               
                <div className="farmerCropTrackerComponentHarvestFrameGroup">
                  <div className="farmerCropTrackerComponentHarvestFrameContainer">
                    <div className="farmerCropTrackerComponentHarvestSubText1Wrapper">
                      <b className="farmerCropTrackerComponentHarvestSubText1">{t('farmerCropTrackerText5')}</b>
                    </div>
                    <div className="farmerCropTrackerComponentHarvestSubText2Wrapper2">                     
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText8')}</b> 01 / 03 / 2023
                      </div>
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText9')}</b> 02 / 05 / 2023
                      </div>
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText10')}</b> Ready to Harvest
                      </div>
                    </div>
                  </div>
                  <div className="farmerCropTrackerComponentHarvestFrameItem" />
                  <div className="farmerCropTrackerComponentHarvestDetails">
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaHandHoldingMedical className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton11')}</div>
                  </button>
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaEdit className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton1')}</div>
                  </button>
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaTrash className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 
              <a className="farmerCropTrackerComponentHarvestRectangleParent">
                
                <div className="farmerCropTrackerComponentHarvestFrameGroup">
                  <div className="farmerCropTrackerComponentHarvestFrameContainer">
                    <div className="farmerCropTrackerComponentHarvestSubText1Wrapper">
                      <b className="farmerCropTrackerComponentHarvestSubText1">{t('farmerCropTrackerText6')}</b>
                    </div>
                    <div className="farmerCropTrackerComponentHarvestSubText2Wrapper2">
                    <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText8')}</b> 02 / 05 / 2023
                      </div>
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText9')}</b> 05 / 02 / 2023
                      </div>
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText10')}</b> Delayed
                      </div>
                    </div>
                  </div>
                  <div className="farmerCropTrackerComponentHarvestFrameItem" />
                  <div className="farmerCropTrackerComponentHarvestDetails">
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaHandHoldingMedical className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton11')}</div>
                  </button>
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaEdit className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton1')}</div>
                  </button>
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaTrash className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a>  
            </div>
           

            <div className="farmerCropTrackerComponentHarvestFrameWrapper">
              <a className="farmerCropTrackerComponentHarvestRectangleParent">
               
                <div className="farmerCropTrackerComponentHarvestFrameGroup">
                  <div className="farmerCropTrackerComponentHarvestFrameContainer">
                    <div className="farmerCropTrackerComponentHarvestSubText1Wrapper">
                      <b className="farmerCropTrackerComponentHarvestSubText1">{t('farmerCropTrackerText7')}</b>
                    </div>
                    <div className="farmerCropTrackerComponentHarvestSubText2Wrapper2">
                    <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText8')}</b> 02 / 05 / 2023
                      </div>
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText9')}</b> 05 / 02 / 2023
                      </div>
                      <div className="farmerCropTrackerComponentHarvestSubText2">
                       <b>{t('farmerCropTrackerText10')}</b> Delayed
                      </div>
                    </div>
                  </div>
                  <div className="farmerCropTrackerComponentHarvestFrameItem" />
                  <div className="farmerCropTrackerComponentHarvestDetails">
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaHandHoldingMedical className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton11')}</div>
                  </button>
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaEdit className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton1')}</div>
                  </button>
                  <button className="farmerCropTrackerComponentHarvestButton">
                    <FaTrash className="farmerCropTrackerComponentHarvestButtonIcon" />
                    <div className="farmerCropTrackerComponentHarvestButtonText">{t('farmerPageButton2')}</div>
                  </button>
                </div>         
                </div>
              </a> 
              <a className="farmerCropTrackerComponentHarvestRectangleParent">              
                
              </a>  
            </div>          
           

            <div className="farmerCropTrackerComponentHarvestForumNumber">
              <div className="farmerCropTrackerComponentHarvestForumContainer">
                <div className="farmerCropTrackerComponentHarvestForumNumberBox">1</div>
              </div>
              <div className="farmerCropTrackerComponentHarvestForumContainer">
                <div className="farmerCropTrackerComponentHarvestForumNumberBox">2</div>
              </div>
              <div className="farmerCropTrackerComponentHarvestForumContainer">
                <div className="farmerCropTrackerComponentHarvestForumNumberBox">3</div>
              </div>
              <div className="farmerCropTrackerComponentHarvestForumContainer">
                <div className="farmerCropTrackerComponentHarvestForumNumberBox">4</div>
              </div>
              <div className="farmerCropTrackerComponentHarvestForumContainer">
                <div className="farmerCropTrackerComponentHarvestForumNumberBox">5</div>
              </div>
              <div className="farmerCropTrackerComponentHarvestForumContainer">
                <div className="farmerCropTrackerComponentHarvestForumNumberBox">6</div>
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
