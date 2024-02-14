import React, { useState } from 'react'
import AllCharcters from './AllCharcters'
import Categories from './Categories';
import Footer from './layout/Footer';

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "#343a40" }}>


        <div className="collapse navbar-collapse justify-content-center" id="navbarNav" >
          <ul className="navbar-nav">
            <a href="/" className="site-logo">

            </a>

            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          </ul>
        </div>
      </nav>


      <AllCharcters selectedCategory={selectedCategory} />
      <Footer />
    </div>
  )
}
