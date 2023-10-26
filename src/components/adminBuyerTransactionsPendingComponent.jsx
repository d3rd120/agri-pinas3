import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerPendingTransactionsComponent.css";
import AdminTransactionsUpdateComponent from '../components/adminTransactionsUpdateComponent';
import AdminTransactionsDeleteComponent from '../components/adminTransactionsDeleteComponent';
import AdminNavigation from '../components/adminPageNavigation';
import SitawVector from '../img/sitaw.png';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaFolderOpen, FaTimes, FaArchive } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const AdminBuyerTransactionsPendingComponent = () => {
  
  const { t } = useTranslation();
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'Transaction');
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
        console.log('orders',ordersData); // Log orders data to console
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchOrders();
  }, []);



  return (

    
    <I18nextProvider i18n={i18n}> 
    <div className="adminBuyerTransactionsPendingComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsPendingComponentMainPanel">
        <div className="adminBuyerTransactionsPendingComponentTopSection">
          <div className="adminBuyerTransactionsPendingComponentMainText">
            <b className="adminBuyerTransactionsPendingComponentMainTextWrapper">
              <p className="adminBuyerTransactionsPendingComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsPendingComponentBlankLine">{t('text183')}</p>
            </b>
          </div>
        </div>
        
        {showPopup1 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup1}
                >
                  <FaTimes />
                </span>
                <AdminTransactionsUpdateComponent/>
              </div>
            </div>
          )}    

            {showPopup2 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup2}
                >
                  <FaTimes />
                </span>
                <AdminTransactionsDeleteComponent/>
              </div>
            </div>
          )}    
        <TransactionsNav />

        <div className="adminBuyerTransactionsPendingComponentCard">
          <div className="adminBuyerTransactionsPendingComponentSubTitle">
            <FaFolderOpen /> {t('text226')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsPendingComponentShow">
          {t('text188')}
            <select className="adminBuyerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsPendingComponentRowSelect"
            type = "text"
            placeholder = {t('text189')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminBuyerTransactionsPendingComponentMiddleSection">
            <div className="adminBuyerTransactionsPendingComponentFrameParent">


            <div className="adminBuyerTransactionsCompletedComponentFrameWrapper">
              {orders.map((order, index) => (
          <div key={index} className="adminFarmerTransactionsPendingComponentRectangleParent">
            {order.cart.map((item, itemIndex) => (
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
                    <b>{t('text93')}</b> {new Date(order.timestamp.seconds * 1000).toLocaleString()}
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
                      <b>{t('text97')} </b> {item.quantity}
                    </div>
                    <div className="adminFarmerTransactionsPendingComponentSubText2">
                      <b>{t('text98')}</b> {item.price}
                    </div>
                    <div className="adminFarmerTransactionsPendingComponentSubText2">
                      <b>{t('text99')}</b> {item.status}
                    </div>
                    <div className="adminBuyerTransactionsPendingComponentFrameItem" />
                    <div className="adminBuyerTransactionsPendingComponentDetails">
                    <button className="adminBuyerTransactionsPendingComponentButton"
                     onClick={handleButtonClick1}>
                        <FaArchive className="adminBuyerTransactionsPendingComponentButtonIcon"
                          />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('Archive')}</div>
                      </button>
                      <button className="adminBuyerTransactionsPendingComponentButton"
                       onClick={handleButtonClick2}>
                        <FaTrash className="adminBuyerTransactionsPendingComponentButtonIcon"                         />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('text200')}</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
                  </div>             
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

export default AdminBuyerTransactionsPendingComponent;
