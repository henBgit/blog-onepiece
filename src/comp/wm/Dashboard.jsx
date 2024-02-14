import React, { useState } from 'react'
import WmLogin from './WmLogin';
import WmForgot from './WmForgot';
import WmRegister from './WmRegister';
import Dashboardall from './Dashboardall';

export default function Dashboard() {

  const [isLogin, setIsLogin] = useState(false);

  const [displayComponent, setDisplayComponent] = useState('login');

  return (
    <div className="dashboard-container">
      {!isLogin && (
        <div className="login-container">
          {displayComponent === 'login' && <WmLogin setIsLogin={setIsLogin} isLogin={isLogin} />}
          {displayComponent === 'forgot' && <WmForgot />}
          {displayComponent === 'register' && <WmRegister />}
          <div className="button-group" style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={() => setDisplayComponent('login')}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={() => setDisplayComponent('forgot')}>
              Forgot Password
            </button>
            <button className="btn btn-success" onClick={() => setDisplayComponent('register')}>
              Register
            </button>
          </div>
        </div>
      )}

      {isLogin && (
        <div className="dashboard-all-container">
          <Dashboardall />
        </div>
      )}
    </div>
  )
}
