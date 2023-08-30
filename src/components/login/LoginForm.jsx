/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Importa useSelector y useDispatch
import { Navigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../../features/login/userData";
import logoM from "../../assets/logo/logoM.png";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../../api/api";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

function LoginForm() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Rifas App - Ingresar";
  }, []);

  const dispatch = useDispatch(); // Agrega useDispatch

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}usuarios/login`,
        {
          username: username,
          password: password,
        }
      );

      // Despachar la acción para actualizar el estado del usuario
      dispatch(setUserData(response.data));
      console.log(response.data);
      toast.success("Bien");
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      toast.error("Datos Incorrectos");
    }
  };

  /* const user = useSelector((state) => state.user.value); // Acceder al estado del usuario

  console.log('Información del usuario:', user); // Imprimir información del usuario en la consola */

  if (loggedIn) {
    return <Navigate to="/admin" />;
  }
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logoM} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usuario
              </label>
              <div className="mt-2">
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  id="user"
                  name="user"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full  py-1.5 px-2 ra-input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  {/* <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a> */}
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full  py-1.5 px-2  ra-input"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Ingresar
              </button>
            </div>
          </form>

          {/*  <p className="mt-10 text-center text-sm text-gray-500">
            ¿No eres meimbro?-
            <a
              href="#"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Regístrate
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}

export default LoginForm;
