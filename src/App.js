import './App.css';
import React, { useState, useEffect } from 'react';
import {Header, Main, Footer} from "./components/Site";


function App() {

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      {/* <p>Hola?</p> */}
    </div>
  );
}

export default App;
