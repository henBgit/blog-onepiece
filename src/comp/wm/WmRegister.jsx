import React, { useState } from 'react'
import { register } from '../services/authService'

export default function WmRegister() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const btnRegister = async () => {
    try {
      const result = await register(email, password);
      alert(result);
    } catch (error) {
      console.error('Error registering user:', error);
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
                <h3 className="text-theme-primary">Register</h3>
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
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  />
                  {email && !email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && (
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
                <button onClick={btnRegister}  className="btn btn-info btn-block btn-theme" disabled={!email || !password}>
                  Register
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
