import React, { useEffect } from 'react';
import Navbar from "./components/Navbar";
import HomePage from './Pages/HomePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import ProfilePage from './Pages/ProfilePage';
import ChatRoomPage from './Pages/ChatRoomPage';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import ChatBoxPage from './Pages/ChatBoxPage';

useAuthStore.getState().checkAuth();

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const location = useLocation();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth && !authUser)
  //   return (
  //     <div className='flex h-screen justify-center items-center'>
  //       <Loader className='size-10 text-white animate-spin' />
  //     </div>
  //   );

  const noNavbarRoutes = ['/login', '/signup'];

  return (
    <div>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path='/chatroom' element={authUser ? <ChatRoomPage /> : <Navigate to="/login" />} />
        <Route path='/chatbox' element={authUser ? <ChatBoxPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            backgroundColor: '#09090B', 
            color: '#fff', 
            padding: '10px',
            borderRadius: '8px',
            fontSize: '16px',
            border: '1px solid #27272A',  
          },
          success: {
            style: {
              backgroundColor: '#001F10',
              color: '#5AF2A6', 
            },
          },
          error: {
            style: {
              backgroundColor: '#2D0608',
              color: '#FE9EA1', 
            },
          },
          loading: {
            style: {
              backgroundColor: '#f0ad4e', 
              color: '#fff', 
            },
          },
        }}
      />
    </div>
  );
};

export default App;
