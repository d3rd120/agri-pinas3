import React, { useState } from 'react';
import "../css/BuyerPage/buynow.css"
import BuyerNavigation from '../components/buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import TomatoVector from '../img/tomatoVector.png';
import ProfileVector1 from '../img/profileVector1.png';
import {Link} from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IconButton } from '@material-ui/core';
import Card from 'react-bootstrap/Card';

const BuyNow  = () => {
  const [quantity, setQuantity] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue === '0') {
      if (window.confirm('Do you want to remove this item?')) {
        
      }
    } else {
      setQuantity(inputValue);
    }
  };
  return (
    <div className="buyerMarketplaceComponent">
      <BuyerNavigation />
      <div className="buyerMarketplaceComponentMainPanel">
        <div className="buyerMarketplaceComponentTopSection">
          <div className="buyerMarketplaceComponentMainText">
            <b className="buyerMarketplaceComponentSubText">
              <p className="buyerMarketplaceComponentBlankLine">&nbsp;</p>
              <p className="buyerMarketplaceComponentBlankLine">&nbsp;</p>
            <div className="orderContainer">
  <p className="buyerMarketplaceComponentBlankLine">Order</p>
  <Link to="/buyermarketplace" className="backButton">&#8592;</Link>
</div>
            </b>
          </div>
        </div>
    
        <div class="courses-container"style={{ marginTop: "-60px" }}>
  <div class="course">
    <div class="course-preview">
      <table class="table">
        <thead>
          <tr>
            <th>
            <div class="inputContainer">
  <input type="checkbox" class="shoppingCheckbox" />
</div>
              
            </th>
            <th>Product</th>
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
            <th>&nbsp;</th>
            <th class="total-price-header">Total Price</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>

<div class="courses-container" style={{ marginTop: "-40px" }}>
  <div class="course1">
    <div class="course-preview">
      <table class="table">
        <thead>
          <tr>
            <div class="inputContainer">
              <input type="checkbox" class="shoppingCheckbox" />
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
          <th class="unit-price-header">₱5,000.00</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th>
            <input
                 type="number"
                 className="quantityInput"
                 min="0"
                 value={quantity}
                 onChange={handleInputChange}
            />
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th class="total-price-header">₱10,000.00</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th> 
              <div>
                 <IconButton className="deleteButton" aria-label="Delete">
                    <RiDeleteBinLine />
                  </IconButton>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>


<div class="courses-container" style={{ marginTop: "-40px" }}>
  <div class="course2">
    <div class="course-preview">
    <div class="buttonWrapper">
  <span class="totalText">Total: </span>
  <span class="buttonText" style={{ marginLeft: "5px" }}>₱10,000.00</span>
  <Link to="/checkout" className="ordercheckoutButton2">
    CHECKOUT
  </Link>
</div>

    </div>
  </div>
</div>
<div className="buyerMarketplaceComponentPostButtonNew">
          <div className="buyerMarketplaceComponentPostButtonNewTitle">YOU MAY ALSO LIKE</div>
          <div className="buyerMarketplaceComponentPostButtonNewCourses">
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost'style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image" 
                alt=""
                src={TomatoVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">Tomato</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱5,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={OnionVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">Onion</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱3,000</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link className="buyerMarketplaceComponentPostButtonNewCard1" to = '/buyermarketplacepost' style={{ textDecoration: 'none' }}>
              <img
                className="buyerMarketplaceComponentPostButtonNewCard1Image"
                alt=""
                src={RiceVector}
              />
              <div className="buyerMarketplaceComponentPostButtonNewCard1Details">
                <div className="buyerMarketplaceComponentPostButtonNewCard1DetailsInner">
                  <div className="buyerMarketplaceComponentPostButtonNewCard1Wrapper">
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">Rice</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱2,000</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

	</div>
</div>
      
  );
};

export default BuyNow;