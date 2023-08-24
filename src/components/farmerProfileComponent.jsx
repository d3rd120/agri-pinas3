import React, { useState, useEffect } from 'react';
import "../css/Components/farmerProfileComponent.css";
import FarmerProfileNav from '../components/farmerProfileNav';
import ProfileVector2 from '../img/profileVector2.png';
import FarmerTopNav from '../components/farmerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { auth, db } from './firebase';
import { collection, where, getDocs, query } from 'firebase/firestore';



const BuyerProfile = () => {
  const { t } = useTranslation();
  const [fullname, setfullname] = useState(' ');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState(' ');
  const [birthdate, setbirthdate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserInfoChange = (userInfo) => {
    setfullname(userInfo.fullname || '');
    setContact(userInfo.contact || '');
    setEmail(userInfo.email || '');
    setbirthdate(userInfo.birthdate || '');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        const userRef = collection(db, "Users");
        const userQuery = query(userRef, where("uid", "==", user.uid));
        
        getDocs(userQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              handleUserInfoChange(userData);
            } else {
              handleUserInfoChange({ fullname: '', contact: '', email: '', birthdate: '' });
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setIsLoggedIn(false);
        handleUserInfoChange({ fullname: '', contact: '', email: '', birthdate: '' });
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
    <FarmerProfileNav
        onUserInfoChange={handleUserInfoChange}
        fullname={fullname}
        contact={contact}
        email={email}
        birthdate={birthdate}
      />

      <div className="farmerProfileComponentMainPanel">
        <FarmerTopNav /> 
        <div className="farmerProfileComponentTopSection">
          <div className="farmerProfileComponentMainText1">
            <b className="farmerProfileComponentMainText2">
              <p className="farmerProfileComponentBlankLine">{t('farmerProfileText16')}</p>
            </b>
          </div>
        </div>
        <div style={{ marginTop: "-40px" }}>
          <div class="farmercourseProfile">
            <div className="course-preview1">
              <div className="farmerProfileComponentInfo">{t('farmerProfileText17')}</div>
              <div className="farmerProfileComponentFullName">{t('farmerProfileText18')}</div>
              <div className="farmerProfileComponentName">{fullname}</div>
              <div className="farmerProfileComponentRole">{t('farmerProfileText19')}</div>
              <img src={ProfileVector2} className="farmerselectImageIcon" />
              <div className="farmerProfileComponentRole2">{t('farmerProfileText20')}</div>
              <div className="farmerProfileComponentEmail1">{t('farmerProfileText21')}</div>
              <div className="farmerProfileComponentEmail2">{email}</div>
              <div className="farmerProfileComponentPhoneNumber">{t('farmerProfileText23')}</div>
              <div className="farmerProfileComponentNumber">{contact}</div>
              <div className="farmerProfileComponentBdayDate">{t('farmerProfileText22')}</div>
              <div className="farmerProfileComponentBirthdate">{formatDateOfBirth(new Date(birthdate))}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default BuyerProfile;