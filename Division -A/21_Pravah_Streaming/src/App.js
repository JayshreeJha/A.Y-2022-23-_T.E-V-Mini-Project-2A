import React from 'react';
import { useState } from 'react';
import UserProfile from './components/pages/UserProfile'
import Navbar from './components/Navbar';
import './App.css';
// import Maindash from './components/pages/Maindash';
import Searchbar from './components/pages/Searchbar';
import Sidebar from './components/pages/Sidebar';
import Home from './components/pages/Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import History from './components/pages/History';
 import Musicserch from './components/pages/Musicsearch';
// import Products from './components/pages/Products';
// import ContactUs from './components/pages/ContactUs';
// import SignUp from './components/pages/SignUp';
// import Marketing from './components/pages/Marketing';
// import Consulting from './components/pages/Consulting';




function App() {
  const [user, setLoginUser] = useState({})
 
  return (
    <>

      {/* <Router> */}
    
        {/* { user && user._id ?<Sidebar setLoginUser={setLoginUser}/>:<Navbar setLoginUser={setLoginUser}/>}
      { user && user._id ?<Searchbar setLoginUser={setLoginUser}/>:''}  */}


        {/* <Routes>
          <Route  path="/" exact element={<Home />} /> */}
          {/* <Route path='/searchbar' element={user && user._id ?<Searchbar/>:<Login setLoginUser={setLoginUser}/>} />
          <Route path='/history' element={<History />} />
          <Route path='/music' element={<Musicserch />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/register" element={<Register />} /> */}
        {/* </Routes>
      </Router> */}



    <Router>
      { user && user._id ?<Sidebar setLoginUser={setLoginUser}/>:<Navbar/>} 
     

      
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/userprofile' element={<UserProfile setLoginUser={user}/>} />
    
        <Route path='/sign-up' element={<Register/>} />
        <Route path='/login' element={<Login setLoginUser={setLoginUser}/>} />
        <Route path='/searchbar' element={<Searchbar setLoginUser={user} />} />
        <Route path='/history' element={<History/>} />
        <Route path='/music' element={<Musicserch/>} />


        


      </Routes>
    </Router>
    </>
  );
}

export default App;
