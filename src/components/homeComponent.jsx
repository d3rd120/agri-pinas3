import "../css/Components/homeComponent.css";
import { Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const HomeComponent = () => {
  const { t } = useTranslation();
  
   

  return (
    <I18nextProvider i18n={i18n}>      
    <div className="homeComponent">
      <div className="homeComponentBackground">
        <div className="homeComponentSet">
          <div className="homeComponentTagLine">
            <b className="homeComponentTitleContainer">
              <p className="homeComponentContainerText">{t('homeComponentText1')}</p>             
            </b>
            <div className="homeComponentTextContainer">
              <p className="homeComponentContainerText">{t('homeComponentText2')}</p>
              <p className="homeComponentContainerText">
              {t('homeComponentText3')}
              </p>
            </div>
          </div>
          <Link className="homeComponentButton" to = '/login'>
            <div className="homeComponentMore">{t('homeComponentText4')}</div>
          </Link>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
};

export default HomeComponent;
