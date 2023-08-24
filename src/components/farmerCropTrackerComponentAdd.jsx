import '../css/Components/farmerCropTrackerComponentAdd.css';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';




const FarmerCropTrackerComponentAdd  = () =>  {
  const { t } = useTranslation();
    return (
      <I18nextProvider i18n={i18n}> 
        <div className="farmerCropTrackerComponentAdd">
          <div className="farmerCropTrackerComponentAddMainText">{t('farmerCropTrackerAddText2')}</div>
          <div className="farmerCropTrackerComponentAddFrameParent">
            <div className="farmerCropTrackerComponentAddFrameGroup">
              <div className="farmerCropTrackerComponentAddInputParent">
                <div className="farmerCropTrackerComponentAddTitle">{t('farmerCropTrackerAddText3')}</div>
                <input
                  className="farmerCropTrackerComponentAddInput1"
                  type="text"
                  placeholder={t('farmerCropTrackerAddText4')}
                />
              </div>   
              <div className="farmerCropTrackerComponentAddTitle">{t('farmerCropTrackerAddText5')}</div>
                <input
                  className="farmerCropTrackerComponentAddInput1"
                  type="date"
                  placeholder="Enter your date planted"
                />
                <div className="farmerCropTrackerComponentAddTitle">{t('farmerCropTrackerAddText6')}</div>
                <input
                  className="farmerCropTrackerComponentAddInput1"
                  type="date"
                  placeholder="Enter your estimated date to harvest"
                />
                <div className="farmerCropTrackerComponentAddTitle">{t('farmerCropTrackerAddText7')}</div>
                <input
                  className="farmerCropTrackerComponentAddInput1"
                  type="text"
                  placeholder={t('farmerCropTrackerAddText8')}
                />                         
              
              <button className="farmerCropTrackerComponentAddButton">
                <div className="farmerCropTrackerComponentAddButtonText">{t('farmerPageButton12')}</div>
              </button>
              <div className="farmerCropTrackerComponentAddFormChild" />
            </div>        
          </div>     
        </div>
        </I18nextProvider>
      );
      
};


export default FarmerCropTrackerComponentAdd;


