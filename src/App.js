import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing pages
import MainPage from './pages/MainPage/mainPage';
import LoginPage from './pages/MainPage/loginPage';
import SignupPage from './pages/MainPage/signupPage';
import AboutPage from './pages/MainPage/aboutPage';


import BuyerMarketplace from './pages/BuyerPage/buyerMarketplace';
import BuyerMarketplacePost from './pages/BuyerPage/buyerMarketplacePost';
import ShoppingCart from './components/shoppingCartComponent';
import BuyerCommunityForumPost from './pages/BuyerPage/buyerCommunityForumPost';
import BuyerToReceive from './pages/BuyerPage/buyerTransactToReceive';
import BuyerComplete from './components/buyerTransactionCompleted';
import BuyerCancelled from './components/buyerTransactionCancelled';
import BuyerProfile from './pages/BuyerPage/buyerProfile';
import BuyerAddress from './components/buyerAddressComponent';
import BuyerCheckout from './components/buyerCheckout';
import BuyerCommunityForum from './components/buyerCommunityForumComponent';
import BuyerMarketplaceVegetableCategory from './pages/BuyerPage/buyerMarketplaceVegetableCategory';
import BuyerMarketplaceFruitsCategory from './pages/BuyerPage/buyerMarketplaceFruitsCategory';
import BuyerMarketplaceFertilizerCategory from './pages/BuyerPage/buyerMarketplaceFertilizerCategory';
import BuyerMarketplaceOtherProductsCategory from './pages/BuyerPage/buyerMarketplaceOtherProductsCategory';
import BuyerMessaging from './pages/BuyerPage/buyerMessaging';





import AdminDashboard from './pages/AdminPage/adminDashboard';
import AdminCommunityForum from './pages/AdminPage/adminCommunityForum';
import AdminBuyerTransactions from './pages/AdminPage/adminBuyerTransactions';
import AdminFarmerTransactions from './pages/AdminPage/adminFarmerTransactions';
import AdminAccountBuyer from './pages/AdminPage/adminAccountBuyer';
import AdminAccountFarmer from './pages/AdminPage/adminAccountFarmer';
import AdminMarketplace from './pages/AdminPage/adminMarketplace';
import AdminLogReport from './pages/AdminPage/adminLogReport';
import AdminMarketplaceArchived from './pages/AdminPage/adminMarketplaceArchived';
import AdminCommunityForumArchived from './pages/AdminPage/adminCommunityForumArchived';
import AdminBuyerPendingTransactions from './pages/AdminPage/adminBuyerPendingTransactions';
import AdminBuyerCompletedTransactions from './pages/AdminPage/adminBuyerCompletedTransactions';
import AdminBuyerCancelledTransactions from './pages/AdminPage/adminBuyerCancelledTransactions';
import AdminFarmerPendingTransactions from './pages/AdminPage/adminFarmerPendingTransactions';
import AdminFarmerCompletedTransactions from './pages/AdminPage/adminFarmerCompletedTransactions';
import AdminFarmerCancelledTransactions from './pages/AdminPage/adminFarmerCancelledTransactions';



import Reset from './components/reset';
import PrivateRoutes from './Util/PrivateRoutes';
import PublicRoutes from './Util/PublicRoutes';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/about" element={<AboutPage />} />          




          <Route path="/buyermarketplace" element={<BuyerMarketplace />} />
          <Route path="/buyermarketplacepost/:productId" element={<BuyerMarketplacePost />} />
          <Route path="/buyercommunityforumpost/:postId" element={<BuyerCommunityForumPost />}  />
          <Route path="/buyertoreceive" element={<BuyerToReceive />}  />
          <Route path="/buyercomplete" element={<BuyerComplete />} />
          <Route path="/buyercancelled" element={<BuyerCancelled />} />         
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/buyerprofile" element={<BuyerProfile />} />
          <Route path="/buyeraddress" element={<BuyerAddress />} />       
          <Route path="/buyercommunityforum" element={<BuyerCommunityForum />} />    
          <Route path="/buyervegetablecategory/:userUid/:sessionId" element={<BuyerMarketplaceVegetableCategory />} />  
          <Route path="/buyerfruitscategory/:userUid/:sessionId" element={<BuyerMarketplaceFruitsCategory />} />   
          <Route path="/buyerfertilizercategory/:userUid/:sessionId" element={<BuyerMarketplaceFertilizerCategory />} />   
          <Route path="/buyerotherproductscategory/:userUid/:sessionId" element={<BuyerMarketplaceOtherProductsCategory />} />
          <Route path="/checkout" element={<BuyerCheckout />} /> 
          <Route path="/messaging" element={<BuyerMessaging />} /> 
          
               
        
      

          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admincommunityforum" element={<AdminCommunityForum />} />
          <Route path="/adminbuyertransactions" element={<AdminBuyerTransactions />}  />
          <Route path="/adminfarmertransactions" element={<AdminFarmerTransactions />} />
          <Route path="/adminaccountbuyer" element={<AdminAccountBuyer />} />
          <Route path="/adminaccountfarmer" element={<AdminAccountFarmer />}/>
          <Route path="/adminmarketplace" element={<AdminMarketplace />}/>
          <Route path="/adminlogreport" element={<AdminLogReport />}/>          
          <Route path="/adminbuyerpendingtransactions" element={<AdminBuyerPendingTransactions />}/>
          <Route path="/adminbuyercompletedtransactions" element={<AdminBuyerCompletedTransactions />}/>
          <Route path="/adminbuyercancelledtransactions" element={<AdminBuyerCancelledTransactions />}/>  
          <Route path="/adminfarmerpendingtransactions" element={<AdminFarmerPendingTransactions />}/>  
          <Route path="/adminfarmercompletedtransactions" element={<AdminFarmerCompletedTransactions />}/>  
          <Route path="/adminfarmercancelledtransactions" element={<AdminFarmerCancelledTransactions />}/>  
          <Route path="/adminmarketplacearchived" element={<AdminMarketplaceArchived />}/>     
          <Route path="/admincommunityforumarchived" element={<AdminCommunityForumArchived />}/>      
               
                   
          <Route element={<PublicRoutes />} />
          <Route element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;