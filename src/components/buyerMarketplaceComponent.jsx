import "../css/BuyerPage/buyermarketplaceComponent.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import tomatoVector from '../img/tomatoVector.png';
import okra from '../img/okra.png';
import pakwan from '../img/pakwan.png';
import pechay from '../img/pechay.png';
import calamansi from '../img/calamansi.png';
import sili from '../img/sili.png';
import sitaw from '../img/sitaw.png';
import squash from '../img/squash.png';
import talong from '../img/talong.png';
import RiceVector from '../img/riceCardImage.png';
import ProfileVector2 from '../img/profileVector2.png';
import ProfileVector1 from '../img/profileVector1.png';
import {Link} from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const BuyerMarketplace = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });
  
    return () => unsubscribe();
  }, []);






  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerMarketplaceComponent">
      <BuyerNavigation />
      <div className="farmerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="farmerCommunityForumComponentTopSection">
          <div className="farmerCommunityForumComponentMainText1">
            <b className="farmerCommunityForumComponentMainText2">             
              <p className="farmerCommunityForumComponentBlankLine">&nbsp;</p>
              <p className="farmerCommunityForumComponentBlankLine">{t('buyerPageNavigationText1')}</p>
            </b>
          </div>
        </div>
            

                    {products.map((product) => (
              <NavLink
                key={product.id}
                className="farmerMarketplaceComponentRectangleParent"
                to="/farmermarketplacepost"
                activeClassName="active"
              >
                <img className="farmerMarketplaceComponentFrameChild" alt="" src={product.image} />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{product.productName}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>Category: </b>
                          <span className="farmerMarketplaceComponentCategory">{product.category}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>Packaging: </b>
                          <span className="farmerMarketplaceComponentCategory">{product.packaging}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">Price: </b>
                          <span>{product.price}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>Kilogram per unit: </b>
                          <span className="farmerMarketplaceComponentCategory">{product.kilogramPerUnit}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">Description: </b>
                          <span>{product.description}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">Farmer</div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}






        <div className="buyerMarketplaceComponentMiddleSection">
          <div className="buyerMarketplaceComponentFrameParent">
            <div className="buyerMarketplaceComponentFrameWrapper">
              <Link className="buyerMarketplaceComponentRectangleParent" to = '/buyermarketplacepost'>
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
                          <b>{t('buyerPageCategory')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPagePackaging')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPagePrice')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageKilogram')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPageDescription')}</b>
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
                      <div className="buyerMarketplaceComponentSubName">{t('buyerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link className="buyerMarketplaceComponentRectangleParent" to = '/buyermarketplacepost'>
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
                          <b>{t('buyerPageCategory')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPagePackaging')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPagePrice')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageKilogram')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPageDescription')}</b>
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
                      <div className="buyerMarketplaceComponentAuthorName">Arriane Gatpo</div>
                      <div className="buyerMarketplaceComponentSubName">{t('buyerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </Link>              
                            
              <Link className="buyerMarketplaceComponentRectangleParent" to = '/buyermarketplacepost'>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Onions</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageCategory')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPagePackaging')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPagePrice')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageKilogram')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPageDescription')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector1} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Romeo London</div>
                      <div className="buyerMarketplaceComponentSubName">{t('buyerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </Link> 
              <div>
                
                </div>    
            </div>
            <div className="buyerMarketplaceComponentFrameParent">
            <div className="buyerMarketplaceComponentFrameWrapper">
              <Link className="buyerMarketplaceComponentRectangleParent" to = '/buyermarketplacepost'>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={pakwan}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Watermelon</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageCategory')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPagePackaging')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPagePrice')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageKilogram')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPageDescription')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector1} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Jenkins Mesina</div>
                      <div className="buyerMarketplaceComponentSubName">{t('buyerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link className="buyerMarketplaceComponentRectangleParent" to = '/buyermarketplacepost'>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={pechay}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Pechay</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageCategory')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPagePackaging')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPagePrice')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageKilogram')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPageDescription')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector1} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Ryan Amador</div>
                      <div className="buyerMarketplaceComponentSubName">{t('buyerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </Link>              
                            
              <Link className="buyerMarketplaceComponentRectangleParent" to = '/buyermarketplacepost'>
                <img
                  className="buyerMarketplaceComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="buyerMarketplaceComponentFrameGroup">
                  <div className="buyerMarketplaceComponentFrameContainer">
                    <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="buyerMarketplaceComponentCardText">Onions</b>
                    </div>
                    <div className="buyerMarketplaceComponentCategoryWrapper">
                      <div className="buyerMarketplaceComponentCategoryContainer">
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageCategory')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPageCategoryText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPagePackaging')}</b>
                          <span className="buyerMarketplaceComponentCategory">{t('buyerPagePackagingText1')}</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPagePrice')}</b>
                          <span>Php 3,000</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b>{t('buyerPageKilogram')}</b>
                          <span className="buyerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="buyerMarketplaceComponentBlankLine">
                          <b className="buyerMarketplaceComponentCategory">{t('buyerPageDescription')}</b>
                          <span>
                          {t('buyerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="buyerMarketplaceComponentFrameItem" />
                  <div className="buyerMarketplaceComponentAuthor">
                    <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector1} />
                    <div className="buyerMarketplaceComponentAuthorText">
                      <div className="buyerMarketplaceComponentAuthorName">Yagerobi Doria</div>
                      <div className="buyerMarketplaceComponentSubName">{t('buyerPageUserRole')}</div>
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
      </div>
      </I18nextProvider>   
  );
};

export default BuyerMarketplace;
