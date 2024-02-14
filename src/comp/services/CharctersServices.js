
import { db } from '../../lib/firebase.js'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';

const charactersCollection = collection(db, 'characters'); // Ensure you have db defined and connected to Firestore


const addCharacter = async (characterData, imageFile) => {
  try {
    const { name, description, category, content, devil_fruit,powerLevel } = characterData;

    const createdAt = new Date();
    const comments = [];

    const characterDocRef = await addDoc(charactersCollection, {
      name,
      description,
      category,
      content,
      devil_fruit,
      image_link: "", 
      powerLevel,
      createdAt,
      comments,
    });

    const imageStorageRef = ref(storage, `charactersPic/${characterDocRef.id}`);
    await uploadBytes(imageStorageRef, imageFile);
    const imageUrl = await getDownloadURL(imageStorageRef);

    await updateDoc(characterDocRef, { image_link: imageUrl });

  } catch (error) {
    throw new Error('Error adding character: ' + error);
  }
};


const updateCharacter = async (characterId, updatedData) => {
  try {
    const characterRef = doc(charactersCollection, characterId);
    await updateDoc(characterRef, updatedData);
  } catch (error) {
    throw new Error('Error updating character: ' + error);
  }
};

// Delete a character
const deleteCharacter = async (characterId) => {
  try {
    const characterRef = doc(charactersCollection, characterId);
    await deleteDoc(characterRef);
  } catch (error) {
    throw new Error('Error deleting character: ' + error);
  }
};

// Get all characters 
const getAllCharacters = async () => {
  try {
    const querySnapshot = await getDocs(charactersCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error('Error getting all characters: ' + error);
  }
};

// Get character by ID
const getCharacterById = async (characterId) => {
  try {
    const characterRef = doc(charactersCollection, characterId);
    const docSnap = await getDoc(characterRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    throw new Error('Error getting character by ID: ' + error);
  }
};


const sortCharactersByCategory =async ( category) => {
  const querySnapshot = await getDocs(charactersCollection);
 const  characters =  querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const filteredCharacters = characters.filter(character => character.category === category);
  return filteredCharacters;
};


const addCommentToCharacter = async (characterId, comment) => {
  try {
    const characterRef = doc(charactersCollection, characterId);

    const characterData = await getDoc(characterRef);
    const existingComments = characterData.data().comments || [];
   
    const updatedComments = [...existingComments, comment];

    await updateDoc(characterRef, { comments: updatedComments });
  } catch (error) {
    throw new Error('Error adding comment to character: ' + error);
  }
};



export { addCommentToCharacter,addCharacter, updateCharacter, deleteCharacter, getAllCharacters, getCharacterById, sortCharactersByCategory };
