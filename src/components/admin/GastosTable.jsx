import React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcnVlYmFSb290IiwiZXhwIjozMjY1MDkzODkxfQ.nERn4p8tZp0Es6asf-jJpySxz2-LZuRA8-m8p0kUY5k";

function GastosTable() {
  const [url, setUrl] = useState(
    `https://rifa.cybriguard.com/gastos/?rifa_id=1`
  );
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setGastos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.detail);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <ToastContainer />
      gastosss
    </div>
  );
}

export default GastosTable;
