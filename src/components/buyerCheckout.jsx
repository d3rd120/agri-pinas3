import React, { useState, useEffect } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import BuyerTopNav from '../components/buyerTopNav';
import { v4 as uuidv4 } from 'uuid';
import { db, auth, } from './firebase';
import { doc, getDocs, collection, query, where, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Popup from './validationPopup';


const ShoppingCart = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [cart, setCart] = useState([]);
  const [fullname, setfullname] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [buyNowData, setBuyNowData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  

  const showAlert = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
  };
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = collection(db, "Users");
        const userQuery = query(userRef, where("uid", "==", user.uid));
  
        try {
          const querySnapshot = await getDocs(userQuery);
  
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setfullname(userData.fullname || '');
            setContact(userData.contact || '');
            setAddress(userData.address || ''); 
            setBarangay(userData.barangay || '');
          } else {
            setfullname('');
            setContact('');
            setAddress('');
            setBarangay('');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setfullname('');
        setContact('');
        setAddress('');
        setBarangay('');
      }
    });
  
    setSessionId(uuidv4());

    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userCartRef = doc(db, 'UserCarts', user.uid);
          const userCartSnapshot = await getDoc(userCartRef);
          const currentCart = userCartSnapshot.data()?.cart || [];

          const buyNowCollectionRef = collection(db, 'BuyNow');
          const buyNowCollectionSnapshot = await getDocs(buyNowCollectionRef);
          const buyNowData = buyNowCollectionSnapshot.docs.map((doc) => doc.data());

          const combinedOrderData = [...currentCart, ...buyNowData];
          setCart(currentCart);
          setBuyNowData(buyNowData);
          setCombinedData(combinedOrderData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function

    // ... (other cleanup code if needed)
  }, []);
  
  

  const removeItem = (productId) => {
    const updatedCart = combinedData.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = (price, quantity) => {
    const numericPrice = Number(price);

    if (isNaN(numericPrice)) {
      console.error(`Invalid price: ${price}`);
      return 'N/A';
    }
    

    return (numericPrice * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    // Combine both regular cart items and BuyNow items
    const allItems = [...cart, ...buyNowData];

    // Calculate the total amount
    const total = allItems.reduce(
      (acc, item) => acc + item.price * item.boughtQuantity,
      0
    ).toFixed(2);

    return total;
  };

  const handleModalConfirm = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setItemToRemove(null);
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };
  
 
  const placeOrder = async () => {
    try {
      console.log('Start placing order...');
  
      const user = auth.currentUser;
  
      // Check if the user is authenticated
      if (!user) {
        console.log('User is not authenticated.');
        showAlert('Please log in to place an order.');
        return;
      }
  
      const userCartRef = doc(db, 'UserCarts', user.uid);
      const userCartSnapshot = await getDoc(userCartRef);
      const currentCart = userCartSnapshot.data()?.cart || [];
  
      const combinedCartItems = [...currentCart, ...buyNowData]; // Combine existing cart and BuyNow items
  
      // Check if the combined cart items are empty
      if (combinedCartItems.length === 0) {
        console.log('Combined cart items are empty.');
        showAlert('Your order is empty. Add items before placing an order.');
        return;
      }
  
      // Map combined cart items to create orders
      const orders = combinedCartItems.map((item) => {
        // Ensure that all required fields are defined
        const cartItem = {
          productId: item.productId,
          boughtQuantity: item.boughtQuantity,
          dateBought: new Date().toISOString().split('T')[0],
          isChecked: false,
          buid: user.uid,
          category: item.category || '',
          cropID: item.productId,
          cropName: item.cropName || '',
          fullname: item.fullname || '',
          image: item.image || '',
          location: item.location || '',
          price: item.price || 0,
          totalAmount: item.price || 0,
          totalCost: item.price || 0,
          uid: user.uid,
          unit: item.unit || '',
          quantity: item.quantity || '',
          status: 'Pending',
          paymentMethod: selectedPaymentMethod,
        };
  
        // Check if any required field is undefined
        const isUndefinedField = Object.values(cartItem).some((value) => value === undefined);
  
        if (isUndefinedField) {
          console.error('One or more required fields are undefined:', cartItem);
          throw new Error('One or more required fields are undefined.');
        }
  
        return cartItem;
      });
  
      // Create a new order document
      const orderRef = await addDoc(collection(db, 'Transaction'), {
        userId: user.uid,
        orders,
      });
  
      console.log('Order document added with ID:', orderRef.id);
  
      // Clear the cart
      await setDoc(userCartRef, { cart: [] });
  
      console.log('Order placed successfully!');
      showAlert('Order placed successfully');
      setTimeout(() => {
        navigate('/buyertoreceive');
      }, 1500); // Redirect to the login page after 2 seconds
    } catch (error) {
      console.error('Error placing order:', error);
  
      if (error instanceof FirebaseError) {
        console.error('Firebase Error Code:', error.code);
        console.error('Firebase Error Message:', error.message);
      }
  
      showAlert('Error placing order. Please try again.');
    }
  };
  
  
  
  
  
  
  
  
  
  
  return (
    <I18nextProvider i18n={i18n}>
      <div className="buyerMarketplaceComponent">
        <BuyerNavigation />
        <div className="buyerMarketplaceComponentMainPanel">
          <BuyerTopNav />
          <div className="buyerCommunityForumComponentTopSection">
            <div className="buyerCommunityForumComponentMainText1">
              <b className="buyerCommunityForumComponentMainText2">
                <p className="buyerCommunityForumComponentBlankLine">&nbsp;</p>
                <p className="buyerCommunityForumComponentBlankLine">{t('text74')}</p>
              </b>
            </div>
          </div>

          <div className="payment-details2">
            
            <h2>{t('text75')}</h2>
            <div>
              {fullname} | {contact}             
            </div>
            <div>
             {barangay}
            </div>
            <div>
             {address}
            </div>  
            &nbsp;                               
          </div>


          <div className="cart">
            <div className="cart-container">
              <table>
                <thead>
                  <tr>
                    <th>{t('text77')}</th>
                    <th>{t('text78')}</th>
                    <th>{t('text79')}</th>
                    <th>{t('text80')}</th>
                  </tr>
                </thead>
                <tbody>
                {combinedData.map((item) => (
              <tr key={item.productId}>
                <td>
                  <div className="product-info">
                    <img src={item.image} alt={item.cropName} />
                    <span>{item.cropName}</span>
                  </div>
                </td>
                <td>₱{calculateSubtotal(item.price, item.boughtQuantity)}</td>
                <td>
                  <span>{item.boughtQuantity}</span>
                </td>
                
                <td>₱{calculateSubtotal(item.price, item.boughtQuantity)}</td>
              </tr>
            ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="payment-details">
            <h2>{t('Payment Option: ')}</h2>
            <select onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
              <option value="">Select Payment</option>
              <option value="Cash on Pickup">Cash on Pickup</option>
              <option value="Sending proof of payment">Sending proof of payment</option>       
            </select>
          </div>
          <div className="payment-details"> {/* Apply the CSS class */}
            <h2>{t('text81')}</h2>
            <div>
              <strong>{t('text85')}</strong> ₱{calculateTotal()}
            </div>
            <div className="buttonWrapper">
              <button className="ordercheckoutButton2" onClick={placeOrder}>
                {t('text86')}
              </button>
            </div>
          </div>

             

          {showModal && (
            <div className="modalBackdrop">
              <div className="modal1">
                <div className="modalContent">
                  <h3>Do you want to remove this item?</h3>
                  <div className="buttonContainer">
                    <br></br>
                    <button className="confirmButton" onClick={handleModalConfirm}>
                      Yes
                    </button>
                    <button className="cancelButton" onClick={handleModalCancel}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
           {isPopupVisible && (
          <Popup
            message={popupMessage}
            onClose={() => setIsPopupVisible(false)}
            isVisible={isPopupVisible}
          />
        )}
          
	</div>
</div>
</I18nextProvider>
      
  );
};

export default ShoppingCart;