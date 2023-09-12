import '../css/Components/farmerCommunityForumComponentFullPost.css';
import BuyerTopNav from '../components/buyerTopNav';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import TomatoVector from '../img/tomatoVector.png';
import { FaThumbsUp } from 'react-icons/fa';

const BuyerMarketplace = () => {
  return (
    <div className="farmerCommunityForumComponentFullPost">
        <BuyerNavigation />      
        <div className="farmerMarketplaceComponentMainPanel">
        <BuyerTopNav />
        <div className="farmerCommunityForumComponentFullPostTopSection">
          <div className="farmerCommunityForumComponentFullPostMainTextContainer">
            <b className="farmerCommunityForumComponentFullPostMainText1">
              <p className="farmerCommunityForumComponentFullPostBlankLine">&nbsp;</p>
              <p className="farmerCommunityForumComponentFullPostBlankLine">&nbsp;</p>
              <p className="farmerCommunityForumComponentFullPostBlankLine">Community Forum</p>
            </b>
          </div>
        </div>
        <div className="farmerCommunityForumComponentFullPostMiddleSection">
          <div className="farmerCommunityForumComponentFullPostCardsContainer">
            <div className="farmerCommunityForumComponentFullPostCard1">
              <img
                className="farmerCommunityForumComponentFullPostCard1Image"
                alt=""
                src={OnionVector}
              />
            </div>
            <div className="farmerCommunityForumComponentFullPostSmallCards">
              <div className="farmerCommunityForumComponentFullPostSmallCardsDescription">
                <div className="farmerCommunityForumComponentFullPostSmallCardsContent">
                  <div className="farmerCommunityForumComponentFullPostSmallCardsHeading">
                    <div className="farmerCommunityForumComponentFullPostSmallCardsDetails">
                      <b className="farmerCommunityForumComponentFullPostSmallCardsMainText">What is the SRP of Onions?</b>
                      <b className="farmerCommunityForumComponentFullPostSmallCardsDescription1">Posted by: Jenkins Mesina</b>
                    </div>
                    <div className="farmerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                      <div className="farmerCommunityForumComponentFullPostSmallCardsFullDescription">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </div>
                    </div>
                    <b className="farmerCommunityForumComponentFullPostSmallCardsDescription2">24 people liked this post.</b>
                    <button className="farmerCommunityForumComponentFullPostButton">
                        <FaThumbsUp className="farmerCommunityForumComponentFullPostButtonIcon" />
                        <div className="farmerCommunityForumComponentFullPostButtonText">Like</div>
                    </button>
                  </div>
                  <input
                    className="farmerCommunityForumComponentFullPostCommentInput"
                    type="text"
                    placeholder="Comment Here"
                  />
                  <div className="farmerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                    <div className="farmerCommunityForumComponentFullPostSmallCardsFullDescription">
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>Comments:</b>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>&nbsp;</b>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>{`Ryan Edward Amador: `}</b>
                        <span>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}</span>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>&nbsp;</b>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>{`Marievic Anes: `}</b>
                        <span>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="farmerCommunityForumComponentFullPostNewCard">
          <div className="farmerCommunityForumComponentFullPostNewCardMainText">Other Posts</div>
          <div className="farmerCommunityForumComponentFullPostNewCardText">
            <button className="farmerCommunityForumComponentFullPostNewCardButton">
              <img
                className="farmerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={CornVector}
              />
              <div className="farmerCommunityForumComponentFullPostNewCardDetails">
                <div className="farmerCommunityForumComponentFullPostNewCardInner">
                  <div className="farmerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="farmerCommunityForumComponentFullPostNewCardTitle">How Corn Grows?</div>
                  </div>
                </div>
              </div>
            </button>

             <button className="farmerCommunityForumComponentFullPostNewCardButton">
              <img
                className="farmerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={RiceVector}
              />
              <div className="farmerCommunityForumComponentFullPostNewCardDetails">
                <div className="farmerCommunityForumComponentFullPostNewCardInner">
                  <div className="farmerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="farmerCommunityForumComponentFullPostNewCardTitle">Rice Planting</div>
                  </div>
                </div>
              </div>
            </button>             

            <button className="farmerCommunityForumComponentFullPostNewCardButton">
              <img
                className="farmerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={TomatoVector}
              />
              <div className="farmerCommunityForumComponentFullPostNewCardDetails">
                <div className="farmerCommunityForumComponentFullPostNewCardInner">
                  <div className="farmerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="farmerCommunityForumComponentFullPostNewCardTitle">How to plant Tomatoes?</div>
                  </div>
                </div>
              </div>
            </button> 
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMarketplace;
