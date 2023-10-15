import React, { useState, useEffect } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import RiceVector from '../img/riceCardImage.png';
import { Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { FaSadCry, FaTrash } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { db, auth, storeTransaction } from './firebase';
import { doc, getDoc, collection, query, where, getDocs, addDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const ShoppingCart = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [cart, setCart] = useState([]);
  const [fullname, setfullname] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  
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
  
    return () => unsubscribe();
  }, []);
  

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userCartRef = doc(db, 'UserCarts', user.uid);
          const userCartSnapshot = await getDoc(userCartRef);
          const userCartData = userCartSnapshot.data();

          if (userCartData && userCartData.cart) {
            setCart(userCartData.cart);
          }
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        // Check if product data has already been fetched
        if (!item.productData) {
          const productData = await fetchCartData(item.productId);
          return productData ? { ...item, productData } : null;
        } else {
          return item;
        }
      })
    );
  
    setCart(updatedCart.filter((item) => item !== null));
  };
  

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
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
    const totalPrice = price && typeof price === 'number' ? price : 0;
    return (totalPrice * quantity).toFixed(2);
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
  
      if (!user) {
        console.log('User is not authenticated.');
        alert('Please log in to place an order.');
        return;
      }
  
      const userCartRef = doc(db, 'UserCarts', user.uid);
      const userCartSnapshot = await getDoc(userCartRef);
      const currentCart = userCartSnapshot.data()?.cart || [];
  
      if (currentCart.length === 0) {
        console.log('Cart is empty.');
        alert('Your cart is empty. Add items before placing an order.');
        return;
      }
  
      console.log('Current Cart:', currentCart);
  
      // Create a new order document
      const orderRef = await addDoc(collection(db, 'Transaction'), {
        userId: user.uid,
        cart: currentCart,
        timestamp: serverTimestamp(),
      });
  
      console.log('Order document added with ID:', orderRef.id);
  
      // Clear the cart
      await setDoc(userCartRef, { cart: [] });
  
      console.log('Order placed successfully!');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
  
      if (error instanceof FirebaseError) {
        console.error('Firebase Error Code:', error.code);
        console.error('Firebase Error Message:', error.message);
      }
  
      alert('Error placing order. Please try again.');
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
            <Link to="/checkout" className="ordercheckoutButton2">
            {t('text76')}
                </Link>                        
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
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="product-info">
                        <img src={item.image} alt={item.cropName} />
                      <span>{item.cropName}</span>
                        </div>
                      </td>
                      <td>₱{calculateSubtotal(item.price, item.quantity)}</td>
                      <td>                        
                        <span>{item.quantity}</span>                        
                      </td>
                      <td>₱{calculateSubtotal(item.price, item.quantity)}</td>                
                    </tr>
                  ))}                  
                </tbody>
              </table>    
           
            </div>
          </div>
          <div className="payment-details"> {/* Apply the CSS class */}
            <h2>{t('text81')}</h2>
            <div>
              <strong>{t('text82')}</strong> {t('text83')}
            </div>
            <div>
              <strong>{t('text84')}</strong> $20.00
            </div>
            <div>
              <strong>{t('text85')}</strong> $20.00
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
          
	</div>
</div>
</I18nextProvider>
      
  );
};

export default ShoppingCart;
