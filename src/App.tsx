import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WarU from './pages/WarU';
import Energy from './pages/Energy';
import UTSA from './pages/UTSA';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waru" element={<WarU />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/utsa" element={<UTSA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
