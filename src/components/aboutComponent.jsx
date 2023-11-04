import "../css/Components/aboutComponent.css";
import AboutImage1 from '../img/aboutImage1.png';
import AboutImage2 from '../img/aboutImage2.png';
import AboutImage3 from '../img/aboutImage3.png';
import AboutImage4 from '../img/aboutImage4.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import MainNavigation from './mainPageNavigation';


const AboutComponent = () => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>      
    <MainNavigation />
    <div className="aboutComponentSection">
      <div className="aboutComponentImages">
        <img
          className="aboutComponentImage4"
          alt=""
          src={AboutImage4}
        />        
      </div>
      <div className="aboutComponentAgriPinas">
        <b className="aboutComponentAgriPinasText">{t('Ttext11')}</b>
        <div className="aboutComponentText">
          <b className="aboutComponentParagraph2">{t('Ttext12')}</b>
          <p className="aboutComponentParagraph">{t('Ttext13')}</p>    
          <p className="aboutComponentParagraph">&nbsp;</p>
          <b className="aboutComponentParagraph2">{t('Ttext14')}</b>
          <p className="aboutComponentParagraph">{t('Ttext15')}</p>
        </div>       
      </div>
    </div>
    <div className="aboutComponentSection1">
    <div className="aboutComponentImages">
        <img
          className="aboutComponentImage1"
          alt=""
          src={AboutImage1}
        />
        <div className="aboutComponentImageColumn">
          <img
            className="aboutComponentImage2"
            alt=""
            src={AboutImage2}
          />
          <img
            className="aboutComponentImage3"
            alt=""
            src={AboutImage3}
          />
        </div>
      </div>
      <div className="aboutComponentAgriPinas">
        <b className="aboutComponentAgriPinasText">{t('Ttext16')}</b>
        <div className="aboutComponentText">
          <p className="aboutComponentParagraph1">{t('Ttext17')}</p>
          <p className="aboutComponentParagraph1">{t('Ttext18')}</p>
          <p className="aboutComponentParagraph1">{t('Ttext19')}</p>
          <p className="aboutComponentParagraph1">{t('Ttext20')}</p>
          <p className="aboutComponentParagraph1">{t('Ttext21')}</p>
          <p className="aboutComponentParagraph1">{t('Ttext22')}</p>
          <p className="aboutComponentParagraph1">{t('Ttext23')}</p>          
        </div>       
      </div>
    </div>
    </I18nextProvider>
  );
};

export default AboutComponent;
