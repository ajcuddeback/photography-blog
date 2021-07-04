import React, { useState, useEffect } from 'react';

// Dependencies
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';
 import Auth from './utils/auth';

// Components
import AboutComponent from './components/pages/AboutComponent';
import AdminComponent from './components/pages/AdminComponent';
import GalleryComponent from './components/pages/GalleryComponent';
import HomeComponent from './components/pages/HomeComponent';
import LoginComponent from './components/pages/LoginComponent';
import ForgotPasswordComponent from './components/pages/reset-password/ForgotPasswordComponent';
import ResetPWComponent from './components/pages/reset-password/ResetPWComponent';
import SubmitCodeComponent from './components/pages/reset-password/SubmitCodeComponent';
import NavComponent from './components/NavComponent';
import Page404Component from './components/pages/Page404Component';
import GlobalStyle from './components/GlobalStyles';

function App() {

  // State
  const [isLoggedIn, setIsLoggedIn] = useState();
  
  // Use effect hook to check if user is logged in everytime they visit a new page or login, that way if a user logs out, they will not be able to view any secure components.
  useEffect(() => {
    const loggedIn = Auth.loggedIn();
    if (loggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn])

  return (
    <Router>
      <div className="App">
        <GlobalStyle />
      </div>

      <Switch>
        {isLoggedIn ? (
          <Route path='/admin'>
          <NavComponent isLoggedIn={isLoggedIn} />
          <AdminComponent />
        </Route>
        ): ''}
        <Route path='/gallery'>
          <NavComponent isLoggedIn={isLoggedIn} />
          <GalleryComponent />
        </Route>
        
        <Route path='/about'>
          <NavComponent isLoggedIn={isLoggedIn} />
          <AboutComponent />
        </Route>
        <Route path='/login'>
          <LoginComponent setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordComponent />
        </Route>
        <Route path='/submit-code'>
          <SubmitCodeComponent />
        </Route>
        <Route path='/reset-pw'>
          <ResetPWComponent />
        </Route>
        <Route exact path='/'>
          <NavComponent isLoggedIn={isLoggedIn} />
          <HomeComponent />
        </Route>
        <Route path='*'>
          <Page404Component />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
