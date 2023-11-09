import TransactionsNav from '../components/adminBuyerTransactionsNavigation';
import "../css/Components/adminBuyerTransactionsCompletedComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaFolderOpen, FaTimes, FaArchive } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminBuyerTransactionsCompletedComponent = () => {
  const { t } = useTranslation();
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [cartItems, setcartItems] = useState([])

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
    <div className="adminBuyerTransactionsCompletedComponent">
      <AdminNavigation />
      <div className="adminBuyerTransactionsCompletedComponentMainPanel">
        <div className="adminBuyerTransactionsCompletedComponentTopSection">
          <div className="adminBuyerTransactionsCompletedComponentMainText">
            <b className="adminBuyerTransactionsCompletedComponentMainTextWrapper">
              <p className="adminBuyerTransactionsCompletedComponentBlankLine">&nbsp;</p>
              <p className="adminBuyerTransactionsCompletedComponentBlankLine">{t('text183')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminBuyerTransactionsCompletedComponentCard">
          <div className="adminBuyerTransactionsCompletedComponentSubTitle">
            <FaFolderOpen /> {t('text187')}
          </div>
          <br></br>
          <div className="adminBuyerTransactionsCompletedComponentShow">
          {t('text188')}
            <select className="adminBuyerTransactionsCompletedComponentRowSelect" onchange="updateRows(this.value)">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <input 
            className="adminBuyerTransactionsCompletedComponentRowSelect"
            type = "text"
            placeholder ={t('text189')}>                    
            </input>
          </div>
          <br></br>

          <div className="adminBuyerTransactionsPendingComponentMiddleSection">
            <div className="adminBuyerTransactionsPendingComponentFrameParent">
            <div className="adminBuyerTransactionsCompletedComponentFrameWrapper">
            {cartItems && cartItems.map((cartItem, index) => (
          <div key={index} className="adminFarmerTransactionsPendingComponentRectangleParent">
            {cartItem.orders && cartItem.orders.map((item, itemIndex) => (
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
                    </div>
                    <div className="adminBuyerTransactionsPendingComponentFrameItem" />
                    <div className="adminBuyerTransactionsPendingComponentDetails">
                      <button
                        className="adminBuyerTransactionsPendingComponentButton"
                        onClick={handleButtonClick1}
                      >
                        <FaArchive className="adminBuyerTransactionsPendingComponentButtonIcon" />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('Archive')}</div>
                      </button>
                      <button
                        className="adminBuyerTransactionsPendingComponentButton"
                        onClick={handleButtonClick2}
                      >
                        <FaTrash className="adminBuyerTransactionsPendingComponentButtonIcon" />
                        <div className="adminBuyerTransactionsPendingComponentButtonText">{t('text200')}</div>
                      </button>
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

export default AdminBuyerTransactionsCompletedComponent;
