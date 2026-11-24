import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import WarU from './pages/WarU';
import Energy from './pages/Energy';
import UTSA from './pages/UTSA';
import MyFavorites from './pages/MyFavorites';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waru" element={<WarU />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/utsa" element={<UTSA />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
