import "../css/Components/contactComponent.css";
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';



const ContactComponent = () => {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}> 
    <div className="contactComponentForm">
      <div className="contactComponentMainText">{t('text11')}</div>
      <div className="contactComponentFrameParent">
        <div className="contactComponentFrameGroup">
          <div className="contactComponentNameParent">
            <div className="contactComponentInputText">{t('text12')}</div>
            <input
              className="contactComponentEmail" id = "contactComponentName"
              type="text"
              placeholder={t('text13')}
            />
          </div>
          <div className="contactComponentNameParent">
            <div className="contactComponentInputText">{t('text14')}</div>
            <input
              className="contactComponentEmail1" id = "contactComponentEmail"
              type="text"
              placeholder={t('text15')}
            />
          </div>
          <div className="contactComponentNameParent">
            <div className="contactComponentInputText">
              <span>{t('text16')}</span>             
            </div>
            <input 
            className="contactComponentEmail1" id = "contactComponentPhoneNumber"
            type="text"
            placeholder = {t('text17')}
            />
          </div>
        </div>
        <div className="contactComponentMessageParent">
          <div className="contactComponentInputText">{t('text18')}</div>
          <textarea 
          className="contactComponentEmail3" id = "contactComponentMessage"
          placeholder={t('text19')} />
        </div>
      </div>
      <button className="contactComponentButton">
        <b className="contactComponentSendMessage">{t('text20')}</b>
      </button>
    </div>
    </I18nextProvider>
  );
};

export default ContactComponent;
