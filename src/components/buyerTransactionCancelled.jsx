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

const BuyerTransanctionCancelled = () => {
  const { t } = useTranslation();
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        // Query for completed or canceled orders
        const cancelledOrdersQuery = query(collection(db, 'Transaction'), where('status', '==', 'Cancelled'));
        const cancelledOrdersSnapshot = await getDocs(cancelledOrdersQuery);
        const cancelledOrdersData = cancelledOrdersSnapshot.docs.map((doc) => doc.data());

        setCancelledOrders(cancelledOrdersData);
        console.log('Cancelled Orders:', cancelledOrdersData);
      } catch (error) {
        console.error('Error fetching cancelled orders:', error);
      }
    };

    fetchCancelledOrders();
  }, []);

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
        <div className="adminFarmerTransactionsPendingComponentFrameWrapper">
                {/* <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={pakwan}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">Watermelon</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text93')}</b> July 2, 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text94')}</b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text95')}</b> Fruit
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text96')}</b> Sack
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text97')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text98')}</b> 10,000
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text99')}</b> Cancelled
                        </div>
                      </div>
                    </div>                                    
                  </div>
                </a>             
                <a className="adminFarmerTransactionsPendingComponentRectangleParent">
                  <img
                    className="adminFarmerTransactionsPendingComponentFrameChild"
                    alt=""
                    src={pakwan}
                  />
                  <div className="adminFarmerTransactionsPendingComponentFrameGroup">
                    <div className="adminFarmerTransactionsPendingComponentFrameContainer">
                      <div className="adminFarmerTransactionsPendingComponentSubText1Wrapper">
                        <b className="adminFarmerTransactionsPendingComponentSubText1">Watermelon</b>
                      </div>
                      <div className="adminFarmerTransactionsPendingComponentSubText2Wrapper2">
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text93')}</b> July 2, 2023
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text94')}</b> Jenkins Mesina
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text95')}</b> Fruit
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text96')}</b> Sack
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text97')}</b> 2
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text98')}</b> 10,000
                        </div>
                        <div className="adminFarmerTransactionsPendingComponentSubText2">
                          <b>{t('text99')}</b> Cancelled
                        </div>
                      </div>
                    </div>                                    
                  </div>
                </a>            */}
              </div>     
    
          </div>
          </div> 
        </div>
      </div>
    </div>
    </I18nextProvider>

  );
};

export default BuyerTransanctionCancelled;