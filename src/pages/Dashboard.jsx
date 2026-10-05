import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import logo from '../assets/logo.png';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        } else {
          //setError('Failed to load user data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Dashboard</h1>
        </div>
        <button onClick={handleLogout} className="btn-logout">Log out</button>
      </nav>

      <main className="dashboard-main">
        {error && <div className="error-alert">{error}</div>}

        <div className="dashboard-card">
          <h2>Welcome! </h2>
          <div className="user-info">
            <p>
              <strong>Email:</strong>
              <span>{userData?.email || JSON.parse(localStorage.getItem('user'))?.email}</span>
            </p>
            {userData?.role && (
              <p>
                <strong>Role:</strong>
                <span>{userData.role}</span>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;