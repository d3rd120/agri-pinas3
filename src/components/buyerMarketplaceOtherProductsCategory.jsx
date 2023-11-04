import "../css/BuyerPage/buyermarketplaceComponent.css"
import BuyerNavigation from '../components/buyerNavigation';
import ProfileVector2 from '../img/profileVector2.png';
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
  
      // Filter products based on the "Other" category (case-insensitive)
      const otherProducts = productsData.filter((product) =>
        product.category.toLowerCase() === 'others'
      );
  
      setProducts(otherProducts); // Fix here: setProducts instead of fruitsProducts
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
    <div className="buyerMarketplaceComponent">
      <BuyerNavigation />
      <div className="buyerMarketplaceComponentMainPanel">
      <BuyerTopNav setSearchQuery={setSearchQuery} />
        <div className="buyerCommunityForumComponentTopSection">
          <div className="buyerCommunityForumComponentMainText1">
            <b className="buyerCommunityForumComponentMainText2">             
              <p className="buyerCommunityForumComponentBlankLine">&nbsp;</p>
              <p className="buyerCommunityForumComponentBlankLine">{t('Others')}</p>
            </b>
            <br></br>
              <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '250px' }}
                />  
          </div>
        </div>
            

          


        <div className="adminMarketplaceComponentMiddleSection">
                    <div className="adminMarketplaceComponentFrameParent">
                    {chunkArray(filteredProducts.slice(startIndex, endIndex), 2).map((postGroup, index) => (
                <div className="buyerMarketplaceComponentFrameWrapper" key={index}>
                  {postGroup.map((product) => (
                    <NavLink
                      key={product.id}
                      className="buyerMarketplaceComponentRectangleParent"
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
                                <b className="buyerMarketplaceComponentCategory">{t('Ttext126')}</b>
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

export default BuyerMarketplace;