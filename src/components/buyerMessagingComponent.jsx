import "../css/BuyerPage/buyerMessagingComponent.css";
import BuyerNavigation from '../components/buyerNavigation';
import BuyerTopNav from '../components/buyerTopNav';
import ProfileVector1 from '../img/profileVector1.png';
import ProfileVector2 from '../img/profileVector2.png'
import { FaPaperclip } from "react-icons/fa";

const FarmerTransactions = () => {
  return (
    <div className="farmertransactions">
    <BuyerNavigation />
      <div className="main-panel">
        <BuyerTopNav />
        <br></br>
        <div className="user-messages">
          <div className="contacts">
            <b className="messages">Messages</b>
            <div className="conversation">
              <div className="contact-card">
                <div className="photoauto-layout">
                  <img
                    className="photoauto-layout-child"
                    alt=""
                    src={ProfileVector1}
                  />
                  <div className="nametext">
                    <b className="messages">Jenkins Mesina</b>
                    <div className="omg-this-is">omg, this is amazing</div>
                  </div>
                </div>
                <div className="omg-this-is">14:32</div>
              </div>
              <div className="contact-card">
                <div className="photoauto-layout">
                  <img
                    className="photoauto-layout-child"
                    alt=""
                    src={ProfileVector2}
                  />
                  <div className="nametext">
                    <b className="messages">Daniella Tungol</b>
                    <div className="omg-this-is">omg, this is amazing</div>
                  </div>
                </div>
                <div className="omg-this-is">14:32</div>
              </div>
              <div className="contact-card">
                <div className="photoauto-layout">
                  <img
                    className="photoauto-layout-child"
                    alt=""
                    src={ProfileVector1}
                  />
                  <div className="nametext">
                    <b className="messages">Ryan Edward Amador</b>
                    <div className="omg-this-is">omg, this is amazing</div>
                  </div>
                </div>
                <div className="omg-this-is">14:32</div>
              </div>            
            </div>
          </div>
          <div className="messages1">
            <div className="messageheader">
              <div className="title">
                <b className="messages">Cameron</b>
              </div>
            </div>
            <div className="messagescontainer">
              <div className="contactmessage">
                <div className="conversation-bubble">
                  <div className="what-do-you">What do you mean?</div>
                </div>
              </div>
              <div className="contactmessage">
                <div className="conversation-bubble">
                  <div className="what-do-you">What do you mean?</div>
                </div>
              </div>
              <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
              <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
              <div className="contactmessage">
                <div className="conversation-bubble">
                  <div className="what-do-you">What do you mean?</div>
                </div>
              </div>
              <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
              <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
              <div className="contactmessage3">
                <div className="conversation-bubble">
                  <div className="what-do-you">What do you mean?</div>
                </div>
              </div>
              <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
              <div className="conversation-bubble-wrapper">
                <div className="conversation-bubble2">
                  <div className="i-think-the">
                    I think the idea that things are chaning isnt good
                  </div>
                </div>
              </div>
            </div>
            <div className="messageinput">
              <div className="compose-new-btn">
                <FaPaperclip
                  className="mask-group-icon"      
                />
                <input type="text" className="type-a-message" placeholder="Type a message" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerTransactions;
