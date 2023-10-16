import { initializeApp } from "firebase/app";
import 'firebase/database';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore,
    doc,
    setDoc,
    getDoc,

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
  let retries = 0;

  const backoff = (retries) => new Promise(resolve => setTimeout(resolve, 2 ** retries * 1000));

  const attemptRegistration = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // Send a verification email to the registered user
      await sendEmailVerification(user);

      // Create a user document in Firestore
      const userDocRef = doc(db, "Users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        fullname,
        contact,
        address,
        birthdate,
        age,
        email,
        role,
      });

      alert("Registration successful! A verification email has been sent to your email address. Please verify your email to log in.");
    } catch (err) {
      console.error(err);

      // Display a more specific error message to help identify the issue
      if (err.code === "auth/email-already-in-use") {
        alert("Registration failed. The email address is already in use.");
      } else if (err.code === "auth/weak-password") {
        alert("Registration failed. The password is too weak.");
      } else if (err.code === "auth/too-many-requests" && retries < 5) {
        // Retry with backoff
        await backoff(retries);
        retries++;
        return attemptRegistration(); // Retry registration
      } else {
        alert(`Registration failed. ${err.message}`);
      }
    }
  };

  // Initial attempt
  await attemptRegistration();
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

  const storePostInDatabase = async (postDetails) => {
    try {
      const postsCollection = collection(db, "CommunityForum");
      await addDoc(postsCollection, postDetails);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const Cart = async (product) => {
    try {
      // Check if the user is authenticated
      const user = auth.currentUser;
      if (!user) {
        // You might want to handle this differently based on your application's requirements
        alert("Please log in to add items to your cart.");
        return;
      }
  
      // Create a reference to the user's cart in the Firestore database
      const userCartRef = doc(db, 'Carts', user.uid);
  
      // Get the current cart data
      const userCartSnapshot = await getDoc(userCartRef);
      const currentCart = userCartSnapshot.exists() ? userCartSnapshot.data().cart : [];
  
      // Check if the product is already in the cart
      const existingItemIndex = currentCart.findIndex((item) => item.productId === product.productId);
  
      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // If the product is not in the cart, add it
        currentCart.push({ ...product, quantity: 1 });
      }
  
      // Update the cart in the database
      await setDoc(userCartRef, { cart: currentCart });
  
      // Notify the user that the item has been added to the cart
      alert(`${product.cropName} added to your cart!`);
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the item to your cart. Please try again.");
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
    storage,
    storePostInDatabase,
    Cart,
};
