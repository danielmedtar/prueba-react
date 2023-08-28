import React, { useState } from 'react';
import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"

const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, area) {
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password, area);
    console.log(infoUsuario.user.uid);

    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, area: area });
  }

  async function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (isRegistrando) {
      const area = e.target.elements.area.value;
      try {
        await registrarUsuario(email, password, area);
      } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert("El usuario ya existe")
        } else if(error.code === 'auth/invalid-email') {
          alert("Email inválido", "error")
        } else if(error.code === 'auth/weak-password') {
            alert("La contraseña debe tener al menos 6 caracteres", "error")
        } else if(error.code) {
            alert("Algo ha salido mal", "error")
            console.log(error.message);
        }
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if(error.code === 'auth/wrong-password') {
          alert("Contraseña incorrecta. Por favor, intenta nuevamente.");
        } else if (error.code === 'auth/user-not-found') {
          alert("Usuario inexistente")
        } else {
          alert('Algo salio mal, intente mas tarde');
        }
      }
    }
  }

  return (
    <div>
      <h1>{isRegistrando ? "Regístrate" : "Inicia Sesión"}</h1>

      <form onSubmit={submitHandler}>
        <label>Correo Electrónico</label>
        <input type='email' id='email' />

        <label>Contraseña</label>
        <input type='password' id='password' />

        {isRegistrando && (
          <div>
            <label>Área</label>
            <select id='area'>
              <option value="ddp">DDP</option>
              <option value="bi">BI</option>
              <option value="medios">Medios</option>
              <option value="paid">Paid Media</option>
            </select>
          </div>
        )}

        <input className='iniciar' type='submit' value={isRegistrando ? "Registrarse" : "Inicia sesión"} />
      </form>

      <button className='boton' onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;
