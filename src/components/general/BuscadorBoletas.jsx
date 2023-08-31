import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../api/api";

function BuscadorBoletas() {
    const [boletaInd, setBoletaInd] = useState(0);
    const [boletaEstado, setBoletaEstado] = useState("");
    const urlBoleta = `${API_URL}boletas/general/`;
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
  return <div>
    <div className="ra-buscarboleta-box rounded shadow">
        <p className="font-bold text-gray-600 text-lg">Buscar boletas</p>
        <input
          min="0"
          type="number"
          placeholder="Buscar boleta"
          value={boletaInd}
          onChange={(e) => setBoletaInd(e.target.value)}
        />
        <p className="text-gray-500 mr-2 my-2"> Estado:  <strong className={boletaEstado.estado == "disponible"? "bg-green-600 text-white font-bold uppercase p-1 rounded text-xs": "bg-orange-600 text-white font-bold uppercase p-1 rounded-lg text-xs"}>{boletaEstado.estado}</strong></p>
      </div>
  </div>;
}

export default BuscadorBoletas;
