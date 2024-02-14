import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';

const getOnePieceLogo = async () => {
  try {
    const logosRef = ref(storage, 'Logos/One-Piece-Logo.png');
    const downloadURL = await getDownloadURL(logosRef);
    return downloadURL;
  } catch (error) {
    console.error('Error getting One Piece logo:', error);
    return null;
  }
};

export { getOnePieceLogo };
