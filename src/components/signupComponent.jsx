import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Components/signupComponent.css";
import { auth } from "./firebase";
import { sendEmailVerification } from 'firebase/auth';
import Logo from '../img/agriPinasLogo2.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import Popup from '../components/validationPopup.jsx';
import i18n from '../i18n';
import { registerWithEmailAndPassword } from "./firebase.jsx";
import { useLocation } from 'react-router-dom';
import PrivacyPolicyPopup from './privacyPolicyComponent.jsx'; // Import the PrivacyPolicyPopup component

const Signup = () => {
  const { t } = useTranslation();
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const location = useLocation();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    if (location.pathname === '/signup') {
      setShowPrivacyPolicy(true);
    } else {
      setShowPrivacyPolicy(false);
    }
  }, [location]);
  



  const register = async () => {
   
    const validFullName = /^[A-Za-z\s.'-]{2,}$/;

    if (!validFullName.test(fullname)) {
      setPopupMessage(t('ext46'));
      setShowPopup(true);
      return;
    }
    
 // Check if all required fields are filled
    if (!fullname || !contact || !address || !birthdate || !age || !email || !role || !password || !confirmpassword) {
      setPopupMessage(t('ext47'));
      setShowPopup(true);
      return;
    }
  
    // Check if password and confirm password match
    if (password !== confirmpassword) {
      setPopupMessage(t('ext48'));
      setShowPopup(true);
      return;
    }
  
    // Check if the user is 18 or older
    if (age < 18) {
      setPopupMessage(t('ext49'));
      setShowPopup(true);
      return;
    }
  
    // Validate the Philippine phone number
    const validPhoneNumber = /^(\+63|0)(9\d{9})$/; // Adjust this regex pattern as needed
  
    if (!validPhoneNumber.test(contact)) {
      setPopupMessage(t('ext50'));
      setShowPopup(true);
      return;
    }

     // Validate the address using a regex pattern
      const validAddress = /^[A-Za-z0-9\s,.'-]{3,}$/; // Adjust this regex pattern as needed

      if (!validAddress.test(address)) {
        setPopupMessage(t('ext51'));
        setShowPopup(true);
        return;
      }
  
  // Validate the password using a regex pattern (e.g., at least 8 characters, containing letters, numbers, and optional special characters)
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!*_]?).{8,}$/;

      if (!passwordPattern.test(password)) {
        setPopupMessage(t('ext52'));
        setShowPopup(true);
        return;
      }


    try {
      await registerWithEmailAndPassword(fullname, contact, address, birthdate, age, email, role, password);
      // Registration was successful, you can redirect the user or show a success message here
      setPopupMessage(t('ext53'));
      setShowPopup(true);

      setTimeout(() => {
        navigate("/login");
      }, 4000); // Redirect to the login page after 2 seconds

    } catch (error) {
      // Handle any errors that may occur during registration
      // console.error(error);
  
      // Display an error message to the user if needed
      if (error.message === "auth/email-already-in-use") {
        setPopupMessage(t('ext54'));
        setShowPopup(true);
      } else {
        setPopupMessage(t('ext55'));
        setShowPopup(true);
      }
    }
  };

  const calculateAge = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date();
    let age = today.getFullYear() - selectedDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > selectedDate.getMonth() ||
      (today.getMonth() === selectedDate.getMonth() &&
        today.getDate() >= selectedDate.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    // Check if the calculated age is 18 or above
    if (age < 18) {
      setPopupMessage("You must be 18 or older to register.");
      setShowPopup(true);
      // Optionally, you might want to clear the date of birth input or take other actions
      // based on your application's requirements
      setBirthdate("");
      setAge("");
      return;
    }

    setAge(age);
    setBirthdate(event.target.value);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/signup");
  }, [user, loading]);

  const registerButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        registerButtonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="signupComponent">
        <div className="signupComponentWrapper">
          <div className="signupComponentForm">
            <div className="signupComponentFormText">
              <img className="signUpComponentLogo" alt="" src={Logo} />
              <div className="signupComponentMainText">{t('ext34')}</div>
            </div>
            <div className="signupComponentFormFields">
              <input
                className="signupComponentFormInput"
                id="signupComponentFullName"
                type="text"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('ext35')}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentContactNumber"
                type="text"
                placeholder={t('ext36')}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentAddress"
                type="text"
                placeholder={t('ext37')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentBirthday"
                type="date"
                placeholder="Birthdate"
                onInput={calculateAge}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentAge"
                type="text"
                placeholder={t('ext38')}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                readOnly
              />
              <input
                className="signupComponentFormInput"
                id={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('ext39')}
                required
              />
              <select
                className="signupComponentFormInput"
                id="signupComponentRole"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>
                  {t('ext40')}
                </option>               
                <option value="Buyer">{t('eext41')}</option>
              </select>
              <input
                className="signupComponentFormInput"
                id={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('ext41')}
                required
              />
              <input
                className="signupComponentFormInput"
                id={confirmpassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('ext42')}
                required
              />
            </div>
            <button ref={registerButtonRef} className="signupComponentButton" onClick={register}>
              <div className="signupComponentButtonText">{t('ext43')}</div>
            </button>
            <div className="signupComponentSubTextContainer">
              <span>{t('ext44')} <Link className="signupComponentLoginLink" to="/login"> {t('ext45')} </Link></span>   
            </div>
          </div>
        </div>
      </div>
      <Popup message={popupMessage} onClose={closePopup} isVisible={showPopup} />
    {showPrivacyPolicy && <PrivacyPolicyPopup />}
    <Popup message={popupMessage} onClose={closePopup} isVisible={showPopup} />
    </I18nextProvider>
  );
};

export default Signup;