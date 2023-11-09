import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerTransactionsCancelledComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { FaEdit, FaTrash, FaFolderOpen, FaArchive } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import React, { useState, useEffect } from 'react';



const AdminBuyerTransactionsCancelledComponent = () => {
  const { t } = useTranslation();
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [cartItems, setcartItems] = useState([]);

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
  
      // Filter orders with "Completed" status
      const completedcartItems = ordersData.filter((cartItems) =>
        cartItems.orders &&
        Array.isArray(cartItems.orders) &&
        cartItems.orders.length > 0 &&
        cartItems.orders.some((item) =>
          item && item.status === 'Cancelled'
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
    <div className="adminBuyerTransactionsCancelledComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsCancelledComponentMainPanel">
        <div className="adminBuyerTransactionsCancelledComponentTopSection">
          <div className="adminBuyerTransactionsCancelledComponentMainText">
            <b className="adminBuyerTransactionsCancelledComponentMainTextWrapper">
              <p className="adminBuyerTransactionsCancelledComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsCancelledComponentBlankLine">{t('ext199')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminBuyerTransactionsCancelledComponentCard">
          <div className="adminBuyerTransactionsCancelledComponentSubTitle">
            <FaFolderOpen /> {t('ext200')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsCancelledComponentShow">
          {t('ext201')}
            <select className="adminBuyerTransactionsCancelledComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsCancelledComponentRowSelect"
            type = "text"
            placeholder =   {t('ext202')}>                    
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
                                          <b>{t('ext203')}</b> {item.dateBought}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext204')}</b> {item.fullname}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext205')}</b> {item.category}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext206')}</b> {item.unit}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext207')}</b> {item.boughtQuantity}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext208')}</b> {item.price}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext209')}</b> {item.status}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext210')}</b> {item.location}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext211')}</b> {item.paymentMethod}
                                        </div>                                       
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p key={`noPendingItems-${cartItemIndex}`}>
                                 {t('ext214')}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p>{t('ext215')}</p>
                    )}
                        </div>
                    </div>                           
       
              <div className="adminBuyerTransactionsPendingComponentForumNumber">
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">1</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">2</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">3</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">4</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">5</div>
                </div>
                <div className="adminBuyerTransactionsPendingComponentForumContainer">
                  <div className="adminBuyerTransactionsPendingComponentForumNumberBox">6</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminBuyerTransactionsCancelledComponent;
