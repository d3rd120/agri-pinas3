import React, { useState } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import TomatoVector from '../img/tomatoVector.png';
import ProfileVector1 from '../img/profileVector1.png';
import {Link} from 'react-router-dom';
import BuyerTopNav from '../components/buyerTopNav';
import { IconButton, Modal, TextField, Button } from '@material-ui/core';
import { RiEdit2Line } from 'react-icons/ri';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Checkout  = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [barangay, setBarangay] = useState('');
  const [address, setAddress] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [barangayError, setBarangayError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
  };
 
  const handleSave = () => {
    let hasError = false;

    if (!name) {
      hasError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }
  
    if (!phoneNumber) {
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
    setName('');
    setPhoneNumber('');
    setBarangay('');
    setAddress('');
  
    handleClose();
};
  const handleClose = () => {
   setName('');
   setPhoneNumber('');
   setBarangay('');
   setAddress('');
   setOpen(false);
};
  
  return (
    <div className="buyerMarketplaceComponent">
      <BuyerNavigation />
      <div className="farmerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="buyerMarketplaceComponentTopSection">
          <div className="buyerMarketplaceComponentMainText">
            <b className="buyerMarketplaceComponentSubText">
              <p className="buyerMarketplaceComponentBlankLine">&nbsp;</p>
              <p className="buyerMarketplaceComponentBlankLine">&nbsp;</p>
            <div className="orderContainer">
  <p className="buyerMarketplaceComponentBlankLine">Checkout</p>
  <Link to="/shoppingcart" className="backButton">&#8592;</Link>
</div>
            </b>
          </div>
        </div>
    
        <div class="courses-container"style={{ marginTop: "-60px" }}>
  <div class="course">
    <div class="course-preview">
    <div className="delivery">
  <LocationOnIcon className="mapIcon" />
  <span className="deliveryText">Delivery Address</span>
</div>


      <table class="table">
        <thead>
        <tr>
        <th className="name" style={{ fontWeight: 'bold' }}>Daniella Marie Tungol</th>

  <th>&nbsp;</th>
  <th  className="name" style={{ fontWeight: 'bold' }}>09675046713</th>
  <th>&nbsp;</th>
  <th>&nbsp;</th>
  <th>&nbsp;</th>
  <th class="address">Tungkong Mangga, San Jose Del Monte City, North Luzon, Bulacan</th>
  <th> 
  <div>
      <IconButton className="editButton" aria-label="Edit" onClick={handleOpen}>
        <RiEdit2Line />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div className="editModal">
          <h2>Edit your Address</h2>
          <br />
          <div className={`farmerMarketplaceEditProductComponentInputParent ${nameError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">Full Name</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${nameError ? 'error' : ''}`}
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`farmerMarketplaceEditProductComponentInputParent ${phoneNumberError ? 'error' : ''}`}>
            <div className="farmerMarketplaceEditProductComponentTitle">Phone number</div>
            <input
              className={`farmerMarketplaceEditProductComponentInput2 ${phoneNumberError ? 'error' : ''}`}
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
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
</th>
</tr>
        </thead>
      </table>
    </div>
  </div>
</div>
        <div class="courses-container"style={{ marginTop: "-45px" }}>
  <div class="course">
    <div class="course-preview">
      <table class="table">
        <thead>
          <tr>
            <th class="product">Product/s Ordered</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th class="unit-price-header">Unit Price</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>Quantity</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th class="total-price-header">Item Subtotal</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>

<div class="courses-container" style={{ marginTop: "-50px" }}>
  <div class="course1">
    <div class="course-preview">
      <table class="table">
        <thead>
          <tr>
            <div class="inputContainer">
              <div class="image-container">
                <div className="buyerMarketplaceComponentAuthor">
                  <img className="cartAvatarIcon" alt="" src={ProfileVector1} />
                  <div className="buyerMarketplaceComponentAuthorText">
                    <div className="buyerMarketplaceComponentAuthorName">Jenkins Mesina</div>
                    <div className="buyerMarketplaceComponentSubName">Farmer</div>
                  </div>
                </div>
                <img src={CornVector} alt="Corn" className="img-container" />
              </div>
              
              <div className="cartPostSmallCardsFullDescription">
              <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="cartCardText">Corn</b>
                    </div>
  <div className="cartPostBlankLine">
    <b>{`Category: Packaging:`}</b>
    <span className="cartPostCategory">Vegetable Sack</span>
  </div>
</div>


            </div>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          <th class="unit-price-header">₱5,000.00</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th>2</th> 
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th class="total-price-header">₱10,000.00</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>


<div class="courses-container" style={{ marginTop: "-20px" }}>
  <div class="course2">
    <div class="course-preview">
    <div class="buttonWrapper">
  <span class="totalText">Merchandise Subtotal:</span>
  <span class="buttonText1" style={{ marginLeft: "30px" }}>₱10,000.00</span>
</div>
<div class="buttonWrapper">
  <span class="totalText">Shipping Total:</span>
  <span class="buttonText1" style={{ marginLeft: "119px" }}>₱40.00</span>
</div>
<div class="buttonWrapper">
  <span class="totalText">Total Payment:</span>
  <span class="buttonText" style={{ marginLeft: "67px" }}>₱10,040.00</span>
  
</div>
<Link to="/buyertoreceive" className="ordercheckoutButton3">
    PLACE ORDER
  </Link>


    </div>
  </div>
</div>


	</div>
</div>
      
  );
};

export default Checkout;