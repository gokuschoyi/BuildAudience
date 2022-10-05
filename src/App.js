import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Auth/ProtectedRoute';
import LandingPage from "./LandingPage";
import AuthSwitch from "./Auth/AuthSwitch";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";
import Dashboard from "./Dashboard/Dashboard";
import BlogPost1 from "./Dashboard/BlogPost/Templates/BlogPost1";
import BlogPost2 from "./Dashboard/BlogPost/Templates/BlogPost2";
import BlogPost3 from "./Dashboard/BlogPost/Templates/BlogPost3";
import Blogs from './PublicBlogs/Blogs';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import RegistrationSuccess from "./Auth/Signup/RegistrationSuccess";
import UserProfile from "./Auth/UserProfile/UserProfile";
import VideoTest from "./Dashboard/VideoTest";
import PageNotFound from './Common/404PageNotFound';

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

              <Route
                path='/UserProfile' element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/Dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/BlogPost1'
                element={
                  <ProtectedRoute>
                    <BlogPost1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/BlogPost2'
                element={
                  <ProtectedRoute>
                    <BlogPost2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/BlogPost3'
                element={
                  <ProtectedRoute>
                    <BlogPost3 />
                  </ProtectedRoute>
                }
              />

              <Route path='/Blogs/:title/:id' element={<Blogs />}> </Route>
              <Route path='/VideoTest' element={<VideoTest />}> </Route>
              <Route path='*' element={<PageNotFound />}> </Route>
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
