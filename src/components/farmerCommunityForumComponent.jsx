import "../css/Components/farmerCommunityForumComponent.css";
import FarmerNavigation from './farmerPageNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import SquashVector from '../img/squash.png';
import SiliVector from '../img/sili.png';
import TomatoVector from '../img/tomatoVector.png';
import ProfileVector1 from '../img/profileVector1.png';
import ProfileVector2 from '../img/profileVector2.png';
import {Link} from 'react-router-dom';
import { FaEdit, FaTimes } from 'react-icons/fa';
import React, { useState } from 'react';
import FarmerCommunityForumComponentAddPost from '../components/farmerCommunityForumComponentAddPost';
import FarmerTopNav from '../components/farmerTopNav';
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
    <div className="farmerCommunityForumComponent">
     <FarmerNavigation />
      <div className="farmerCommunityForumComponentMainPanel">
        <FarmerTopNav />
        <div className="farmerCommunityForumComponentTopSection">
          <div className="farmerCommunityForumComponentMainText1">
            <b className="farmerCommunityForumComponentMainText2">    
              <p className="farmerCommunityForumComponentBlankLine">{t('farmerCommunityText1')}</p>
            </b>
          </div>
        </div>


        <button className="farmerCommunityForumComponentButton1" onClick={handleButtonClick}>
          <FaEdit className="farmerCommunityForumComponentButtonIcon1" />
          <div className="farmerCommunityForumComponentButtonText1">{t('farmerPageButton7')}</div>
        </button>


        {showPopup && (
           <div id="farmerCommunityForumComponentPopupWindow" className="farmerCommunityForumComponentPopupWindow">
           <div className="farmerCommunityForumComponentPopupContent">      
           <span className="farmerCommunityForumComponentCloseButton" onClick={closePopup}><FaTimes/></span>          
             <FarmerCommunityForumComponentAddPost/>                     
           </div>
         </div>
        )}


        <div className="farmerCommunityForumComponentMiddleSection">
          <div className="farmerCommunityForumComponentFrameParent">

            <div className="farmerCommunityForumComponentFrameWrapper">

              <Link className="farmerCommunityForumComponentRectangleParent"  to = '/farmercommunityforumpost'>
                <img
                  className="farmerCommunityForumComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="farmerCommunityForumComponentFrameGroup">
                  <div className="farmerCommunityForumComponentFrameContainer">

                    <div className="farmerCommunityForumComponentSubText1Wrapper">
                      <b className="farmerCommunityForumComponentSubText1">{t('farmerCommunityText2')}</b>
                    </div>
                    <div className="farmerCommunityForumComponentSubText2Wrapper2">
                      <div className="farmerCommunityForumComponentSubText2">
                      {t('farmerCommunityText3')}
                      </div>
                    </div>
                  </div>
                  <div className="farmerCommunityForumComponentFrameItem" />
                  <div className="farmerCommunityForumComponentFrameAuthor">
                    <img className="farmerCommunityForumComponentFrameIcon" alt="" src={ProfileVector1} />
                    <div className="farmerCommunityForumComponentAuthorText">
                      <div className="farmerCommunityForumComponentAuthorName">Ryan Amador</div>
                      <div className="farmerCommunityForumComponentPostTime">Just now</div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link className="farmerCommunityForumComponentRectangleParent" to = '/farmercommunityforumpost'>
                <img
                  className="farmerCommunityForumComponentFrameChild"
                  alt=""
                  src={CornVector}
                />
                <div className="farmerCommunityForumComponentFrameGroup">
                  <div className="farmerCommunityForumComponentFrameContainer">
                    <div className="farmerCommunityForumComponentSubText1Wrapper">
                      <b className="farmerCommunityForumComponentSubText1"> {t('farmerCommunityText4')}</b>
                    </div>
                    <div className="farmerCommunityForumComponentSubText2Wrapper2">
                      <div className="farmerCommunityForumComponentSubText2">
                      {t('farmerCommunityText5')}
                      </div>
                    </div>
                  </div>
                  <div className="farmerCommunityForumComponentFrameItem" />
                  <div className="farmerCommunityForumComponentFrameAuthor">
                    <img className="farmerCommunityForumComponentFrameIcon" alt="" src={ProfileVector2} />
                    <div className="farmerCommunityForumComponentAuthorText">
                      <div className="farmerCommunityForumComponentAuthorName">Marievic Anes</div>
                      <div className="farmerCommunityForumComponentPostTime">2hrs ago</div>
                    </div>
                  </div>
                </div>
              </Link>              
            </div>


            <div className="farmerCommunityForumComponentFrameWrapper">

            <Link className="farmerCommunityForumComponentRectangleParent"  to = '/farmercommunityforumpost'>
              <img
                className="farmerCommunityForumComponentFrameChild"
                alt=""
                src={RiceVector}
              />
              <div className="farmerCommunityForumComponentFrameGroup">
                <div className="farmerCommunityForumComponentFrameContainer">

                  <div className="farmerCommunityForumComponentSubText1Wrapper">
                    <b className="farmerCommunityForumComponentSubText1"> {t('farmerCommunityText6')}</b>
                  </div>
                  <div className="farmerCommunityForumComponentSubText2Wrapper2">
                    <div className="farmerCommunityForumComponentSubText2">
                    {t('farmerCommunityText7')}
                    </div>
                  </div>
                </div>
                <div className="farmerCommunityForumComponentFrameItem" />
                <div className="farmerCommunityForumComponentFrameAuthor">
                  <img className="farmerCommunityForumComponentFrameIcon" alt="" src={ProfileVector1} />
                  <div className="farmerCommunityForumComponentAuthorText">
                    <div className="farmerCommunityForumComponentAuthorName">Jenkins Mesina</div>
                    <div className="farmerCommunityForumComponentPostTime">5hrs ago</div>
                  </div>
                </div>
              </div>
            </Link>

            <Link className="farmerCommunityForumComponentRectangleParent" to = '/farmercommunityforumpost'>
              <img
                className="farmerCommunityForumComponentFrameChild"
                alt=""
                src={SquashVector}
              />
              <div className="farmerCommunityForumComponentFrameGroup">
                <div className="farmerCommunityForumComponentFrameContainer">
                  <div className="farmerCommunityForumComponentSubText1Wrapper">
                    <b className="farmerCommunityForumComponentSubText1"> {t('farmerCommunityText8')}</b>
                  </div>
                  <div className="farmerCommunityForumComponentSubText2Wrapper2">
                    <div className="farmerCommunityForumComponentSubText2">
                    {t('farmerCommunityText9')}
                    </div>
                  </div>
                </div>
                <div className="farmerCommunityForumComponentFrameItem" />
                <div className="farmerCommunityForumComponentFrameAuthor">
                  <img className="farmerCommunityForumComponentFrameIcon" alt="" src={ProfileVector2} />
                  <div className="farmerCommunityForumComponentAuthorText">
                    <div className="farmerCommunityForumComponentAuthorName">Arriane Gatpo</div>
                    <div className="farmerCommunityForumComponentPostTime">9hrs ago</div>
                  </div>
                </div>
              </div>
            </Link>              
            </div>       

            

         
            <div className="farmerCommunityForumComponentForumNumber">
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">1</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">2</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">3</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">4</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">5</div>
              </div>
              <div className="farmerCommunityForumComponentForumContainer">
                <div className="farmerCommunityForumComponentForumNumberBox">6</div>
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
