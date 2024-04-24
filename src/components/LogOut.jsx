import React, { useContext} from 'react'
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';

const LogOut = () => {
    const {logout} = useContext(IsLoggedContext);

    const logOutBtn = async (event) => {
        event.preventDefault();

        const getCookie = (name) => {
          const cookieName = name + "=";
          const decodedCookie = decodeURIComponent(document.cookie);
          const cookieArray = decodedCookie.split(';');
          for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
              cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
              return cookie.substring(cookieName.length, cookie.length);
            }
          }
          return "";
        };
  
        const cookieValue = getCookie('TokenJWT');

        const response = await fetch(`https://9ae0-18-191-97-85.ngrok-free.app/api/sessions/logout?cookie=${cookieValue}`, {
          method: 'POST'
        })
        if(response.ok) {
          const expirationDate = new Date(0);
          const cookieJWT = `TokenJWT=${cookieValue}; expires=${expirationDate.toUTCString()}`;
          document.cookie = cookieJWT;
          logout();
          toast('Gracias por visitar nuestra página', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
          });
        } else {
          toast('Ha ocurrido un error al cerrar sesión', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
      }
    }
  return (
    <>
        <a onClick={logOutBtn} href="" className='logOut'>Cerrar sesión</a>
    </>
  )
}

export default LogOut