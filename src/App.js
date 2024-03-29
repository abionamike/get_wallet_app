import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TransactionHistory from './pages/transactionHistory';
import SignIn from './pages/signIn';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
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
