import React, { useState, useEffect } from 'react';
import Footer from './layout/Footer';

import { sortChartersBaseOnTitle, fetchCategories } from '../services/infoService';

export default function Info() {

  const [titles, setTitles] = useState([]);
  const [expandedItems, setexpandedItems] = useState([]);

  const [selectedTitle, setSelectedTitle] = useState(null);


  const fetchAndSortTitles = async () => {
    try {
   
      const fetchedTitles = await fetchCategories();
      await sortChartersBaseOnTitle(fetchedTitles);

      setTitles(fetchedTitles);
    } catch (error) {
      console.error('Error fetching and sorting titles:', error);
    }
  };

  useEffect(() => {
    fetchAndSortTitles();
  }, []);

  const handleTitleClick = (id) => {
   
    setSelectedTitle(id === selectedTitle ? null : id);
  };


  const ToggleItem = (item) => {
    if (expandedItems.includes(item)) {
      setexpandedItems(expandedItems.filter(i => i !== item));
    } else {
      setexpandedItems([...expandedItems, item]);
    }
  };


  return (
    <div className="info-container" style={{ direction: 'rtl' }}>
      

    <div className="titles-container">
      <h1>כאן תוכלו לראות את הדמויות לפי קטגוריות</h1>
      {titles.map((title, index) => (
        <div key={index} className={`title-item ${selectedTitle === index + 1 ? 'selected' : ''}`}>
          <div onClick={() => ToggleItem(index + 1)}>
            {title.title}
          </div>
          {expandedItems.includes(index + 1) && (
            <div className="content-container">
              {title.content.map((char, charIndex) => (
                <div key={charIndex} className="char-item">
                  <img src={char.image} height={100} alt={char.name} /> &nbsp;&nbsp;&nbsp;
                  <div>{char.name}</div> 
                  <div className="char-data">{char.data}</div>
               
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    <Footer />
  </div>
  );
}
