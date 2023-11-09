import '../css/BuyerPage/buyerTransac.css';
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import React, { useState, useEffect } from 'react';
import {FaFolderOpen} from 'react-icons/fa';
import BuyerTransactionNav from '../components/buyerTransactionNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { FaEnvelope, FaCommentDots, FaTimes } from 'react-icons/fa';
import BuyerTransactionReport from '../components/buyerTransactionReport';
import { Link } from 'react-router-dom';

const BuyerTransanctionPending =  ({ sessionId }) => {
  const { t } = useTranslation();
  const [cartItems, setcartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const fetchCartItems = async () => {
    try {
      const ordersCollection = collection(db, 'Transaction');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
  
      // Filter orders with "Pending" status and valid sessionId
      const pendingcartItems = ordersData.filter((cartItems) =>
        cartItems.orders &&
        Array.isArray(cartItems.orders) &&
        cartItems.orders.length > 0 &&
        cartItems.orders.some((item) =>
          item && item.status === 'Pending' && item.sessionId === sessionId
        )
      );
  
      setcartItems(pendingcartItems);
      console.log('cartItems', pendingcartItems); // Log filtered cart items data to console
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  
  useEffect(() => {
    fetchCartItems();
  }, [sessionId]);
  
  

  // Function to chunk an array into groups of 2
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerTransaction">
        <BuyerNavigation />
        <div className="buyerTransactionMainPanel">
          <BuyerTopNav />
          <div className="buyerTransactionTopSection">
            <div className="buyerTransactionMainText">
              <b className="buyerTransactionMainTextWrapper">
                <p className="buyerTransactionBlankLine">{t('text90')}</p>
              </b>
            </div>
          </div>
          <BuyerTransactionNav />

          <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle">
              <FaFolderOpen /> {t('text91')}
            </div>
            <br></br>         
            <br></br>

            <div className="buyerTransactionMiddleSection">
  <div className="buyerTransactionFrameParent">
    {cartItems && cartItems.length > 0 ? (
      chunkArray(cartItems, 1).map((cartItemGroup, index) => (
        <div className="adminFarmerTransactionsPendingComponentFrameWrapper" key={index}>
          {cartItemGroup.map((cartItem, cartItemIndex) => (
            <div key={cartItemIndex} className="adminFarmerTransactionsPendingComponentRectangleParent">
              {cartItem.orders && cartItem.orders.length > 0 ? (
                cartItem.orders.map((item, itemIndex) => (
                  <div key={itemIndex} className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <img
                      className="adminFarmerTransactionsPendingComponentFrameChild"
                      alt=""
                      src={item.image}
                    />
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{item.cropName}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text93')}</b> {item.dateBought}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text94')}</b> {item.fullname}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text95')}</b> {item.category}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text96')}</b> {item.unit}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text97')}</b> {item.boughtQuantity}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text98')}</b> {item.price}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Status: ')}</b> {item.status}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Location: ')}</b> {item.location}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Payment Method : ')}</b> {item.paymentMethod}
                        </div>
                        <div className="adminMarketplaceComponentFrameItem" />
                        <div className="adminMarketplaceComponentDetails">
                        <Link className="adminMarketplaceComponentButton" to="/messaging" style={{ textDecoration: 'none' }}>
                          <FaCommentDots className="adminMarketplaceComponentButtonIcon" />
                          <div className="adminMarketplaceComponentButtonText">{t('Contact')}</div>
                        </Link>
                          <button className="adminMarketplaceComponentButton" onClick={handleButtonClick}>
                            <FaEnvelope className="adminMarketplaceComponentButtonIcon" />
                            <div className="adminMarketplaceComponentButtonText">{t('Report')}</div>
                          </button>

                          {showPopup && (
                            <div id="buyerCommunityForumComponentPopupWindow" className="buyerCommunityForumComponentPopupWindow">
                              <div className="buyerCommunityForumComponentPopupContent">
                                <span className="buyerCommunityForumComponentCloseButton" onClick={closePopup}>
                                  <FaTimes />
                                </span>
                                <BuyerTransactionReport />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in this order</p>
              )}
            </div>
          ))}
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
</div>

<div className="adminFarmerTransactionsPendingComponentForumNumber">
                  <div className="adminFarmerTransactionsPendingComponentForumContainer">
                    <div className="adminFarmerTransactionsPendingComponentForumNumberBox">1</div>
                  </div>
                  <div className="adminFarmerTransactionsPendingComponentForumContainer">
                    <div className="adminFarmerTransactionsPendingComponentForumNumberBox">2</div>
                  </div>
                  <div className="adminFarmerTransactionsPendingComponentForumContainer">
                    <div className="adminFarmerTransactionsPendingComponentForumNumberBox">3</div>
                  </div>
                  <div className="adminFarmerTransactionsPendingComponentForumContainer">
                    <div className="adminFarmerTransactionsPendingComponentForumNumberBox">4</div>
                  </div>
                  <div className="adminFarmerTransactionsPendingComponentForumContainer">
                    <div className="adminFarmerTransactionsPendingComponentForumNumberBox">5</div>
                  </div>
                  <div className="adminFarmerTransactionsPendingComponentForumContainer">
                    <div className="adminFarmerTransactionsPendingComponentForumNumberBox">6</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
     
    </I18nextProvider>
  );
};

export default BuyerTransanctionPending;