/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import { API_URL } from "../../api/api";
import {
  BackButton,
  NextButton,
} from "../atoms/PaginationButtons/PaginationButtons";

function BoletasDisponiblesTable() {
  const [allBoletas, setAllBoletas] = useState([{ numero: 1 }]);
  const [page, setPage] = useState(1);
  const [boletaInd, setBoletaInd] = useState(0);
  const [boletaEstado, setBoletaEstado] = useState("");
  const url = `${API_URL}boletas/disponibles?rifa_id=1&page=${page}&page_size=25`;
  const urlBoleta = `${API_URL}boletas/general/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setAllBoletas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlBoleta + boletaInd);
        console.log(response.data);
        setBoletaEstado(response.data[0]);
        console.log("BOLETA ESTADOO,", boletaEstado);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [boletaInd]);

  function nextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function backPage() {
    setPage((prevPage) => prevPage - 1);
  }

  return (
    <div className="ra-boletasgeneral-container bg-gray-300">
      <div className="ra-buscarboleta-box rounded shadow">
        <p className="font-bold text-gray-600 text-lg">Buscar boletas</p>
        <input
          min="0"
          type="number"
          placeholder="Buscar boleta"
          value={boletaInd}
          onChange={(e) => setBoletaInd(e.target.value)}
        />
        <p className="text-gray-500 mr-2 my-2"> Estado:  <strong className={boletaEstado.estado == "disponible"? "bg-green-600 text-white font-bold uppercase p-1 rounded": "bg-orange-600 text-white font-bold uppercase p-1 rounded-lg"}>{boletaEstado.estado}</strong></p>
      </div>
      <div className="flex justify-center flex-col mx-5">
        <div className="d-flex mx-5 my-2">
          <BackButton e={backPage} page={page} />
          <input
            type="number"
            placeholder="Página"
            min="1"
            className="ra-number-input"
            onChange={(event) => setPage(event.target.value)}
            value={page}
          />
          <NextButton e={nextPage} page={page} />
        </div>

        <table className="ra-main-table shadow bg-white">
          <thead>
            <tr>
              <th className="font-semibold text-sm uppercase px-6 py-3">
                Numero
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-3">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {allBoletas.map((item, index) => (
              <tr key={index}>
                <td className="font-semibold text-sm uppercase px-6 py-2 text-center">
                  {item.numero.toString().padStart(4, "0")}
                </td>
                <td
                  className={
                    item.estado == "disponible"
                      ? "ra-disponible uppercase text-sm text-white font-semibold text-center"
                      : ""
                  }
                >
                  {item.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BoletasDisponiblesTable;
