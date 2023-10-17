import "../css/BuyerPage/buyermarketplaceComponent.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import okra from '../img/okra.png';
import ProfileVector2 from '../img/profileVector2.png';
import ProfileVector1 from '../img/profileVector1.png';
import {Link} from 'react-router-dom';
import BuyerTopNav from '../components/buyerTopNav';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db} from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const BuyerMarketplace = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [lastClickedProductId, setLastClickedProductId] = useState(null);

  // Fetch products and user information
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
      });

      // Filter products based on the corrected category ('vegetable')
      const vegetablesProducts = productsData.filter(
        (product) => product.category.toLowerCase() === 'vegetables'
      );

      setProducts(vegetablesProducts);
    } catch (error) {
      console.error('Error retrieving products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    try {
      // Set the last clicked product ID
      setLastClickedProductId(product);
      console.log('Last Clicked', product)
      // Fetch the detailed product information based on the product ID
      // You may want to use this information to display the detailed view in BuyerMarketplacePost
    } catch (error) {
      console.error('Error handling product click:', error);
    }
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
                  to={`/buyermarketplacepost/${product.id}`}
                  activeClassName="active"
                  onClick={() => handleProductClick(product.id)}
                >
             <img className="buyerMarketplaceComponentFrameChild" alt="" src={product.image} />
             <div className="buyerMarketplaceComponentFrameGroup">
               <div className="buyerMarketplaceComponentFrameContainer">
                 <div className="buyerMarketplaceComponentCardWrapper">
                   <b className="buyerMarketplaceComponentCardText">{product.cropName}</b>
                 </div>
                 <div className="buyerMarketplaceComponentCategoryWrapper">
                   <div className="buyerMarketplaceComponentCategoryContainer">
                     <p className="buyerMarketplaceComponentBlankLine">
                       <b>{t('text121')}</b>
                       <span className="buyerMarketplaceComponentCategory">{product.category}</span>
                     </p>
                     <p className="buyerMarketplaceComponentBlankLine">

                       <b>{t('text122')}</b>
                       <span className="buyerMarketplaceComponentCategory">{product.quantity}</span>

                     </p>
                     <p className="buyerMarketplaceComponentBlankLine">
                       <b className="buyerMarketplaceComponentCategory">{t('text123')}</b>
                       <span>{product.price}</span>
                     </p>
                     <p className="buyerMarketplaceComponentBlankLine">

                       <b>Location: </b>
                       <span className="buyerMarketplaceComponentCategory">{product.location}</span>
                     </p>
                     <p className="buyerMarketplaceComponentBlankLine">
                       <b>Unit: </b>
                       <span className="buyerMarketplaceComponentCategory">{product.unit}</span>

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
                 <div className="buyerMarketplaceComponentAuthorName">{product.fullname}</div>
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