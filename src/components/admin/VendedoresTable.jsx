import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../utilities/strings";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ModalVendedores from "./ModalVendedores";
import "./index.scss";
import { AiFillPhone } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toUpperCaseString } from "../../utilities/strings";
import EditarVendedorComponent from "./EditarVendedorComponent";
import AsociarBoletaComponent from "./AsociarBoletaComponent";
import { API_URL } from "../../api/api";
import EliminarBoletaComponent from "./EliminarBoletaComponent";
import EliminarVendedorComponent from "./EliminarVendedorComponent";

const VendedoresTable = () => {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [vendedores, setVendedores] = useState([]);
  const [vendedorName, setVendedorName] = useState("");
  const [vendedorInfo, setVendedorInfo] = useState({});
  const [vendedorBoletas, setVendedorBoletas] = useState([]);
  const [boleta, setBoleta] = useState("")
  //const [vendedorComision, setVendedorComision] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [valorPendiente, setValorPendiente] = useState(0);

  const url = `${API_URL}ven/obtener`;
  const vendedorURL = `${API_URL}ven/informacion/`;
  const vendedorBoletasURL = `${API_URL}ven/boletas/${vendedorName}`;
  //const vendedorComisionURL = `${API_URL}contabilidad/ingreso/1088349108/?rifa_id=1&page=1&page_size=50`
  const fetchVendedoresList = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setVendedores(response.data);
      setVendedorName(response.data[0].cedula);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchVendedoresList();
  }, []);

  const fetchBoletasData = async () => {
    try {
      const response = await axios.get(vendedorBoletasURL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setVendedorBoletas(response.data);
      //console.log("BOELTASSS VENDEDORRR", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBoletasData();
  }, [vendedorName,boleta]);


  const fetchVendedoresData = async () => {
    try {
      const response = await axios.get(vendedorURL + vendedorName, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setVendedorInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchVendedoresData();
  }, [vendedorName]);

  useEffect(() => {
    fetchBoletasData();
  }, [boleta]);

  /*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(vendedorComisionURL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setVendedorComision(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
 */
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
    // Introduce a delay of 3 seconds (3000 milliseconds) before fetching data
    setTimeout(() => {
      fetchBoletasData(); 
      fetchVendedoresData();// Fetch data to update with the latest changes
       // End loading state
    }, 2000);
    setIsOpen(false);
  };
  return (
    <div className="ra-main-div-vendedores flex items-center flex-col">
      <EditarVendedorComponent
        isOpen={isOpen}
        handleClose={handleClose}
        value={value}
        user={user}
        adress={adress}
        phone={phone}
        valorPendiente={valorPendiente}
      />
      <div className="flex items-center flex-col">
        <div className=" bg-white shadow mx-2 my-2 rounded flex flex-col">
          <strong className="m-0 p-3 bg-blue-500 text-white rounded-t">
            Datos del Vendedor
          </strong>
          <div className="bg-white p-3 rounded mx-2 my-2 text-[12px] text-gray-600 w-1/2">
            <strong>Buscar Nombre:</strong>
            <div className="flex items-center mb-2">
              {
                <select
                  className="bg-white rounded  border-2 border-gray-300 m-0 h-10 ra-vendedores-body"
                  value={vendedorName}
                  onChange={(e) => setVendedorName(e.target.value)}
                >
                  {vendedores.map((vendedor) => (
                    <option key={vendedor.index} value={vendedor.cedula}>
                      {vendedor.username}
                    </option>
                  ))}
                </select>
              }

              <ModalVendedores isOpen={false}  />
              <EliminarVendedorComponent isOpen={false} vendedorCedula={vendedorInfo.cedula} vendedorName={vendedorInfo.username}/>
            </div>
            <div className="flex m-0">
              <p className="font-bold m-0">C.C </p>
              <p className="m-0 mx-1">{vendedorInfo.cedula}</p>
            </div>
            <div className="flex m-0">
              <p className="font-bold flex justify-center items-center m-0">
                <FaMapMarkerAlt />{" "}
              </p>
              <p className="mx-1 m-0">{vendedorInfo.ciudad}</p>
            </div>
            <div className="flex m-0">
              <p className="font-bold flex justify-center items-center">
                <AiFillPhone />
              </p>
              <p className="mx-1">{vendedorInfo.telefono}</p>
            </div>
            <div className="flex m-0">
              <p className="font-bold mr-1 my-0">Ingreso Bruto:</p>
              <p className="flex m-0">
                {formatCurrency(vendedorInfo.ingreso_bruto)}
              </p>
            </div>
            <div className="flex m-0">
              <p className="font-bold mr-1 my-0">Comisión:</p>
              <p className="flex m-0">
                {formatCurrency(vendedorInfo.comision)}
              </p>
            </div>
            <div className="flex m-0">
              <p className="font-bold mr-1 my-0">Total neto:</p>
              <p className="flex m-0">
                {formatCurrency(vendedorInfo.total_neto)}
              </p>
            </div>
            <div className="flex m-0">
              <p className="font-bold mr-1 my-0">N°:</p>
              <p className="flex m-0">{vendedorInfo.numero_boleteria}</p>
            </div>
            <div className="flex">
              <AsociarBoletaComponent cedula={vendedorInfo.cedula}/>
              <EliminarBoletaComponent cedula={vendedorInfo.cedula}/>
            </div>
          </div>
        </div>
        <h4 className="text-gray-500 my-3">Boletas Asociadas</h4>

        <input type="number" placeholder="buscar boleta" value={boleta} onChange={(e) =>setBoleta(e.target.value)}/>
        <div className="ra-div-table ra-boletas-asociadas-table">
          <table style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th className="px-1 py-3">Numero</th>
                <th className="px-1 py-3">Estado</th>
                <th className="px-1 py-3">Usuario</th>
                <th className="px-1 py-3">Teléfono</th>
                <th className="px-1 py-3">Dirección</th>
                <th className="px-1 py-3">Acumulado</th>
                <th className="px-1 py-3">Valor Pendiente</th>
                <th className="px-1 py-3">Comisión</th>
                <th className="font-semibold text-sm uppercase px-6 py-1">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {vendedorBoletas.map((boleta) => (
                <tr key={boleta.numero} className="border-t">
                  <td
                    className="px-1 py-3 cursor-pointer font-bold"
                    data-label="Número"
                  >
                    {boleta.numero.toString().padStart(4, "0")}
                  </td>
                  <td
                    className={
                      "px-6 py-1 text-white font-bold " + "ra-" + boleta.estado
                    }
                    data-label="Estado"
                  >
                    {toUpperCaseString(boleta.estado)}
                  </td>
                  <td className="px-1 py-3 cursor-pointer" data-label="Usuario">
                    {boleta.usuario}
                  </td>
                  <td
                    className="px-1 py-3 cursor-pointer"
                    data-label="Teléfono"
                  >
                    {boleta.telefono}
                  </td>
                  <td
                    className="px-1 py-3 cursor-pointer"
                    data-label="Dirección"
                  >
                    {boleta.direccion}
                  </td>
                  <td
                    className="px-1 py-3 cursor-pointer "
                    data-label="Acumulado"
                  >
                    {formatCurrency(boleta.acumulado)}
                  </td>
                  <td
                    className="px-1 py-3 cursor-pointer"
                    data-label="Valor pendiente"
                  >
                    {formatCurrency(boleta.valor_pendiente)}
                  </td>
                  <td
                    className="px-1 py-3 cursor-pointer"
                    data-label="Comisión"
                  >
                    {formatCurrency(boleta.comision)}
                  </td>
                  <td className="px-6 py-1" data-label="Editar">
                    <button
                      className="px-2 py-1 text-gray-500 text-lg"
                      onClick={() =>
                        handleOpen(
                          boleta.numero,
                          boleta.usuario,
                          boleta.direccion,
                          boleta.telefono,
                          boleta.valor_pendiente
                        )
                      }
                    >
                      <AiFillEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendedoresTable;
