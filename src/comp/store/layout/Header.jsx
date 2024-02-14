import React, { useEffect, useState } from 'react'
import Categories from '../Categories'
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
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to={"/"} >  {logoURL && <img src={logoURL} style={{ height: '150px', marginRight: '100px' }} alt="Site Logo" />}
        </Link>

      </div>

    </div>

  )
}

