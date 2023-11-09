import TransactionsNav from '../components/adminFarmerTransactionsNavigation';
import "../css/Components/adminFarmerTransactionsCompletedComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import React, { useState, useEffect } from 'react';
import CornVector from '../img/cornVector.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminFarmerTransactionsCompletedComponent = () => {
  const { t } = useTranslation();
  const [cartItems, setcartItems] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

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


  const fetchCartItems = async () => {
    try {
      const ordersCollection = collection(db, 'Transaction');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
  
      // Filter orders with "Pending" status and valid sessionId
      const completedcartItems = ordersData.filter((cartItems) =>
      cartItems.orders &&
      Array.isArray(cartItems.orders) &&
      cartItems.orders.length > 0 &&
      cartItems.orders.some((item) =>
        item && item.status === 'Completed'
      )
    );

    setcartItems(completedcartItems);
    console.log('cartItems', completedcartItems); // Log filtered cart items data to console
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};
  
  useEffect(() => {
    fetchCartItems();
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };


  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminFarmerTransactionsCompletedComponent">
      <AdminNavigation />
      <div className="adminFarmerTransactionsCompletedComponentMainPanel">
        <div className="adminFarmerTransactionsCompletedComponentTopSection">
          <div className="adminFarmerTransactionsCompletedComponentMainText">
            <b className="adminFarmerTransactionsCompletedComponentMainTextWrapper">
              <p className="adminFarmerTransactionsCompletedComponentBlankLine">&nbsp;</p>
              <p className="adminFarmerTransactionsCompletedComponentBlankLine">{t('text183')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminFarmerTransactionsCompletedComponentCard">
          <div className="adminFarmerTransactionsCompletedComponentSubTitle">
            <FaFolderOpen /> {t('text187')}
          </div>
          <br></br>
          <div className="adminFarmerTransactionsCompletedComponentShow">
          {t('text188')}
            <select className="adminFarmerTransactionsCompletedComponentRowSelect" onChange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminFarmerTransactionsCompletedComponentRowSelect"
            type = "text"
            placeholder = {t('text189')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminFarmerTransactionsPendingComponentMiddleSection">
            <div className="adminFarmerTransactionsPendingComponentFrameParent">         
             
               
                    {cartItems && cartItems.length > 0 ? (
                      chunkArray(cartItems, 1).map((cartItemGroup, index) => (
                        <div
                          className="adminFarmerTransactionsPendingComponentFrameWrapper"
                          key={index}
                        >
                          {cartItemGroup.map((cartItem, cartItemIndex) => (
                            <div
                              key={cartItemIndex}
                              className="adminFarmerTransactionsPendingComponentRectangleParent"
                            >
                              {cartItem.orders && cartItem.orders.length > 0 ? (
                                cartItem.orders.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="adminFarmerTransactionsPendingComponentFrameGroup"
                                  >
                                    <img
                                      className="adminFarmerTransactionsPendingComponentFrameChild"
                                      alt=""
                                      src={item.image}
                                    />
                                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                                        <b className="adminFarmerTransactionsPendingComponentSubText1">
                                          {item.cropName}
                                        </b>
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
                                        <div className="adminFarmerTransactionsPendingComponentFrameItem" />
                                        <div className="adminFarmerTransactionsPendingComponentDetails">
                                          <button
                                            className="adminFarmerTransactionsPendingComponentButton"
                                            onClick={handleButtonClick1}
                                          >
                                            <FaEdit className="adminFarmerTransactionsPendingComponentButtonIcon" />
                                            <div className="adminFarmerTransactionsPendingComponentButtonText">
                                              {t('text199')}
                                            </div>
                                          </button>
                                          <button
                                            className="adminFarmerTransactionsPendingComponentButton"
                                            onClick={handleButtonClick2}
                                          >
                                            <FaTrash className="adminFarmerTransactionsPendingComponentButtonIcon" />
                                            <div className="adminFarmerTransactionsPendingComponentButtonText">
                                              {t('text200')}
                                            </div>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p key={`noPendingItems-${cartItemIndex}`}>
                                  No completed items in this group
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p>No completed items</p>
                    )}
                 
       
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
      </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactionsCompletedComponent;
