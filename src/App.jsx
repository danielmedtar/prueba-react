import React, { useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)


function App() {
  const [user, setUser] = useState(null)

  async function getArea(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`)
    const docuCifrada = await getDoc(docuRef)
    const infoFinal = docuCifrada.data().area
    return infoFinal
  }

  function setUserwithFirebaseAndArea(usuarioFirebase) {
    getArea(usuarioFirebase.uid).then((area) => {
          const userData = {
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email,
          area: area
        }
        setUser(userData);
        console.log("userdata final", userData);
      })
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase) {
      if(!user) {
        setUserwithFirebaseAndArea(usuarioFirebase)
      }
    } else {
      setUser(null)
    }
  })

  return <> {user ? <Home user={user} /> : <Login/>}</>
}

export default App;