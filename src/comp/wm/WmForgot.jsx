import React, { useState } from 'react'
import { forgotPassword } from '../services/authService';

export default function WmForgot() {

const [email,SetEmail] = useState("");

const btnReset = async () => {
  try {
    const result = await forgotPassword(email);
    alert(result);
  } catch (error) {
    console.error('Error resetting password:', error);
    alert('Error resetting password');
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
              <h3 className="text-theme-primary">Reset Password</h3>
              <p>please login to your admin account to post</p>
            </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control input-dragon-ball"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  required
                />
                {email && (
                  <div className="alert-danger">Please insert a valid email address</div>
                )}
              </div>
              <button onClick={btnReset} className="btn btn-info btn-block btn-theme" disabled={!email}>
               Reset Your Password
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
