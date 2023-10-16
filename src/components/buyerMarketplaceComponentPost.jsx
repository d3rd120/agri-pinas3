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

const CustomHeaderTitle = styled.div`
  background-color: #557153;
  color: white;
  
`;

const BuyerMarketplace = () => {
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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [lastClickedProductId, setLastClickedProductId] = useState(null);
  const [cart, setCart] = useState([]); 

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
  
  
const handleProductClick = (productId) => {
  try {
    // Find the product based on productId
    const clickedProduct = productsData.find((product) => product.id === productId);

    if (clickedProduct) {
      console.log('Product clicked:', clickedProduct);
      setSelectedCategory(clickedProduct.category.toLowerCase());
      setSelectedProduct(clickedProduct);
    } else {
      console.warn(`Product with ID ${productId} not found.`);
      setSelectedProduct(null); // Set selectedProduct to null if product not found
    }
  } catch (error) {
    console.error('Error handling product click:', error);
  }
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

    // Filter products based on the selected category
    const filteredProducts = selectedCategory
      ? productsData.filter((product) => product.category.toLowerCase() === selectedCategory)
      : productsData;

    // Set the selected product based on the last clicked product ID
    const selectedProductFromClick = filteredProducts.find((product) => product.id === lastClickedProductId);

    // If a product was clicked, set it as the selected product
    if (selectedProductFromClick) {
      setSelectedProduct(selectedProductFromClick);
    } else {
      // If no product was clicked, find the clinic product
      const clickProduct = filteredProducts.find((product) => product.clickProduct);

      // Set the clinic product as the selected product
      if (clickProduct) {
        setSelectedProduct(clickProduct);
      } else {
    
        const firstProduct = filteredProducts[0];
        setSelectedProduct(firstProduct);
      }
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
};


  
  useEffect(() => {
    // Fetch products initially when the component loads
    fetchProducts();
  }, [selectedCategory, selectedProduct]); // Update the dependency array to include selectedProduct
  


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
            <div key={selectedProduct?.id} className="buyerMarketplaceComponentPostCard1">
               <img
              className="buyerMarketplaceComponentPostCard1Image"
              alt=""
              src={selectedProduct?.image}
                  />
                  </div>


                <div className="buyerMarketplaceComponentPostSmallCards">
                  <div className="buyerMarketplaceComponentPostSmallCardsDescription">
                    <div className="buyerMarketplaceComponentPostSmallCardsContent">
                      <div className="buyerMarketplaceComponentPostSmallCardsHeading">
                        <div className="buyerMarketplaceComponentPostSmallCardsDetails">
                          <b className="buyerMarketplaceComponentPostSmallCardsProductName">{selectedProduct?.cropName}</b>
                          <b className="buyerMarketplaceComponentPostSmallCardsBuyerName">{t('text101')} {selectedProduct?.farmer}</b>
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
                            {selectedProduct?.category.toLowerCase() === 'vegetable' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPagePrice')} </b>
                                  <span>{selectedProduct?.price}</span>
                                </p>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b>{t('buyerPageKilogram')} </b>
                                  <span className="buyerMarketplaceComponentPostCategory">{selectedProduct?.quantity}</span>
                                </p>
                              </>
                            )}
                            {selectedProduct?.category.toLowerCase() === 'fruits' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageFruitsCategoryDetail')} </b>

                                </p>
                              </>
                            )}
                            {selectedProduct?.category.toLowerCase() === 'fertilizer' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageFertilizerCategoryDetail')} </b>

                                </p>
                              </>
                            )}
                            {selectedProduct?.category.toLowerCase() === 'other' && (
                              <>
                                <p className="buyerMarketplaceComponentPostBlankLine">
                                  <b className="buyerMarketplaceComponentPostCategory">{t('buyerPageOtherCategoryDetail')} </b>

                                </p>
                              </>
                            )}
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
          <div id="popupMessage" className="popupMessage">
            <span className="popupText">{t('buyerPagePopup')}</span>
          </div>
          <Link to="/shoppingcart" onClick={() => handleAddToCart(selectedProduct)}>
          <button className="buyerMarketplaceComponentPostButton outlinedButton">
            <FaCartArrowDown className="buyerMarketplaceComponentPostButtonIcon" />
            <div className="buyerMarketplaceComponentPostButtonText">{t('text109')}</div>
          </button>
        </Link>
            <Link to="/checkout"onClick={() => handleAddToCart(selectedProduct)}>
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