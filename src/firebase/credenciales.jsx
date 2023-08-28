// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyCEQXpCWTwPEqeVvEfEy7LmAkcyaZvHXKI",
    authDomain: "auth-react-adba8.firebaseapp.com",
    projectId: "auth-react-adba8",
    storageBucket: "auth-react-adba8.appspot.com",
    messagingSenderId: "731615452857",
    appId: "1:731615452857:web:b286fd669d4f1dbe408568"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;