import React, { useEffect } from 'react'
import Navbar from "./components/Navbar";
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import ChatRoomPage from './Pages/ChatRoomPage';
import { Toaster } from 'react-hot-toast';

import {Routes, Route, Navigate} from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import ChatBoxPage from './Pages/ChatBoxPage';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});
  console.log({onlineUsers});

  if(isCheckingAuth && !authUser) 
    return (
    <div className='flex h-screen justify-center items-center'>
      <Loader className='size-10 text-white animate-spin'/>
    </div>
  );

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to= "/login"/>} />
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to= "/"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to= "/"/>}/>
        <Route path='/setings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/>: <Navigate to= "/login"/>}/>
        <Route path='/chatroom' element={authUser ? <ChatRoomPage/>: <Navigate to= "/login"/>}/>
        <Route path='/chatbox' element={authUser ? <ChatBoxPage/>: <Navigate to= "/login"/>}/>
      </Routes>

      <Toaster position="bottom-center"/>
    </div>
  )
}

export default App