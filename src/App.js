import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import AuthSwitch from "./Auth/AuthSwitch";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/Auth' element={<AuthSwitch />}> </Route>
          <Route path='/ForgotPassword' element={<ForgotPassword />}> </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
