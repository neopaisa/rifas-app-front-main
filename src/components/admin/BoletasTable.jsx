/* eslint-disable no-async-promise-executor */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  NextButton,
  BackButton,
} from "../atoms/PaginationButtons/PaginationButtons";
import LoadingSpinner from "../atoms/PaginationButtons/LoadingSpinner";
import axios from "axios";
import ModalComponent from "./ModalComponent";
import { toUpperCaseString, formatCurrency } from "../../utilities/strings";
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../api/api";
function BoletasTable() {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [valorPendiente, setValorPendiente] = useState(0);
  const [page, setPage] = useState(1);
  const [allBoletas, setAllBoletas] = useState([]);
  const [loading, setLoading] = useState("");
  const [url, setUrl] = useState(
    `${API_URL}boletas/?rifa_id=1&page=1&page_size=800`
  );
  //  MODAL FUCTIONS
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (
    numeroBoleta,
    nombreUsuario,
    direccionUsuario,
    telefonoUsuario,
    valorPendiente
  ) => {
    setValue(numeroBoleta);
    setUser(nombreUsuario);
    setAdress(direccionUsuario);
    setPhone(telefonoUsuario);
    setValorPendiente(valorPendiente);
    setIsOpen(true);
  };
  const handleClose = () => {
    setLoading(true); // Start loading state
    // Introduce a delay of 3 seconds (3000 milliseconds) before fetching data
    setTimeout(() => {
      fetchData(); // Fetch data to update with the latest changes
       // End loading state
       setLoading(false);
    }, 2000);
    setIsOpen(false);
    
  };

  //API GET
  const fetchData = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setAllBoletas(response.data);
        resolve(response.data);
        //console.log(response.data)
      } catch (error) {
        console.error(error);
        reject(error.response?.data?.detail || "An error occurred");
      }
    });
  };

  useEffect(() => {
    toast.promise(
      fetchData(),
      {
        pending: "Cargando...",
        success: " ",
        error: "Error",
      },
      {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [url]);
  //PAGINATION
  function nextPage() {
    setPage((prevPage) => prevPage + 1);
    setUrl(
      `${API_URL}boletas/?rifa_id=1&page=${parseInt(page) + 1}&page_size=800`
    );
  }

  function backPage() {
    setPage((prevPage) => prevPage - 1);
    setUrl(
      `${API_URL}boletas/?rifa_id=1&page=${parseInt(page) - 1}page_size=800`
    );
  }

  function searchPage(value) {
    setPage(value);
    setUrl(`${API_URL}boletas/?rifa_id=1&page=${value}&page_size=800`);
  }

  function searchBoleta(value) {
    setUrl(`${API_URL}boletas/${value}`);
  }
  const itemList = allBoletas.map((item) => {
    if (!loading) {
      return (
        <tr className="ra-fade-animation" key={item.numero}>
          <td
            className="px-6 py-1 ra-number-container bg-gray-100"
            data-label="Número"
          >
            {item.numero.toString().padStart(4, "0")}
          </td>
          <td
            className={"px-6 py-1 text-white font-bold " + "ra-" + item.estado}
            data-label="Estado"
          >
            {toUpperCaseString(item.estado)}
          </td>
          <td className="px-6 py-1 bg-gray-100" data-label="Acumulado">
            {formatCurrency(item.acumulado)}
          </td>
          <td className="px-6 py-1" data-label="Usuario">
            {item.usuario}
          </td>
          <td className="px-6 py-1" data-label="Usuario">
            {item.usuario_vendedor}
          </td>
          <td className="px-6 py-1 bg-gray-100" data-label="Valor Pendiente">
            {formatCurrency(item.valor_pendiente)}
          </td>
          {/* <td className="px-6 py-1" data-label="Editar">
            <button
              className="px-2 py-1 text-gray-500 text-lg"
              onClick={() =>
                handleOpen(
                  item.numero,
                  item.usuario,
                  item.direccion,
                  item.telefono,
                  item.valor_pendiente
                )
              }
            >
              <AiFillEdit />
            </button>
          </td> */}
        </tr>
      );
    } else {
      return (
        <tr className="text-white" key={item.numero}>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
        </tr>
      );
    }
  });

  return (
    <div className="ra-boletastable-container">
      <ToastContainer />
      <ModalComponent
        isOpen={isOpen}
        handleClose={handleClose}
        value={value}
        user={user}
        adress={adress}
        phone={phone}
        valorPendiente={valorPendiente}
      />
      <div className="ra-pagination-container flex justify-center">
        <div className="m-1 flex justify-center items-center">
          <span className="mx-2 font-bold text-gray-500">
            {" "}
            Buscar por número:
          </span>
          <input
            type="number"
            placeholder="Boleta"
            className="ra-number-input"
            min="1"
            max="9999"
            onChange={(event) => searchBoleta(event.target.value)}
          />
          {/* <input
            type="text"
            placeholder="buscar boleta"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <span className="mx-2 font-bold text-gray-500">
          {" "}
          Buscar por página:
        </span>
        <div className="d-flex mx-2">
          {/* <BackButton e={backPage} page={page} /> */}
          <div className=" text-gray-800">
            <input
              type="number"
              placeholder="Página"
              min="1"
              max="100"
              className="ra-number-input2 rounded"
              onChange={(event) => searchPage(event.target.value)}
              value={page}
            />
          </div>
          {/* <NextButton e={nextPage} page={page} /> */}
        </div>
      </div>
      <div className="ra-div-table rounded">
        <table
          className="ra-main-table shadow rounded font-size"
          style={{ fontSize: "12px" }}
        >
          <thead className="rounded">
            <tr className="text-left">
              <th className="font-semibold text-sm uppercase px-6 py-1">
                Número
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-1">
                Estado
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-1">
                Abonado
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-1">
                Usuario
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-1">
                Vendedor
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-1">
                Valor pendiente
              </th>
              {/* <th className="font-semibold text-sm uppercase px-6 py-1">
                Editar
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 xl:w-9/12 sm:w-8/12">
            {itemList}
          </tbody>
        </table>
      </div>
      <div className="d-flex mx-5">
        <BackButton e={backPage} page={page} />
        <div className=" text-gray-800 font-semibold py-1 px-4 w-5 flex justify-center h-12 aling-center">
          {!loading ? page : <LoadingSpinner />}
        </div>
        <NextButton e={nextPage} />
      </div>
    </div>
  );
}

export default BoletasTable;
