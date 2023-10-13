import "../css/BuyerPage/buyermarketplaceComponent.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import okra from '../img/okra.png';
import ProfileVector2 from '../img/profileVector2.png';
import ProfileVector1 from '../img/profileVector1.png';
import {Link} from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const BuyerMarketplace = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'Marketplace');
      const querySnapshot = await getDocs(productsCollection);

      if (querySnapshot.empty) {
        console.warn('No products found.');
        return;
      }

      const productsData = querySnapshot.docs.map((doc) => {
        const product = doc.data();
        return {
          id: doc.id,
          ...product,
        };
      })

      // Filter products based on the "Fruits" category (case-insensitive)
      const fruitsProducts = productsData.filter(
      (product) => product.category.toLowerCase() === 'fruits'
      );

     
      setProducts(fruitsProducts);
    } catch (error) {
      console.error('Error retrieving products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    // Handle the click event for the product
    console.log('Product clicked:', product);
    // Add your logic here
  };


  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerMarketplaceComponent">
      <BuyerNavigation />
      <div className="buyerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="buyerCommunityForumComponentTopSection">
          <div className="buyerCommunityForumComponentMainText1">
            <b className="buyerCommunityForumComponentMainText2">             
              <p className="buyerCommunityForumComponentBlankLine">&nbsp;</p>
              <p className="buyerCommunityForumComponentBlankLine">{t('text120')}</p>
            </b>
          </div>
        </div>
            
     




        <div className="buyerMarketplaceComponentMiddleSection">
          <div className="buyerMarketplaceComponentFrameParent">
            <div className="buyerMarketplaceComponentFrameWrapper">
            {products.map((product) => (
                  <NavLink
                  key={product.id}
                  className="buyerMarketplaceComponentRectangleParent"
                  to="/buyermarketplacepost"
                  activeClassName="active"
                  onClick={() => handleProductClick(product)}
                >
                    <img className="buyerMarketplaceComponentFrameChild" alt="" src={product.image} />
                    <div className="buyerMarketplaceComponentFrameGroup">
                      <div className="buyerMarketplaceComponentFrameContainer">
                        <div className="buyerMarketplaceComponentCardWrapper">
                          <b className="buyerMarketplaceComponentCardText">{product.productName}</b>
                        </div>
                        <div className="buyerMarketplaceComponentCategoryWrapper">
                          <div className="buyerMarketplaceComponentCategoryContainer">
                            <p className="buyerMarketplaceComponentBlankLine">
                              <b>{t('text121')}</b>
                              <span className="buyerMarketplaceComponentCategory">{product.category}</span>
                            </p>
                            <p className="buyerMarketplaceComponentBlankLine">
                              <b>{t('text122')}</b>
                              <span className="buyerMarketplaceComponentCategory">{product.packaging}</span>
                            </p>
                            <p className="buyerMarketplaceComponentBlankLine">
                              <b className="buyerMarketplaceComponentCategory">{t('text123')}</b>
                              <span>{product.price}</span>
                            </p>
                            <p className="buyerMarketplaceComponentBlankLine">
                              <b>{t('text124')}</b>
                              <span className="buyerMarketplaceComponentCategory">{product.kilogramPerUnit}</span>
                            </p>
                            <p className="buyerMarketplaceComponentBlankLine">
                              <b className="buyerMarketplaceComponentCategory">{t('text125')}</b>
                              <span>{product.description}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="buyerMarketplaceComponentFrameItem" />
                      <div className="buyerMarketplaceComponentAuthor">
                        <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                        <div className="buyerMarketplaceComponentAuthorText">
                          <div className="buyerMarketplaceComponentAuthorName">{product.farmer}</div>                          
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}           
              
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

export default BuyerMarketplace;
