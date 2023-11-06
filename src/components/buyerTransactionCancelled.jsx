import BuyerTransactionNav from '../components/buyerTransactionNav';
import "../css/BuyerPage/buyerTransactionsCancelledComponent.css";
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useState, useEffect } from 'react';
import {FaEdit, FaTrash,FaFolderOpen} from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const BuyerTransanctionCancelled = ({ sessionId }) => {
  const { t } = useTranslation();
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        // Query for cancelled orders
        const cancelledOrdersQuery = query(collection(db, 'Transaction'), where('status', '==', 'Cancelled'), where('sessionId', '==', sessionId));
        const cancelledOrdersSnapshot = await getDocs(cancelledOrdersQuery);
        const cancelledOrdersData = cancelledOrdersSnapshot.docs.map((doc) => doc.data());

        setCancelledOrders(cancelledOrdersData);
        console.log('Cancelled Orders:', cancelledOrdersData);
      } catch (error) {
        console.error('Error fetching cancelled orders:', error);
      }
    };

    fetchCancelledOrders();
  }, [sessionId]);

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerTransactionsCancelledComponent">
      <BuyerNavigation />
      <div className="buyerTransactionsCancelledComponentMainPanel">
      <BuyerTopNav /> 
      <div className="buyerTransactionsCancelledComponentTopSection">
        <div className="buyerTransactionsCancelledComponentMainText">
          <b className="buyerTransactionsCancelledComponentMainTextWrapper">  
            <p className="buyerTransactionsCancelledComponentBlankLine">{t('text90')}</p>
          </b>
        </div>
      </div>
        <BuyerTransactionNav/>

        
        <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle"><FaFolderOpen /> {t('text91')}
            </div>
            <br></br>         
            <br></br>     
    
     

            <div className="buyerTransactionMiddleSection">
            <div className="buyerTransactionFrameParent">
              {cancelledOrders && cancelledOrders.length > 0 ? (
                cancelledOrders.map((order, orderIndex) => (
                  <div key={orderIndex} className="adminFarmerTransactionsPendingComponentFrameWrapper">
                    <a className="adminFarmerTransactionsPendingComponentRectangleParent">
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
                    </a>
                  </div>
                ))
              ) : (
                <p>No cancelled orders available.</p>
              )}
          </div>
          </div> 
        </div>
      </div>
    </div>
    </I18nextProvider>

  );
};

export default BuyerTransanctionCancelled;