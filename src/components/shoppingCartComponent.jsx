import React, { useState, useEffect } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import RiceVector from '../img/riceCardImage.png';
import TomatoVector from '../img/tomatoVector.png';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { db, auth } from './firebase';
import {
  doc,
  getDoc,

} from "firebase/firestore"; 

const ShoppingCart = (props) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [cart, setCart] = useState([]);

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

 const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = (price, quantity) => {
    const numericPrice = Number(price);
  
    if (isNaN(numericPrice)) {
      console.error(`Invalid price: ${price}`);
      return "N/A"; // or any default value you prefer
    }
  
    return (numericPrice * quantity).toFixed(2);
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleModalConfirm = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setItemToRemove(null);
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
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
                  <td>{item.quantity}</td>
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
                      setItemToRemove(item.id);
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
                <Link to="/checkout" className="ordercheckoutButton2">
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
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost'style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image" 
                alt=""
                src={TomatoVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerCartText12')}</div>
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
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerCartText13')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱3,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={RiceVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerCartText14')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱2,000</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

	</div>
</div>
</I18nextProvider>
      
  );
};

export default ShoppingCart;