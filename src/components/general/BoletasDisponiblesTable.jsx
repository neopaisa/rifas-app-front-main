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
import BuscadorBoletas from "./BuscadorBoletas";

function BoletasDisponiblesTable() {
  const [allBoletas, setAllBoletas] = useState([{ numero: 1 }]);
  const [page, setPage] = useState(1);

  const url = `${API_URL}boletas/disponibles?rifa_id=1&page=${page}&page_size=1000`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setAllBoletas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  

  function nextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function backPage() {
    setPage((prevPage) => prevPage - 1);
  }
 
  return (
    <div className="ra-boletasgeneral-container bg-gray-300">
      <div className="flex flex-col mx-5">
        <BuscadorBoletas/>
        <div className="flex justify-center flex-col mx-5">
          {/* <div className="d-flex mx-5 my-2">
            <BackButton e={backPage} page={page} />
            <label htmlFor="pageInput">Página:</label>
            <input
              type="number"
              id="pageInput"
              placeholder="1"
              min="1"
              className="ra-number-input"
              onChange={(event) => setPage(event.target.value)}
              value={page}
            />
            <NextButton e={nextPage} page={page} />
          </div> */}
          <div style={{ display: 'flex' }}>
              {/* Primera tabla */}
            <table className="ra-main-table shadow bg-white" style={{ fontSize: '10px' }}>
              <thead>
                <tr>
                  <th className="font-semibold text-sm uppercase px-2 py-2">
                    Numero
                  </th>
                  <th className="font-semibold text-sm uppercase px-2 py-2">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {allBoletas.slice(0, allBoletas.length / 2).map((item, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-sm uppercase px-2 py-2 text-center">
                      {item.numero.toString().padStart(4, "0")}
                    </td>
                    <td
                      className={
                        item.estado === "disponible"
                          ? "ra-disponible uppercase text-xs text-white font-semibold text-center"
                          : ""
                      }
                    >
                      {item.estado}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Agregar espacio entre las tablas */}
            <div style={{ margin: '10px' }}></div>

            {/* Segunda tabla */}
            <table className="ra-main-table shadow bg-white" style={{ fontSize: '5px', marginBottom: '5px' }}>
              <thead>
                <tr>
                  <th className="font-semibold text-sm uppercase px-2 py-2">
                    Numero
                  </th>
                  <th className="font-semibold text-sm uppercase px-2 py-2">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {allBoletas.slice(allBoletas.length / 2).map((item, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-sm uppercase px-2 py-2 text-center">
                      {item.numero.toString().padStart(4, "0")}
                    </td>
                    <td
                      className={
                        item.estado === "disponible"
                          ? "ra-disponible uppercase text-xs text-white font-semibold text-center"
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
      </div>
    </div>
  );
}

export default BoletasDisponiblesTable;
