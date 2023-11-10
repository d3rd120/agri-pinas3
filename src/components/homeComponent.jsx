import "../css/Components/homeComponent.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import HomeIcon from '../img/homePagePic.png';
import HomePagePic2 from '../img/homePagePic2.png';

const HomeComponent = () => {
  const { t } = useTranslation();   

  return (
    <I18nextProvider i18n={i18n}>      
  <div className="app-page-banner">
      <div className="banner-container">
        <div className="banner-text">
          <div className="banner-titles">
            <div className="grown-with-care">
            {t('text5')}
            </div>
            <div className="introducing-the-agripinas-container">
              <p className="introducing-the">
                <b>{t('text6')}</b>
              </p>
              <p className="agripinas-mobile-app">
                <i className="agripinas-mobile-app1">{t('text7')}</i>
              </p>
            </div>
          </div>
          <div className="download-buttons">        
          <a className="google-play" href = "https://drive.google.com/file/d/1TMN2DWKi_CFgY6mLIgf32Z3ZEzvNUqsu/view?usp=sharing">
            <img className="g4036-icon" alt="" src={HomePagePic2} />
          </a>
        </div>
        </div>
        <img className="group-1334-1" alt="" src={HomeIcon} />
      </div>
    </div>
    </I18nextProvider>
  );
};

export default HomeComponent;
