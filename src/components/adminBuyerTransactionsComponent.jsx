import AdminNavigation from "./adminPageNavigation";
import '../css/Components/adminBuyerTransactionsComponent.css';
import { FaFolderOpen,  FaTrash} from 'react-icons/fa';


const AdminBuyerTransactions = () => {
  return (
    <div className="adminBuyerTransactionsComponent">
        <AdminNavigation />     
      <div className="adminBuyerTransactionsComponentMainPanel">
        <div className="adminBuyerTransactionsComponentTopSection">
          <div className="adminBuyerTransactionsComponentMainText">
            <b className="adminBuyerTransactionsComponentMainTextContainer">
              <p className="adminBuyerTransactionsComponentBlankLine">&nbsp;</p>             
              <p className="adminBuyerTransactionsComponentBlankLine">transactions</p>
            </b>
          </div>
        </div>

    
        <div className="adminBuyerTransactionsComponentCategories">
              <div className="adminBuyerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">1</div>
              </div>
              <div className="adminBuyerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">2</div>
              </div>
              <div className="adminBuyerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">3</div>
              </div>
              <div className="adminBuyerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">4</div>
              </div>
              <div className="adminBuyerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">5</div>
              </div>
              <div className="adminBuyerTransactionsComponentPaginationContainer">
                <div className="adminBuyerTransactionsComponentPaginationNumber">6</div>
              </div>
            </div>


        <div className="adminBuyerTransactionsComponentMiddleSection"> 
        <div className="adminBuyerTransactionsPageLayout1">  
            <div className="adminBuyerTransactionsPageLayout2">
        <div className="adminBuyerTransactionsCard">
            <div className="adminBuyerTransactionsSubTitle"><FaFolderOpen /> Buyer Transactions
            </div>
            <br></br>
           <div className = "adminBuyerTransactionsShow">Show:   
           <select className="adminBuyerTransactionsRowSelect" onchange="updateRows(this.value)">
                   <option value="5">5</option>
                   <option value="10">10</option>
                   <option value="15">15</option>
                   <option value="20">20</option>
            </select>
            </div> 
            <br></br>
           
        <table className="adminBuyerTransactionsTable">
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
                     <select class="adminBuyerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
              
                 <td> <FaTrash /></td>               
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
                     <select class="adminBuyerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                
                 <td> <FaTrash /></td>               
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
                     <select class="adminBuyerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
          
                 <td> <FaTrash /></td>               
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
                     <select class="adminBuyerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
               
                 <td> <FaTrash /></td>               
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
                     <select class="adminBuyerTransactionsDropdown">
                       <option value="option1">Pending</option>
                       <option value="option2">Cancelled</option>
                       <option value="option3">Completed</option>
                     </select>
                 </td>
                
                 <td> <FaTrash /></td>               
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

export default AdminBuyerTransactions;
