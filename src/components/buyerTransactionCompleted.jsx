import BuyerTransactionNav from '../components/buyerTransactionNav';
import "../css/BuyerPage/buyerTransactionsCompletedComponent.css";
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { useState, useEffect } from 'react';
import { FaFolderOpen } from 'react-icons/fa';

const BuyerTransanctionCompleted = ({ sessionId }) => {
  
const { t } = useTranslation();
const [completedOrders, setCompletedOrders] = useState([]);

useEffect(() => {
  const fetchCompletedOrders = async () => {
    try {
      // Query for completed or canceled orders
      const completedOrdersQuery = query(collection(db, 'Transaction'), where('status', '==', 'Completed'), where('sessionId', '==', sessionId));
        const completedOrdersSnapshot = await getDocs(completedOrdersQuery);
        const completedOrdersData = completedOrdersSnapshot.docs.map((doc) => doc.data());

      setCompletedOrders(completedOrdersData);
      console.log('Completed Orders:', completedOrdersData);
    } catch (error) {
      console.error('Error fetching completed orders:', error);
    }
  };

  fetchCompletedOrders();
}, [sessionId]);

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerTransactionsCompletedComponent">
      <BuyerNavigation />
      <div className="buyerTransactionsCompletedComponentMainPanel">
      <BuyerTopNav /> 
        <div className="buyerTransactionsCompletedComponentTopSection">
          <div className="buyerTransactionsCompletedComponentMainText">
            <b className="buyerTransactionsCompletedComponentMainTextWrapper">   
              <p className="buyerTransactionsCompletedComponentBlankLine">{t('text90')}</p>
            </b>
          </div>
        </div>
        <BuyerTransactionNav />

        <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle"><FaFolderOpen /> {t('text91')}
            </div>
            <br></br>         
            <br></br>     
    
     

            <div className="buyerTransactionMiddleSection">
            <div className="buyerTransactionFrameParent">
              {completedOrders && completedOrders.length > 0 ? (
                completedOrders.map((order, orderIndex) => (
                  <div key={orderIndex} className="adminFarmerTransactionsPendingComponentFrameWrapper">
                    <img
                      className="adminFarmerTransactionsPendingComponentFrameChild"
                      alt=""
                      src={order.image}
                    />
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">{order.cropName}</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text93')}</b> {order.dateBought ? new Date(order.dateBought).toLocaleDateString() : 'Date Not Available'}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text94')}</b> {order.fullname}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text95')}</b> {order.category}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text96')}</b> {order.unit}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text97')}</b> {order.quantity}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text98')}</b> {order.price}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('boughtQuantity: ')}</b> {order.boughtQuantity}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Status: ')}</b> {order.status}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Location: ')}</b> {order.location}
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('Payment Method : ')}</b> {order.paymentMethod}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No completed orders available.</p>
              )}
          </div>
          </div> 
        </div>
      </div>
    </div>
    </I18nextProvider>

  );
};

export default BuyerTransanctionCompleted;