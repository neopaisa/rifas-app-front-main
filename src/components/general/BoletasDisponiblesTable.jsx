/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import {
  BackButton,
  NextButton,
} from "../atoms/PaginationButtons/PaginationButtons";

function BoletasDisponiblesTable() {
  const [allBoletas, setAllBoletas] = useState([{ numero: 1 }]);
  const [page, setPage] = useState(1);
  const url = `https://rifa.cybriguard.com/boletas/disponibles?rifa_id=1&page=${page}&page_size=25`;

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

  function nextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function backPage() {
    setPage((prevPage) => prevPage - 1);
  }

  return (
    <div className="ra-boletasgeneral-container">
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

      <table className="ra-main-table shadow">
        <thead>
          <tr>
            <th className="font-semibold text-sm uppercase px-6 py-3">Numero</th>
            <th className="font-semibold text-sm uppercase px-6 py-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {allBoletas.map((item, index) => (
            <tr key={index}>
              <td className="font-semibold text-sm uppercase px-6 py-2 text-center">
                {item.numero.toString().padStart(4, '0')}
              </td>
              <td className={item.estado == 'disponible'? 'ra-disponible uppercase text-sm text-white font-semibold text-center': '' } >{item.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoletasDisponiblesTable;
