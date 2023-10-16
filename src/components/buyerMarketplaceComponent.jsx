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
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import okra from '../img/okra.png';
import ProfileVector2 from '../img/profileVector2.png';
import ProfileVector1 from '../img/profileVector1.png';
import i18n from '../i18n';


const FarmerCommunityForumComponent = () => {
  const { t } = useTranslation();
const userUid = sessionStorage.getItem('userUid');
  const sessionId = sessionStorage.getItem('sessionId');
 
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
                  {t('text51')}
                </p>
              </b>
            </div>
          </div>
  
          <div className="buyerCommunityForumComponentMiddleSection">
            <div className="buyerCommunityForumComponentFrameParent">
  
              <div className="buyerCommunityForumComponentFrameWrapper">
  
              <Link className="buyerCommunityForumComponentRectangleParent" to={`/buyervegetablecategory/${userUid}/${sessionId}`}>
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={VegetableVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
  
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1">{t('text52')}</b>
                      </div>                    
                    </div>                  
                  </div>
                </Link>
  
                <Link className="buyerCommunityForumComponentRectangleParent" to={`/buyerfruitscategory/${userUid}/${sessionId}`}>
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={FruitsVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1"> {t('text53')}</b>
                      </div>                   
                    </div>                  
                  </div>
                </Link>
                <Link className="buyerCommunityForumComponentRectangleParent" to={`/buyerfertilizercategory/${userUid}/${sessionId}`}>
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={FertilizerVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
  
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1"> {t('text54')}</b>
                      </div>                     
                    </div>                   
                  </div>
                </Link>
  
                <Link className="buyerCommunityForumComponentRectangleParent" to={`/buyerotherproductscategory/${userUid}/${sessionId}`}>
                  <img
                    className="buyerCommunityForumComponentFrameChild"
                    alt=""
                    src={OtherProductsVector}
                  />
                  <div className="buyerCommunityForumComponentFrameGroup">
                    <div className="buyerCommunityForumComponentFrameContainer">
                      <div className="buyerCommunityForumComponentSubText1Wrapper">
                        <b className="buyerCommunityForumComponentSubText1"> {t('text55')}</b>
                      </div>                    
                    </div>                                   
                  </div>
                </Link>
              </div>

              <div className="buyerMarketplaceComponentFrameWrapper">
            
            
              <Link className="buyerMarketplaceComponentRectangleParent" to={`/buyermarketplacepost/${userUid}/${sessionId}`}>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={CornVector}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Corn</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text56')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text57')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('text58')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text59')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('text60')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Daniella Tungol</div>                     
                    </div>
                  </div>
                </div>
              </Link>   

              <Link className="buyerMarketplaceComponentRectangleParent" to={`/buyermarketplacepost/${userUid}/${sessionId}`}>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Onion</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text56')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text57')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('text58')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text59')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('text60')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Mavic Anes</div>                     
                    </div>
                  </div>
                </div>
              </Link>   

              <Link className="buyerMarketplaceComponentRectangleParent" to={`/buyermarketplacepost/${userUid}/${sessionId}`}>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={okra}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Okra</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text56')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text57')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('text58')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('text59')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('text60')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Arrianne Gatpo</div>                     
                    </div>
                  </div>
                </div>
              </Link>   

              <div>                
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
