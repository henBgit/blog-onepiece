import { getAllCharacters } from './CharctersServices.js';
import { getAllCategories } from './CategoriesService.js';


const fetchCategories = async () => {
    let titles = [];
  
    try {
      const categoriesData = await getAllCategories();
      let index = 1;
      
      categoriesData.map((category) => {
        const newTitle = {
          id: index,
          title: category.categoryData,
          content: [],
        };
        index++;
        titles.push(newTitle);
      });
  
   
      return titles;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

const sortChartersBaseOnTitle = async (titles) => {
    const allChars = await getAllCharacters();

    titles.forEach((article) => {
        const charsForTitle = allChars.filter((char) => article.title === char.category);

        article.content = charsForTitle.map((char) => ({
            name: char.name,
            data: char.description,
            image:char.image_link
        }));
    });
    return titles;
};




export { fetchCategories ,sortChartersBaseOnTitle };


