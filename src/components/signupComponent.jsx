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

  const register = async () => {
   
    const validFullName = /^[A-Za-z\s.'-]{2,}$/;

    if (!validFullName.test(fullname)) {
      setPopupMessage("Please enter a valid full name.");
      setShowPopup(true);
      return;
    }
    
 // Check if all required fields are filled
    if (!fullname || !contact || !address || !birthdate || !age || !email || !role || !password || !confirmpassword) {
      setPopupMessage("Please fill in all required fields");
      setShowPopup(true);
      return;
    }
  
    // Check if password and confirm password match
    if (password !== confirmpassword) {
      setPopupMessage("Password and confirm password do not match");
      setShowPopup(true);
      return;
    }
  
    // Check if the user is 18 or older
    if (age < 18) {
      setPopupMessage("You must be 18 or older to register.");
      setShowPopup(true);
      return;
    }
  
    // Validate the Philippine phone number
    const validPhoneNumber = /^(\+63|0)(9\d{9})$/; // Adjust this regex pattern as needed
  
    if (!validPhoneNumber.test(contact)) {
      setPopupMessage("Please enter a valid Philippine phone number.");
      setShowPopup(true);
      return;
    }

     // Validate the address using a regex pattern
      const validAddress = /^[A-Za-z0-9\s,.'-]{3,}$/; // Adjust this regex pattern as needed

      if (!validAddress.test(address)) {
        setPopupMessage("Please enter a valid address.");
        setShowPopup(true);
        return;
      }
  
    // Validate the password using a regex pattern (e.g., at least 8 characters, containing letters and numbers)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if (!passwordPattern.test(password)) {
      setPopupMessage("Password must contain at least 8 characters with letters and numbers.");
      setShowPopup(true);
      return;
    }

    try {
      await registerWithEmailAndPassword(fullname, contact, address, birthdate, age, email, role, password);
      // Registration was successful, you can redirect the user or show a success message here
      setPopupMessage("Registration successful! A verification email has been sent to your email address.\nDirecting you to the login...");
      setShowPopup(true);

      setTimeout(() => {
        navigate("/login");
      }, 4000); // Redirect to the login page after 2 seconds

    } catch (error) {
      // Handle any errors that may occur during registration
      console.error(error);
  
      // Display an error message to the user if needed
      if (error.message === "auth/email-already-in-use") {
        setPopupMessage("Registration failed. The email address is already in use.");
        setShowPopup(true);
      } else {
        setPopupMessage("Registration failed. Please try again later.");
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
              <div className="signupComponentMainText">{t('text28')}</div>
            </div>
            <div className="signupComponentFormFields">
              <input
                className="signupComponentFormInput"
                id="signupComponentFullName"
                type="text"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('text29')}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentContactNumber"
                type="text"
                placeholder={t('text30')}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentAddress"
                type="text"
                placeholder={t('text31')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentBirthday"
                type="date"
                placeholder="Birthday"
                onInput={calculateAge}
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
              <input
                className="signupComponentFormInput"
                id="signupComponentAge"
                type="text"
                placeholder={t('text32')}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                readOnly
              />
              <input
                className="signupComponentFormInput"
                id={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('text33')}
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
                  {t('text34')}
                </option>
                <option value="Farmer">{t('text35')}</option>
                <option value="Buyer">{t('text36')}</option>
              </select>
              <input
                className="signupComponentFormInput"
                id={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('text37')}
                required
              />
              <input
                className="signupComponentFormInput"
                id={confirmpassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('text38')}
                required
              />
            </div>
            <button ref={registerButtonRef} className="signupComponentButton" onClick={register}>
              <div className="signupComponentButtonText">{t('text39')}</div>
            </button>
            <div className="signupComponentSubTextContainer">
              <span>{t('text40')} <Link className="signupComponentLoginLink" to="/login"> {t('text41')} </Link></span>   
            </div>
          </div>
        </div>
      </div>
      <Popup message={popupMessage} onClose={closePopup} isVisible={showPopup} />
    </I18nextProvider>
  );
};

export default Signup;
