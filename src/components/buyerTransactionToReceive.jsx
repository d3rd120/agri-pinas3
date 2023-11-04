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

const BuyerTransanctionPending = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'Transaction');
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
        console.log('orders', ordersData); // Log orders data to console
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

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
            <div className="adminBuyerTransactionsPendingComponentShow">
          {t('Search: ')}         
            <input 
            className="adminBuyerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('text189')}>                    
            </input>
          </div>
                
            <br></br>

            <div className="buyerTransactionMiddleSection">
              <div className="buyerTransactionFrameParent">
                {orders && orders.length > 0 ? (
                  chunkArray(orders, 1).map((orderGroup, index) => (
                    <div className="adminFarmerTransactionsPendingComponentFrameWrapper" key={index}>
                      {orderGroup.map((order, orderIndex) => (
                        <div key={orderIndex} className="adminFarmerTransactionsPendingComponentRectangleParent">
                          {order.cart && order.cart.length > 0 ? (
                            order.cart.map((item, itemIndex) => (
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
                                <b>{t('text93')}</b> {order.timestamp && order.timestamp.seconds
                                    ? new Date(order.timestamp.seconds * 1000).toLocaleString()
                                    : t('timestampNotAvailable')}
                                </div>
                                <div className="adminFarmerTransactionsPendingComponentSubText2">
                                  <b>{t('text94')}</b> {item.farmer}
                                </div>
                                <div className="adminFarmerTransactionsPendingComponentSubText2">
                                  <b>{t('text95')}</b> {item.category}
                                </div>
                                <div className="adminFarmerTransactionsPendingComponentSubText2">
                                  <b>{t('text96')}</b> {item.unit}
                                </div>
                                <div className="adminFarmerTransactionsPendingComponentSubText2">
                                  <b>{t('text97')}</b> {item.quantity}
                                </div>
                                <div className="adminFarmerTransactionsPendingComponentSubText2">
                                  <b>{t('text98')}</b> {item.price}
                                </div>
                              </div>
                              <div className="adminMarketplaceComponentFrameItem" />
                                <div className="adminMarketplaceComponentDetails">
                                  <button className="adminMarketplaceComponentButton">
                                    <FaCommentDots className="adminMarketplaceComponentButtonIcon" />
                                    <div className="adminMarketplaceComponentButtonText">{t('Contact')}</div>
                                  </button>                                                  
                                  <button 
                                  className="adminMarketplaceComponentButton"
                                  onClick={handleButtonClick}>
                                    <FaEnvelope className="adminMarketplaceComponentButtonIcon" />
                                    <div className="adminMarketplaceComponentButtonText">{t('Report')}</div>
                                  </button>
                                  
                                  {showPopup && (
                                          <div
                                            id="buyerCommunityForumComponentPopupWindow"
                                            className="buyerCommunityForumComponentPopupWindow"
                                          >
                                            <div className="buyerCommunityForumComponentPopupContent">
                                              <span
                                                className="buyerCommunityForumComponentCloseButton"
                                                onClick={closePopup}
                                              >
                                                  <FaTimes />
                                          </span>
                                          <BuyerTransactionReport/>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p></p>
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
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default BuyerTransanctionPending;