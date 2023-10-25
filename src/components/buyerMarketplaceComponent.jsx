import '../css/BuyerPage/buyermarketplace.css';
import BuyerNavigation from './buyerNavigation';
import VegetableVector from '../img/vegetableVector.jpg';
import OtherProductsVector from '../img/otherProductsVector.jpg';
import FruitsVector from '../img/fruitsVector.jpg';
import FertilizerVector from '../img/fertilizerVector.jpeg';
import {Link, NavLink} from 'react-router-dom';
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
import  { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';


const FarmerCommunityForumComponent = () => {
const { t } = useTranslation();
const userUid = sessionStorage.getItem('userUid');
const sessionId = sessionStorage.getItem('sessionId');
const [products, setProducts] = useState([]);
const [lastClickedProductId, setLastClickedProductId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const displayCount = 6;


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
  
      // Use the first three products directly
      setProducts(productsData.slice(0, 3));
  
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
      setLastClickedProductId(product.id);
      console.log('Last Clicked', product)
      // Fetch the detailed product information based on the product ID
      // You may want to use this information to display the detailed view in BuyerMarketplacePost
    } catch (error) {
      console.error('Error handling product click:', error);
    }
  };

  function chunkArray(arr, chunkSize) {
    const chunked = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunked.push(arr.slice(i, i + chunkSize));
    }
    return chunked;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / displayCount);

  // Generate an array of page numbers for dynamic pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * displayCount;
  const endIndex = startIndex + displayCount;

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

              {chunkArray(products.slice(startIndex, endIndex), 3).map((postGroup, index) => (
                <div className="adminMarketplaceComponentFrameWrapper" key={index}>
                  {postGroup.map((product) => (
                    <NavLink
                      key={product.id}
                      className="adminMarketplaceComponentRectangleParent"
                      to={`/buyermarketplacepost/${product.id}`}
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
                </div>
              ))}  
            </div>
          </div>
          
          <div className="adminCommunityForumComponentForumNumber">
            {pageNumbers.map((pageNumber) => (
              <div
                className={`adminCommunityForumComponentForumContainer ${
                  pageNumber === currentPage ? 'active' : ''
                }`}
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                style={{ cursor: 'pointer' }}
              >
                <div className="adminCommunityForumComponentForumNumberBox">{pageNumber}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
  
};

export default FarmerCommunityForumComponent;