import "../css/Components/adminMarketplaceComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import {FaStore, FaArchive, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import ConfirmationDialog from "./confirmationDialog";
import ProfileVector2 from '../img/profileVector2.png';

const AdminMarketplaceComponent = () => {
  const { t } = useTranslation();
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [products, setProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // Default display count
  const [currentPage, setCurrentPage] = useState(1); // Default current page is 1
  const [archivedProducts, setArchivedProducts] = useState([]);
  const [isUnarchiveDialogOpen, setIsUnarchiveDialogOpen] = useState(false);
  const [unarchiveProductId, setUnarchiveProductId] = useState(null);
  const [isDeleteProductDialogOpen, setIsDeleteProductDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleUnarchiveButtonClick = (productId) => {
    setUnarchiveProductId(productId);
    setIsUnarchiveDialogOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteProductId(productId);
    setIsDeleteProductDialogOpen(true);
  };
   // Step 2: Create an event handler to update searchText
   const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  

const handleOverlayClick = () => {
  setIsUnarchiveDialogOpen(false); // Close the confirmation dialog without changing the language.
};



  
  
  // Define an array of row options
  const rowOptions = [10, 15, 20];



  const filteredProducts = archivedProducts.filter((product) => {
    const cropName = product.cropName || '';
    const category = product.category || '';
    const quantity = product.quantity || '';
    const price = product.price || '';
    const location = product.location || '';
    const unit = product.unit || '';
    const description = product.description || '';
    const fullname = product.fullname || '';

    return (
      cropName.toLowerCase().includes(searchText.toLowerCase()) ||
      category.toLowerCase().includes(searchText.toLowerCase()) ||
      quantity.toLowerCase().includes(searchText.toLowerCase()) ||
      price.toLowerCase().includes(searchText.toLowerCase()) ||
      location.toLowerCase().includes(searchText.toLowerCase()) ||
      unit.toLowerCase().includes(searchText.toLowerCase()) ||
      fullname.toLowerCase().includes(searchText.toLowerCase()) ||
      description.toLowerCase().includes(searchText.toLowerCase())
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


  const fetchArchivedProducts = async () => {
    try {
      const archivedProductsCollection = collection(db, 'Archive');
      const archivedProductsSnapshot = await getDocs(archivedProductsCollection);
  
      if (archivedProductsSnapshot.empty) {
        console.warn('No archived products found.');
        return;
      }
  
      const archivedProductsData = archivedProductsSnapshot.docs.map((doc) => {
        const product = doc.data();
        return {
          id: doc.id,
          ...product,
        };
      });
  
      console.log('Fetched archived products:', archivedProductsData);
      setArchivedProducts(archivedProductsData);
    } catch (error) {
      console.error('Error retrieving archived products:', error);
    }
  };

  useEffect(() => {
    fetchArchivedProducts();
  }, []);
  

  const handleConfirmUnarchive = async () => {
    try {
      const productRef = doc(db, 'Archive', unarchiveProductId);
      const productSnapshot = await getDoc(productRef);
  
      if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
  
        // Move the product from 'Archive' to 'Marketplace'
        await addDoc(collection(db, 'Marketplace'), {
          ...productData,
          archived: false, // Mark as unarchived
        });
  
        // Delete the product from 'Archive'
        await deleteDoc(productRef);
  
        setShowPopup1(true);
        fetchArchivedProducts(); // Fetch updated archived product list
      } else {
        console.warn('Archived product not found. Product ID:', unarchiveProductId);
      }
    } catch (error) {
      console.error('Error unarchiving product:', error);
    }
  
    // Close the dialog
    setIsUnarchiveDialogOpen(false);
  };
  
  const handleCancelUnarchive = () => {
    // Close the dialog
    setIsUnarchiveDialogOpen(false);
  };  
  
  

  // const handleConfirmDeleteProduct = async () => {
  //   try {
  //     const productRef = doc(db, 'Archive', deleteProductId);
  //     const productSnapshot = await getDoc(productRef);
  
  //     if (productSnapshot.exists()) {
  //       await deleteDoc(productRef);
  //       setShowPopup2(true);
  //       fetchArchivedProducts(); // Fetch updated archived product list
  //     } else {
  //       console.warn('Archived product not found.');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  
  //   // Close the dialog
  //   setIsDeleteProductDialogOpen(false);
  // };
  
  // const handleCancelDeleteProduct = () => {
  //   // Close the dialog
  //   setIsDeleteProductDialogOpen(false);
  // };
  

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
                  {t('ext145')}
                </p>
              </b>
            </div>
          </div>
         
          <div className="adminMarketplaceComponentCard">
            <div className="adminMarketplaceComponentSubTitle">
              <FaStore /> {t('ext146')}
            </div>
            <br />
            <div className="adminMarketplaceComponentShow">
              {t('ext147')}


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
                placeholder={t('ext148')}
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
                              <b className="adminMarketplaceComponentSubText1">{product.cropName}</b>
                            </div>
                            <div className="adminMarketplaceComponentSubText2Wrapper2">
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('ext149')}</b> {product.category}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('ext150')}</b> {product.quantity}
                              </div>                             
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('ext151')}</b> {product.price}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('ext152')}</b> {product.location}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('ext153')}</b> {product.unit}
                              </div>
                              <div className="adminMarketplaceComponentSubText2">
                                <b>{t('ext154')}</b> {product.description}
                              </div>
                            </div>
                          </div>
                             <div className="buyerMarketplaceComponentAuthor">
                          <img className="buyerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                          <div className="buyerMarketplaceComponentAuthorText">
                            <div className="buyerMarketplaceComponentAuthorName">{product.fullname}</div>
                          </div>
                        </div>   
                          <div className="adminMarketplaceComponentFrameItem" />
                          <div className="adminMarketplaceComponentDetails">
                            <button className="adminMarketplaceComponentButton" onClick={() => handleUnarchiveButtonClick(product.id)}>
                              <FaArchive className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('ext155')}</div>
                            </button>
                            {/* <button className="adminMarketplaceComponentButton" onClick={() => handleDeleteProduct(product.id)}>
                              <FaTrash className="adminMarketplaceComponentButtonIcon" />
                              <div className="adminMarketplaceComponentButtonText">{t('text178')}</div>
                            </button> */}
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
          <ConfirmationDialog
          isOpen={isUnarchiveDialogOpen}
          message={t('ext156')}
          onConfirm={handleConfirmUnarchive}
          onCancel={handleCancelUnarchive}
          onOverlayClick={handleOverlayClick} // Pass the overlay click handler
          confirmLabel={t('ext157')}
          cancelLabel={t('ext158')}
        />

        {/* <ConfirmationDialog
          isOpen={isDeleteProductDialogOpen}
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDeleteProduct}
          onCancel={handleCancelDeleteProduct}
        /> */}


    </I18nextProvider>
  );
};

export default AdminMarketplaceComponent;