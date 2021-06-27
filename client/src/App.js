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
import NavComponent from './components/NavComponent';
import GlobalStyle from './components/GlobalStyles';

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <NavComponent />
      </div>

      <Switch>
        <Route path='/gallery'>
          <GalleryComponent />
        </Route>
        <Route path='/about'>
          <AboutComponent />
        </Route>
        <Route path='/'>
          <HomeComponent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
