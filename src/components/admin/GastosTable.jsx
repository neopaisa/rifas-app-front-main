/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { toUpperCaseString } from "../../utilities/strings";
import { formatCurrency } from "../../utilities/strings";
import axios from "axios";
import ModalGastos from "./ModalGastos";
import { API_URL } from "../../api/api";
import { useSelector } from "react-redux/es/hooks/useSelector";


function GastosTable() {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(
    `${API_URL}gastos/?rifa_id=1&page=1&page_size=50`
  );
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [needsRefetch, setNeedsRefetch] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log("Recargando la lista de gastos...");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const json = response.data;
      setLoading(false);
      setGastos(json);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.detail);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  // }, [gastos]);

  useEffect(() => {
    if (needsRefetch) {
        fetchData();
        setNeedsRefetch(false);
    }
}, [needsRefetch]);  

const handleClose = () => {   
  // setIsOpen(false);
  setNeedsRefetch(true);
  setShow(false);
};

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
      <ModalGastos isOpen={showModal} handleClose={handleClose}/>
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
