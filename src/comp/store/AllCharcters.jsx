import React, { useEffect, useState } from 'react';
import { getAllCharacters ,sortCharactersByCategory } from '../services/CharctersServices';
import { Link } from 'react-router-dom';
import icon from '../../icon.png';

export default function AllCharcters({selectedCategory}) {
  const [characters, setCharacters] = useState([]);


  const fetchCharacters = async () => {
    try {
      if (selectedCategory === null) {
        const charactersData = await getAllCharacters();
        setCharacters(charactersData);
      } else {
        const characterData = await sortCharactersByCategory(selectedCategory);
        setCharacters(characterData);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const autoCompleteFunc = (text) => {
    if (text === '') {
      fetchCharacters();
    } else {
      const filteredCharacters = characters.filter((char) => {
        return (
          char.name.toLowerCase().includes(text.toLowerCase())
        );
      });
      setCharacters([...filteredCharacters]); 
    }
  };
  

  useEffect(() => {
    fetchCharacters();
  }, [selectedCategory]);

  
  return (
    <div>
      <div className="container" style={{ direction: 'rtl', textAlign: 'right' }} dir="rtl" lang="he">
        <div className="row">
          <input
            className="form-control mb-3"
            style={{ marginTop: '3%' }}
            type="search"
            placeholder="Search characters"
            aria-label="Search"
          onChange={e =>autoCompleteFunc(e.target.value)}
          />


          {characters.map((character, index) => (
            <div className="col-md-6" key={index}>
              <div className="card mb-4">
                <div style={{marginRight:'130px'}}>
                <img src={character.image_link} className="card-img-top" style={{ borderRadius:'10px', border:'1px solid #FFFFF0', height: '200px' ,width:'300px' }} alt="Character Image"  />

                </div>
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text">{character.description.substring(0, 150)}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">קטגוריה: {character.category}</li>
                  <li className="list-group-item">רמת כח: {character.powerLevel}</li>
                  <li className="list-group-item">משתמש פרי שטן: {character.devil_fruit ? 'כן' : 'לא'}   </li>
                </ul>
                <div className="card-body" style={{ textAlign: 'center' }}>

                <Link to={`/character/${character.id}`} className="btn btn-primary">
                <img
                      src={icon}
                      style={{ width: '50px', height: '50px' }}
                      alt="Read More"
                    />
              קיראו עוד
            </Link>
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
