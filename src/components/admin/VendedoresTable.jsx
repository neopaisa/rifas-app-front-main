import React, { useEffect, useState } from "react";
import axios from "axios";

const VendedoresTable = () => {
  const [vendedores, setVendedores] = useState([]);
  const [vendedorName, setVendedorName] = useState("");
  const [vendedorInfo, setVendedorInfo] = useState({});
  const [vendedorBoletas, setVendedorBoletas] = useState([]);

  const url = "https://rifa.cybriguard.com/vendedor/obtener";
  const vendedorURL = "https://rifa.cybriguard.com/vendedor/informacion/";
  const vendedorBoletasURL = "https://rifa.cybriguard.com/vendedor/boletas/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k`,
          },
        });
        setVendedores(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(vendedorBoletasURL + vendedorName, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k`,
          },
        });
        setVendedorBoletas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [vendedorName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(vendedorURL + vendedorName, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k`,
          },
        });
        setVendedorInfo(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [vendedorName]);
  return (
    <div className="flex">
      <div className=" bg-white shadow w-1/4 mx-2 rounded">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-1">Lista de Vendedores</th>
              {/* Agrega más encabezados según la estructura de datos de la API */}
            </tr>
          </thead>
          <tbody>
            {vendedores.map((vendedor) => (
              <tr key={vendedor.index} className="border-t">
                <td
                  className="px-4 py-1 cursor-pointer"
                  onClick={() => setVendedorName(vendedor.username)}
                >
                  {vendedor.username}
                </td>
                {/* Agrega más celdas según la estructura de datos de la API */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-3 rounded shadow mx-2">
        <p>USUARIO: </p>
        <h6>{vendedorInfo.username}</h6>
        <p>{vendedorInfo.cedula}</p>
        <p>{vendedorInfo.ciudad}</p>
        <p>{vendedorInfo.telefono}</p>
      </div>
      <div className="bg-white p-1 rounded shadow">
  <table style={{ fontSize: '10px' }}>
    <thead>
      <tr>
        <th className="px-1 py-0">Numero</th>
        <th className="px-1 py-0">Estado</th>
        <th className="px-1 py-0">Usuario</th>
        <th className="px-1 py-0">Teléfono</th>
        <th className="px-1 py-0">Dirección</th>
        <th className="px-1 py-0">Precio</th>
        <th className="px-1 py-0">Acumulado</th>
        <th className="px-1 py-0">Valor Pendiente</th>
        <th className="px-1 py-0">Comisión</th>
      </tr>
    </thead>
    <tbody>
      {vendedorBoletas.map((boleta) => (
        <tr key={boleta.numero} className="border-t">
          <td className="px-1 py-0 cursor-pointer">{boleta.numero}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.estado}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.usuario}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.telefono}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.direccion}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.precio}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.acumulado}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.valor_pendiente}</td>
          <td className="px-1 py-0 cursor-pointer">{boleta.comision}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default VendedoresTable;
