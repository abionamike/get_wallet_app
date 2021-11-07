import { Link, useNavigate } from 'react-router-dom';
import { CgClose } from 'react-icons/cg'
import './styles.css';

const SidebarMobile = ({ setShowSidebar }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setShowSidebar(false);

    localStorage.removeItem('user_data');
    navigate('/history');
  }

  const handleNavigate = () => {
    setShowSidebar(false);
    navigate('/');
  }

  return (
    <div className="sidebar-mobile">
      <div className="content">
        <div className="email">
          <Link onClick={() => setShowSidebar(false)} to="/">
            <h2>Dashboard</h2>
          </Link>
          <div>
            <CgClose fontSize="25px" style={{ cursor: 'pointer' }} onClick={() => setShowSidebar(false)} />
          </div>
        </div>
        <div className="tab">
          <p onClick={handleNavigate}><Link onClick={() => setShowSidebar(false)} to="/">Wallets</Link></p>
        </div>
        <div className="logout">
          <p onClick={handleLogout}>Logout &rarr;</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarMobile;
