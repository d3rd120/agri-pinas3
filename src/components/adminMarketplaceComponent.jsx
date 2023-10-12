import "../css/Components/adminMarketplaceComponent.css";
import AdminNavigation from '../components/adminPageNavigation';
import AdminMarketplaceUpdateComponent from '../components/adminMarketplaceUpdateComponent';
import AdminMarketplaceDeleteComponent from '../components/adminMarketplaceDeleteComponent';
import RiceVector from '../img/riceCardImage.png';
import SquashVector from '../img/squash.png';
import { FaTrash, FaStore, FaEdit, FaTimes } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';



const AdminMarketplaceComponent = () => {
  const { t } = useTranslation();
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const handleButtonClick1 = () => {
    setShowPopup1(true);
  };

  const closePopup1 = () => {
    setShowPopup1(false);
  };

  const handleButtonClick2 = () => {
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
  };

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'Marketplace');
      const querySnapshot = await getDocs(productsCollection);

      if (querySnapshot.empty) {
        console.warn('No products found.');
        return;
      }

      const productsData = querySnapshot.docs.map((doc) => {
        const product = doc.data();
        return {
          id: doc.id,
          ...product,
        };
      });

      console.log('Fetched products:', productsData);
      setProducts(productsData);
      console.log('Products in state:', productsData);
    } catch (error) {
      console.error('Error retrieving products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <I18nextProvider i18n={i18n}> 
    <div className="adminMarketplaceComponent">
      <AdminNavigation />
      <div className="adminMarketplaceComponentMainPanel">   
        <div className="adminMarketplaceComponentTopSection">
          <div className="adminMarketplaceComponentMainText">
            <b className="adminMarketplaceComponentMainTextWrapper">       
              <p className="adminMarketplaceComponentBlankLine">&nbsp;</p>
              <p className="adminMarketplaceComponentBlankLine">{t('farmerPageNavgationText2')}</p>
            </b>
          </div>
        </div>  
          
       
            {showPopup1 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup1}
                >
                  <FaTimes />
                </span>
                <AdminMarketplaceUpdateComponent/>
              </div>
            </div>
          )}    

            {showPopup2 && (
            <div
              id="buyerCommunityForumComponentPopupWindow"
              className="buyerCommunityForumComponentPopupWindow"
            >
              <div className="buyerCommunityForumComponentPopupContent">
                <span
                  className="buyerCommunityForumComponentCloseButton"
                  onClick={closePopup2}
                >
                  <FaTimes />
                </span>
                <AdminMarketplaceDeleteComponent/>
              </div>
            </div>
          )}    
    
        
    
        
        <div className="adminMarketplaceComponentCard">
          <div className="adminMarketplaceComponentSubTitle"><FaStore /> {t('farmerTransactionsText18')}
          </div>
          <br></br>
          <div className="adminMarketplaceComponentShow">
          {t('farmerTransactionsText3')}
          <select
            className="adminMarketplaceComponentRowSelect"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input
            className="adminMarketplaceComponentRowSelect"
            type="text"
            placeholder={t('farmerTransactionsText4')}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          
        </div>
        <br></br>
          <div className="adminMarketplaceComponentMiddleSection">
            <div className="adminMarketplaceComponentFrameParent">




            <div className="adminMarketplaceComponentFrameWrapper">
          {products.map((product) => (
            <a className="adminMarketplaceComponentRectangleParent" key={product.id}>
                <img
                  className="adminMarketplaceComponentFrameChild"
                  alt=""
                  src={product.image}
                />
                <div className="adminMarketplaceComponentFrameGroup">
                  <div className="adminMarketplaceComponentFrameContainer">
                    <div className="adminMarketplaceComponentSubText1Wrapper">
                      <b className="adminMarketplaceComponentSubText1">{product.productName}</b>
                    </div>
                    <div className="adminMarketplaceComponentSubText2Wrapper2">
                      <div className="adminMarketplaceComponentSubText2">
                        <b>{t('farmerPageCategory')}</b> {product.category}
                      </div>
                      <div className="adminMarketplaceComponentSubText2">
                        <b>{t('farmerPagePackaging')}</b> {product.packaging}
                      </div>
                      <div className="adminMarketplaceComponentSubText2">
                        <b>{t('farmerPagePrice')}</b> {product.price}
                      </div>
                      <div className="adminMarketplaceComponentSubText2">
                        <b>{t('farmerPageKilogram')}</b> {product.kilogramPerUnit}
                      </div>
                      <div className="adminMarketplaceComponentSubText2">
                        <b>{t('farmerPageDescription')}</b> {product.description}
                      </div>
                    </div>
                  </div>
                  <div className="adminMarketplaceComponentFrameItem" />
                  <div className="adminMarketplaceComponentDetails">
                    <button className="adminMarketplaceComponentButton" onClick={handleButtonClick1}>
                      <FaEdit className="adminMarketplaceComponentButtonIcon" />
                      <div className="adminMarketplaceComponentButtonText">{t('farmerPageButton13')}</div>
                    </button>
                    <button className="adminMarketplaceComponentButton" onClick={handleButtonClick2}>
                      <FaTrash className="adminMarketplaceComponentButtonIcon" />
                      <div className="adminMarketplaceComponentButtonText">{t('farmerPageButton2')}</div>
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>


            {/* {products.map((product) => (
                  <NavLink
                    key={product.id}
                    className="farmerMarketplaceComponentRectangleParent"
                    to="/farmermarketplacepost"
                    activeClassName="active"
                  >
                    <img className="farmerMarketplaceComponentFrameChild" alt="" src={product.image} />
                    <div className="farmerMarketplaceComponentFrameGroup">
                      <div className="farmerMarketplaceComponentFrameContainer">
                        <div className="farmerMarketplaceComponentCardWrapper">
                          <b className="farmerMarketplaceComponentCardText">{product.productName}</b>
                        </div>
                        <div className="farmerMarketplaceComponentCategoryWrapper">
                          <div className="farmerMarketplaceComponentCategoryContainer">
                            <p className="farmerMarketplaceComponentBlankLine">
                              <b>Category: </b>farmerPageCategory
                              <span className="farmerMarketplaceComponentCategory">{product.category}</span>
                            </p>
                            <p className="farmerMarketplaceComponentBlankLine">
                              <b>Packaging: </b>
                              <span className="farmerMarketplaceComponentCategory">{product.packaging}</span>
                            </p>
                            <p className="farmerMarketplaceComponentBlankLine">
                              <b className="farmerMarketplaceComponentCategory">Price: </b>
                              <span>{product.price}</span>
                            </p>
                            <p className="farmerMarketplaceComponentBlankLine">
                              <b>Kilogram per unit: </b>
                              <span className="farmerMarketplaceComponentCategory">{product.kilogramPerUnit}</span>
                            </p>
                            <p className="farmerMarketplaceComponentBlankLine">
                              <b className="farmerMarketplaceComponentCategory">Description: </b>
                              <span>{product.description}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="farmerMarketplaceComponentFrameItem" />
                      <div className="farmerMarketplaceComponentAuthor">
                        <img className="farmerMarketplaceComponentAvatarIcon" alt="" src={ProfileVector2} />
                        <div className="farmerMarketplaceComponentAuthorText">
                          <div className="farmerMarketplaceComponentAuthorName">Marievic Anes</div>
                          <div className="farmerMarketplaceComponentSubName">Farmer</div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))} */}           

            

              {/* <div className="adminMarketplaceComponentFrameWrapper">
                <a className="adminMarketplaceComponentRectangleParent">
                  <img
                    className="adminMarketplaceComponentFrameChild"
                    alt=""
                    src={SquashVector}
                  />
                  <div className="adminMarketplaceComponentFrameGroup">
                    <div className="adminMarketplaceComponentFrameContainer">
                      <div className="adminMarketplaceComponentSubText1Wrapper">
                        <b className="adminMarketplaceComponentSubText1">{t('farmerPageProductText6')}</b>
                      </div>
                      <div className="adminMarketplaceComponentSubText2Wrapper2">                        
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPageCategory')}</b> Vegetable
                        </div> 
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPagePackaging')}</b> Sack
                        </div>                        
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPagePrice')}</b> Php 1,000
                        </div>    
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPageKilogram')}</b> 5 kgs
                        </div>    
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPageDescription')}</b>  An onion is a round vegetable with a brown skin that grows underground. It has many white layers on its inside which have a strong.
                        </div>    
                      </div>
                    </div>
                    <div className="adminMarketplaceComponentFrameItem" />
                    <div className="adminMarketplaceComponentDetails">      
                    <button className="adminMarketplaceComponentButton"
                            onClick={handleButtonClick1}>
                        <FaEdit className="adminMarketplaceComponentButtonIcon" />
                        <div className="adminMarketplaceComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>          
                      <button className="adminMarketplaceComponentButton"
                              onClick={handleButtonClick2}>
                        <FaTrash className="adminMarketplaceComponentButtonIcon" />
                        <div className="adminMarketplaceComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>         
                  </div>
                </a> 

                <a className="adminMarketplaceComponentRectangleParent">
                  <img
                    className="adminMarketplaceComponentFrameChild"
                    alt=""
                    src={RiceVector}
                  />
                  <div className="adminMarketplaceComponentFrameGroup">
                    <div className="adminMarketplaceComponentFrameContainer">
                      <div className="adminMarketplaceComponentSubText1Wrapper">
                        <b className="adminMarketplaceComponentSubText1">{t('buyerCartText14')}</b>
                      </div>
                      <div className="adminMarketplaceComponentSubText2Wrapper2">                        
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPageCategory')}</b> Vegetable
                        </div> 
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPagePackaging')}</b> Sack
                        </div>                        
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPagePrice')}</b> Php 1,000
                        </div>    
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPageKilogram')}</b> 5 kgs
                        </div>    
                        <div className="adminMarketplaceComponentSubText2">
                          <b>{t('farmerPageDescription')}</b>  An onion is a round vegetable with a brown skin that grows underground. It has many white layers on its inside which have a strong.
                        </div>    
                      </div>
                    </div>
                    <div className="adminMarketplaceComponentFrameItem" />
                    <div className="adminMarketplaceComponentDetails">      
                    <button className="adminMarketplaceComponentButton"
                            onClick={handleButtonClick1}>
                        <FaEdit className="adminMarketplaceComponentButtonIcon" />
                        <div className="adminMarketplaceComponentButtonText">{t('farmerPageButton13')}</div>
                      </button>          
                      <button className="adminMarketplaceComponentButton"
                              onClick={handleButtonClick2}>
                        <FaTrash className="adminMarketplaceComponentButtonIcon" />
                        <div className="adminMarketplaceComponentButtonText">{t('farmerPageButton2')}</div>
                      </button>
                    </div>        
                  </div>
                </a> 
                
              </div>  */}



          
              <div className="adminMarketplaceComponentForumNumber">
                <div className="adminMarketplaceComponentForumContainer">
                  <div className="adminMarketplaceComponentForumNumberBox">1</div>
                </div>
                <div className="adminMarketplaceComponentForumContainer">
                  <div className="adminMarketplaceComponentForumNumberBox">2</div>
                </div>
                <div className="adminMarketplaceComponentForumContainer">
                  <div className="adminMarketplaceComponentForumNumberBox">3</div>
                </div>
                <div className="adminMarketplaceComponentForumContainer">
                  <div className="adminMarketplaceComponentForumNumberBox">4</div>
                </div>
                <div className="adminMarketplaceComponentForumContainer">
                  <div className="adminMarketplaceComponentForumNumberBox">5</div>
                </div>
                <div className="adminMarketplaceComponentForumContainer">
                  <div className="adminMarketplaceComponentForumNumberBox">6</div>
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

export default AdminMarketplaceComponent;
