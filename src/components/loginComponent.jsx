import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Components/loginComponent.css';
import Logo from '../img/agriPinasLogo2.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { auth } from "../components/firebase";
import axios from 'axios';
import { getToken } from '../Util/Common';
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
  const [authLoading, setAuthLoading] = React.useState(true);
  const navigate = useNavigate();

  const setUserSession = (token, user) => {
    // Implementation logic for setting user session
  };

  const removeUserSession = () => {
    // Implementation logic for removing user session
  };

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
        console.log('Full name:', fullname);
        setFullName(fullname);

        if (userData.role === 'Farmer') {
          navigate('/farmerdashboard');
          console.log('User role:', userData.role);
        } else if (userData.role === 'Buyer') {
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
    e.preventDefault(); // Prevent form submission
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      setEmail('');
      setPassword('');
      setLoggedIn(true);
      const userUid = user.uid;
      sessionStorage.setItem('userUid', userUid);

      // Send POST request to the server
      axios
        .post('http://localhost:3000/Users/login', {
          username: email,
          password: password,
        })
        .then(response => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
          // Handle the response data as needed
        })
        .catch(error => {
          // Handle the error
          console.error('Error during sign in:', error);
        });
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return;
    }

    axios.get(`http://localhost:3000/verifyToken?token=${token}`)
      .then(response => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

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
  }, [loggedIn]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <I18nextProvider i18n={i18n}>   
    <div className="loginComponent">
      <div className="loginComponentWrapper">
        <div className="loginComponentForm">
          <div className="loginComponentFormText">
            <img className="loginComponentLogo" alt="" src={Logo} />
            <div className="loginComponentMainText">{t('loginComponentText1')}</div>
          </div>
          <div className="loginComponentFormFields">
            <input
              className="loginComponentInput"
              id="loginComponentEmail"
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
            />
            <input
              className="loginComponentInput"
              id="loginComponentPassword"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              onKeyPress={handleKeyPress} // Trigger handleSubmit on Enter key press
            />
          </div>
          <Link className="logInPageSubText2" to = '/reset'>
          {t('loginComponentText2')}
          </Link>
          <button className="loginComponentButton" onClick={handleSubmit}>
            <div className="loginComponentButtonText">Login</div>
          </button>
          <div className="loginComponentSubTextContainter">
            <span>{t('loginComponentText3')}</span>
            <Link className="loginComponentSignUpLink" to="/signup">
            {t('loginComponentText4')}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default LoginPage;
