import "../css/Components/contactComponent.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';



const ContactComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="contactComponentForm">
      <div className="contactComponentMainText">{t('contactComponentText1')}</div>
      <div className="contactComponentFrameParent">
        <div className="contactComponentFrameGroup">
          <div className="contactComponentNameParent">
            <div className="contactComponentInputText">{t('contactComponentText2')}</div>
            <input
              className="contactComponentEmail" id = "contactComponentName"
              type="text"
              placeholder={t('contactComponentText3')}
            />
          </div>
          <div className="contactComponentNameParent">
            <div className="contactComponentInputText">{t('contactComponentText4')}</div>
            <input
              className="contactComponentEmail1" id = "contactComponentEmail"
              type="text"
              placeholder={t('contactComponentText5')}
            />
          </div>
          <div className="contactComponentNameParent">
            <div className="contactComponentInputText">
              <span>{t('contactComponentText6')}</span>             
            </div>
            <input 
            className="contactComponentEmail1" id = "contactComponentPhoneNumber"
            type="text"
            placeholder = {t('contactComponentText7')}
            />
          </div>
        </div>
        <div className="contactComponentMessageParent">
          <div className="contactComponentInputText">{t('contactComponentText8')}</div>
          <textarea 
          className="contactComponentEmail3" id = "contactComponentMessage"
          placeholder={t('contactComponentText9')} />
        </div>
      </div>
      <button className="contactComponentButton">
        <b className="contactComponentSendMessage">{t('contactComponentText10')}</b>
      </button>
    </div>
    </I18nextProvider>
  );
};

export default ContactComponent;
