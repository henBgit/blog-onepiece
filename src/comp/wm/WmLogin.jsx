import React, { useState } from 'react'
import { login } from '../services/authService';


export default function WmLogin({isLogin,setIsLogin}) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const btnLogin = async () => {
    try {
      const resultLogin = await login(email, password);
      if (resultLogin) {
        setIsLogin(!isLogin);
        alert("Login Ok");
      }
   

     
    } catch (error) {
      console.log('Error logging in:', error);
      alert("Login bad");
    }
  };

  return (
    <div>
    <div className="container">
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="card p-5 shadow-effect bg-dragon-ball">
          <div className="card-body">
            <div className="text-center">
              <h3 className="text-theme-primary">Login</h3>
              <p>please login to your admin account to post</p>
            </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control input-dragon-ball"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               
                />
                {email && (
                  <div className="alert-danger">Please insert a valid email address</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control input-dragon-ball"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {password && <div className="alert-danger">Password cannot be empty</div>}
              </div>
              <button onClick={btnLogin} className="btn btn-info btn-block btn-theme" disabled={!email || !password}>
                Login
              </button>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  </div>
  </div>
  )
}

