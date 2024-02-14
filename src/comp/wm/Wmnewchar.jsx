import React, { useEffect, useState } from 'react';
import { addCharacter, updateCharacter } from '../services/CharctersServices';
import { getAllCategories } from '../services/CategoriesService';

export default function Wmnewchar({ showNewCharForm, setShowNewCharForm, editMode, editCharacter }) {
  const [characterForm, setCharacterForm] = useState({
    name: '',
    description: '',
    category: '',
    characterImg: null,
    content: '',
    devil_fruit: false,
    powerLevel: 0
  });

  useEffect(() => {
    if (editMode && editCharacter) {
     
      setCharacterForm({
        name: editCharacter.name,
        description: editCharacter.description,
        category: editCharacter.category,
        characterImg: null, // Set or modify as needed
        content: editCharacter.content,
        devil_fruit: editCharacter.devil_fruit,
        powerLevel: editCharacter.powerLevel,
      });

    } else {
      // Reset form fields when not in edit mode
      setCharacterForm({
        name: '',
        description: '',
        category: '',
        characterImg: null,
        content: '',
        devil_fruit: false,
        powerLevel: 0
      });
    }
  }, [editMode, editCharacter]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);


  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
    setCharacterForm({ ...characterForm, [name]: inputValue });
  };
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCharacterForm({ ...characterForm, characterImg: file });
  };

  const btnadd = async () => {
    try {
      await addCharacter(characterForm, characterForm.characterImg);
      console.log('Character added successfully!');
      handleback();

    } catch (error) {
      console.error('Error adding character:', error);
    }
  }

  const handleback = () => {
    setCharacterForm({
      name: '',
      description: '',
      category: '',
      characterImg: null,
      content: '',
      devil_fruit: false,
    });
    setShowNewCharForm(!showNewCharForm);
  }
  const updatechar = async () => {
    try {
      await updateCharacter(editCharacter.id, characterForm);
      console.log('Character updated successfully!');
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };




  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="text-theme-primary">Add New Character</h3>
          <p className="mb-5">You can add your character here</p>
        </div>
      </div>


      <div className="row">
        <div className="col-md-7">
          <div className="card shadow-effect">
            <div className="card-body">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name" value={characterForm.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea cols="30" rows="10" className="form-control" value={characterForm.description} name="description" onChange={handleInputChange}></textarea>
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="form-group">
            <label>Devil Fruit</label> &nbsp;
            <input type="checkbox" className="form-check-input" value={characterForm.devil_fruit} name="devil_fruit" onChange={handleInputChange} checked={characterForm.devil_fruit} />
          </div>
          <div className="form-group">
            <label>Please select a character category</label>
            <select className="form-control" name="category" onChange={handleInputChange} value={characterForm.category}>
              <option value="" disabled>Please select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.categoryData}>
                  {category.categoryData}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Power Level</label>
            <input
              type="text"
              className="form-control"
              name="powerLevel"
              value={characterForm.powerLevel}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Character Image</label>
            <img
              src={(editMode && editCharacter && editCharacter.image_link) || (characterForm.characterImg ? URL.createObjectURL(characterForm.characterImg) : '')}
              className="form-control img-fluid img-preview"
              style={{ width: '450px', height: '200px' }}
              alt=""
            />
            <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>
      </div>

      <div className="row mt-3 mb-5">
        <div className="col-md-12">
          <div className="card shadow-effect">
            <div className="card-body">
              <div className="form-group">
                <label>Content</label>
                {/* Replace <angular-editor> with appropriate React component */}
                <textarea placeholder="Add your content here" className="form-control" value={characterForm.content} name="content" onChange={handleInputChange}></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 text-center mb-5">

          <button onClick={() => (editMode ? updatechar(characterForm.id) : btnadd())} className="btn btn-info bg-theme" disabled={!characterForm.name || !characterForm.description || !characterForm.category || !characterForm.content} >
            {editMode ? 'Save Changes' : 'Add new Character'}
          </button>


          <button onClick={() => { handleback() }} className="btn btn-warning ml-3" >Back to Characters</button>
        </div>
      </div>

    </div>
  );
}
