import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../css/Components/loginComponent.css';
import Logo from '../img/agriPinasLogo2.png';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { auth } from '../components/firebase';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import Popup from '../components/validationPopup.jsx';
import i18n from '../i18n';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [fullname, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message
  const [isPopupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const navigate = useNavigate();
  const sessionTimeout = 300000;


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSessionStorage = (userUid) => {
    sessionStorage.setItem('userUid', userUid);
    setLoggedIn(true);

    // Set a session timeout (adjust as needed)
    setTimeout(() => {
      clearSession();
    }, sessionTimeout);
  };

  const clearSession = () => {
    sessionStorage.removeItem('userUid');
    setLoggedIn(false);
    setFullName(''); // Clear user data
    navigate('/login');
  };

  const handleLogout = () => {
    // Perform logout actions, e.g., sign out from Firebase
    auth.signOut().then(() => {
      clearSession();
    });
  };

  const fetchUserData = async (uid) => {
    try {
      const db = getFirestore();
      const usersCollection = collection(db, 'Users');
      const q = query(usersCollection, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const userData = docSnapshot.data();
        const fullname = userData.fullname;
        console.log('User data:', userData);
        setFullName(fullname);

        if (userData.role === 'Buyer') {
          navigate('/buyermarketplace');
          console.log('User role:', userData.role);
        } else if (userData.role === 'Admin') {
          navigate('/admindashboard');
          console.log('User role:', userData.role);
        } else {
          console.log('Non-existing user role');
        }
      } else {
        console.error('User data not found for email:', uid);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      setEmail('');
      setPassword('');
      const userUid = user.uid;

      // Check if the user's role is not Admin
      const db = getFirestore();
      const usersCollection = collection(db, 'Users');
      const q = query(usersCollection, where('uid', '==', userUid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const userData = docSnapshot.data();

        if (userData.role !== 'Admin') {
          // Check if the user's email is verified
          if (user.emailVerified) {
            setEmailVerified(true);
            handleSessionStorage(userUid);
          } else {
            setEmailVerified(false);
            setPopupMessage('Email not verified. Please verify your email address.');
            setPopupVisible(true);
            // You can handle the email verification flow here if needed
          }
        } else {
          // Admin user, proceed without email verification
          setEmailVerified(true);
          handleSessionStorage(userUid);
        }
      } else {
        setPopupMessage(`User data not found for UID: ${userUid}`);
        setPopupVisible(true);
      }
    } catch (error) {
      setPopupMessage('Invalid email or password.');
      setPopupVisible(true);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const userUid = sessionStorage.getItem('userUid');
      if (userUid) {
        setLoading(true);
        setTimeout(() => {
          fetchUserData(userUid);
        }, 1000); // Adjust the timeout as needed
      } else {
        console.error('Invalid user UID:', userUid);
      }
    }
  }, [loggedIn, emailVerified, navigate]);
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };


  return (
    <I18nextProvider i18n={i18n}>
      <div className="loginComponent">
        <div className="loginComponentWrapper">
          <div className="loginComponentForm">
            <div className="loginComponentFormText">
              <img className="loginComponentLogo" alt="" src={Logo} />
              <div className="loginComponentMainText">{t('Ttext27')}</div>
            </div>
            <div className="loginComponentFormFields">
              <input
                className="loginComponentInput"
                id="loginComponentEmail"
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder={t('Ttext28')}
              />
              <input
                className="loginComponentInput"
                id="loginComponentPassword"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder={t('Ttext29')}
                onKeyPress={handleKeyPress}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <Link className="logInPageSubText2" to="/reset">
              {t('Ttext30')}
            </Link>
            <button className="loginComponentButton" onClick={handleSubmit}>
              <div className="loginComponentButtonText">{t('Ttext31')}</div>
            </button>
            <div className="loginComponentSubTextContainter">
              <span>
                {t('Ttext32')}{' '}
                <Link className="loginComponentSignUpLink" to="/signup">
                  {t('Ttext33')}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Popup
        message={popupMessage}
        onClose={() => setPopupVisible(false)}
        isVisible={isPopupVisible}
      />
    </I18nextProvider>
  );
};

export default LoginPage;