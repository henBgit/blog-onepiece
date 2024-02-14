import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const videosCollection = collection(db, 'videos');

export const getVideos = async () => {
  const videosSnapshot = await getDocs(videosCollection);
  const videos = [];

  videosSnapshot.forEach((doc) => {
    const data = doc.data();
    videos.push({
      id: doc.id,
      ...data,
    });
  });

  return videos;
};

export const uploadVideo = async (title, description, videoFile) => {
  const filePath = `videos/${Date.now()}_${videoFile.name}`;
  

  const storage = getStorage();


  const storageRef = ref(storage, filePath);


  await uploadBytes(storageRef, videoFile);

  const downloadURL = await getDownloadURL(storageRef);

  const videoData = {
    title,
    description,
    filePath,
    videoURL: downloadURL,
    timestamp: Date.now(),
  };

  await addDoc(videosCollection, videoData);

  return downloadURL;
};


export const deleteVideo = async (videoId) => {
  try {

    await deleteDoc(doc(videosCollection, videoId));
  } catch (error) {
    console.error('Error deleting video:', error);
    
    throw error; 
  }
};



export const getVideosByCharacterName = async (characterName) => {
  const q = query(videosCollection, where('title', '==', characterName));
  const videosSnapshot = await getDocs(q);
  const videos = [];

  videosSnapshot.forEach((doc) => {
    const data = doc.data();
    videos.push({
      id: doc.id,
      ...data,
    });
  });

  return videos;
};
