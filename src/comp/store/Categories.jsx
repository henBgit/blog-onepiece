import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/CategoriesService';



export default function Categories({ setSelectedCategory, selectedCategory }) {
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



  const onSelectCategory = async (category) => {
    setSelectedCategory(category);

  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
    {categories.map((category, index) => (
      <li className="nav-item active" key={category.id}>
        <span
          className="nav-link category-link"
          id={category.id}
          style={{ color: "#FFFFFF", fontWeight: "700", marginBottom: "20px" }}
        >
          <button className="category-button" onClick={() => onSelectCategory(category.categoryData)}> {category.categoryData} </button>
        </span>
      </li>
    ))}
    <div className="nav-item active" style={{ marginBottom: "20px" }}>
      <span className="nav-link category-link">
        <button  className="category-button"  onClick={() => onSelectCategory(null)}> All </button>
      </span>
    </div>
  </div>
  );
}
