import './App.css';
import Homepage from "./components/Main/main";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import { Routes, Route } from "react-router-dom";

import { useState } from 'react';

function App() {

  const [ user, setLoginUser] = useState({});
  
  return (
    <div className="App">

        <Routes>

          <Route path="/" element={user && user._id ? <Homepage setLoginUser={setLoginUser}/> : <Login setLoginUser={setLoginUser}/>}/>

          <Route path="/login" element={<Login setLoginUser={setLoginUser}/>}/>

          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>

    </div>
  );
}

export default App;