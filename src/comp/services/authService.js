import {auth}  from '../../lib/firebase.js'
import { signInWithEmailAndPassword , createUserWithEmailAndPassword , sendPasswordResetEmail} from 'firebase/auth';

const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      return userCredential.user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      return userCredential.user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);

      return "Password reset email sent successfully";
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  export { forgotPassword , login , register};

