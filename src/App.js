import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import TransactionHistory from './pages/transactionHistory';
import SignIn from './pages/signIn';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:id" element={<TransactionHistory />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main> 
    </BrowserRouter>
  );
}

export default App;
