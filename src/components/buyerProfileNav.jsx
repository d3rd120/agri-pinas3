import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaGlobe, FaHome, FaWallet, FaUser,FaStore, FaShoppingBag, FaCartPlus, FaEnvelope, FaUserCircle, FaBell, FaEdit } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import "../css/BuyerPage/buyerProfileNav.css";
import { IconButton, Modal, TextField, Button } from '@material-ui/core';
import Logo from '../img/agriPinasLogo.png';
import profile2 from '../img/profileVector2.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { auth, db, storage } from './firebase';
import { collection, where, getDocs, query, doc, getDoc, setDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BuyerProfileNav = ({ onUserInfoChange }) => {
  const { t } = useTranslation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullname, setfullname] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setbirthdate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleEditProfileClick = () => {
    setOpen(true);
  };
  
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setContact(numericValue);
  };
 
  const handleSaveUserData = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error('User not authenticated.');
      return;
    }
  
    const userId = user.uid;
    const userRef = doc(db, 'Users', userId);
  
    try {
      // Check if the user document exists
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        const userData = {
          fullname,
          contact,
          email,
          birthdate: birthdate ? birthdate.toISOString() : null,
        };
  
        
        if (selectedImage) {
          const imageRef = ref(storage, `images/${userId}/${selectedImage.name}`);
          await uploadBytes(imageRef, selectedImage);
          const downloadURL = await getDownloadURL(imageRef);
          userData.profileImageUrl = downloadURL;
        }
  
        // Update the user document with the new data
        await setDoc(userRef, userData, { merge: true });
  
        console.log('User data updated successfully!');
  
        
        onUserInfoChange(userData);
  
        handleClose();
      } else {
        console.error('User document does not exist. Cannot update.'); 
        // Handle the case where the user document does not exist (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
  
  
 
  const handleClose = () => {
    setOpen(false);
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
            setEmail(userData.email || '');
  
            if (userData.birthdate) {
              setbirthdate(new Date(userData.birthdate));
            } else {
              setbirthdate(null);
            }
          } else {
            setfullname('');
            setContact('');
            setEmail('');
            setbirthdate(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setfullname('');
        setContact('');
        setEmail('');
        setbirthdate(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerNavigation">
      <NavLink className="buyerNavigationLogoParent" to = '/buyermarketplace'>
        <img className="buyerNavigationLogoIcon" alt="" src={Logo} />
        <div className="buyerNavigationMainText">AgriPinas</div>
      </NavLink>
      <div className="buyerNavigationGroupParent">
        <NavLink
          className="buyerNavigationLink1"
          to="/buyerprofile"
          activeClassName="active"
        >
          <div className="buyerNavigationLinksProfile">{t('farmerProfileText3')}</div>
        </NavLink>

        <NavLink
          className="buyerNavigationLink2"
          to="/buyeraddress"
          activeClassName="active"
        >
          <div className="buyerNavigationLinksAddress">{t('farmerProfileText4')}</div>
        </NavLink>
        <NavLink
          className="buyerNavigationLogout"
          to="/login"
        >
          <div className="buyerNavigationLinksLogout">{t('farmerProfileText5')}</div>
          <FaSignOutAlt className="buyerNavigationLinksIconLogout" />
        </NavLink>

        <div className="buyerNavigationLink3">
          <img src={profile2} alt="Account Icon" className="accountIcon" /> 
          <div className="buyerNavigationLinks1">{fullname}</div>
          <div className="buyerNavigationLinks2" onClick={handleEditProfileClick}>{t('farmerProfileText1')}</div>
          <FaEdit className="buyerNavigationLinksIcon1" onClick={handleEditProfileClick} />
        </div>

        <NavLink
          className="buyerNavigationLink4"
          to="#"
          activeClassName="active"
        >
          <div className="buyerNavigationLinks">{t('farmerProfileText2')}</div>
          <FaUser className="buyerNavigationLinksIcon" />
        </NavLink>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className="editModal">
          <h2>{t('farmerProfileText6')}</h2>
          <br />
          <div className="buyerNavEditProductComponentInputParent">
          <div className="buyerNavEditProductComponentTitle1">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                className="accountIcon1"
                alt="Uploaded Profile"
              />
            ) : (
              <img src={profile2} className="accountIcon1" alt="Default Profile" />
            )}
            {t('farmerProfileText7')}
          </div>
          <input
            type="file"
            placeholder="Select your image"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
      </div>

          <div className="buyerNavEditProductComponentInputParent">
            <div className="buyerNavEditProductComponentTitle1">{t('farmerProfileText8')}</div>
            <input
              className="buyerNavEditProductComponentInput2"
              type="text"
              placeholder={t('farmerProfileText9')}
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
          </div>
          <div className="buyerNavEditProductComponentInputParent">
            <div className="buyerNavEditProductComponentTitle1">{t('farmerProfileText10')}</div>
            <input
              className="buyerNavEditProductComponentInput2"
              type="text"
              placeholder={t('farmerProfileText11')}
              value={contact}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className="buyerNavEditProductComponentInputParent">
            <div className="buyerNavEditProductComponentTitle1">{t('farmerProfileText12')}</div>
            <input
              className="buyerNavEditProductComponentInput2"
              type="text"
              placeholder={t('farmerProfileText13')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="buyerNavEditProductComponentInputParent dateOfBirthFieldParent">
            <div className="buyerNavEditProductComponentTitle1">{t('farmerProfileText14')}</div>
            <DatePicker
              className="buyerNavEditProductComponentInput2 dateOfBirthField"
              selected={birthdate}
              placeholderText={t('farmerProfileText15')}
              onChange={date => setbirthdate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div className="buttonContainer1">
            <Button variant="contained" color="primary" onClick={handleClose} className="cancelButton">
            {t('farmerPageButton4')}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSaveUserData} className="saveButton">
            {t('farmerPageButton3')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
    </I18nextProvider>

  );
};

export default BuyerProfileNav;
