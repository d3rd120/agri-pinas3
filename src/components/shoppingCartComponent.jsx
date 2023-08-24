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
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const ShoppingCart = () => {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < 1) {
      setQuantity(1);
      setShowModal(true);
    } else {
      setQuantity(value);
      setShowModal(false);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleMinusClick = () => {
    if (quantity === 1) {
      setShowModal(true);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="buyerMarketplaceComponent">
      <BuyerNavigation />
      <div className="farmerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="farmerCommunityForumComponentTopSection">
          <div className="farmerCommunityForumComponentMainText1">
            <b className="farmerCommunityForumComponentMainText2">             
              <p className="farmerCommunityForumComponentBlankLine">&nbsp;</p>
              <p className="farmerCommunityForumComponentBlankLine">{t('buyerCartText1')}</p>
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
            <th>{t('buyerCartText2')}</th>
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
            <th class="unit-price-header">{t('buyerCartText3')}</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>{t('buyerCartText4')}</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th class="total-price-header">{t('buyerCartText5')}</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th>{t('buyerCartText6')}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>

<div class="courses-container" style={{ marginTop: "-40px" }}>
  <div class="course1">
    <div class="course-preview">
    <table className="table">
      <thead>
        <tr>
          <div className="inputContainer">
            <input type="checkbox" className="shoppingCheckbox" />
            <div className="image-container">
              <div className="buyerMarketplaceComponentAuthor">
                <img className="cartAvatarIcon" alt="" src={ProfileVector1} />
                <div className="buyerMarketplaceComponentAuthorText">
                  <div className="buyerMarketplaceComponentAuthorName">Jenkins Mesina</div>
                  <div className="buyerMarketplaceComponentSubName">{t('buyerCartText7')}</div>
                </div>
              </div>
              <img src={CornVector} alt="Corn" className="img-container" />
            </div>

            <div className="cartPostSmallCardsFullDescription">
              <div className="buyerMarketplaceComponentCardWrapper">
                <b className="cartCardText">{t('buyerCartText8')}</b>
              </div>
              <div className="cartPostBlankLine">
                <b>{`Category: Packaging:`}</b>
                <span className="cartPostCategory">Vegetable Sack</span>
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
            <th className="unit-price-header">₱5,000.00</th>
            <th>&nbsp;</th>
            <th></th>
            <th>
            <td>
            <div className="inputContainer">
            <div className="quantityControl">
  <button className="quantityButton" onClick={handleMinusClick}>
    -
  </button>
  <input
    type="text"
    className="quantityInput"
    value={quantity}
    onChange={handleInputChange}
  />
  <button className="quantityButton" onClick={handlePlusClick}>
    +
  </button>
</div>


      {showModal && (
        <div className="modalBackdrop">
          <div className="modal1">
          <div className="modalContent">
  <h3>Do you want to remove this item?</h3>
  <div className="buttonContainer">
    <br></br>
    <button className="confirmButton" onClick={handleModalConfirm}>
      Yes
    </button>
    <button className="cancelButton" onClick={handleModalCancel}>
      No
    </button>
  </div>
</div>

          </div>
        </div>
      )}
    </div>
          </td>
            </th>
          </div>
          <th>&nbsp;</th>
          <th className="total-price-header">₱10,000.00</th>
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
          <div className="buyerMarketplaceComponentPostButtonNewTitle">{t('buyerCartText11')}</div>
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
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerCartText12')}</div>
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
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerCartText13')}</div>
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
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Title">{t('buyerCartText14')}</div>
                    <div className="buyerMarketplaceComponentPostButtonNewCard1Price">₱2,000</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

	</div>
</div>
</I18nextProvider>
      
  );
};

export default ShoppingCart;