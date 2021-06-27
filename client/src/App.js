import React from 'react';

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
    <div className="App">
      <GlobalStyle />
      <NavComponent />
    </div>
  );
}

export default App;
