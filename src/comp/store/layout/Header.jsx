import React, { useEffect, useState } from 'react'
import { getOnePieceLogo } from '../../services/PicsService'
import { Link } from 'react-router-dom';

export default function Header() {

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
      <div style={{ textAlign: "center", marginBottom: "10px" }} >
      {logoURL && <img src={logoURL} style={{ height: '140px', marginRight: '60px' }} alt="Site Logo" />}
      <div className="nav-item active" style={{ marginBottom: "20px" }}>
      <span className="nav-link category-link" style={{display:'flex',justifyContent:'space-between'}}>
      <Link to={"/"} className="category-button" > Home
        </Link> &nbsp;&nbsp;
        <Link to={"/videos"} className="category-button" >Videos 
        </Link>
        
      </span>
    </div>
        

      </div>

    </div>

  )
}

