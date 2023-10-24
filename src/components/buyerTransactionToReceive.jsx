import '../css/BuyerPage/buyerTransac.css';
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import okra from '../img/okra.png'
import CornVector from '../img/cornVector.png';
import React, { useState, useEffect } from 'react';
import ProfileVector1 from '../img/profileVector1.png';
import {FaEdit, FaTrash,FaFolderOpen} from 'react-icons/fa';
import BuyerTransactionNav from '../components/buyerTransactionNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';


const BuyerTransanctionPending = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);

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
        <BuyerTransactionNav/>

        
        <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle"><FaFolderOpen /> {t('text91')}
            </div>
            <br></br>
           <div className = "buyerTransactionShow"> {t('text92')}  
           <select className="buyerTransactionRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>     
    
     

            <div className="buyerTransactionMiddleSection">
        <div className="buyerTransactionFrameParent">

        <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
              </div>     


            <div className="buyerTransactionForumNumber">
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">1</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">2</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">3</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">4</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">5</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">6</div>
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

export default BuyerTransanctionPending;
