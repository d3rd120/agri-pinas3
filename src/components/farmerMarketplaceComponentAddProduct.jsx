import '../css/Components/farmerMarketplaceComponentAddProduct.css';
import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db, uploadImage } from './firebase';
import { I18nextProvider } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';


const FarmerMarketplaceAddProductComponent = () => {
  const { t } = useTranslation();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [packaging, setPackaging] = useState("");
  const [price, setPrice] = useState("");
  const [kilogramPerUnit, setKilogramPerUnit] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const downloadURL = await uploadImage(file);
    setImageUrl(downloadURL);
  };  


  const createProduct = async () => {
    try {
      await addDoc(collection(db, "Products"), {
        productName,
        price,
        category,
        kilogramPerUnit,
        packaging,
        description,
        imageUrl: imageUrl || null,
      });

      console.log("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleAddProduct = async () => {
    await createProduct();
  };

 

  return (
    <I18nextProvider i18n={i18n}> 
    <div className="FarmerMarketplaceAddProductComponent">
      <div className="FarmerMarketplaceAddProductComponentMainText">{t('farmerCropTrackerAddText1')}</div>
      <div className="FarmerMarketplaceAddProductComponentFrameParent">
        <div className="FarmerMarketplaceAddProductComponentFrameGroup">
          <div className="FarmerMarketplaceAddProductComponentInputParent">
            <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText2')}</div>
            <input
              className="FarmerMarketplaceAddProductComponentInput1"
              type="text"
              placeholder={t('farmerPageEditText3')}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="FarmerMarketplaceAddProductComponentInputParent">
            <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText7')}</div>
            <input
              className="FarmerMarketplaceAddProductComponentInput1"
              type="text"
              placeholder={t('farmerPageEditText8')}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="FarmerMarketplaceAddProductComponentInputParent">
            <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText10')}</div>
            <input
              className="FarmerMarketplaceAddProductComponentInput1"
              type="text"
              placeholder={t('farmerPageEditText11')}
              value={packaging}
              onChange={(e) => setPackaging(e.target.value)}
            />
          </div>
        </div>
        <div className="FarmerMarketplaceAddProductComponentFrameGroup">
          <div className="FarmerMarketplaceAddProductComponentInputParent">
            <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText4')}</div>
            <input
              className="FarmerMarketplaceAddProductComponentInput2"
              type="text"
              placeholder={t('farmerPageEditText5')}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="FarmerMarketplaceAddProductComponentInputParent">
            <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText8')}</div>
            <input
              className="FarmerMarketplaceAddProductComponentInput2"
              type="text"
              placeholder={t('farmerPageEditText9')}
              value={kilogramPerUnit}
              onChange={(e) => setKilogramPerUnit(e.target.value)}
            />
          </div>
          <div className="FarmerMarketplaceAddProductComponentInputParent">
            <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText12')}</div>
            <input
            className="FarmerMarketplaceAddProductComponentInput3"
            type="file"
            required
            onChange={handleImageUpload}
          />
            {imageUrl && <img src={imageUrl} alt="Uploaded Product" />}
          </div>
        </div>
      </div>
      <div className="FarmerMarketplaceAddProductComponentTitle">{t('farmerPageEditText13')}</div>
      <textarea className="FarmerMarketplaceAddProductComponentInput4" 
      placeholder={t('farmerPageEditText14')}
      value={description}
      onChange={(e) => setDescription(e.target.value)} />
      <button className="FarmerMarketplaceAddProductComponentButton" onClick={handleAddProduct}>
        <div className="FarmerMarketplaceAddProductComponentButtonText">{t('farmerPageButton12')}</div>
      </button>
      <div className="FarmerMarketplaceAddProductComponentFormChild" />
    </div>
    </I18nextProvider>
  );
};

export default FarmerMarketplaceAddProductComponent;
