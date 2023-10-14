import "../css/Components/adminMarketplaceComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import AdminMarketplaceUpdateComponent from '../components/adminMarketplaceUpdateComponent';
import AdminMarketplaceDeleteComponent from '../components/adminMarketplaceDeleteComponent';
import { FaTrash, FaStore, FaEdit, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const AdminMarketplaceComponent = () => {
  const { t } = useTranslation();
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [displayCount, setDisplayCount] = useState(10); // Default display count
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1

  // Define an array of row options
  const rowOptions = [5, 10, 15, 20];

  const handleButtonClick1 = () => {
    setShowPopup1(true);
  };

  const closePopup1 = () => {
    setShowPopup1(false);
  };

  const handleButtonClick2 = () => {
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

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

      console.log('Fetched products:', productsData);
      setProducts(productsData);
      console.log('Products in state:', productsData);
    } catch (error) {
      console.error('Error retrieving products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on searchText
  const filteredProducts = products.filter((product) => {
    const productName = product.productName || '';
    const category = product.category || '';
    const packaging = product.packaging || '';
    const price = product.price || '';
    const kilogram = product.kilogramPerUnit || '';

    // Check if any of the fields contain the searchText
    return (
      productName.toLowerCase().includes(searchText.toLowerCase()) ||
      category.toLowerCase().includes(searchText.toLowerCase()) ||
      packaging.toLowerCase().includes(searchText.toLowerCase()) ||
      price.toLowerCase().includes(searchText.toLowerCase()) ||
      kilogram.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Function to split an array into chunks
  function chunkArray(arr, size) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  }

  // Event handler for changing the display count
  const handleDisplayCountChange = (event) => {
    const newDisplayCount = parseInt(event.target.value, 10);
    setDisplayCount(newDisplayCount);
    setCurrentPage(1); // Reset current page to 1 when changing display count
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="adminMarketplaceComponent">
        <AdminNavigation />
        <div className="adminMarketplaceComponentMainPanel">
          <div className="adminMarketplaceComponentTopSection">
            <div className="adminMarketplaceComponentMainText">
              <b className="adminMarketplaceComponentMainTextWrapper">
                <p className="adminMarketplaceComponentBlankLine">&nbsp;</p>
                <p className="adminMarketplaceComponentBlankLine">
                  {t('text148')}
                </p>
              </b>
            </div>
          </div>

          {showPopup1 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup1}
                >
                  <FaTimes />
                </span>
                <AdminMarketplaceUpdateComponent />
              </div>
            </div>
          )}

          {showPopup2 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup2}
                >
                  <FaTimes />
                </span>
                <AdminMarketplaceDeleteComponent />
              </div>
            </div>
          )}

          <div className="adminMarketplaceComponentCard">
            <div className="adminMarketplaceComponentSubTitle">
              <FaStore /> {t('text149')}
            </div>
            <br />
            <div className="adminMarketplaceComponentShow">
              {t('text150')}


              <select
                className="adminMarketplaceComponentRowSelect"
                value={displayCount}
                onChange={handleDisplayCountChange}
              >
                {rowOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>


              <input
                className="adminMarketplaceComponentRowSelect"
                type="text"
                placeholder={t('text151')}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>
            <br />

            <div className="adminMarketplaceComponentMiddleSection">
              <div className="adminMarketplaceComponentFrameParent">
                {chunkArray(
                  filteredProducts.slice((currentPage - 1) * displayCount, currentPage * displayCount),
                  2
                ).map((productGroup, index) => (
                  <div className="adminMarketplaceComponentFrameWrapper" key={index}>
                    {productGroup.map((product) => (
                      <a className="adminMarketplaceComponentRectangleParent" key={product.id}>
                        <img
                          className="adminMarketplaceComponentFrameChild"
                          alt=""
                          src={product.image}
                        />
                        <div className="adminMarketplaceComponentFrameGroup">
                          <div className="adminMarketplaceComponentFrameContainer">
                            <div className="adminMarketplaceComponentSubText1Wrapper">
                              <b className="adminMarketplaceComponentSubText1">{product.productName}</b>
                            </div>
                            <div className="adminMarketplaceComponentSubText2Wrapper2">
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('text152')}</b> {product.category}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('text153')}</b> {product.packaging}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('text154')}</b> {product.price}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('text155')}</b> {product.kilogramPerUnit}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('text156')}</b> {product.description}
                              </div>
                            </div>
                          </div>
                          <div className="adminMarketplaceComponentFrameItem" />
                          <div className="adminMarketplaceComponentDetails">
                            <button className="adminMarketplaceComponentButton" onClick={handleButtonClick1}>
                              <FaEdit className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('text177')}</div>
                            </button>
                            <button className="adminMarketplaceComponentButton" onClick={handleButtonClick2}>
                              <FaTrash className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('text178')}</div>
                            </button>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="adminMarketplaceComponentForumNumber">
              {Array.from({ length: Math.ceil(filteredProducts.length / displayCount) }, (_, index) => (
                <div
                  className={`adminMarketplaceComponentForumContainer ${
                    index + 1 === currentPage ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{ cursor: 'pointer' }} // Add this line to set the cursor to pointer
                >
                  <div className="adminMarketplaceComponentForumNumberBox">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminMarketplaceComponent;
