import React from 'react';
import MainPageNavigation from '../../components/mainPageNavigation';
import HomeComponent from '../../components/homeComponent';
import PostComponent from '../../components/postComponent';
import ContactComponent from '../../components/contactComponent';
import AboutComponent from '../../components/aboutComponent';


const MainPage = () => {

 
    return (
        <>       
        <MainPageNavigation />                    
        <HomeComponent />  
        <AboutComponent />     
        <PostComponent />        
        <ContactComponent />       
        </>
    );
};

export default MainPage;