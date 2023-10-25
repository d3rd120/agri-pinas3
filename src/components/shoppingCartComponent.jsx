import React, { useState, useEffect } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import RiceVector from '../img/riceCardImage.png';
import ProfileVector2 from '../img/profileVector2.png';
import { Link, NavLink } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  setDoc
} from "firebase/firestore"; 
import Popup from './validationPopup';

const ShoppingCart = (props) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [cart, setCart] = useState([]);
  const userUid = sessionStorage.getItem('userUid');
  const sessionId = sessionStorage.getItem('sessionId');
  const [products, setProducts] = useState([]);
  const [lastClickedProductId, setLastClickedProductId] = useState(null);
  const [isCartEmptyPopupVisible, setIsCartEmptyPopupVisible] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userCartRef = doc(db, 'UserCarts', user.uid);
          const userCartSnapshot = await getDoc(userCartRef);
          const userCartData = userCartSnapshot.data();
  
          if (userCartData && userCartData.cart) {
           
            setCart(userCartData.cart);
          }
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
  
    fetchCartData();
  }, []);
  

  const updateQuantity = async (id, newQuantity) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userCartRef = doc(db, 'UserCarts', user.uid);
        const userCartSnapshot = await getDoc(userCartRef);
        const userCartData = userCartSnapshot.data();
  
        if (userCartData && userCartData.cart) {
          const existingItemIndex = userCartData.cart.findIndex(
            (item) => item.id === id
          );
  
          if (existingItemIndex !== -1) {
          
            const updatedCart = [...userCartData.cart];
            updatedCart[existingItemIndex].quantity = newQuantity;
  
       
            await updateDoc(userCartRef, { cart: updatedCart });
  
          
            setCart(updatedCart);
          } else {
         
            const newItem = userCartData.cart.find((item) => item.id === id);
            newItem.quantity = newQuantity;
  
            const updatedCart = [...userCartData.cart, newItem];
  
           
            await updateDoc(userCartRef, { cart: updatedCart });
  
           
            setCart(updatedCart);
          }
        }
      }
    } catch (error) {
      console.error('Error updating quantity in Firestore:', error);
    }
  };
  

  const deleteProductFromCart = async (productId) => {
    console.log('deleteProductFromCart called with productId:', productId);
  
    const user = auth.currentUser;
  
    try {
      if (user) {
        const userCartRef = doc(db, 'UserCarts', user.uid);
        console.log('userCartRef:', userCartRef);
  
        
        const userCartSnapshot = await getDoc(userCartRef);
        const userCartData = userCartSnapshot.data();
  
  
        if (userCartData && userCartData.cart) {
          const updatedFirestoreCart = userCartData.cart.filter((item) => item.productId !== productId);
          await setDoc(userCartRef, { cart: updatedFirestoreCart }, { merge: true });
          setCart(updatedFirestoreCart);
        } else {
          console.warn('No cart data found in Firestore.');
        }
      } else {
        console.error('User not authenticated. Item removal aborted.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message || error);
    }
  };
  
  
  
  
  
  

  const calculateSubtotal = (price, quantity) => {
    const numericPrice = Number(price);

    if (isNaN(numericPrice)) {
      console.error(`Invalid price: ${price}`);
      return 'N/A';
    }

    return (numericPrice * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  const handleModalConfirm = () => {
    if (itemToRemove) {
      deleteProductFromCart(itemToRemove);
      setItemToRemove(null);
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
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
                <p className="buyerCommunityForumComponentBlankLine">{t('text61')}</p>
              </b>
            </div>
          </div>

          <div className="cart">
            <div className="cart-container">
              <table>
                <thead>
                  <tr>
                    <th>{t('text62')}</th>
                    <th>{t('text63')}</th>
                    <th>{t('text64')}</th>
                    <th>{t('text65')}</th>
                    <th>{t('text66')}</th>
                  </tr>
                </thead>
                
                <tbody>
                {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <img src={item.image} alt={item.cropName} />
                      <span>{item.cropName}</span>
                    </div>
                  </td>
                  <td>{item.price}</td>
                  
                  <td>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td>₱{calculateSubtotal(item.price, item.quantity)}</td>
                  <td>
                    <button onClick={() => {
                      setItemToRemove(item.productId);
                      setShowModal(true);
                    }}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
              </table>

              <div className="total">{t('text67')}{calculateTotal()}</div>
              <div className="buttonWrapper">
              <Link
              to={cart.length > 0 ? "/checkout" : "#"}
              onClick={() => {
                if (cart.length === 0) {
                  setIsCartEmptyPopupVisible(true);
                }
              }}
              className="ordercheckoutButton2"
            >
                  {t('text68')}
                </Link>
                <Link to="/buyermarketplace" className="ordercheckoutButton2">
                {t('text69')}
                </Link>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="modalBackdrop">
              <div className="modal1">
                <div className="modalContent">
                  <h3>{t('text70')}</h3>
                  <div className="buttonContainer">
                    <br></br>
                    <button className="confirmButton" onClick={handleModalConfirm}>
                    {t('text71')}
                    </button>
                    <button className="cancelButton" onClick={handleModalCancel}>
                    {t('text72')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


      <div className="buyerMarketplaceComponentPostButtonNew">
          <div className="buyerMarketplaceComponentPostButtonNewTitle">{t('text73')}</div>
          <div className="buyerMarketplaceComponentPostButtonNewCourses">
          {products.map((product) => (
              <Link
                key={product.id}
                className="buyerMarketplaceComponentPostButtonNewCard1"
                to={`/buyermarketplacepost/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  className="buyerMarketplaceComponentPostButtonNewCard1Image"
                  alt=""
                  src={product.image}
                />
                <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                      <div className="buyerMarketplaceComponentPostButtonNewCard1Title">
                        {product.cropName}
                      </div>                  
                    </div>
                  </div>
                </div>
              </Link>
            ))}

        <Popup
        message="Your cart is empty. Please add items to your cart before proceeding to checkout."
        onClose={() => setIsCartEmptyPopupVisible(false)}
        isVisible={isCartEmptyPopupVisible}
      />
          </div>
        </div>

	</div>
</div>
</I18nextProvider>
      
  );
};

export default ShoppingCart;