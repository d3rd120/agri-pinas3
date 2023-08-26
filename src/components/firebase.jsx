import { initializeApp } from "firebase/app";
import 'firebase/database';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
   
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDb3krID96DKYoFLdnhzu3zrId2EigC00w",
    authDomain: "agripinas-1883d.firebaseapp.com",
    projectId: "agripinas-1883d",
    storageBucket: "agripinas-1883d.appspot.com",
    messagingSenderId: "1073034058383",
    appId: "1:1073034058383:web:d48fdb15cc1441ee942efa",
    measurementId: "G-DXZDVXVS3T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (fullname, contact, address, birthdate, age, email, role, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "Users"), {
            uid: user.uid,
            fullname,
            contact,
            address,
            birthdate,
            age,
            email,
            role,
            password
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};
const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    uploadImage,
    storage
};
