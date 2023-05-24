import './App.css';
import {Route, Router, Routes} from 'react-router-dom';
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'
import HomeOff from '../src/pages/HomeOff'
import HomeOn from '../src/pages/HomeOn'
import Authorization from './pages/Authorization';
import AccountClient from './pages/AccountClient/AccountClient';
import Meneger from '../src/pages/AccountMeneger/AccountMeneger';
import ChatPage from "./pages/ChatPage";
import AccountMeneger from "../src/pages/AccountMeneger/AccountMeneger";

function App() {

  const flag = "AutUser";
  //const flag = "AutUser";
  //const flag = "";
  
  if(flag==="meneger"){
    return (
      <>
          <Routes>
            <Route path='/' element = {<Meneger/>}/>
            <Route path='/chat' element={<ChatPage/>}/>
            <Route path='/profile' element={<AccountMeneger/>}/>
          </Routes>
      </>      
    )
  }
  else if(flag===""){
    return (
        <>
          <Routes>
            <Route path='/' element = {<HomeOn/>}/>
            <Route path='/chat' element={<ChatPage/>}/>
            <Route path='/profile' element={<AccountClient/>}/>
          </Routes>
        </>
    );
  }
  else {
    return (
        <>
          <Routes>
            <Route path='/' element = {<HomeOff/>}/>
            <Route path='/login' element={<Authorization/>}/>
          </Routes>
        </>
    );
  }
}

export default App;
