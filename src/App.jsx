import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Track from './components/Track';
import { UserContext } from './contexts/UserContext';
import Private from './components/Private';
import Diet from './components/Diet';

function App() {

  const [loggedUser,setLoggedUser]=useState(localStorage.getItem("nutrify-user")!==null?JSON.parse(localStorage.getItem("nutrify-user")):null);

  return (
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
        <Routes>
          <Route path='/' element={<Private Component={Track} />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/track' element={<Private Component={Track} />} />
          <Route path='/diet' element={<Private Component={Diet} />} />
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </UserContext.Provider>
  )
}

export default App;
