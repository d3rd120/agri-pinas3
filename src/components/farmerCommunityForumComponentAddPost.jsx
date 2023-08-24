import '../css/Components/farmerCommunityForumComponentAddPost.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';




const FarmerCommunityForumAddPostComponent  = () =>  {
  
const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="farmerCommunityForumAddPostComponent">
      <div className="farmerCommunityForumAddPostComponentMainText">{t('farmerCommunityAddPostText1')}</div>
      <div className="farmerCommunityForumAddPostComponentFrameParent">
        <div className="farmerCommunityForumAddPostComponentFrameGroup">
          <div className="farmerCommunityForumAddPostComponentInputParent">
            <div className="farmerCommunityForumAddPostComponentTitle">{t('farmerCommunityAddPostText2')}</div>
            <input
              className="farmerCommunityForumAddPostComponentInput1"
              type="text"
              placeholder={t('farmerCommunityAddPostText3')}
            />
          </div>
          <div className="farmerCommunityForumAddPostComponentInputParent">
            <div className="farmerCommunityForumAddPostComponentTitle">{t('farmerCommunityAddPostText4')}</div>
            <input className="farmerCommunityForumAddPostComponentInput3" type="file" required />
          </div>
          <div className="farmerCommunityForumAddPostComponentTitle">{t('farmerCommunityAddPostText5')}</div>
          <textarea className="farmerCommunityForumAddPostComponentInput4" placeholder={t('farmerCommunityAddPostText6')} />
          <button className="farmerCommunityForumAddPostComponentButton">
          <div className="farmerCommunityForumAddPostComponentButtonText">{t('farmerPageButton8')}</div>
          </button>
          <div className="farmerCommunityForumAddPostComponentFormChild" />
        </div>        
      </div>     
    </div>
    </I18nextProvider>
  );
};


export default FarmerCommunityForumAddPostComponent;


