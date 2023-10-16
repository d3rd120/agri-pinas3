import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Components/loginComponent.css';
import Logo from '../img/agriPinasLogo2.png';
import { signInWithEmailAndPassword,sendEmailVerification  } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { auth } from "../components/firebase";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [fullname, setFullName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      setLoggedIn(true);
      const userUid = user.uid;
  
      // Generate a session ID
      const sessionId = generateSessionId(); // Implement a function to generate a session ID
  
      // Store user UID and session ID in session storage
      sessionStorage.setItem('userUid', userUid);
      sessionStorage.setItem('sessionId', sessionId);
  
      // ... (rest of the code)
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  
  useEffect(() => {
    if (loggedIn) {
      const userUid = sessionStorage.getItem('userUid');
      const sessionId = sessionStorage.getItem('sessionId');
      console.log('Retrieved user UID:', userUid);
      console.log('Retrieved session ID:', sessionId);
      if (userUid && sessionId) {
        setLoading(true);
        fetchUserData(userUid);
      } else {
        console.error('Invalid user UID or session ID:', userUid, sessionId);
      }
    }
  
    if (loggedIn && emailVerified) {
      navigate('/dashboard');
    } else if (loggedIn && !emailVerified) {
      // Handle the case when the email is not verified
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
              <div className="loginComponentMainText">{t('text21')}</div>
            </div>
            <div className="loginComponentFormFields">
              <input
                className="loginComponentInput"
                id="loginComponentEmail"
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder={t('text22')}
              />
              <input
                className="loginComponentInput"
                id="loginComponentPassword"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder={t('text23')}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Link className="logInPageSubText2" to='/reset'>
              {t('text24')}
            </Link>
            <button className="loginComponentButton" onClick={handleSubmit}>
              <div className="loginComponentButtonText">{t('text25')}</div>
            </button>
            <div className="loginComponentSubTextContainter">
              <span>{t('text26')} <Link className="loginComponentSignUpLink" to="/signup">{t('text27')}</Link></span>       
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default LoginPage;
