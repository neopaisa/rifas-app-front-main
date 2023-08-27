/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toUpperCaseString } from "../../utilities/strings";
import { formatCurrency } from "../../utilities/strings";
import axios from "axios";
import ModalGastos from "./ModalGastos";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k";

function GastosTable() {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(
    `https://rifa.cybriguard.com/gastos/?rifa_id=1&page=1&page_size=50`
  );
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const json = response.data;
        console.log(json);
        setLoading(false);
        setGastos(json);
        console.log("gastos", gastos);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.detail);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("gastos actualizado:", gastos);
    console.log(itemList);
  }, [gastos]);

  const itemList = gastos.map((item) => {
    if (!loading) {
      return (
        <tr
          className="hover:bg-gray-200 hover:cursor-pointer ra-fade-animation"
          key={item.id}
        >
          <td className="px-6 py-4 font-bold" data-label="descripcion">
            {toUpperCaseString(item.descripcion)}
          </td>
          <td className="px-6 py-4" data-label="Monto">
            {formatCurrency(item.monto)}
          </td>
          <td className="px-6 py-4 bg-gray-100" data-label="Fecha">
            {item.fecha_gasto}
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
        </tr>
      );
    }
  });
  return (
    <div className="bg-gray-300 p-2">
      <ToastContainer />
      <ModalGastos isOpen={showModal} />
      <div className="ra-div-table">
        <table className="ra-main-table shadow">
          <thead className="w-96">
            <tr className="text-left">
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Descripcion
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                monto
              </th>
              <th className="font-semibold text-sm uppercase px-6 py-4">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 xl:w-9/12 sm:w-8/12">
            {itemList}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GastosTable;
