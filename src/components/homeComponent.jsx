import "../css/Components/homeComponent.css";
import { Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import HomeIcon from '../img/homePagePic.png';
import HomePagePic1 from '../img/homePagePic1.png';
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
              grown with care, traded with trust
            </div>
            <div className="introducing-the-agripinas-container">
              <p className="introducing-the">
                <b>Introducing the</b>
              </p>
              <p className="agripinas-mobile-app">
                <i className="agripinas-mobile-app1">AgriPinas Mobile App</i>
              </p>
            </div>
          </div>
          <div className="download-buttons">
            <button className="app-store">
              <img className="group-icon" alt="" src={HomePagePic1} />             
            </button>
            <button className="google-play">
              <img className="g4036-icon" alt="" src={HomePagePic2}/>
            </button>
          </div>
        </div>
        <img className="group-1334-1" alt="" src={HomeIcon} />
      </div>
    </div>
    </I18nextProvider>
  );
};

export default HomeComponent;
