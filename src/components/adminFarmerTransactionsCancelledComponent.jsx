import TransactionsNav from '../components/adminFarmerTransactionsNavigation';
import "../css/Components/adminFarmerTransactionsCancelledComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AdminFarmerTransactionsCancelledComponent = () => {
  const { t } = useTranslation();
  const [cartItems, setcartItems] = useState([]);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can change this value based on your preference
 

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
        item && item.status === 'Cancelled'
      )
    );

    setcartItems(completedcartItems);
    // console.log('cartItems', completedcartItems); // Log filtered cart items data to console
  } catch (error) {
    // console.error('Error fetching cart items:', error);
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


  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminFarmerTransactionsCancelledComponent">
      <AdminNavigation />
      <div className="adminFarmerTransactionsCancelledComponentMainPanel">
        <div className="adminFarmerTransactionsCancelledComponentTopSection">
          <div className="adminFarmerTransactionsCancelledComponentMainText">
            <b className="adminFarmerTransactionsCancelledComponentMainTextWrapper">
              <p className="adminFarmerTransactionsCancelledComponentBlankLine">&nbsp;</p>
              <p className="adminFarmerTransactionsCancelledComponentBlankLine">{t('ext180')}</p>
            </b>
          </div>
        </div>
        <TransactionsNav />

        <div className="adminFarmerTransactionsCancelledComponentCard">
          <div className="adminFarmerTransactionsCancelledComponentSubTitle">
            <FaFolderOpen /> {t('ext181')}
          </div>
          <br></br>
          <div className="adminFarmerTransactionsCancelledComponentShow">
          {t('ext182')}
             
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

          <div className="adminFarmerTransactionsPendingComponentMiddleSection">
            <div className="adminFarmerTransactionsPendingComponentFrameParent">             
       
                            
            {filteredCartItems && filteredCartItems.length > 0 ? (
                           chunkArray(currentItems, 1).map((cartItemGroup, index) => (
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
                                          <b>{t('ext184')}</b> {item.dateBought}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext185')}</b> {item.fullname}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext186')}</b> {item.category}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext187')}</b> {item.unit}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext188')}</b> {item.boughtQuantity}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext189')}</b> {item.price}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext190')}</b> {item.status}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext191')}</b> {item.location}
                                        </div>
                                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                                          <b>{t('ext192')}</b> {item.paymentMethod}
                                        </div>                                       
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p key={`noPendingItems-${cartItemIndex}`}>
                                  {t('ext195')}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <p>{t('ext196')}</p>
                    )}
              
               
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
      </div>
      </div>
    </I18nextProvider>
  );
};

export default AdminFarmerTransactionsCancelledComponent;
