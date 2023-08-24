import BuyerTransactionNav from '../components/buyerTransactionNav';
import "../css/Components/farmerTransactionsCompletedComponent.css";
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import ProfileVector2 from '../img/profileVector2.png';
import pechay from '../img/pechay.png'
import sili from '../img/sili.png';
import RiceVector from '../img/riceCardImage.png';
import { FaEdit, FaTrash, FaFolderOpen } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const BuyerTransanctionCompleted = () => {
  
const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerTransactionsCompletedComponent">
      <BuyerNavigation />
      <div className="farmerTransactionsCompletedComponentMainPanel">
      <BuyerTopNav /> 
        <div className="farmerTransactionsCompletedComponentTopSection">
          <div className="farmerTransactionsCompletedComponentMainText">
            <b className="farmerTransactionsCompletedComponentMainTextWrapper">   
              <p className="farmerTransactionsCompletedComponentBlankLine">{t('buyerTransactionText1')}</p>
            </b>
          </div>
        </div>
        <BuyerTransactionNav />

        <div className="buyerTransactionCard">
            <div className="buyerTransactionSubTitle"><FaFolderOpen /> {t('buyerTransactionText2')}
            </div>
            <br></br>
           <div className = "farmerTransactionsPendingComponentShow">{t('buyerTransactionText3')}   
           <select className="farmerTransactionsPendingComponentRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>     
    
     

        <div className="buyerTransactionMiddleSection">
        <div className="buyerTransactionFrameParent">

        <div class="courses-container"style={{ marginTop: "-10px" }}>
  <div class="course">
    <div class="course-preview">
      <table class="table">
        <thead>
          <tr>
            <th class="product">{t('buyerTransactionText9')} </th>
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
            <th class="total-price-header">{t('buyerTransactionText10')}</th>
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
                  <img className="cartAvatarIcon" alt="" src={ProfileVector2} />
                  <div className="buyerMarketplaceComponentAuthorText">
                    <div className="buyerMarketplaceComponentAuthorName">Arriane Gatpo</div>
                    
                    <div className="buyerMarketplaceComponentSubName">{t('buyerTransactionText6')}</div>
                  </div>
                </div>
                <img src={sili} alt="Corn" className="img-container" />
              </div>
              
              <div className="cartPostSmallCardsFullDescription">
              <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="cartCardText">Sili</b>
                    </div>
  <div className="cartPostBlankLine">
    <b>{`Category: Packaging:`}</b>
    <span className="cartPostCategory">Fruit Sack</span>
   
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
          <th class="unit-price-header">₱5,000.00</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th class="unit-price-header">Qty: 2</th> 
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

<div class="courses-container"style={{ marginTop: "1px" }}>
  <div class="course">
    <div class="course-preview">
      <table class="table">
      <thead>
          <tr>
            <th class="product">{t('buyerTransactionText9')}</th>
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
            <th class="total-price-header">{t('buyerTransactionText10')}</th>
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
                  <img className="cartAvatarIcon" alt="" src={ProfileVector2} />
                  <div className="buyerMarketplaceComponentAuthorText">
                    <div className="buyerMarketplaceComponentAuthorName">Marievic Añes</div>
                    
                    <div className="buyerMarketplaceComponentSubName">Farmer</div>
                  </div>
                </div>
                <img src={pechay} alt="Corn" className="img-container" />
              </div>
              
              <div className="cartPostSmallCardsFullDescription">
              <div className="buyerMarketplaceComponentCardWrapper">
                      <b className="cartCardText">Pechay</b>
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
          <th class="unit-price-header">₱3,000.00</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th class="unit-price-header">Qty: 2</th> 
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th> 
            <th class="total-price-header">₱6,000.00</th>
            
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>
    
            <div className="buyerTransactionForumNumber">
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">1</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">2</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">3</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">4</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">5</div>
              </div>
              <div className="buyerTransactionForumContainer">
                <div className="buyerTransactionForumNumberBox">6</div>
              </div>
            </div>
          </div>
          </div> 
        </div>
      </div>
    </div>
    </I18nextProvider>

  );
};

export default BuyerTransanctionCompleted;
