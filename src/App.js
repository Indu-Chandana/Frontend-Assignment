import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import './App.css';
import Auth from './components/Auth/Auth';
import UserDetails from './components/homePage/Home';

function App() {
  const [user, setUser] = useState(null);

  const userData = useSelector((state) => state.myProfile.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(userData)
    if(!userData) {
      setUser(JSON.parse(localStorage.getItem('profile')))
    }
    
  }, [userData, dispatch])

  return (
    <BrowserRouter>
      {!user ? (
        <Auth />
      ) : (
        <Routes>
          <Route path='/' element={<UserDetails/>} />
        </Routes>
      )}

    </BrowserRouter>
  );
}

export default App;
