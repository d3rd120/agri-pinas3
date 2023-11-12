import '../css/BuyerPage/buyermarketplace.css';
import BuyerNavigation from './buyerNavigation';
import VegetableVector from '../img/categoryImage1.png';
import OtherProductsVector from '../img/categoryImage4.jpg';
import FruitsVector from '../img/categoryImage2.png';
import FertilizerVector from '../img/categoryImage3.png';
import {Link, NavLink} from 'react-router-dom';
import React from 'react';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import ProfileVector2 from '../img/profileVector2.png';
import i18n from '../i18n';
import  { useState, useEffect } from 'react';
import { db } from './firebase';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';


const BuyerMarketplaceComponent = () => {
const { t } = useTranslation();
const userUid = sessionStorage.getItem('userUid');
const sessionId = sessionStorage.getItem('sessionId');
const [products, setProducts] = useState([]);
const [lastClickedProductId, setLastClickedProductId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [searchQuery, setSearchQuery] = useState('');
const [filteredProducts, setFilteredProducts] = useState([]);
const displayCount = 6;

useEffect(() => {
  // Filter the products based on the search query
  const filtered = products.filter((product) =>
    product.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.quantity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) 
  );
  setFilteredProducts(filtered);
}, [searchQuery, products]);



const fetchProducts = async () => {
  try {
    const productsCollection = collection(db, 'Marketplace');
    const querySnapshot = await getDocs(productsCollection);

    if (querySnapshot.empty) {
      // console.warn('No products found.');
      return;
    }

    const fetchedProducts = [];

    for (const docSnap of querySnapshot.docs) {
      const product = docSnap.data();
      product.id = docSnap.id;

      // Fetch user details for each product
      const userSnapshot = await getDoc(doc(db, 'Users', product.uid));
      const userData = userSnapshot.data();

      if (userData) {
        product.profileImageUrl = userData.profileImageUrl;
      }

      fetchedProducts.push(product);
    }

    setProducts(fetchedProducts);
    // console.log('Fetched Products:', fetchedProducts);
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
};


  const generateSessionId = () => {
    return Math.random().toString(36).substr(2, 10); 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    try {
      // Set the last clicked product ID
      setLastClickedProductId(product.id);
      // console.log('Last Clicked', product)
      // Fetch the detailed product information based on the product ID
      // You may want to use this information to display the detailed view in BuyerMarketplacePost
    } catch (error) {
      // console.error('Error handling product click:', error);
    }
  };
  

  function chunkArray(arr, chunkSize) {
    const chunked = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunked.push(arr.slice(i, i + chunkSize));
    }
    return chunked;
  }
// Calculate the total number of pages based on filtered products
const totalPages = Math.ceil(filteredProducts.length / displayCount);

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
        <BuyerTopNav setSearchQuery={setSearchQuery} />
          <div className="buyerCommunityForumComponentTopSection">
            <div className="buyerCommunityForumComponentMainText1">
              <b className="buyerCommunityForumComponentMainText2">
                <p className="buyerCommunityForumComponentBlankLine">
                  {t('ext272')}
                </p>    
                <br></br>           
                <br></br> 
                <p className="buyerCommunityForumComponentBlankLine" style={{ fontSize: '18px' }}>
                  {t('ext273')}
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
                        <b className="buyerCommunityForumComponentSubText1">{t('ext274')}</b>
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
                        <b className="buyerCommunityForumComponentSubText1"> {t('ext275')}</b>
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
                        <b className="buyerCommunityForumComponentSubText1"> {t('ext276')}</b>
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
                        <b className="buyerCommunityForumComponentSubText1"> {t('ext277')}</b>
                      </div>                    
                    </div>                                   
                  </div>
                </Link>
              </div>
              <input
                  type="text"
                  placeholder={t('ext297')}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '250px' }}
                />  

            {chunkArray(filteredProducts.slice(startIndex, endIndex), 3).map((postGroup, index) => (
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
                                <b>{t('ext278')}</b>
                                <span className="buyerMarketplaceComponentCategory">{product.category}</span>
                              </p>
                              <p className="buyerMarketplaceComponentBlankLine">
                                <b>{t('ext279')}</b>
                                <span className="buyerMarketplaceComponentCategory">{product.quantity}</span>
                              </p>
                              <p className="buyerMarketplaceComponentBlankLine">
                                <b className="buyerMarketplaceComponentCategory">{t('ext280')}</b>
                                <span>{product.price}</span>
                              </p>
                              <p className="buyerMarketplaceComponentBlankLine">
                                <b>{t('ext281')}</b>
                                <span className="buyerMarketplaceComponentCategory">{product.location}</span>
                              </p>
                              <p className="buyerMarketplaceComponentBlankLine">
                                <b>{t('ext282')}</b>
                                <span className="buyerMarketplaceComponentCategory">{product.unit}</span>
                              </p>
                              <p className="buyerMarketplaceComponentBlankLine">
                                <b className="buyerMarketplaceComponentCategory">{t('ext283')}</b>
                                <span>{product.description}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="buyerMarketplaceComponentFrameItem" />
                        <div className="buyerMarketplaceComponentAuthor">
                        <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={product.profileImageUrl} />
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

export default BuyerMarketplaceComponent;