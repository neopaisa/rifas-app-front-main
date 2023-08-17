import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendedoresTable = () => {
  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rifa.cybriguard.com/vendedor/obtener');
        setVendedores(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8 shadow-md bg-white">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            {/* Agrega más encabezados según la estructura de datos de la API */}
          </tr>
        </thead>
        <tbody>
          {vendedores.map((vendedor) => (
            <tr key={vendedor.index} className="border-t">
              <td className="px-4 py-2">{vendedor.index}</td>
              <td className="px-4 py-2">{vendedor.username}</td>
              {/* Agrega más celdas según la estructura de datos de la API */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendedoresTable;
