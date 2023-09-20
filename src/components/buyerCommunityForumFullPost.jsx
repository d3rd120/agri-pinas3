import '../css/Components/buyerCommunityForumComponentFullPost.css';
import BuyerTopNav from '../components/buyerTopNav';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import TomatoVector from '../img/tomatoVector.png';
import { FaThumbsUp } from 'react-icons/fa';

const BuyerMarketplace = () => {

 return (
  <div className="buyerCommunityForumComponentFullPost">
    <BuyerNavigation />
    <div className="buyerMarketplaceComponentMainPanel">
      <BuyerTopNav />
      <div className="buyerCommunityForumComponentFullPostTopSection">
        <div className="buyerCommunityForumComponentFullPostMainTextContainer">
          <b className="buyerCommunityForumComponentFullPostMainText1">
            <p className="buyerCommunityForumComponentFullPostBlankLine">&nbsp;</p>
            <p className="buyerCommunityForumComponentFullPostBlankLine">&nbsp;</p>
            <p className="buyerCommunityForumComponentFullPostBlankLine">Community Forum</p>
          </b>
        </div>
      </div>
      <div className="buyerCommunityForumComponentFullPostMiddleSection">
        <div className="buyerCommunityForumComponentFullPostCardsContainer">
          <div className="buyerCommunityForumComponentFullPostCard1">
            <img
              className="buyerCommunityForumComponentFullPostCard1Image"
              alt=""
              src={OnionVector}
            />
          </div>
          <div className="buyerCommunityForumComponentFullPostSmallCards">
            <div className="buyerCommunityForumComponentFullPostSmallCardsDescription">
              <div className="buyerCommunityForumComponentFullPostSmallCardsContent">
                <div className="buyerCommunityForumComponentFullPostSmallCardsHeading">
                  <div className="buyerCommunityForumComponentFullPostSmallCardsDetails">
                    <b className="buyerCommunityForumComponentFullPostSmallCardsMainText">What is the SRP of Onions?</b>
                    <b className="buyerCommunityForumComponentFullPostSmallCardsDescription1">Posted by: Jenkins Mesina</b>
                  </div>
                  <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                    <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
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
                  <b className="buyerCommunityForumComponentFullPostSmallCardsDescription2">24 people liked this post.</b>
                  <button className="buyerCommunityForumComponentFullPostButton">
                    <FaThumbsUp className="buyerCommunityForumComponentFullPostButtonIcon" />
                    <div className="buyerCommunityForumComponentFullPostButtonText">Like</div>
                  </button>
                </div>
                <input
                  className="buyerCommunityForumComponentFullPostCommentInput"
                  type="text"
                  placeholder="Comment Here"
                />
                <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                  <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                    <p className="buyerCommunityForumComponentFullPostBlankLine">
                      <b>Comments:</b>
                    </p>
                    <p className="buyerCommunityForumComponentFullPostBlankLine">
                      <b>&nbsp;</b>
                    </p>
                    <p className="buyerCommunityForumComponentFullPostBlankLine">
                      <b>{`Ryan Edward Amador: `}</b>
                      <span>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}</span>
                    </p>
                    <p className="buyerCommunityForumComponentFullPostBlankLine">
                      <b>&nbsp;</b>
                    </p>
                    <p className="buyerCommunityForumComponentFullPostBlankLine">
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
      <div className="buyerCommunityForumComponentFullPostNewCard">
        <div className="buyerCommunityForumComponentFullPostNewCardMainText">Other Posts</div>
        <div className="buyerCommunityForumComponentFullPostNewCardText">
          <button className="buyerCommunityForumComponentFullPostNewCardButton">
            <img
              className="buyerCommunityForumComponentFullPostNewCardImage"
              alt=""
              src={CornVector}
            />
            <div className="buyerCommunityForumComponentFullPostNewCardDetails">
              <div className="buyerCommunityForumComponentFullPostNewCardInner">
                <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitle">How Corn Grows?</div>
                </div>
              </div>
            </div>
          </button>

          <button className="buyerCommunityForumComponentFullPostNewCardButton">
            <img
              className="buyerCommunityForumComponentFullPostNewCardImage"
              alt=""
              src={RiceVector}
            />
            <div className="buyerCommunityForumComponentFullPostNewCardDetails">
              <div className="buyerCommunityForumComponentFullPostNewCardInner">
                <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitle">Rice Planting</div>
                </div>
              </div>
            </div>
          </button>

          <button className="buyerCommunityForumComponentFullPostNewCardButton">
            <img
              className="buyerCommunityForumComponentFullPostNewCardImage"
              alt=""
              src={TomatoVector}
            />
            <div className="buyerCommunityForumComponentFullPostNewCardDetails">
              <div className="buyerCommunityForumComponentFullPostNewCardInner">
                <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitle">How to plant Tomatoes?</div>
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
