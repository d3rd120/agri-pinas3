import FarmerNavigation from '../components/farmerPageNavigation';
import '../css/Components/farmerAccountComponent.css';
import { FaEdit, FaUpload } from 'react-icons/fa';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import React, { useEffect } from 'react';

import ProfileVector from '../img/profileVector3.png';
import FarmerTopNav from '../components/farmerTopNav';

const FarmerAccountComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('Ryan Edward Amador');
  const [birthdate, setBirthdate] = useState('01 - 01 - 1999');
  const [emailAddress, setEmailAddress] = useState('ryan@gmail.com');
  const [age, setAge] = useState('23 years old');
  const [address, setAddress] = useState('Antipolo');
  const [contactNumber, setContactNumber] = useState('(+63)9123456789');
  const [imageUpload, setImageUpload] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const defaultProfileImagePath = 'path/to/default-profile-image.jpg';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'Users');
        const snapshot = await userRef.get();
        const userData = snapshot.data();
        if (userData) {
          setFullName(userData.fullname || '');
          setBirthdate(userData.birthdate || '');
          setEmailAddress(userData.email || '');
          setAge(userData.age || '');
          setAddress(userData.address || '');
          setContactNumber(userData.contact || '');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    try {
      const userRef = doc(db, 'Users');
      await updateDoc(userRef, {
        fullname: fullName,
        birthdate: birthdate,
        email: emailAddress,
        age: age,
        address: address,
        contact: contactNumber,
      });

      console.log('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
    }

    if (profileImage) {
      // Handle profile image upload
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setProfileImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="FarmerAccountComponent">
      <FarmerNavigation />
      <div className="FarmerAccountComponentMainPanel">
        <FarmerTopNav />
        <div className="FarmerAccountComponentTopSection">
          <div className="FarmerAccountComponentMainText">
            <b className="FarmerAccountComponentSubText">
              <p className="FarmerAccountComponentBlankLine">&nbsp;</p>
              <p className="FarmerAccountComponentBlankLine">Account profile</p>
            </b>
          </div>
        </div>
        <div className="FarmerAccountComponentMiddleSection">
          <div className="FarmerAccountComponentCardsContainer">
            <div className="FarmerAccountComponentCardsContainerInner">
              <a className="FarmerAccountComponentRectangleParent">
                <img
                  className="FarmerAccountComponentFrameItem"
                  alt=""
                  src={profileImage || defaultProfileImagePath}
                />
                <div className="FarmerAccountComponentFrameWrapper">
                  <div className="FarmerAccountComponentFrameGroup">
                    <div className="FarmerAccountComponentNameTextWrapper">
                      <b className="FarmerAccountComponentNameText">{fullName}</b>
                    </div>
                    <div className="FarmerAccountComponentDetailsChild" />
                    <div className="FarmerAccountComponentRoleWrapper">
                      <div className="FarmerAccountComponentRole">
                        <b>{`Role: `}</b>
                        <span>Farmer</span>
                      </div>
                    </div>
                    {imageUpload ? (
                      <div className="FarmerAccountComponentImageUploadWrapper">
                        <input
                          type="file"
                          accept="image/*"
                          className="FarmerAccountComponentImageUploadInput"
                          onChange={handleImageUpload}
                        />
                      </div>
                    ) : (
                      <div
                        className="FarmerAccountComponentImageUploadButton"
                        onClick={() => setImageUpload(true)}
                      >
                        <FaUpload className="FarmerAccountComponentImageUploadIcon" />
                        <span className="FarmerAccountComponentImageUploadText">Upload Image</span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </div>
            <div className="FarmerAccountComponentSmallCards">
              <div className="FarmerAccountComponentSmallCardsDescription">
                <div className="FarmerAccountComponentSmallCardsContent">
                  <div className="FarmerAccountComponentSmallCardsHeading">
                    <div className="FarmerAccountComponentSmallCardsDetails">
                      <b className="FarmerAccountComponentSmallCardsCourseName">Personal Information</b>
                      <div className="FarmerAccountComponentSmallCardsDetailsChild" />
                    </div>
                    <div className="FarmerAccountComponentFullDescriptionWrapper">
                      {isEditing ? (
                        <div className="FarmerAccountComponentFullDescription">
                          <p className="FarmerAccountComponentBlankLine">
                            <b className="FarmerAccountComponentCategory">{`Full Name: `}</b>
                            <input
                              className="FarmerAccountComponentCategoryInput"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b className="FarmerAccountComponentCategory">{`Birthdate: `}</b>
                            <input
                              className="FarmerAccountComponentCategoryInput"
                              value={birthdate}
                              onChange={(e) => setBirthdate(e.target.value)}
                            />
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b>{`Email Address: `}</b>
                            <input
                              className="FarmerAccountComponentCategoryInput"
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                            />
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b className="FarmerAccountComponentCategory">{`Age: `}</b>
                            <input
                              className="FarmerAccountComponentCategoryInput"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b>{`Address: `}</b>
                            <input
                              className="FarmerAccountComponentCategoryInput"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b>{`Contact Number: `}</b>
                            <input
                              className="FarmerAccountComponentCategoryInput"
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}
                            />
                          </p>
                        </div>
                      ) : (
                        <div className="FarmerAccountComponentFullDescription">
                          <p className="FarmerAccountComponentBlankLine">
                            <b className="FarmerAccountComponentCategory">{`Full Name: `}</b>
                            <span>{fullName}</span>
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b className="FarmerAccountComponentCategory">{`Birthdate: `}</b>
                            <span>{birthdate}</span>
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b>{`Email Address: `}</b>
                            <span className="FarmerAccountComponentCategory">{emailAddress}</span>
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b className="FarmerAccountComponentCategory">{`Age: `}</b>
                            <span>{age}</span>
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b>{`Address: `}</b>
                            <span className="FarmerAccountComponentCategory">{address}</span>
                          </p>
                          <p className="FarmerAccountComponentBlankLine">
                            <b>{`Contact Number: `}</b>
                            <span className="FarmerAccountComponentCategory">{contactNumber}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="FarmerAccountComponentNameTextWrapper">
                      {isEditing ? (
                        <>
                          <button className="FarmerAccountComponentButton" onClick={handleSaveClick}>
                            <div className="FarmerAccountComponentButtonText">Save</div>
                          </button>
                          <button className="FarmerAccountComponentButton" onClick={handleCancelClick}>
                            <div className="FarmerAccountComponentButtonText">Cancel</div>
                          </button>
                        </>
                      ) : (
                        <button className="FarmerAccountComponentButton" onClick={handleEditClick}>
                          <FaEdit className="FarmerAccountComponentButtonIcon" />
                          <div className="FarmerAccountComponentButtonText">Edit Information</div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerAccountComponent;
