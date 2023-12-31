import React, { useEffect, createContext, useReducer, useContext } from 'react';

import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/Signin';
import SignUp from './components/pages/Signup';
import CreatePost from './components/pages/CreatePost';
import UserProfile from './components/pages/UserProfile';
import SubscribedUserPosts from './components/pages/SubscribeUserPosts';
import Reset from './components/pages/Reset';
import NewPassword from './components/pages/NewPassword';
import ChatDashboard from './components/pages/ChatDashboard';
import ChatRoomPage from './components/pages/ChatRoomPage';
import { reducer, initialState } from './reducers/userReducer';

export const userContext = createContext();

const Routing = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      if (!location.pathname.startsWith('/reset')) {
        navigate('/signin');
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {state ? (
        <Route path="/signin" element={<Navigate to="/" />} />
      ) : (
        <Route path="/signin" element={<SignIn />} />
      )}
      {state ? (
        <Route path="/signup" element={<Navigate to="/" />} />
      ) : (
        <Route path="/signup" element={<SignUp />} />
      )}




      <Route path="/profile" element={<Profile />} />
      <Route path="/createpost" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingposts" element={<SubscribedUserPosts />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/reset/:token" element={<NewPassword />} />
      <Route path="/chatdashboard" element={<ChatDashboard />} />
      <Route path="/chatroompage/:chatroomId" element={<ChatRoomPage />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state, dispatch }}>

      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>

    </userContext.Provider>
  );
}

export default App;
