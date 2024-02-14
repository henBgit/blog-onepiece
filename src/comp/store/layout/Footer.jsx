import React, { useEffect, useState } from 'react'
import { getOnePieceLogo } from '../../services/PicsService';

export default function Footer() {
  const [logoURL, setLogoURL] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const url = await getOnePieceLogo();
        console.log(url);
        setLogoURL(url);
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchLogo();
  }, []);

  return (
    <div>
      <footer>
      <div style={{textAlign:"center"}}>
       {logoURL && <img src={logoURL} style={{ height: '150px' }} alt="Site Logo" />}
       <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <div className="site-logo">בלוג וואן פיס</div>
              <br />
              <ul className="nav">
                <li className="nav-item">
                  <a href="" className="nav-link">
                    תקנון
                  </a>
                </li>
                <li className="nav-item">
                  <a href="" className="nav-link">
                    צור קשר
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
       </div>
     
     </footer>
    </div>
  )
}
