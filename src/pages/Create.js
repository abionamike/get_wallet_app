import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from "../components/button";
import Sidebar from "../components/sidebar";
import styles from "./create.module.css"

const Create = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState('');
  const [transactionHistoryData, setTransactionHistoryData] = useState({ loading: false, data: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(id) {
      const getTransactionHistory = async () => {
        setTransactionHistoryData((prev) => ({  ...prev, loading: true }));
  
        const config = {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer sk_live_615d856adfdf251803d6a3ff615d856adfdf251803d6a400'
          },
        };
  
        const { data } = await axios.get(`https://api-staging.getwallets.co/v1/transactions/wallets/${id}`, config);
  
        setTransactionHistoryData((prev) => ({ ...prev, loading: false, data: data.data }));
      }
  
      getTransactionHistory();
    }
  }, [id, loading]);

  if(transactionHistoryData.data) {
    console.log(transactionHistoryData.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer sk_live_615d856adfdf251803d6a3ff615d856adfdf251803d6a400'
      },
    };

    const { data } = await axios.post(`https://api-staging.getwallets.co/v1/wallets/funds/manual`, { wallet_id: id, currency: currency ? currency : undefined, amount: amount ? parseInt(amount, 10) : undefined }, config);

    if(data.success) {
      setLoading(false);
      setShowModal(false)
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
                {/* <input required value={amount} onChange={(e) => setAmount(e.target.value)} type="text" placeholder="Currency" /> */}
              </div>
              <Button style={{ width: '100%', height: 45 }}>{loading ? 'Funding Wallet...' : 'Fund Wallet'}</Button>
            </form>
          </div>
        </div>
      }
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.heading}>
          <h1>Transaction History</h1>
          <Button onClick={() => setShowModal(true)}>Fund Your Wallet</Button>
        </div>
        {transactionHistoryData.loading && <p>Loading...</p>}
        {transactionHistoryData.data &&
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
        }
        {!transactionHistoryData.data &&
          <div className={styles["not-found"]}>
            <p>You have no transaction history.</p>
            <Button onClick={() => setShowModal(true)}>Fund Your Wallet</Button>
          </div>
        }
      </div>
    </div>
  )
}

export default Create
