import '../css/Components/buyerCommunityForumComponentFullPost.css';
import BuyerNavigation from './buyerNavigation';
import OnionVector from '../img/onionVector.png';
import CornVector from '../img/cornVector.png';
import RiceVector from '../img/riceCardImage.png';
import SquashVector from '../img/squash.png';
import { FaThumbsUp } from 'react-icons/fa';
import BuyerTopNav from '../components/buyerTopNav';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const FarmerMarketplace = () => {
  const { t } = useTranslation();


 return (
  <I18nextProvider i18n={i18n}> 
    <div className="buyerCommunityForumComponentFullPost">
      <BuyerNavigation />      
      <div className="buyerCommunityForumComponentFullPostMainPanel">
        <BuyerTopNav />
        <div className="buyerCommunityForumComponentFullPostTopSection">
          <div className="buyerCommunityForumComponentFullPostMainTextContainer">
            <b className="buyerCommunityForumComponentFullPostMainText1">              
              <p className="buyerCommunityForumComponentFullPostBlankLine">{t('farmerCommunityText1')}</p>
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
                      <b className="buyerCommunityForumComponentFullPostSmallCardsMainText">{t('farmerCommunityPostText1')}</b>
                      <b className="buyerCommunityForumComponentFullPostSmallCardsDescription1">{t('farmerCommunityPostText2')} Jenkins Mesina</b>
                    </div>
                    <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                      <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                        {t('farmerCommunityPostText3')}
                      </div>
                    </div>
                    <b className="buyerCommunityForumComponentFullPostSmallCardsDescription2">{t('farmerCommunityPostText4')}</b>
                    <button className="buyerCommunityForumComponentFullPostButton">
                      <FaThumbsUp className="buyerCommunityForumComponentFullPostButtonIcon" />
                      <div className="buyerCommunityForumComponentFullPostButtonText">{t('farmerPageButton9')}</div>
                    </button>
                  </div>
                  <input
                    className="buyerCommunityForumComponentFullPostCommentInput"
                    type="text"
                    placeholder={t('farmerCommunityPostText5')}
                  />
                  <div className="buyerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                    <div className="buyerCommunityForumComponentFullPostSmallCardsFullDescription">
                      <p className="buyerCommunityForumComponentFullPostBlankLine">
                        <b>{t('farmerCommunityPostText6')}</b>
                      </p>
                      <p className="buyerCommunityForumComponentFullPostBlankLine">
                        <b>&nbsp;</b>
                      </p>
                      <p className="buyerCommunityForumComponentFullPostBlankLine">
                        <b>{`Ryan Edward Amador: `}</b>
                        <span>{t('farmerCommunityPostText7')}</span>
                      </p>
                      <p className="buyerCommunityForumComponentFullPostBlankLine">
                        <b>&nbsp;</b>
                      </p>
                      <p className="buyerCommunityForumComponentFullPostBlankLine">
                        <b>{`Marievic Anes: `}</b>
                        <span>
                          {t('farmerCommunityPostText8')}
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
          <div className="buyerCommunityForumComponentFullPostNewCardMainText">{t('farmerCommunityPostText9')}</div>
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
                    <div className="buyerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText4')}</div>
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
                    <div className="buyerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText6')}</div>
                  </div>
                </div>
              </div>
            </button>             

            <button className="buyerCommunityForumComponentFullPostNewCardButton">
              <img
                className="buyerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={SquashVector}
              />
              <div className="buyerCommunityForumComponentFullPostNewCardDetails">
                <div className="buyerCommunityForumComponentFullPostNewCardInner">
                  <div className="buyerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="buyerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText8')}</div>
                  </div>
                </div>
              </div>
            </button> 
           
          </div>
        </div>
      </div>
    </div>
  </I18nextProvider>
);

};

export default FarmerMarketplace;
