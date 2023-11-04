import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordReset } from './firebase';
import '../css/Components/reset.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import Popup from './validationPopup'; // Import the Popup component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Reset() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigate

  const handlePasswordReset = async () => {
    if (!email || !email.trim()) {
      setNotification('Please enter a valid email address.');
      return;
    }
    try {
      await sendPasswordReset(email);
      setNotification('Password reset link sent! Directing you to login...');

      setTimeout(() => {
        navigate('/login'); // Use navigate to navigate to the login page
      }, 3000);

    } catch (err) {
      console.error(err);
      setNotification('An error occurred while sending the password reset link. Please try again.');
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="reset">
        <div className="reset__container">
          <p className="resetContainerText">{t('text42')}</p>
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('text43')}
          />
          <button className="reset__btn" onClick={handlePasswordReset}>
            {t('Send Link')}
          </button>

          <div>
            {t('text45')}{' '}
            <Link className="resetComponentSignupText" to="/signup">
              {t('text46')}
            </Link>
          </div>
        </div>
      </div>
      {notification && (
        <Popup
          message={notification}
          isVisible={true} // Add a console.log here to check the value
          onClose={() => setNotification(null)}
        />
      )}
    </I18nextProvider>
  );
}

export default Reset;
