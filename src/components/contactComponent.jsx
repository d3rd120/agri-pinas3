import Logo from '../img/agriPinasLogo.png';
import "../css/Components/contactComponent.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import { FaLocationArrow, FaEnvelope } from 'react-icons/fa';

const ContactComponent = () => {

  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <header className="contactComponentHeader">
        <div className="contactComponentContainer">
          <div className="contactComponentLogo">
            <img
              className="contactComponentLogoIcon"
              alt=""
              src={Logo}
            />
            <b className="contactComponentMainText">{t('Ttext8')}</b>            
          </div>
          <div className="contactComponentRightLinks">
          <div className="contactComponentMenu">
            <div className="contactComponentLinkContainer">             
              <a className="contactComponentLink"><FaLocationArrow /> {t('Ttext9')}<br></br>Brgy. Sta Isabel Cabiao, Nueva Ecija</a>              
            </div>
            <div className="contactComponentLinkContainer">
            <a className="contactComponentLink"><FaEnvelope /> {t('Ttext10')}<br></br>sunshineagricoop@gmail.com</a>             
            </div>
          </div>
          </div>
        </div>
      </header> 
    </I18nextProvider>
  );
};

export default ContactComponent;
