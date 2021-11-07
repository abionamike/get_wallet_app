import { Link } from 'react-router-dom';
import './styles.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="content">
        <div className="email">
          <Link to="/">
            <h2>Dashboard</h2>
          </Link>
        </div>
        <div className="tab">
          <p><Link to="/">Wallets</Link></p>
        </div>
        <div className="logout">
          <p>Logout &rarr;</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
