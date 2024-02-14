import React, { useEffect, useState } from 'react';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../services/CategoriesService';

export default function Wmcateg({backToDashboard }) {

  const [formCategory, setFormCategory] = useState('');
  const [categoryArray, setCategoryArray] = useState([]);
  const [formStatus, setFormStatus] = useState('Add');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getAllCategories();
      setCategoryArray(categories);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory({ categoryData: formCategory });
      setFormCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error handling category addition:', error);

    }
  };

  const handleUpdateCategory = async (categoryId, updatedCategory) => {
    try {
      await updateCategory(selectedCategoryId, { categoryData: formCategory });
      setFormStatus('Add');
      setFormCategory('');
      setSelectedCategoryId('');
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }

  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category, categoryId) => {
    setFormStatus('Edit');
    setFormCategory(category.categoryData);
    setSelectedCategoryId(categoryId);
  };

  const onDelete = async (categoryId) => {
    const confirmation = window.confirm('Are you sure you want to delete this category?');
    if (confirmation) {
      try {
        await handleDeleteCategory(categoryId);
     
      } catch (error) {
        console.error('Error deleting category:', error);
    
      }
    }
  };


  const handleBack = () => {
    
    backToDashboard(); 
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-secondary-theme p-5 shadow-effect">
            <h3 className="text-center text-theme-primary">{formStatus} New Categories</h3>
            <p className="text-center md-5">You can add new categories from here..!</p>
            <div className="form-inline text-center" >
              <div className="from-group col-md-10">
                <input
                  type="text"
                  name="category"
                  className="form-control shadow-effect"
                  placeholder="Add New Categories"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}

                />
                {formCategory.trim() === '' && (
                  <div className="alert alert-danger">Category field is required</div>
                )}
              </div>
              <div className="col-md-2">
                {formStatus === 'Add' ? (
                  <button onClick={handleAddCategory} className="btn btn-block btn-info mb-2 btn-theme">
                    Add Category
                  </button>
                ) : (
                  <button onClick={handleUpdateCategory} className="btn btn-block btn-info mb-2 btn-theme">
                    Update Category
                  </button>
                )}
                <button className="btn btn-warning ml-2" onClick={handleBack}>
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card shadow-effect">
              <div className="card-body">
                <table className="table row-border hover">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryArray.map((category, index) => (
                      <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>{category.categoryData}</td> {/* Access category directly */}
                        <td>
                          <button className="btn btn-sm btn-warning" onClick={() => handleEdit(category, category.id)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger ml-2" onClick={() => onDelete(category.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
