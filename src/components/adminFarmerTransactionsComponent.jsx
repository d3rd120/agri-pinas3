import AdminNavigation from './adminPageNavigation';
import '../css/Components/adminFarmerTransactionsComponent.css';
import { FaFolderOpen, FaEdit, FaTrash} from 'react-icons/fa';


const AdminFarmerTransactions = () => {
  return (
    <div className="adminFarmerTransactionsComponent">
        <AdminNavigation /> 
      <div className="adminFarmerTransactionsComponentMainPanel">
        <div className="adminFarmerTransactionsComponentTopSection">
          <div className="adminFarmerTransactionsComponentMainText">
            <b className="adminFarmerTransactionsComponentMainTextContainer">
              <p className="adminFarmerTransactionsComponentBlankLine">&nbsp;</p>            
              <p className="adminFarmerTransactionsComponentBlankLine">transactions</p>
            </b>
          </div>
        </div>

        
        <div className="adminFarmerTransactionsComponentCategories">
              <div className="adminFarmerTransactionsComponentPaginationContainer">
                <div className="adminFarmerTransactionsComponentPaginationNumber">1</div>
              </div>
              <div className="adminFarmerTransactionsComponentPaginationContainer">
                <div className="adminFarmerTransactionsComponentPaginationNumber">2</div>
              </div>
              <div className="adminFarmerTransactionsComponentPaginationContainer">
                <div className="adminFarmerTransactionsComponentPaginationNumber">3</div>
              </div>
              <div className="adminFarmerTransactionsComponentPaginationContainer">
                <div className="adminFarmerTransactionsComponentPaginationNumber">4</div>
              </div>
              <div className="adminFarmerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">5</div>
              </div>
              <div className="adminFarmerTransactionsComponentPaginationContainer">
                <div className="adminFarmerTransactionsComponentPaginationNumber">6</div>
              </div>
            </div>



        <div className="adminFarmerTransactionsComponentMiddleSection">
        <div className="adminFarmerTransactionsPageLayout1">     
            <div className="adminFarmerTransactionsPageLayout2">
        <div className="adminFarmerTransactionsCard">
            <div className="adminFarmerTransactionsSubTitle"><FaFolderOpen /> Farmer Transactions
            </div>
            <br></br>
           <div className = "adminFarmerTransactionsShow">Show:   
           <select className="adminFarmerTransactionsRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>
           
        <table className="adminFarmerTransactionsTable">
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
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          <tr> 
                 <td>B001</td>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="adminFarmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>                
                 <td><FaTrash /></td>               
           </tr> 

               <tr> 
                 <td>B001</td>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="adminFarmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
              
                 <td><FaTrash /></td>               
           </tr>                   

           <tr> 
                 <td>B001</td>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="adminFarmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                
                 <td><FaTrash /></td>               
           </tr>          

           <tr> 
                 <td>B001</td>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="adminFarmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                
                 <td><FaTrash /></td>               
           </tr>          

           <tr> 
                 <td>B001</td>
                 <td>N001</td>
                 <td>Onion</td>
                 <td>02 / 01 / 2023</td>
                 <td>400 / kg</td>
                 <td>2 kg</td>
                 <td>800</td>
                 <td>Ryan Amador</td>
                 <td>
                     <select class="adminFarmerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
            
                 <td><FaTrash /></td>               
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

export default AdminFarmerTransactions;
