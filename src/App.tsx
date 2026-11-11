import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WarU from './pages/WarU';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waru" element={<WarU />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
