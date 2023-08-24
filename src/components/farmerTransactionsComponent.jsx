import "../css/Components/farmerTransactionsComponent.css";
import FarmerNavigation from '../components/farmerPageNavigation';
import { FaFolderOpen, FaEdit, FaTrash } from 'react-icons/fa';
import FarmerTopNav from '../components/farmerTopNav';

const FarmerTransactions = () => {
  return (
    <div className="farmerTransactionsComponent">
      <FarmerNavigation />  
      <div className="farmerTransactionsComponentMainPanel">
        <FarmerTopNav />
        <div className="farmerTransactionsComponentTopSection">
          <div className="farmerTransactionsComponentMainText">
            <b className="farmerTransactionsComponentMainTextContainer">                 
              <p className="farmerTransactionsComponentBlankLine">Transactions</p>
            </b>
          </div>
        </div>

        
        <div className="farmerTransactionsComponentCategories">
              <div className="farmerTransactionsComponentPaginationContainer">
                <div className="farmerTransactionsComponentPaginationNumber">1</div>
              </div>
              <div className="farmerTransactionsComponentPaginationContainer">
                <div className="farmerTransactionsComponentPaginationNumber">2</div>
              </div>
              <div className="farmerTransactionsComponentPaginationContainer">
                <div className="farmerTransactionsComponentPaginationNumber">3</div>
              </div>
              <div className="farmerTransactionsComponentPaginationContainer">
                <div className="farmerTransactionsComponentPaginationNumber">4</div>
              </div>
              <div className="farmerTransactionsComponentPaginationContainer">
                <div className="farmerTransactionsComponentPaginationNumber">5</div>
              </div>
              <div className="farmerTransactionsComponentPaginationContainer">
                <div className="farmerTransactionsComponentPaginationNumber">6</div>
              </div>
            </div>


        <div className="farmerTransactionsComponentMiddleSection">
        <div className="farmerTransactionsPageLayout1">  
            <div className="farmerTransactionsPageLayout2">
        <div className="farmerTransactionsCard">
            <div className="farmerTransactionsSubTitle"><FaFolderOpen /> Your Transactions
            </div>
            <br></br>
           <div className = "farmerTransactionsShow">Show:   
           <select className="farmerTransactionsRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>
           
        <table className="farmerTransactionsTable">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Date Ordered</th>
              <th>Unit Price</th>
              <th>Quantity Order</th>
              <th>Total Amount</th>
              <th>Farmer Name</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          <tr className = "farmerTransactionsTr"> 
                 <td>B001</td>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="farmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                 <td><FaEdit/> </td> 
              <td><FaTrash/></td>              
           </tr>

           <tr className = "farmerTransactionsTr"> 
                 <td>B002</td>
                 <td>N002</td>
                 <td>Corn</td>
                 <td>01 / 11 / 2023</td>
                 <td>350 / kg</td>
                 <td>1 kg</td>
                 <td>600</td>
                 <td>Arianne Gatpo</td>
                 <td>
                     <select class="farmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                 <td><FaEdit/> </td> 
              <td><FaTrash/></td>           
           </tr>

           <tr className = "farmerTransactionsTr"> 
                 <td>B003</td>
                 <td>N003</td>
                 <td>Tomato</td>
                 <td>12 / 01 / 2023</td>
                 <td>100 / kg</td>
                 <td>9 kg</td>
                 <td>1000</td>
                 <td>Daniella Tungol</td>
                 <td>
                     <select class="farmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                 <td><FaEdit/> </td> 
              <td><FaTrash/></td>            
           </tr>


           <tr className = "farmerTransactionsTr"> 
                 <td>B004</td>
                 <td>N004</td>
                 <td>Carrot</td>
                 <td>03 / 03 / 2023</td>
                 <td>50 / kg</td>
                 <td>5 kg</td>
                 <td>100</td>
                 <td>Marievic Anes</td>
                 <td>
                     <select class="farmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                 <td><FaEdit/> </td> 
              <td><FaTrash/></td>            
           </tr>


           <tr className = "farmerTransactionsTr"> 
                 <td>B005</td>
                 <td>N005</td>
                 <td>Rice</td>
                 <td>07 / 23 / 2023</td>
                 <td>400 / kg</td>
                 <td>1 kg</td>
                 <td>800</td>
                 <td>Jenkins Mesina</td>
                 <td>
                     <select class="farmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                 <td><FaEdit/> </td> 
              <td><FaTrash/></td>            
           </tr>

          </tbody>
        </table>
        </div>
        </div>
      </div>
          
          </div> 
      </div>
    </div>
  );
};

export default FarmerTransactions;
