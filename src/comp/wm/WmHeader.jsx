import React, { useEffect, useState } from 'react'
import { getOnePieceLogo } from '../services/PicsService'

export default function Header() {

  const [logoURL, setLogoURL] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const url = await getOnePieceLogo();
    
        setLogoURL(url);
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchLogo();
  }, []);


  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"#343a40"}}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav" >
          <ul className="navbar-nav">
            <a href="/wm" className="site-logo">
            {logoURL && <img src={logoURL} style={{ height: '150px' }} alt="Site Logo" />}
            </a>  
          </ul>
        </div>
      </nav>
    </div>
  )
}

