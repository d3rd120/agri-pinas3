import React, { useState, useEffect } from 'react';
import '../css/Components/privacyPolicyComponent.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function PrivacyPolicyPopup() {
  const [showPopup, setShowPopup] = useState(true); // Automatically set showPopup to true
  const [accepted, setAccepted] = useState(false);
  const { t } = useTranslation();   

  const closePopup = () => {
    setShowPopup(false);
  };

  const acceptPolicy = () => {
    setAccepted(true);
    setShowPopup(false);
    // You can add further logic here when the user accepts the policy.
  };

  const declinePolicy = () => {
    setAccepted(false);
    setShowPopup(false);
  
    // Redirect to the login page
    window.location.href = '/login';
    // Reload the window
  };

  useEffect(() => {
    if (showPopup) {
      // Add any logic you need here to handle the appearance of the popup.
    }
  }, [showPopup]);

  return (
    <I18nextProvider i18n={i18n}>      
    <div>
      {showPopup && (
        <div className="privacyPolicyOverlay">
          <div className="privacyPolicyContent">          
          <h1>{t('ext56')}</h1>

<p>{t('ext57')}</p>

<p>{t('ext58')}</p>

<p>{t('ext59')}</p>

<h2>{t('ext60')}</h2>

<p>{t('ext61')}</p>

<h2>{t('ext62')}</h2>

<p>{t('ext63')}</p>
<p>{t('ext64')}</p>
<p>{t('ext65')}</p>

<h2>{t('ext66')}</h2>

<p>{t('ext67')}</p>

<ul>
<li>{t('ext68')}</li>
<li>{t('ext69')}</li>
<li>{t('ext70')}</li>
<li>{t('ext71')}</li>
<li>{t('ext72')}</li>
<li>{t('ext73')}</li>
<li>{t('ext74')}</li>
</ul>

<h2>{t('ext75')}</h2>

<p>{t('ext76')}</p>




<h2>{t('ext77')}</h2>

<p>{t('ext78')}</p>

<p>{t('ext79')}</p>

<p>{t('ext80')}</p>

<h2>{t('ext81')}</h2>

<p>{t('ext82')}</p>

<p>{t('ext83')}</p>

<h2>{t('ext84')}</h2>

<p>{t('ext85')}</p>
<p>{t('ext86')}</p>
<p>{t('ext87')}</p>
<p>{t('ext88')}</p>
<p>{t('ext89')}</p>

<h2>{t('ext90')}</h2>

<p>{t('ext91')}</p>
<p>{t('ext92')}</p>
<p>{t('ext93')}</p>
<p>{t('ext94')}</p>
<p>{t('ext95')}</p>
<p>{t('ext96')}</p>
<p>{t('ext97')}</p>
<p>{t('ext98')}</p>

<h2>{t('ext99')}</h2>

<p>{t('ext100')}</p>

<p>{t('ext101')}</p>

<p>{t('ext102')}</p>

<p>{t('ext103')}</p>

<p>{t('ext104')}<a href="https://www.termsfeed.com/privacy-policy-generator/">Privacy Policy Generator</a>.</p>



<p>{t('ext106')}</p>                 
       
              <div>
                <button onClick={acceptPolicy}>{t('eext107')}</button>
                <button onClick={declinePolicy}>{t('eext108')}</button>
              </div>            
          </div>
        </div>
      )}
    </div>
    </I18nextProvider>
  );
}

export default PrivacyPolicyPopup;
