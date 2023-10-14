import React, { useState } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import RiceVector from '../img/riceCardImage.png';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const ShoppingCart = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null); // Added state for the item to remove

  const removeItem = (itemId) => {
    // Use the filter method to create a new cart without the item to be removed
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const initialCart = [
    {
      id: 1,
      product: 'Product 1',
      price: 10.00,
      quantity: 1,
      image: RiceVector
    },
    {
      id: 2,
      product: 'Product 2',
      price: 15.00,
      quantity: 1,
      image: OnionVector
    },
  ];

  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleModalConfirm = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setItemToRemove(null); // Reset the itemToRemove state
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
                <p className="buyerCommunityForumComponentBlankLine">{t('text74')}</p>
              </b>
            </div>
          </div>

          <div className="payment-details2">
            
            <h2>{t('text75')}</h2>
            <div>
              Romeo London III | 09214674223             
            </div>
            <div>
              551 F Jhocson St.
            </div>
            <div>
              Sampaloc, Manila, 1008 Metro Manila
            </div>  
            &nbsp;    
            <Link to="/checkout" className="ordercheckoutButton2">
            {t('text76')}
                </Link>                        
          </div>


          <div className="cart">
            <div className="cart-container">
              <table>


                <thead>
                  <tr>
                    <th>{t('text77')}</th>
                    <th>{t('text78')}</th>
                    <th>{t('text79')}</th>
                    <th>{t('text80')}</th>               
                  </tr>
                </thead>


                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="product-info">
                          <img src={item.image} alt={item.product} />
                          <span>{item.product}</span>
                        </div>
                      </td>
                      <td>₱{item.price.toFixed(2)}</td>
                      <td>                        
                        <span>{item.quantity}</span>                        
                      </td>
                      <td>₱{calculateSubtotal(item.price, item.quantity)}</td>                   
                    </tr>
                  ))}                  
                </tbody>
              </table>    
           
            </div>
          </div>
          <div className="payment-details"> {/* Apply the CSS class */}
            <h2>{t('text81')}</h2>
            <div>
              <strong>{t('text82')}</strong> {t('text83')}
            </div>
            <div>
              <strong>{t('text84')}</strong> ₱20.00
            </div>
            <div>
              <strong>{t('text85')}</strong> ₱20.00
            </div>
            <div className="buttonWrapper">
                <Link to="/checkout" className="ordercheckoutButton2">
                {t('text86')}
                </Link>            
              </div>
          </div>

             

          {showModal && (
            <div className="modalBackdrop">
              <div className="modal1">
                <div className="modalContent">
                  <h3>Do you want to remove this item?</h3>
                  <div className="buttonContainer">
                    <br></br>
                    <button className="confirmButton" onClick={handleModalConfirm}>
                      Yes
                    </button>
                    <button className="cancelButton" onClick={handleModalCancel}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
	</div>
</div>
</I18nextProvider>
      
  );
};

export default ShoppingCart;