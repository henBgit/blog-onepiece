import React, { useState, useEffect } from 'react';
import { getAllCharacters ,deleteCharacter } from '../services/CharctersServices';

export default function Wmchars({setEditCharacter, setEditMode ,setShowNewCharForm ,showNewCharForm}) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersData = await getAllCharacters();
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();


  }, []);
  const onDelete = async(chatId)=>{
    await deleteCharacter(chatId);
  }
  const onUpdate =(character) =>{
    setEditCharacter(character);
    setEditMode(true);
    setShowNewCharForm(!showNewCharForm);

  }

  return (
    <div>
      <h1>All Characters</h1>
      <table className="table row-border hover">
        <thead>
          <tr>
            <th>No</th>
            <th>Character Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Power Level</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (

            <tr key={character.id}>
              <td>{index + 1}</td>

              <td><img height={50} src={character.image_link} alt="Character" className="character-image" /></td>
              <td>{character.name}</td>
              <td>{character.description.substring(0, 120)}</td>
              <td>{character.category}</td>
              <td>{character.powerLevel}</td>
              <td>
                {character.createdAt && character.createdAt.seconds
                  ? new Date(character.createdAt.seconds * 1000).toLocaleDateString()
                  : 'Date Not Available'}
              </td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => onUpdate(character)} className="btn btn-sm btn-warning" >
                  Edit
                </button><br />
                <button onClick={() => onDelete(character.id)} className="btn btn-sm btn-danger ml-2" >
                  Delete
                </button><br />
                

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
