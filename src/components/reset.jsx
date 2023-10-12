import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import '../css/Components/reset.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


function Reset() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  
 

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="reset">
      <div className="reset__container">      
        <p className = "resetContainerText">{t('text42')}</p>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('text43')}
        />
        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>
        {t('text44')}
        </button>

        <div>
          {t('text45')} <Link className = "resetComponentSignupText" to="/signup">{t('text46')}</Link>
        </div>
      </div>
    </div>
    </I18nextProvider>
  );
}

export default Reset;