import React from 'react';
import MainPageNavigation from '../../components/mainPageNavigation';
import HomeComponent from '../../components/homeComponent';
import ContactComponent from '../../components/contactComponent';


const MainPage = () => {

 
    return (
        <>       
        <MainPageNavigation />                    
        <HomeComponent />                   
        <ContactComponent />       
        </>
    );
};

export default MainPage;