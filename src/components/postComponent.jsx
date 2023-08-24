import "../css/Components/postComponent.css";

import SiliVector from '../img/sili.png';
import TomatoVector from '../img/tomatoVector.png';
import SquashVector from '../img/squash.png';
import RiceCardImage from '../img/riceCardImage.png';
import OnionVector from '../img/onionVector.png'
import CornVector from '../img/cornVector.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';



const PostComponent = () => {
  const { t } = useTranslation();

  return (

    <I18nextProvider i18n={i18n}> 

    
    <div className="postComponentFrame">
      <div className="postComponentParent">
        <b className="postComponentSubTitle">{t('postComponentText1')}</b>
        <b className="postComponentTitle">{t('postComponentText2')}</b>
      </div>
      <div className="postComponentCardContainer">
        <div className="postComponentCard1">
          <img
            className="postComponentCard1Image"
            alt=""
            src={OnionVector}
          />
          <div className="postComponentCard1Details">
            <b className="postComponentCard1Title">{t('postComponentText11')}</b>
            <div className="postComponentCard1DescriptionContainer">
              <span>
              {t('postComponentText12')}
              </span>
              <span className="postComponentCard1ViewBlog">{t('postComponentText13')}</span>
            </div>
          </div>
        </div>
        <div className="postComponentSmallCards">
          <div className="postComponentCard2">
            <img
              className="postComponentCard2Image"
              alt=""
              src={CornVector}
            />
            <div className="postComponentCard2Details">
              <b className="postComponentCard1Title">{t('postComponentText3')}</b>
              <div className="postComponentCard1DescriptionContainer">
                <span>
                {t('postComponentText4')}
                </span>
                <span className="postComponentCard1ViewBlog1">{t('postComponentText13')}</span>
              </div>
            </div>
          </div>     

          <div className="postComponentCard2">
            <img
              className="postComponentCard2Image"
              alt=""
              src={SiliVector}
            />
            <div className="postComponentCard2Details">
              <b className="postComponentCard1Title">{t('postComponentText5')}</b>
              <div className="postComponentCard1DescriptionContainer">
                <span>
                {t('postComponentText6')}
                </span>
                <span className="postComponentCard1ViewBlog1">{t('postComponentText13')}</span>
              </div>
            </div>
          </div>     
         

          <div className="postComponentCard2">
            <img
              className="postComponentCard2Image"
              alt=""
              src={SquashVector}
            />
            <div className="postComponentCard2Details">
              <b className="postComponentCard1Title">{t('postComponentText7')}</b>
              <div className="postComponentCard1DescriptionContainer">
                <span>
                {t('postComponentText8')}
                </span>
                <span className="postComponentCard1ViewBlog1">{t('postComponentText13')}</span>
              </div>
            </div>
          </div>     
         
          <div className="postComponentCard2">
            <img
              className="postComponentCard2Image"
              alt=""
              src={TomatoVector}
            />
            <div className="postComponentCard2Details">
              <b className="postComponentCard1Title">{t('postComponentText9')}</b>
              <div className="postComponentCard1DescriptionContainer">
                <span>
                {t('postComponentText10')}
                </span>
                <span className="postComponentCard1ViewBlog1">{t('postComponentText13')}</span>
              </div>
            </div>
          </div>     
         
         
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default PostComponent;


