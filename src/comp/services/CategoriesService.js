import {db}  from '../../lib/firebase.js'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';




const getAllCategories = async () => {
    const categoriesCollection = collection(db, 'categories');
    const snapshot = await getDocs(categoriesCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };


  const addCategory = async (categoryData) => {
    try {
      const categoriesCollection = collection(db, 'categories');
      await addDoc(categoriesCollection, categoryData);
      console.log('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };
  

  const updateCategory = async (categoryId, updatedData) => {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, updatedData);
  };
  

  const deleteCategory = async (categoryId) => {
    const categoryRef = doc(db, 'categories', categoryId);
    await deleteDoc(categoryRef);
  };




export { getAllCategories, addCategory, updateCategory, deleteCategory };
