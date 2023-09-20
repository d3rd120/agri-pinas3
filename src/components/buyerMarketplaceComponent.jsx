import '../css/BuyerPage/buyermarketplace.css';
import BuyerNavigation from './buyerNavigation';
import VegetableVector from '../img/vegetableVector.jpg';
import OtherProductsVector from '../img/otherProductsVector.jpg';
import FruitsVector from '../img/fruitsVector.jpg';
import FertilizerVector from '../img/fertilizerVector.jpeg';
import {Link} from 'react-router-dom';
import React from 'react';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerCommunityForumComponent = () => {
  const { t } = useTranslation();

 
  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerCommunityForumComponent">
        <BuyerNavigation />
        <div className="buyerCommunityForumComponentMainPanel">
          <BuyerTopNav />
          <div className="buyerCommunityForumComponentTopSection">
            <div className="buyerCommunityForumComponentMainText1">
              <b className="buyerCommunityForumComponentMainText2">
                <p className="buyerCommunityForumComponentBlankLine">
                  {t('farmerPageNavgationText2')}
                </p>
              </b>
            </div>
          </div>
  
          <div className="buyerCommunityForumComponentMiddleSection">
            <div className="buyerCommunityForumComponentFrameParent">
  
              <div className="buyerCommunityForumComponentFrameWrapper">
  
                <Link className="buyerCommunityForumComponentRectangleParent" to="/buyervegetablecategory">
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={VegetableVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
  
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1">{t('Text35')}</b>
                      </div>                    
                    </div>                  
                  </div>
                </Link>
  
                <Link className="buyerCommunityForumComponentRectangleParent" to="/buyerfruitscategory">
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={FruitsVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1"> {t('Text36')}</b>
                      </div>                   
                    </div>                  
                  </div>
                </Link>
              </div>
  
  
              <div className="buyerCommunityForumComponentFrameWrapper">
  
                <Link className="buyerCommunityForumComponentRectangleParent" to="/buyerfertilizercategory">
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={FertilizerVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
  
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1"> {t('Text37')}</b>
                      </div>                      
                    </div>                   
                  </div>
                </Link>
  
                <Link className="buyerCommunityForumComponentRectangleParent" to="/buyerotherproductscategory">
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={OtherProductsVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1"> {t('Text38')}</b>
                      </div>                    
                    </div>                                   
                  </div>
                </Link>
              </div>
  
            
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
  
};

export default FarmerCommunityForumComponent;
