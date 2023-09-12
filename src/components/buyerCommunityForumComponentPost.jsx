import '../css/Components/farmerCommunityForumComponentFullPost.css';
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
    <div className="farmerCommunityForumComponentFullPost">
        <BuyerNavigation />      
      <div className="farmerCommunityForumComponentFullPostMainPanel">
        <BuyerTopNav />
        <div className="farmerCommunityForumComponentFullPostTopSection">
          <div className="farmerCommunityForumComponentFullPostMainTextContainer">
            <b className="farmerCommunityForumComponentFullPostMainText1">              
              <p className="farmerCommunityForumComponentFullPostBlankLine">{t('farmerCommunityText1')}</p>
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
                      <b className="farmerCommunityForumComponentFullPostSmallCardsMainText">{t('farmerCommunityPostText1')}</b>
                      <b className="farmerCommunityForumComponentFullPostSmallCardsDescription1">{t('farmerCommunityPostText2')} Jenkins Mesina</b>
                    </div>
                    <div className="farmerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                      <div className="farmerCommunityForumComponentFullPostSmallCardsFullDescription">
                      {t('farmerCommunityPostText3')}
                      </div>
                    </div>
                    <b className="farmerCommunityForumComponentFullPostSmallCardsDescription2">{t('farmerCommunityPostText4')}</b>
                    <button className="farmerCommunityForumComponentFullPostButton">
                        <FaThumbsUp className="farmerCommunityForumComponentFullPostButtonIcon" />
                        <div className="farmerCommunityForumComponentFullPostButtonText">{t('farmerPageButton9')}</div>
                    </button>
                  </div>
                  <input
                    className="farmerCommunityForumComponentFullPostCommentInput"
                    type="text"
                    placeholder={t('farmerCommunityPostText5')}
                  />
                  <div className="farmerCommunityForumComponentFullPostSmallCardsDescriptionWrapper">
                    <div className="farmerCommunityForumComponentFullPostSmallCardsFullDescription">
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>{t('farmerCommunityPostText6')}</b>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>&nbsp;</b>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>{`Ryan Edward Amador: `}</b>
                        <span>{t('farmerCommunityPostText7')}</span>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
                        <b>&nbsp;</b>
                      </p>
                      <p className="farmerCommunityForumComponentFullPostBlankLine">
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
        <div className="farmerCommunityForumComponentFullPostNewCard">
          <div className="farmerCommunityForumComponentFullPostNewCardMainText">{t('farmerCommunityPostText9')}</div>
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
                    <div className="farmerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText4')}</div>
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
                    <div className="farmerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText6')}</div>
                  </div>
                </div>
              </div>
            </button>             

            <button className="farmerCommunityForumComponentFullPostNewCardButton">
              <img
                className="farmerCommunityForumComponentFullPostNewCardImage"
                alt=""
                src={SquashVector}
              />
              <div className="farmerCommunityForumComponentFullPostNewCardDetails">
                <div className="farmerCommunityForumComponentFullPostNewCardInner">
                  <div className="farmerCommunityForumComponentFullPostNewCardTitleWrapper">
                    <div className="farmerCommunityForumComponentFullPostNewCardTitle">{t('farmerCommunityText8')}</div>
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
