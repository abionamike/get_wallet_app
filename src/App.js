import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Create from './pages/Create';
import FundWallet from './pages/FundWallet';
import History from './pages/History';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<Create />} />
          <Route path="/history" element={<History />} />
          <Route path="/fund-wallet" element={<FundWallet />} />
        </Routes>
      </main> 
    </BrowserRouter>
  );
}

export default App;
