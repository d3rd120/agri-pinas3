import React from 'react';
import "../../css/Buyer Page/manageorders.css";
import { RiChat1Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CornVector from '../../img/farmerMarkeplaceVector1.png';
import OnionVector from '../../img/farmerMarkeplaceVector2.png';
import Homenav from '../../components/buyerNavigation';
import HeaderTitle from '../../components/headerTitle';



const ManageOrder = () => {
  return (
    <>
      <Homenav />   
    
     
        <HeaderTitle>Transactions</HeaderTitle>
        <div className="card2">
            <div className="ordersmanage">Manage Orders
            </div>
            <br></br>
           <div className = "show">Show:   
           <select className="row-select" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>
           
        <table className="transactionTable">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Date Ordered</th>
              <th>Unit Price</th>
              <th>Quantity Order</th>
              <th>Total Amount</th>
              <th>Farmer Name</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
          <tr>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="dropdown-button">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                 <td> <span>&#9993;</span></td>
           </tr>
          </tbody>
        </table>
        </div>
            </>
  );
};

export default ManageOrder;