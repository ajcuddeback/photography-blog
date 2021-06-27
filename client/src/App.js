import React from 'react';

// Dependencies
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';

// Components
import AboutComponent from './components/AboutComponent';
import AdminComponent from './components/AdminComponent';
import GalleryComponent from './components/GalleryComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';
import ResetPWComponent from './components/ResetPWComponent';
import SubmitCodeComponent from './components/SubmitCodeComponent';
import NavComponent from './components/NavComponent';
import Page404Component from './components/Page404Component';
import GlobalStyle from './components/GlobalStyles';

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
      </div>

      <Switch>
        <Route path='/gallery'>
          <NavComponent />
          <GalleryComponent />
        </Route>
        <Route path='/about'>
          <NavComponent />
          <AboutComponent />
        </Route>
        <Route path='/login'>
          <LoginComponent />
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
          <NavComponent />
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
