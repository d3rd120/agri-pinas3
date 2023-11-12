import React, { useState, useEffect } from 'react';
import "../css/BuyerPage/buyerProfileComponent.css";
import BuyerProfileNav from '../components/buyerProfileNav';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { auth, db } from './firebase';
import { collection, where, getDocs, query } from 'firebase/firestore';

const BuyerProfile = () => {
  const { t } = useTranslation();
  const [fullname, setfullname] = useState(' ');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState(' ');
  const [birthdate, setbirthdate] = useState('');
  const [buyerRole, setBuyerRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const handleUserInfoChange = (userInfo) => {
    setfullname(userInfo.fullname || '');
    setContact(userInfo.contact || '');
    setEmail(userInfo.email || '');
    setbirthdate(userInfo.birthdate || '');
    setBuyerRole(userInfo.role || '');
    setBuyerRole(userInfo.role || '');
    setAddress(userInfo.address || '');
    setImagePreview(userInfo.profileImageUrl || null);
  };
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        const newSessionId = user.uid; // Use user UID as session ID
        setSessionId(newSessionId); 
        const userRef = collection(db, "Users");
        const userQuery = query(userRef, where("uid", "==", user.uid));
        
        getDocs(userQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              handleUserInfoChange(userData);
            } else {
              handleUserInfoChange({ fullname: '', contact: '', email: '', birthdate: '', role: '', address: '' });
            }
          })
          .catch((error) => {
            // console.error("Error fetching user data:", error);
          });
      } else {
        setIsLoggedIn(false);
        setSessionId(null);
        handleUserInfoChange({ fullname: '', contact: '', email: '', birthdate: '', role: '', address: '' });
      }
    });
  
    return () => unsubscribe();
  }, []);

  const formatDateOfBirth = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString().split('T')[0];
    }
    return '';
  };


  return (
    <I18nextProvider i18n={i18n}> 
      <div className="farmerProfileComponent">
      <BuyerProfileNav
        onUserInfoChange={handleUserInfoChange}
        name={fullname}
        phoneNumber={contact}
        email={email}
        dateOfBirth={birthdate}
        address = {address}
        profileImageUrl={imagePreview}
      />
        <div className="farmerProfileComponentMainPanel">
          <BuyerTopNav /> 
          <div className="farmerProfileComponentTopSection">
            <div className="farmerProfileComponentMainText1">
              <b className="farmerProfileComponentMainText2">
                <p className="farmerProfileComponentBlankLine">{t('ext395')}</p>
              </b>
            </div>
          </div>
          <div style={{ marginTop: "-40px" }}>
            <div class="farmercourseProfile">
              <div class="course-preview1">
                <div class="farmerProfileComponentInfo">{t('ext396')}</div>
                <div class="farmerProfileComponentFullName">{t('ext397')}</div>
                <div class="farmerProfileComponentName">{fullname}</div>
                <div class="farmerProfileComponentRole">{t('ext398')}</div>
                <img class="farmerselectImageIcon" alt="" 
                src={imagePreview} 
                style={{ maxWidth: '200px', maxHeight: '200px' }}
                /> 
                <div class="farmerProfileComponentRole2">{buyerRole}</div>
                <div class="farmerProfileComponentEmail1">{t('ext399')}</div>
                <div class="farmerProfileComponentEmail2">{email}</div>
                <div class="farmerProfileComponentPhoneNumber2">{t('ext418')}</div>
                <div class="farmerProfileComponentEmail3">{address}</div>
                <div class="farmerProfileComponentPhoneNumber">{t('ext401')}</div>
                <div class="farmerProfileComponentNumber">{contact}</div>
                <div class="farmerProfileComponentBdayDate">{t('ext400')}</div>
                <div class="farmerProfileComponentBirthdate">{formatDateOfBirth(new Date(birthdate))}</div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </I18nextProvider>
  );
};

export default BuyerProfile;
