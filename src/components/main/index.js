import dayjs from 'dayjs';
import Button from '../button';
import './styles.css';
import { FaShareSquare } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const Main = ({ setShowModal, walletData }) => {
  const navigate = useNavigate();
  console.log(walletData)
  return (
    <div className="main">
      <div className="heading">
        <h1>Wallets</h1>
        <Button onClick={() => setShowModal(true)}>Create New Wallet</Button>
      </div>
      <div className="table-container">
      {walletData &&
        <table>
          {" "}
          <thead>
            <tr>
              <th>Status</th>
              <th>Balance</th>
              <th>Wallet ID</th>
              <th>Customer Email</th>
              <th>Date</th>
              <th>Transaction History</th>
            </tr>
          </thead>
          <tbody>
            {[].concat(walletData).reverse().map((item) => (
              <tr key={item.wallet_id} className="table-row">
                <td>
                  <span className="status">{item.status}</span>
                </td>
                <td>{"\u20A6"}{item.balance}</td>
                <td>{item.wallet_id}</td>
                <td>{item.customer_email}</td>
                <td>{dayjs(item.created_at).format('ddd MMM D, YYYY')}</td>
                <td><FaShareSquare onClick={() => navigate(`/${item.wallet_id}`)} style={{ cursor: 'pointer' }} size="20px" /></td>
              </tr>
            ))}
        </tbody>
      </table>
    }
    </div>
    {!walletData &&
      <div className="not-found">
        <p>You have no Wallet Data.</p>
        <Button onClick={() => setShowModal(true)}>Create New Wallet</Button>
      </div>
    }
  </div>
  )
}

export default Main
