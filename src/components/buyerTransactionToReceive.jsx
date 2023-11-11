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
import { db, auth } from './firebase';
import { FaEnvelope, FaCommentDots, FaTimes } from 'react-icons/fa';
import BuyerTransactionReport from '../components/buyerTransactionReport';
import { Link } from 'react-router-dom';

const BuyerTransanctionPending =  ({ sessionId }) => {
  const { t } = useTranslation();
  const [cartItems, setcartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can change this value based on your preference

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const fetchCartItems = async () => {
    try {
      const user = auth.currentUser;
  
      if (!user) {
        // console.log('User is not authenticated.');
        return;
      }
  
      const userId = user.uid;
      // console.log('User ID:', userId);
  
      const ordersCollection = collection(db, 'Transaction');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
  
      // console.log('All orders data:', ordersData);
  
      // Filter orders for the current user with "Pending" status
      const userOrders = ordersData.filter((order) => {
        return (
          order.userId === userId &&
          order.orders &&
          order.orders.some((item) => item.status === 'Pending')
        );
      });
  
      // console.log('User-specific orders:', userOrders);
      setcartItems(userOrders);
    } catch (error) {
      // console.error('Error fetching cart items:', error);
    }
  };
  
  
  
  
  
const filteredCartItems = cartItems.filter((cartItem) =>
cartItem.orders.some(
  (item) =>
    item.cropName.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.dateBought.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.category.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.boughtQuantity.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.price.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.status.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.location.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.paymentMethod.toLowerCase().includes(searchInput.toLowerCase())
)
);


// Calculate the indexes for the items to display on the current page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredCartItems.slice(indexOfFirstItem, indexOfLastItem);
const pageNumbers = Math.ceil(filteredCartItems.length / itemsPerPage);


  
  
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
                <p className="buyerTransactionBlankLine">{t('ext338')}</p>
              </b>
            </div>
          </div>
          <BuyerTransactionNav />

          <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle">
              <FaFolderOpen /> {t('ext339')}
            </div>
            <br></br>         
            <div className="adminBuyerTransactionsPendingComponentShow">
          {t('ext201')}
          
          <select
              className="adminBuyerTransactionsPendingComponentRowSelect"
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1); // Reset to the first page when changing the number of items per page
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>



            <input
                className="adminBuyerTransactionsPendingComponentRowSelect"
                type="text"
                placeholder={t('ext202')}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>


          </div>
          <br></br>

            <div className="buyerTransactionMiddleSection">
  <div className="buyerTransactionFrameParent">


     {filteredCartItems && filteredCartItems.length > 0 ? (
                           chunkArray(currentItems, 1).map((cartItemGroup, index) => (
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
                          <b>{t('ext340')}</b> {item.dateBought}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext341')}</b> {item.fullname}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext342')}</b> {item.category}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext343')}</b> {item.unit}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext344')}</b> {item.boughtQuantity}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext345')}</b> {item.price}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext346')}</b> {item.status}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext347')}</b> {item.location}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('ext348')}</b> {item.paymentMethod}
                        </div>
                        <div className="adminMarketplaceComponentFrameItem" />
                        <div className="adminMarketplaceComponentDetails">
                        <Link className="adminMarketplaceComponentButton" to="/messaging" style={{ textDecoration: 'none' }}>
                          <FaCommentDots className="adminMarketplaceComponentButtonIcon" />
                          <div className="adminMarketplaceComponentButtonText">{t('ext349')}</div>
                        </Link>
                          <button className="adminMarketplaceComponentButton" onClick={handleButtonClick}>
                            <FaEnvelope className="adminMarketplaceComponentButtonIcon" />
                            <div className="adminMarketplaceComponentButtonText">{t('ext350')}</div>
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
                <p>{t('ext351')}</p>
              )}
            </div>
          ))}
        </div>
      ))
    ) : (
      <p>{t('ext352')}</p>
    )}
  </div>
</div>
                    <div className="adminFarmerTransactionsPendingComponentForumNumber">
                      {Array.from({ length: pageNumbers }, (_, index) => (
                        <div
                          key={index}
                          className="adminFarmerTransactionsPendingComponentForumContainer"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          <div className="adminFarmerTransactionsPendingComponentForumNumberBox">{index + 1}</div>
                        </div>
                      ))}
                    </div>  


              </div>
            </div>
          </div>
     
    </I18nextProvider>
  );
};

export default BuyerTransanctionPending;