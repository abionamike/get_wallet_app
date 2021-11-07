import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useParams } from "react-router-dom"
import Button from "../../components/button";
import SidebarMobile from "../../components/sidebarMobile";
import styles from "./transactionHistory.module.css";
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState('');
  const [transactionHistoryData, setTransactionHistoryData] = useState({ loading: false, data: null });
  const [loading, setLoading] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if(id) {
      const getTransactionHistory = async () => {
        setTransactionHistoryData((prev) => ({  ...prev, loading: true }));
  
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`
          },
        };
  
        const { data } = await axios.get(`https://api-staging.getwallets.co/v1/transactions/wallets/${id}`, config);
  
        setTransactionHistoryData((prev) => ({ ...prev, loading: false, data: data.data }));
      }
  
      getTransactionHistory();
    }
  }, [id, loading]);

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));

    if(user_data) {
      try {
        const decoded = jwt.verify(user_data.token, process.env.REACT_APP_JWT_SECRET);
        if(decoded) {
          console.log('token exists');
        }
      } catch (error) {
        if(error && error.message === 'jwt expired') {
          navigate('/sign-in');
        }
      }
    } else {
      navigate('/sign-in');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`
      },
    };

    const { data } = await axios.post(`https://api-staging.getwallets.co/v1/wallets/funds/manual`, { wallet_id: id, currency: currency ? currency : undefined, amount: amount ? parseInt(amount, 10) : undefined }, config);

    if(data.success) {
      setLoading(false);
      setShowModal(false);
      setShowSuccessModal(true);
    } else {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {showModal &&
        <div className={styles.modal}>
          <div className={styles["modal-container"]}>
            <div className={styles["close"]}>
              <svg onClick={()  => setShowModal(false)} width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.50064 8.49572L10.1996 12.2829C10.5706 12.6657 10.8121 12.6696 11.1899 12.2829L11.9321 11.5229C12.2956 11.1507 12.3203 10.9064 11.9321 10.5089L8.016 6.5L11.9324 2.49108C12.2992 2.11429 12.3064 1.86 11.9324 1.47679L11.1903 0.717147C10.8053 0.322861 10.5674 0.341076 10.1999 0.717147L6.50064 4.50429L2.80171 0.717504C2.43421 0.341433 2.19636 0.323218 1.81136 0.717504L1.06921 1.47715C0.694927 1.86036 0.701713 2.11465 1.06921 2.49143L4.98528 6.5L1.06921 10.5089C0.680998 10.9064 0.701713 11.1507 1.06921 11.5229L1.811 12.2829C2.18564 12.6696 2.42707 12.6657 2.80136 12.2829L6.50064 8.49572Z" fill="black"/>
              </svg>
            </div>
            <h2>Fund Wallet</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Amount</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" />
              </div>
              <div>
                <label>Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value=""></option>
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <Button style={{ width: '100%', height: 45 }}>{loading ? 'Funding Wallet...' : 'Fund Wallet'}</Button>
            </form>
          </div>
        </div>
      }
      {showSuccessModal &&
        <div className={styles.modal}>
          <div className={styles["modal-container"]}>
            <div className={styles["close"]}>
              <svg onClick={()  => setShowSuccessModal(false)} width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.50064 8.49572L10.1996 12.2829C10.5706 12.6657 10.8121 12.6696 11.1899 12.2829L11.9321 11.5229C12.2956 11.1507 12.3203 10.9064 11.9321 10.5089L8.016 6.5L11.9324 2.49108C12.2992 2.11429 12.3064 1.86 11.9324 1.47679L11.1903 0.717147C10.8053 0.322861 10.5674 0.341076 10.1999 0.717147L6.50064 4.50429L2.80171 0.717504C2.43421 0.341433 2.19636 0.323218 1.81136 0.717504L1.06921 1.47715C0.694927 1.86036 0.701713 2.11465 1.06921 2.49143L4.98528 6.5L1.06921 10.5089C0.680998 10.9064 0.701713 11.1507 1.06921 11.5229L1.811 12.2829C2.18564 12.6696 2.42707 12.6657 2.80136 12.2829L6.50064 8.49572Z" fill="black"/>
              </svg>
            </div>
            <h2>Fund Created Successfully!</h2>
            <p className={styles.invoice}>Invoice generated:</p>
            <div className={styles.invoice_data}>
              <p>Status: {transactionHistoryData.data[transactionHistoryData.data.length - 1].status}</p>
              <p>Amount: {transactionHistoryData.data[transactionHistoryData.data.length - 1].currency === "NGN" ? "\u20A6" : "$"}{transactionHistoryData.data[transactionHistoryData.data.length - 1].amount}</p>
              <p>Wallet ID: {transactionHistoryData.data[transactionHistoryData.data.length - 1].wallet_id}</p>
              <p>Fund Method: {transactionHistoryData.data[transactionHistoryData.data.length - 1].funding_method}</p>
              <p>Type: {transactionHistoryData.data[transactionHistoryData.data.length - 1].type}</p>
            </div>
          </div>
        </div>
      }
      {showSidebar && <SidebarMobile setShowSidebar={setShowSidebar} />}
      <div className={styles.main}>
        <div className="hamburger">
          <GiHamburgerMenu fontSize="22px" style={{ cursor: 'pointer' }} onClick={() => setShowSidebar(true)} />
        </div>
        <div className={styles.heading}>
          <h1>Transaction History</h1>
          <Button onClick={() => setShowModal(true)}>Fund Your Wallet</Button>
        </div>
        {transactionHistoryData.loading && 
          <div className={styles["not-found"]}>
            <p>Loading...</p>
          </div>
        }
        {transactionHistoryData.data && !transactionHistoryData.loading &&
          <div className="layer">
            <table>
              {" "}
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Wallet ID</th>
                  <th>Funding Method</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {[].concat(transactionHistoryData.data).reverse().map((item) => (
                  <tr key={item.wallet_id} className="table-row">
                    <td>
                      <span className="status">{item.status}</span>
                    </td>
                    <td>{item.currency === "NGN" ? "\u20A6" : "$"}{item.amount ? item.amount : 0}</td>
                    <td>{item.wallet_id}</td>
                    <td>{item.funding_method}</td>
                    <td>{item.type}</td>
                    <td>{dayjs(item.created_at).format('ddd MMM D, YYYY')}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        }
        {!transactionHistoryData.data && !transactionHistoryData.loading &&
          <div className={styles["not-found"]}>
            <p>You have no transaction history.</p>
            <Button onClick={() => setShowModal(true)}>Fund Your Wallet</Button>
          </div>
        }
      </div>
    </div>
  )
}

export default TransactionHistory;
