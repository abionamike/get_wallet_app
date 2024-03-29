import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/button";
import Main from "../../components/main";
import SidebarMobile from "../../components/sidebarMobile";
import styles from './home.module.css';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [inValidEmail, setInValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [walletData, setWalletData] = useState(JSON.parse(localStorage.getItem('user_wallet_data')));

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if(data) {
      setWalletData(JSON.parse(localStorage.getItem('user_wallet_data')));
    }
  }, [data]);

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

  useEffect(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(String(email).toLowerCase())) {
      setInValidEmail(false)
    } else {
      if(email.length > 0) {
        setInValidEmail(true)
      }
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user_wallet_data = JSON.parse(localStorage.getItem('user_wallet_data'));

    setLoading(true);

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`
      },
    };

    const { data } = await axios.post(`https://api-staging.getwallets.co/v1/wallets`, { customer_email: email } ,config);

    if(data.success) {
      setLoading(false);
      setEmail('');
      setShowModal(false);

      if(user_wallet_data) {
        user_wallet_data.push(data.data);
        localStorage.setItem('user_wallet_data', JSON.stringify(user_wallet_data));
        setData(user_wallet_data);
      } else {
        localStorage.setItem('user_wallet_data', JSON.stringify([data.data]));
        setData(data.data)
      }
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
            <h2>Create New Wallet</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Customer Email <sup style={{ color: 'red' }}>*</sup></label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{ border: inValidEmail ? '1px solid #ff4d4f' : '' }} />
                {inValidEmail && <p className={styles["error"]}>Invalid email address</p>}
              </div>
              <Button style={{ width: '100%', height: 45 }}>{loading ? 'Creating Wallet...' : 'Create Wallet'}</Button>
            </form>
          </div>
        </div>
      }
      {showSidebar && <SidebarMobile setShowSidebar={setShowSidebar} />}
      <Main setShowModal={setShowModal} setShowSidebar={setShowSidebar} walletData={walletData} />
    </div>
  )
}

export default Home;
