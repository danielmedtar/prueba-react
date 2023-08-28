import React from 'react';

import DdpView from "../components/DdpView";
import BiView from "../components/BiView";
import PaidView from "../components/PaidView";
import MediosView from "../components/MediosView";

import firebaseApp from '../firebase/credenciales';
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp)

function Home({ user }) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>

    {/* {user.area === "ddp" ? <opcion1 /> : <opcion2 />} */}

    {user.area === "ddp" ? (
        <DdpView />
      ) : user.area === "bi" ? (
        <BiView />
      ) : user.area === "paid" ? (
        <PaidView />
      ) : user.area === "medios" ? (
        <MediosView />
      ) : (
        <a href='/'>Ingresar</a>
      )}
    </div>
  )
}

export default Home