import { useEffect, useState } from 'react';
import Button from '../components/button';
import generateToken from '../utils/generateToken';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [inValidEmail, setInValidEmail] = useState(false);

  useEffect(() => {
    // regular expression to validate email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(String(email).toLowerCase())) {
      setInValidEmail(false)
    } else {
      if(email.length > 0) {
        setInValidEmail(true)
      }
    }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!inValidEmail) {
      const token = generateToken(email);
  
      if(token) {
        localStorage.setItem('user_data', JSON.stringify({ token, email }));

        const decoded = jwt.verify(token, 'jsjjsksiwiiieiei');

        if(decoded) {
          navigate('/');
        }

        setTimeout(() => {
          localStorage.removeItem('user_data');
          navigate('/history');
          console.log('timeout')
        }, (decoded.exp - decoded.iat) * 1000);
      }
    }
    console.log('here');
  }

  return (
    <div className={styles["section"]}>
      <h1 className={styles.title}>get_wallet_app</h1>

      <p>Enter you email addrss to be signed in for 1 hr</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email <sup style={{ color: 'red' }}>*</sup></label>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" style={{ border: inValidEmail ? '1px solid #ff4d4f' : '' }} />
          {inValidEmail && <p className={styles["error"]}>Invalid email address</p>}
        </div>
        <Button style={{ width: '100%', height: 45 }}>Sign In</Button>
      </form>
    </div>
  )
}

export default Login;
