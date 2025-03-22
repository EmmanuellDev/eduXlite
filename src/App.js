import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import M1 from "./components/M1"
import M2 from "./components/M2"
import Cart from "./components/Cart"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/m1" element={<M1 />} />
        <Route path="/m2" element={<M2 />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;