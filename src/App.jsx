import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Produtora from './componentes/telas/produtora/Produtora'
import Jogo from './componentes/telas/jogo/Jogo'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <Router>
        <Menu/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/produtoras" element={<Produtora/>}/>
          <Route exact path="/jogos" element={<Jogo/>}/>
        </Routes>
    </Router>
  );
}

export default App;
