import React, { useState, useEffect } from 'react';
import '../css/BuyerPage/buyerCommunityForumPost.css';
import BuyerProfileNav from '../components/buyerProfileNav';
import { Modal, Button } from '@material-ui/core';
import BuyerTopNav from '../components/buyerTopNav';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { auth, db } from './firebase';
import { updateDoc, doc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';

const BuyerAddress = () => {
  const { t } = useTranslation();

  const [openEditModal1, setOpenEditModal1] = useState(false);
  const [openEditModal2, setOpenEditModal2] = useState(false);
  const [name, setName] = useState('');
  const [fullname, setFullname] = useState('');
  const [contact, setContact] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [barangayError, setBarangayError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openEditModal3, setOpenEditModal3] = useState(false);
  const [userData, setUserData] = useState(null);

 // Function to handle adding a new address
 const handleAddAddress = () => {
  setOpenEditModal3(true);
};

// Function to open the third modal
const handleOpenEditModal3 = () => {
  setOpenEditModal3(true);
};

// Function to handle confirming the modal
const handleModalConfirm = () => {
  setShowModal(false);
};

// Function to handle cancelling the modal
const handleModalCancel = () => {
  setShowModal(false);
};

// Function to handle deleting an address
const handleDeleteAddress = () => {
  setShowModal(true);
};

// Function to open the first modal
const handleOpenEditModal1 = () => {
  setOpenEditModal1(true);
};

// Function to open the second modal
const handleOpenEditModal2 = () => {
  setOpenEditModal2(true);
};

// Function to handle phone number change
const handlePhoneNumberChange = (e) => {
  const value = e.target.value;
  const numericValue = value.replace(/\D/g, '');
  setContact(numericValue);
};

// Function to handle saving the changes
const handleSave = async () => {
  let hasError = false;

  if (!fullname) {
    hasError = true;
    setNameError(true);
  } else {
    setNameError(false);
  }

  if (!contact) {
    hasError = true;
    setPhoneNumberError(true);
  } else {
    setPhoneNumberError(false);
  }

  if (!barangay) {
    hasError = true;
    setBarangayError(true);
  } else {
    setBarangayError(false);
  }

  if (!address) {
    hasError = true;
    setAddressError(true);
  } else {
    setAddressError(false);
  }

  if (hasError) {
    return;
  }

  const user = auth.currentUser;
  
  if (user) {
    const userRef = doc(db, 'Users', user.uid);

    try {
      // Fetch the existing user data
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      // Update user data
      const updatedUserData = {
        ...userData,
        fullname,
        contact,
        barangay,
        address,
      };

      console.log('Updating user data:', updatedUserData);

      // Update the document in Firebase
      await updateDoc(userRef, updatedUserData);

      // Update local state after Firebase update
      setFullname(updatedUserData.fullname || '');
      setContact(updatedUserData.contact || '');
      setBarangay(updatedUserData.barangay || '');
      setAddress(updatedUserData.address || '');

      console.log('User data updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  handleClose();
};

  const handleClose = () => {
    setFullname('');
    setContact('');
    setBarangay('');
    setAddress('');
    setOpenEditModal1(false);
    setOpenEditModal2(false);
    setOpenEditModal3(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = collection(db, 'Users');
        const userQuery = query(userRef, where('uid', '==', user.uid));

        getDocs(userQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              setFullname(userData.fullname || '');
              setAddress(userData.address || '');
              setContact(userData.contact || '');
              setBarangay(userData.barangay || '');
            } else {
              setFullname('');
              setAddress('');
              setContact('');
              setBarangay('');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerCommunityForumComponentFullPost">
      <BuyerProfileNav />
      <div className="buyerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="buyerCommunityForumComponentTopSection">
          <div className="buyerCommunityForumComponentMainText1">
            <b className="buyerCommunityForumComponentMainText2">
              <p className="buyerCommunityForumComponentBlankLine">{t('Address')}</p>
            </b>
          </div>
        </div>
        <div className="addressTopSection">
      <div className="addressMainText1">
        {/* <button className="addressMainText2" onClick={handleAddAddress}>
          <p className="addressBlankLine">{t('farmerPageButton18')}</p>
          <FaPlus className="farmerCommunityForumComponentPlusIcon" onClick={handleOpenEditModal3} />
        </button> */}
        <br></br>
        <br></br>
        <Modal open={openEditModal3} onClose={handleClose}>
          <div className="editModal">
            <h2>New Address</h2>
            <br />
            <div className={`farmerMarketplaceEditProductComponentInputParent ${nameError ? 'error' : ''}`}>
              <div className="farmerMarketplaceEditProductComponentTitle">Full Name</div>
              <input
                className={`farmerMarketplaceEditProductComponentInput2 ${nameError ? 'error' : ''}`}
                type="text"
                placeholder="Enter your name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className={`farmerMarketplaceEditProductComponentInputParent ${phoneNumberError ? 'error' : ''}`}>
              <div className="farmerMarketplaceEditProductComponentTitle">Phone number</div>
              <input
                className={`farmerMarketplaceEditProductComponentInput2 ${phoneNumberError ? 'error' : ''}`}
                type="text"
                placeholder="Enter your phone number"
                value={contact}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className={`farmerMarketplaceEditProductComponentInputParent ${barangayError ? 'error' : ''}`}>
              <div className="farmerMarketplaceEditProductComponentTitle">Barangay</div>
              <input
                className={`farmerMarketplaceEditProductComponentInput2 ${barangayError ? 'error' : ''}`}
                type="text"
                placeholder="Enter your barangay"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
              />
            </div>
            <div className={`farmerMarketplaceEditProductComponentInputParent ${addressError ? 'error' : ''}`}>
              <div className="farmerMarketplaceEditProductComponentTitle">Address</div>
              <input
                className={`farmerMarketplaceEditProductComponentInput2 ${addressError ? 'error' : ''}`}
                type="text"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="farmerMarketplaceEditProductComponentInputParent">
              <input
                className="checkboxAddress"
                type="checkbox"
                value={false}
                onChange={(e) => console.log(e.target.value)}
              />
              <div className="setDefaultAddress">Set as Default Address</div>
            </div>
            <div className="buttonContainer">
              <Button variant="contained" color="primary" onClick={handleClose} className="cancelButton">
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={handleSave} className="saveButton">
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>

        <div class="courses-container" style={{ marginTop: '-40px' }}>
          <div class="courseAddress">
            <div class="course-preview1">
            <div class="nameAddress1">{fullname} </div>
              <div class="numberAddress"> | {contact}</div>
              <div class="locAddress1">{barangay}</div>
              <div class="locAddress2">{address}</div>

              <FaEdit className="EditIconAddress" onClick={handleOpenEditModal1} />

<Modal open={openEditModal1} onClose={handleClose}>
        <div className="editModal">
          <h2>{t('farmerProfileText26')}</h2>
          <br />
          <div className={`farmerMarketplaceEditProductComponentInputParent ${nameError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText27')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${nameError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText28')}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${phoneNumberError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText29')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${phoneNumberError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText30')}
              value={contact}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${barangayError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText31')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${barangayError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText32')}
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${addressError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText33')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${addressError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText34')}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="buttonContainer">
            <Button variant="contained" color="primary" onClick={handleClose} className="cancelButton">
            {t('farmerPageButton4')}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSave} className="saveButton">
            {t('farmerPageButton3')}
            </Button>
          </div>
        </div>
      </Modal>          
             
             
        <Modal open={openEditModal2} onClose={handleClose}>
        <div className="editModal">
          <h2>{t('farmerProfileText26')}</h2>
          <br />
          <div className={`farmerMarketplaceEditProductComponentInputParent ${nameError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText27')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${nameError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText28')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${phoneNumberError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText29')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${phoneNumberError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText30')}
              value={contact}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${barangayError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText31')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${barangayError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText32')}
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${addressError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">{t('farmerProfileText33')}</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${addressError ? 'error' : ''}`}
              type="text"
              placeholder={t('farmerProfileText34')}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="farmerMarketplaceEditProductComponentInputParent">
                  
                  <input
                    className="checkboxAddress"
                    type="checkbox"
                    value={false}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <div className="setDefaultAddress">{t('farmerProfileText35')}</div>
                </div>
          <div className="buttonContainer">
            <Button variant="contained" color="primary" onClick={handleClose} className="cancelButton">
            {t('farmerPageButton4')}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleSave} className="saveButton">
            {t('farmerPageButton3')}
            </Button>
          </div>
        </div>
      </Modal>
      {showModal && (
              <div className="modalBackdrop">
                <div className="modal1">
                  <div className="modalContent">
                    <h2>{t('farmerProfileText36')}</h2>
                    <div className="buttonContainer">
                      <br />
                      <button className="confirmButton" onClick={handleModalConfirm}>
                      {t('farmerPageButton5')}
                      </button>
                      <button className="cancelButton" onClick={handleModalCancel}>
                      {t('farmerPageButton6')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <FaTrashAlt className="DeleteIconAddress1" onClick={handleDeleteAddress} /> */}
          </div>
        </div>
      </div>
    </div>
    </div>
    </I18nextProvider>
  );
};

export default BuyerAddress;