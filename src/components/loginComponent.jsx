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
            sessionStorage.setItem('userUid', userUid);
          } else {
            setEmailVerified(false);
            console.error('Email not verified. Please verify your email address.');
            // You can handle the email verification flow here if needed
          }
        } else {
          // Admin user, proceed without email verification
          setEmailVerified(true);
          sessionStorage.setItem('userUid', userUid);
        }
      } else {
        console.error('User data not found for UID:', userUid);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  

  useEffect(() => {
    if (loggedIn) {
      const userUid = sessionStorage.getItem('userUid');
      console.log('Retrieved user UID:', userUid);
      if (userUid) {
        setLoading(true);
        fetchUserData(userUid);
      } else {
        console.error('Invalid user UID:', userUid);
      }
    }

   
    if (loggedIn && emailVerified) {
      
      navigate('/dashboard');
    } else if (loggedIn && !emailVerified) {
    
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
              <span>{t('text26')}</span>
              <Link className="loginComponentSignUpLink" to="/signup">
                {t('text27')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default LoginPage;
