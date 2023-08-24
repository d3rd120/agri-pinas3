import "../css/Components/aboutComponent.css";
import AboutImage1 from '../img/aboutImage1.png';
import AboutImage2 from '../img/aboutImage2.png';
import AboutImage3 from '../img/aboutImage3.png';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const AboutComponent = () => {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>      
    <div className="aboutComponentSection">
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
        <b className="aboutComponentAgriPinasText">{t('aboutComponentText1')}</b>
        <div className="aboutComponentText">
          <p className="aboutComponentParagraph">{t('aboutComponentText2')}</p>
          <p className="aboutComponentParagraph">&nbsp;</p>
          <p className="aboutComponentParagraph">
          {t('aboutComponentText3')}
          </p>
        </div>       
      </div>
    </div>
    </I18nextProvider>
  );
};

export default AboutComponent;
