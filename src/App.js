import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import AuthSwitch from "./Auth/AuthSwitch";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";
import Dashboard from "./Dashboard/Dashboard";
import CustomPost from "./Dashboard/CustomPost/CustomPost";
import BlogPost from "./Dashboard/BlogPost/BlogPost";
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import RegistrationSuccess from "./Auth/Signup/RegistrationSuccess";
import VideoTest from "./Dashboard/VideoTest";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<LandingPage />}></Route>
              <Route path='/Auth' element={<AuthSwitch />}> </Route>
              <Route path='/ForgotPassword' element={<ForgotPassword />}> </Route>
              <Route path='/RegistrationSuccess' element={<RegistrationSuccess />}> </Route>
              <Route path='/Dashboard' element={<Dashboard />}> </Route>
              <Route path='/CustomPost' element={<CustomPost />}> </Route>
              <Route path='/BlogPost' element={<BlogPost />}> </Route>
              <Route path='/VideoTest' element={<VideoTest />}> </Route>
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
