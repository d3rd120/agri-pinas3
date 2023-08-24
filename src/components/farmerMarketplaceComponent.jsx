import React, { useState, useEffect } from 'react';
import '../css/Components/farmerMarketplaceComponent.css';
import FarmerMarketplaceAddProductComponent from '../components/farmerMarketplaceComponentAddProduct';
import FarmerNavigation from '../components/farmerPageNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import SiliVector from '../img/sili.png';
import SquashVector from '../img/squash.png';
import SitawVector from '../img/sitaw.png';
import ProfileVector2 from '../img/profileVector2.png';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import FarmerTopNav from '../components/farmerTopNav';
import { db } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerMarketplace = () => {

  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
   
  }
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

    <div className="farmerMarketplaceComponent">
      <FarmerNavigation />
      <div className="farmerMarketplaceComponentMainPanel">
        <FarmerTopNav />
        <div className="farmerMarketplaceComponentTopSection">
          <div className="farmerMarketplaceComponentMainText">
            <b className="farmerMarketplaceComponentSubText">      
              <p className="farmerMarketplaceComponentBlankLine">{t('farmerPageText2')}</p>
            </b>
          </div>
        </div>            

        
        <div className="farmerMarketplaceComponentMiddleSection">
          <div className="farmerMarketplaceComponentFrameParent">
            <div className="farmerMarketplaceComponentFrameWrapper">
                  {products.map((product) => (
                  <NavLink
                    key={product.id}
                    className="farmerMarketplaceComponentRectangleParent"
                    to="/farmermarketplacepost"
                    activeClassName="active">
                    <img className="farmerMarketplaceComponentFrameChild" alt="" src={product.imageUrl} />
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






              <NavLink className="farmerMarketplaceComponentRectangleParent" to = '/farmermarketplacepost'   activeClassName="active">
                <img
                  className="farmerMarketplaceComponentFrameChild"
                  alt=""
                  src={CornVector}
                />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{t('farmerPageProductText1')}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageCategory')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPageCategoryText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPagePackaging')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPagePackagingText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPagePrice')}</b>
                          <span>Php 10,000</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageKilogram')}</b>
                          <span className="farmerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPageDescription')}</b>
                          <span>
                          {t('farmerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">{t('farmerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </NavLink>  

              <NavLink className="farmerMarketplaceComponentRectangleParent" to = '/farmermarketplacepost'   activeClassName="active">
                <img
                  className="farmerMarketplaceComponentFrameChild"
                  alt=""
                  src={OnionVector}
                />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{t('farmerPageProductText2')}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageCategory')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPageCategoryText2')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPagePackaging')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPagePackagingText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPagePrice')}</b>
                          <span>Php 10,000</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageKilogram')}</b>
                          <span className="farmerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPageDescription')}</b>
                          <span>
                          {t('farmerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">{t('farmerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </NavLink> 

              
              <NavLink className="farmerMarketplaceComponentRectangleParent" to = '/farmermarketplacepost'   activeClassName="active">
                <img
                  className="farmerMarketplaceComponentFrameChild"
                  alt=""
                  src={RiceVector}
                />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{t('farmerPageProductText3')}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageCategory')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPageCategoryText3')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPagePackaging')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPagePackagingText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPagePrice')}</b>
                          <span>Php 10,000</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageKilogram')}</b>
                          <span className="farmerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPageDescription')}</b>
                          <span>
                          {t('farmerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">{t('farmerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </NavLink>  
              </div>

            

            
            <div className="farmerMarketplaceComponentFrameWrapper">
             
            <NavLink className="farmerMarketplaceComponentRectangleParent" to = '/farmermarketplacepost'   activeClassName="active">
                <img
                  className="farmerMarketplaceComponentFrameChild"
                  alt=""
                  src={SitawVector}
                />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{t('farmerPageProductText4')}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageCategory')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPageCategoryText2')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPagePackaging')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPagePackagingText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPagePrice')}</b>
                          <span>Php 10,000</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageKilogram')}</b>
                          <span className="farmerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPageDescription')}</b>
                          <span>
                          {t('farmerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">{t('farmerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </NavLink>  

              <NavLink className="farmerMarketplaceComponentRectangleParent" to = '/farmermarketplacepost'   activeClassName="active">
                <img
                  className="farmerMarketplaceComponentFrameChild"
                  alt=""
                  src={SiliVector}
                />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{t('farmerPageProductText5')}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageCategory')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPageCategoryText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPagePackaging')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPagePackagingText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPagePrice')}</b>
                          <span>Php 10,000</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageKilogram')}</b>
                          <span className="farmerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPageDescription')}</b>
                          <span>
                          {t('farmerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">{t('farmerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </NavLink> 

              
              <NavLink className="farmerMarketplaceComponentRectangleParent" to = '/farmermarketplacepost'   activeClassName="active">
                <img
                  className="farmerMarketplaceComponentFrameChild"
                  alt=""
                  src={SquashVector}
                />
                <div className="farmerMarketplaceComponentFrameGroup">
                  <div className="farmerMarketplaceComponentFrameContainer">
                    <div className="farmerMarketplaceComponentCardWrapper">
                      <b className="farmerMarketplaceComponentCardText">{t('farmerPageProductText6')}</b>
                    </div>
                    <div className="farmerMarketplaceComponentCategoryWrapper">
                      <div className="farmerMarketplaceComponentCategoryContainer">
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageCategory')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPageCategoryText2')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPagePackaging')}</b>
                          <span className="farmerMarketplaceComponentCategory">{t('farmerPagePackagingText1')}</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPagePrice')}</b>
                          <span>Php 10,000</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b>{t('farmerPageKilogram')}</b>
                          <span className="farmerMarketplaceComponentCategory">50 kgs</span>
                        </p>
                        <p className="farmerMarketplaceComponentBlankLine">
                          <b className="farmerMarketplaceComponentCategory">{t('farmerPageDescription')}</b>
                          <span>
                          {t('farmerPageDescriptionText1')}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="farmerMarketplaceComponentFrameItem" />
                  <div className="farmerMarketplaceComponentAuthor">
                    <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                    <div className="farmerMarketplaceComponentAuthorText">
                      <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                      <div className="farmerMarketplaceComponentSubName">{t('farmerPageUserRole')}</div>
                    </div>
                  </div>
                </div>
              </NavLink>  
              
            </div>




            
            <div className="farmerMarketplaceComponentCategories">
              <div className="farmerMarketplaceComponentPaginationContainer">
                <div className="farmerMarketplaceComponentPaginationNumber">1</div>
              </div>
              <div className="farmerMarketplaceComponentPaginationContainer">
                <div className="farmerMarketplaceComponentPaginationNumber">2</div>
              </div>
              <div className="farmerMarketplaceComponentPaginationContainer">
                <div className="farmerMarketplaceComponentPaginationNumber">3</div>
              </div>
              <div className="farmerMarketplaceComponentPaginationContainer">
                <div className="farmerMarketplaceComponentPaginationNumber">4</div>
              </div>
              <div className="farmerMarketplaceComponentPaginationContainer">
                <div className="farmerMarketplaceComponentPaginationNumber">5</div>
              </div>
              <div className="farmerMarketplaceComponentPaginationContainer">
                <div className="farmerMarketplaceComponentPaginationNumber">6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default FarmerMarketplace;
