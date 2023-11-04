import React, { useState, useEffect } from 'react';
import "../css/BuyerPage/buyermarketplace.css"
import BuyerNavigation from "./buyerNavigation";
import OnionVector from '../img/onionVector.png';
import ProfileVector2 from '../img/profileVector2.png';
import TomatoVector from '../img/tomatoVector.png';
import talong from '../img/talong.png';
import { FaCartArrowDown, FaCartPlus, FaCommentDots, FaComments, FaEdit, FaTrash } from 'react-icons/fa';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { RiChat1Line } from 'react-icons/ri';
import {Link, NavLink} from 'react-router-dom';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import { collection, getDocs, setDoc, getDoc, doc, where, query } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Popup from './validationPopup';

const CustomHeaderTitle = styled.div`
  background-color: #557153;
  color: white;
  
`;

const BuyerMarketplace = ({ }) => {
  const { t } = useTranslation();
  const theme = {
    background: 'white',
    headerBgColor: '#9DC08B',
    headerFontSize: '20px',
    botBubbleColor: '#e0e0e0',
    headerFontColor: 'white',
    botFontColor: 'black',
    userBubbleColor: 'white',
    userFontColor: 'black',
  };

  const [showChatBot, setShowChatBot] = useState(false);
  const [minimizedChatBot, setMinimizedChatBot] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productId } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');


  const handleChatButtonClick = () => {
    setShowChatBot(!showChatBot);
    setMinimizedChatBot(false);
  };

  const handleChatBotClose = () => {
    setShowChatBot(false);
    setMinimizedChatBot(false);
  };

  const handleChatBotMinimize = () => {
    setMinimizedChatBot(true);
  };

  const handleEnd = () => {
    setShowChatBot(false);
    setMinimizedChatBot(false);
  };

  const handleAddToCart = async (product) => {
    try {
      if (!product) {
        console.error("Selected product is null. Check the value of selectedProduct.");
        return;
      }
  
      const user = auth.currentUser;
      if (!user) {
        setPopupMessage("Please log in to add items to your cart.");
        setPopupVisible(true);
        return;
      }
  
      const userCartRef = doc(db, 'UserCarts', user.uid);
      const userCartSnapshot = await getDoc(userCartRef);
      const currentCart = userCartSnapshot.exists() ? userCartSnapshot.data().cart : [];
  
      const existingItemIndex = currentCart.findIndex((item) => item.productId === product.productId);  
    
      if (existingItemIndex !== -1) {
        // Product already exists in the cart, update the quantity
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += 1;
        await setDoc(userCartRef, { cart: updatedCart });
      } else {
        // Product does not exist in the cart, add a new entry
        currentCart.push({ ...product, quantity: 1, productId: product.productId });
        await setDoc(userCartRef, { cart: currentCart });
      }
  
      setPopupMessage(`${product.cropName} added to your cart!`);
      setPopupVisible(true);
    } catch (err) {
      console.error(err);
      setPopupMessage("An error occurred while adding the item to your cart. Please try again.");
      setPopupVisible(true);
    }
  };

  const buyNow = async (product) => {
    try {
      if (!product || !selectedProduct) {
        console.error("Selected product for immediate purchase is null.");
        return;
      }
  
      const user = auth.currentUser;
      if (!user) {
        setPopupMessage("Please log in to proceed with the purchase.");
        setPopupVisible(true);
        return;
      }
  
      const userOrdersRef = collection(db, 'BuyNow');
  
      const orderDoc = {
        userId: user.uid,
        productId: product.productId,
        quantity: 1, // Set quantity to 1
        dateBought: new Date().toISOString().split('T')[0],
        isChecked: false,
        buid: user.uid,
        category: product.category,
        cropID: product.productId,
        cropName: product.cropName,
        fullname: product.fullname,
        image: product.image,
        location: product.location,
        price: product.price,
        totalAmount: product.price, // Assuming totalAmount is the same as price for now
        totalCost: product.price, // Assuming totalCost is the same as price for now
        uid: user.uid,
        unit: product.unit,
      };
  
      await setDoc(doc(userOrdersRef), orderDoc);
  
      setPopupMessage(`${product.cropName} purchased successfully!`);
      setPopupVisible(true);
    } catch (err) {
      console.error(err);
      setPopupMessage("An error occurred during the purchase. Please try again.");
      setPopupVisible(true);
    }
  };
  
  
  
  
  
  const fetchProductDetails = async () => {
    try {
      if (!productId || productId === 'undefined') {
        console.warn('Invalid productId:', productId);
        return;
      }
  
      const productRef = doc(db, 'Marketplace', productId);
      const productDetails = await getDoc(productRef);
  
      if (productDetails.exists()) {
        const productDetailsData = productDetails.data();
  
        setProduct(productDetailsData);
        // Update selectedProduct state with the fetched product details
        setSelectedProduct({ ...productDetailsData, productId });
        // Other state updates...
      } else {
        console.warn('Product not found.');
      }
    } catch (error) {
      console.error('Error in fetchProductDetails:', error.message);
    }
  };

  const fetchRelatedProducts = async (productId) => {
    try {
      const productRef = doc(db, 'Marketplace', productId);
      const productDetails = await getDoc(productRef);
  
      if (!productDetails.exists()) {
        console.warn('Product not found.');
        return;
      }
  
      const selectedProductData = productDetails.data();
  
      const relatedProductsRef = collection(db, 'Marketplace');
      const relatedProductsQuery = await getDocs(relatedProductsRef);
  
      const allRelatedProducts = relatedProductsQuery.docs
        .filter((doc) => doc.id !== productId)
        .map((doc) => ({ ...doc.data(), id: doc.id }));
  
      // Filter based on market and category
      const filteredRelatedProducts = allRelatedProducts.filter((relatedProduct) => {
        return (
          relatedProduct.market === selectedProductData.market &&
          relatedProduct.category === selectedProductData.category
        );
      });
  
      // Shuffle the array
      const shuffledProducts = shuffleArray(filteredRelatedProducts);
  
      // Take the first three products
      const randomRelatedProducts = shuffledProducts.slice(0, 3);
  
      setRelatedProducts([...randomRelatedProducts]);
    } catch (error) {
      console.error('Error fetching related products:', error.message);
    } finally {
      setLoadingRelatedProducts(false);
    }
  };
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
    useEffect(() => {
      if (productId && productId !== 'undefined') {
        fetchProductDetails();
        fetchRelatedProducts(productId);
      }
    }, [productId]);

  if (!product || !selectedProduct) {
    return <div>Loading...</div>;
  }



  return (
    <>
    <I18nextProvider i18n={i18n}>
      <div className="buyerMarketplaceComponentPost">
        <BuyerNavigation />
        <div className="buyerMarketplaceComponentMainPanel">
          <BuyerTopNav />
          <div className="buyerCommunityForumComponentTopSection">
            <div className="buyerCommunityForumComponentMainText1">
              <b className="buyerCommunityForumComponentMainText2">
                <p className="buyerCommunityForumComponentBlankLine">{t('text100')}</p>
              </b>
            </div>
          </div>


          <div className="buyerMarketplaceComponentPostMiddleSection">
            <div className="buyerMarketplaceComponentPostCardsContainer">
            <div key={selectedProduct.productId} className="buyerMarketplaceComponentPostCard1">
               <img
              className="buyerMarketplaceComponentPostCard1Image"
              alt=""
              src={product.image}
                  />
                  </div>


                <div className="buyerMarketplaceComponentPostSmallCards">
                  <div className="buyerMarketplaceComponentPostSmallCardsDescription">
                    <div className="buyerMarketplaceComponentPostSmallCardsContent">
                      <div className="buyerMarketplaceComponentPostSmallCardsHeading">
                        <div className="buyerMarketplaceComponentPostSmallCardsDetails">

                          <b className="buyerMarketplaceComponentPostSmallCardsProductName">{selectedProduct?.cropName}</b>
                          <b className="buyerMarketplaceComponentPostSmallCardsBuyerName">{t('text101')} {selectedProduct?.fullname}</b>

                        </div>
                        
                        <div className="buyerMarketplaceComponentPostSmallCardsDescriptionWrapper">
                          <div className="buyerMarketplaceComponentPostSmallCardsFullDescription">
                            <p className="buyerMarketplaceComponentPostBlankLine">

                              <b>{t('text102')} </b>
                              <span className="buyerMarketplaceComponentPostBlankLine">{selectedProduct?.price}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('text103')} </b>
                              <span className="buyerMarketplaceComponentPostCategory">{selectedProduct?.category}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('text104')}</b>
                              <span className="buyerMarketplaceComponentPostCategory">{selectedProduct?.quantity}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('text105')} </b>
                              <span className="buyerMarketplaceComponentPostCategory">{selectedProduct?.unit}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('text106')} </b>
                              <span className="buyerMarketplaceComponentPostCategory">{selectedProduct?.location}</span>

                            </p>
                            {/* {product.category.toLowerCase() === 'vegetable' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPagePrice')} </b>
                                  <span>{product.price}</span>
                                </p>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b>{t('buyerPageKilogram')} </b>
                                  <span className="buyerMarketplaceComponentPostCategory">{product.quantity}</span>
                                </p>
                              </>
                            )}
                            {product.category.toLowerCase() === 'fruits' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageFruitsCategoryDetail')} </b>

                                </p>
                              </>
                            )}
                            {product.category.toLowerCase() === 'fertilizer' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageFertilizerCategoryDetail')} </b>

                                </p>
                              </>
                            )}
                            {product.category.toLowerCase() === 'other' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageOtherCategoryDetail')} </b>

                                </p>
                              </>
                            )} */}
                            <p className="buyerMarketplaceComponentPostBlankLine">

                              <b className="buyerMarketplaceComponentPostCategory">{t('text107')} </b>
                              <span>{selectedProduct?.description}</span>

                            </p>
                          </div>
                        </div>
                      
    <div className="buyerMarketplaceComponentPostButtonContainer">
        <div className="buyerMarketplaceComponentPostButtonRow">
          <button className="buyerMarketplaceComponentPostButton outlinedButton" onClick={handleChatButtonClick}>
            <FaCommentDots className="buyerMarketplaceComponentPostButtonIcon" />
            <div className="buyerMarketplaceComponentPostButtonText">{t('text108')}</div>
          </button>       
          <Link onClick={() => handleAddToCart(selectedProduct)}>
          <button className="buyerMarketplaceComponentPostButton outlinedButton">
            <FaCartArrowDown className="buyerMarketplaceComponentPostButtonIcon" />
            <div className="buyerMarketplaceComponentPostButtonText">{t('text109')}</div>
          </button>
        </Link>
            <Link to="/checkout"onClick={() => buyNow(selectedProduct)}> 
            <button className="buyerMarketplaceComponentPostButton1">
              <div className="buyerMarketplaceComponentPostButtonText1">{t('text110')}</div>
            </button>
            </Link>
                          </div>
                        </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       



        <div className="buyerMarketplaceComponentPostButtonNew">
          <div className="buyerMarketplaceComponentPostButtonNewTitle">{t('Ttext111')}</div>
          <div className="buyerMarketplaceComponentPostButtonNewCourses">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.productId} 
            className="buyerMarketplaceComponentPostButtonNewCard1" 
            to={`/buyermarketplacepost/${relatedProduct.id}`}
             style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image" 
                alt=""
                src={relatedProduct.image}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{relatedProduct.cropName}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">{relatedProduct.price}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>    
      </div>

      {showChatBot && !minimizedChatBot && (
            <div className="chatbot-container">
              <ThemeProvider theme={theme}>
              <ChatBot
                steps={[
                  {
                    id: '1',
                    message: 'Hi, how are you?',
                    trigger: '2',
                  },
                  {
                    id: '2',
                    user: true,
                    trigger: '3',
                  },
                  {
                    id: '3',
                    message: 'You said: {previousValue}',
                    trigger: '2',
                  },
                ]}
                handleEnd={handleEnd}
                botDelay={300}
                opened={showChatBot}
                hideUserAvatar 
                headerTitle="Arriane Gatpo"
                hideHeader={false}
                floating={true}
                floatingIcon={<RiChat1Line />}
                customHeaderComponent={<CustomHeaderTitle />}
                
              />
              </ThemeProvider>
            </div>
          )}
          {minimizedChatBot && (
            <div className="chatbot-minimized">
              <button className="chatbot-minimized-button" onClick={() => setMinimizedChatBot(false)}>
                <RiChat1Line className="chatbot-minimized-icon" />
              </button>
            </div>
          )}
          <Popup message={popupMessage} isVisible={popupVisible} onClose={() => setPopupVisible(false)} />
    </I18nextProvider>
    </>
  );
};

export default BuyerMarketplace;