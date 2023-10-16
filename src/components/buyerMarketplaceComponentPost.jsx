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
import {Link} from 'react-router-dom';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import { collection, getDocs, setDoc, getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const CustomHeaderTitle = styled.div`
  background-color: #557153;
  color: white;
  
`;

const BuyerMarketplace = ({ match = {} }) => {
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
        // Handle the case where the user is not logged in
        alert("Please log in to add items to your cart.");
        return;
      }
  
      // Create a reference to the user's cart in the Firestore database
      const userCartRef = doc(db, 'UserCarts', user.uid);
  
      // Get the current cart data
      const userCartSnapshot = await getDoc(userCartRef);
      const currentCart = userCartSnapshot.exists() ? userCartSnapshot.data().cart : [];
  
      // Check if the product is already in the cart
      const existingItemIndex = currentCart.findIndex((item) => item.productId === product.productId);
  
      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // If the product is not in the cart, add it
        currentCart.push({ ...product, quantity: 1 });
      }
  
      // Update the cart in the database
      await setDoc(userCartRef, { cart: currentCart });
  
      // Notify the user that the item has been added to the cart
      alert(`${product.cropName} added to your cart!`);
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the item to your cart. Please try again.");
    }
  };
  
  
 useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        console.error('Invalid productId');
        return;
      }

      const productRef = doc(db, 'Marketplace', productId);

      try {
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          const productData = productDoc.data();
          setProduct(productData);
          setSelectedProduct(productData); // Set the selectedProduct
        } else {
          console.warn('Product not found.');
        }
      } catch (error) {
        console.error('Error retrieving product details:', error);
      }
    };

    // Log productId for debugging
    console.log('productId:', productId);

    // Fetch product details when the component mounts or when productId changes
    fetchProductDetails();
  }, [productId]);
  
  if (!product) {
    return <div>Loading...</div>; // You can display a loading state while fetching data
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
                <p className="buyerCommunityForumComponentBlankLine">{t('buyerPageNavigationText1')}</p>
              </b>
            </div>
          </div>


          <div className="buyerMarketplaceComponentPostMiddleSection">
            <div className="buyerMarketplaceComponentPostCardsContainer">
            <div key={product.id} className="buyerMarketplaceComponentPostCard1">
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
                          <b className="buyerMarketplaceComponentPostSmallCardsProductName">{product.cropName}</b>
                          <b className="buyerMarketplaceComponentPostSmallCardsBuyerName">{t('buyerPageUserRole2')} {product.fullname}</b>
                        </div>
                        
                        <div className="buyerMarketplaceComponentPostSmallCardsDescriptionWrapper">
                          <div className="buyerMarketplaceComponentPostSmallCardsFullDescription">
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('buyerPageCategory')} </b>
                              <span className="buyerMarketplaceComponentPostBlankLine">{product.category}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('buyerPagePackaging')} </b>
                              <span className="buyerMarketplaceComponentPostCategory">{product.quantity}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('Price: ')}</b>
                              <span className="buyerMarketplaceComponentPostCategory">{product.price}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('Location: ')} </b>
                              <span className="buyerMarketplaceComponentPostCategory">{product.location}</span>
                            </p>
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b>{t('Unit: ')} </b>
                              <span className="buyerMarketplaceComponentPostCategory">{product.unit}</span>
                            </p>
                            {product.category.toLowerCase() === 'vegetable' && (
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
                            )}
                            <p className="buyerMarketplaceComponentPostBlankLine">
                              <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageDescription')} </b>
                              <span>{product.description}</span>
                            </p>
                          </div>
                        </div>
                      
    <div className="buyerMarketplaceComponentPostButtonContainer">
        <div className="buyerMarketplaceComponentPostButtonRow">
          <button className="buyerMarketplaceComponentPostButton outlinedButton" onClick={handleChatButtonClick}>
            <FaCommentDots className="buyerMarketplaceComponentPostButtonIcon" />
            <div className="buyerMarketplaceComponentPostButtonText">{t('farmerPageButton14')}</div>
          </button>
          <div id="popupMessage" className="popupMessage">
            <span className="popupText">{t('buyerPagePopup')}</span>
          </div>
          <Link to="/shoppingcart" onClick={() => handleAddToCart(selectedProduct)}>
          <button className="buyerMarketplaceComponentPostButton outlinedButton">
            <FaCartArrowDown className="buyerMarketplaceComponentPostButtonIcon" />
            <div className="buyerMarketplaceComponentPostButtonText">{t('farmerPageButton15')}</div>
          </button>
        </Link>
            <Link to="/checkout"onClick={() => handleAddToCart(selectedProduct)}>
            <button className="buyerMarketplaceComponentPostButton1">
              <div className="buyerMarketplaceComponentPostButtonText1">{t('farmerPageButton16')}</div>
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
          <div className="buyerMarketplaceComponentPostButtonNewTitle">{t('buyerPageDescriptionText3')}</div>
          <div className="buyerMarketplaceComponentPostButtonNewCourses">
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost'style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image" 
                alt=""
                src={TomatoVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerPageDescriptionText4')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱5,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={OnionVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerPageDescriptionText5')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱3,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={talong}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerPageDescriptionText6')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱2,000</div>
                  </div>
                </div>
              </div>
            </Link>
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
    </I18nextProvider>
    </>
  );
};

export default BuyerMarketplace;