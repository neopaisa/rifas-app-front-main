import React, { useEffect, useState } from "react";
import {
  NextButton,
  BackButton,
} from "../atoms/PaginationButtons/PaginationButtons";
import LoadingSpinner from "../atoms/PaginationButtons/LoadingSpinner";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import ModalComponent from "./ModalComponent";
import { toUpperCaseString, formatCurrency } from "../../utilities/strings";
import { toast, ToastContainer } from "react-toastify";
function BoletasTable() {
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [valorPendiente, setValorPendiente] = useState(0);
  const [page, setPage] = useState(1);
  const [allBoletas, setAllBoletas] = useState([]);
  const [loading, setLoading] = useState("");
  const [url, setUrl] = useState(
    "https://rifa.cybriguard.com/boletas/?rifa_id=1&page=1&page_size=100"
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
    setIsOpen(false);
  };

  //API GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k`,
          },
        });
        setAllBoletas(response.data);
        setLoading(false);
        console.log(allBoletas);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.detail);
      }
    };

    fetchData();
  }, [url, isOpen]);
  //PAGINATION
  function nextPage() {
    setPage((prevPage) => prevPage + 1);
    setUrl(
      "https://rifa.cybriguard.com/boletas/?rifa_id=1&page=" +
        (parseInt(page) + 1) +
        "&page_size=100"
    );
  }

  function backPage() {
    setPage((prevPage) => prevPage - 1);
    setUrl(
      "https://rifa.cybriguard.com/boletas/?rifa_id=1&page=" +
        (parseInt(page) - 1) +
        "&page_size=100"
    );
  }

  function searchPage(value) {
    setPage(value);
    setUrl(
      "https://rifa.cybriguard.com/boletas/?rifa_id=1&page=" +
        value +
        "&page_size=100"
    );
  }

  function searchBoleta(value) {
    setUrl("https://rifa.cybriguard.com/boletas/" + value);
  }
  const itemList = allBoletas.map((item) => {
    if (!loading) {
      return (
        <tr
          className="hover:bg-gray-200 hover:cursor-pointer ra-fade-animation"
          key={item.numero}
        >
          <td
            className="px-6 py-4 ra-number-container bg-gray-100"
            data-label="Número"
          >
            {item.numero.toString().padStart(4, "0")}
          </td>
          <td
            className={"px-6 py-4 text-white font-bold " + "ra-" + item.estado}
            data-label="Estado"
          >
            {toUpperCaseString(item.estado)}
          </td>
          <td className="px-6 py-4" data-label="Precio">
            {formatCurrency(item.precio)}
          </td>
          <td className="px-6 py-4 bg-gray-100" data-label="Acumulado">
            {formatCurrency(item.acumulado)}
          </td>
          <td className="px-6 py-4" data-label="Usuario">
            {item.usuario}
          </td>
          <td className="px-6 py-4 bg-gray-100" data-label="Valor Pendiente">
            {formatCurrency(item.valor_pendiente)}
          </td>
          <td className="px-6 py-4" data-label="Editar">
            <button
              className="px-2 py-2 text-gray-500 text-lg"
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
          </td>
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
      <div className="ra-pagination-container">
        <div className="m-1">
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
        <div className="d-flex mx-5">
          <BackButton e={backPage} page={page} />
          <div className=" text-gray-800">
            <input
              type="number"
              placeholder="Página"
              min="1"
              max="100"
              className="ra-number-input"
              onChange={(event) => searchPage(event.target.value)}
              value={page}
            />
          </div>
          <NextButton e={nextPage} page={page} />
        </div>
      </div>
      <div className="ra-div-table">
        <table className="ra-main-table shadow">
          <thead className="">
            <tr className="text-left">
              <th className="font-semibold text-sm uppercase px-6 py-">
                Número
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Estado
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Precio
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Abonado
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Usuario
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Valor pendiente
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Editar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 xl:w-9/12 sm:w-8/12">
            {itemList}
          </tbody>
        </table>
      </div>
      <div className="d-flex mx-5">
        <BackButton e={backPage} page={page} />
        <div className=" text-gray-800 font-semibold py-2 px-4 w-5 flex justify-center h-12 aling-center">
          {!loading ? page : <LoadingSpinner />}
        </div>
        <NextButton e={nextPage} />
      </div>
    </div>
  );
}

export default BoletasTable;
