// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCta99Y0-_hUBFiNqx05RP9nht4vqEsgX4",
	authDomain: "viva-futbol-arg.firebaseapp.com",
	projectId: "viva-futbol-arg",
	storageBucket: "viva-futbol-arg.appspot.com",
	messagingSenderId: "836521489140",
	appId: "1:836521489140:web:8c47c58aba4a027f9a24a1",
	measurementId: "G-TY1HX8W9CQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
