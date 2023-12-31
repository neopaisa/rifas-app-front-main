import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../../api/api";
import { formatCurrency } from "../../utilities/strings";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ModalComponent = ({
  isOpen,
  handleClose,
  value,
  user,
  adress,
  phone,
  valorPendiente,
}) => {
  const today = new Date();
  const fechaHoy = today.toISOString().split("T")[0];
  const [monto, setMonto] = useState(0);
  const [date, setDate] = useState(fechaHoy);
  const [usuario, setUsuario] = useState("");
  const [telefono, setTelefono] = useState(0);
  const [direccion, setDireccion] = useState("");
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;

  useEffect(() => {
    if (!user) {
      setUsuario("");
      setTelefono("");
      setDireccion("");
    } else {
      setUsuario(user);
      setTelefono(phone);
      setDireccion(adress);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${API_URL}abono/`;

    const data = {
      monto: parseInt(monto),
      fecha_abono: date,
      username: usuario,
      telefono: telefono,
      boleta_numero: parseInt(value),
      rifa_id: 1,
      direccion: direccion,
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(() => {
        //console.log("Respuesta del servidor:", response.data);
        toast.success("Datos Actualizados Correctamente");
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        var errorDetail = error.response.data.detail;
        toast.error(errorDetail);
      });
    handleClose();
  };

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Abono Rifa # {value}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="text-gray-500 ml-10">
              Valor Pendiente: {formatCurrency(valorPendiente)}{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label
                  htmlFor="cantidad"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Abono
                </label>
                <div className="mt-2">
                  <input
                    value={monto}
                    onChange={(event) => setMonto(event.target.value)}
                    id="cantidad"
                    name="cantidad"
                    type="number"
                    autoComplete="currency"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                  />
                </div>
                {/* <div className="flex justify-center items-center">
                <p className="mr-2 p-3">Restar Cantidad</p>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={(e) =>
                    e.target.checked ? setMonto(-1 * monto) : setMonto(monto)
                  }
                />
              </div> */}
              </div>

              <div>
                <label
                  htmlFor="usuario"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Usuario
                </label>
                <div className="mt-2">
                  <input
                    value={usuario}
                    onChange={(event) => setUsuario(event.target.value)}
                    id="usuario"
                    name="usuario"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                    disabled={!user ? false : true}
                    style={{ backgroundColor: !user ? "white" : "#eee" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Celular
                </label>
                <div className="mt-2">
                  <input
                    value={telefono}
                    onChange={(event) => setTelefono(event.target.value)}
                    id="telefono"
                    name="telefono"
                    type="number"
                    autoComplete="phone"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="direccion"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Dirección
                </label>
                <div className="mt-2">
                  <input
                    value={direccion}
                    onChange={(event) => setDireccion(event.target.value)}
                    id="direccion"
                    name="direccion"
                    type="text"
                    autoComplete="adress"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fecha
                  </label>
                </div>
                <div className="mt-2 mb-3">
                  <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="date"
                    required
                    className="block w-full  py-1.5 px-2  ra-input"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Agregar Abono
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  user: PropTypes.string,
  adress: PropTypes.string,
  phone: PropTypes.string,
  valorPendiente: PropTypes.string,
};

export default ModalComponent;
