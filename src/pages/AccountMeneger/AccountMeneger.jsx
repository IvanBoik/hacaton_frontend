import React from 'react';
import Profile from '../../components/ProfilMeneger/Profile';
import Header from "../../components/Header/Header";

const Manager = () => {
    return(
        <>
            <Header title1="Профиль" title2="Новые" title3="В обработке" title4="Завершенные" url="/profile"/>
            <Profile/>
        </>
    );
  }
  
  export default Manager;