/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux/es/hooks/useSelector";
function ModalVendedores({ isOpen }) {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cedula, setCedula] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${API_URL}ven/crear`;

    const data = {
      username: nombre,
      telefono: telefono,
      direccion: direccion,
      cedula: cedula,
      ciudad: ciudad,
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        toast.success("Datos Actualizados Correctamente");
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        var errorDetail = error.response.data.detail;
        toast.error(errorDetail);
      });
  };
  return (
    <>
      <ToastContainer />
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Agregar Vendedor</Tooltip>}
      >
        <button
          onClick={handleShow}
          className="bg-green-500 h-10  hover:bg-green-600 text-white font-bold mx-auto rounded flex items-center justify-center w-10 p-2 text-lg font-bold"
        >
          <AiOutlinePlusCircle className="mx-1" />
        </button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="title"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cedula"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cédula
                  </label>
                </div>
                <div className="mt-2 mb-2">
                  <input
                    value={cedula}
                    onChange={(event) => setCedula(event.target.value)}
                    id="id"
                    name="id"
                    type="number"
                    autoComplete="id"
                    required
                    className="block w-full  py-1.5 px-2  ra-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Teléfono
                </label>
                <div className="mt-2">
                  <input
                    value={telefono}
                    onChange={(event) => setTelefono(event.target.value)}
                    id="telefono"
                    name="telefono"
                    type="text"
                    autoComplete="description"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="ciudad"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ciudad
                </label>
                <div className="mt-2">
                  <input
                    value={ciudad}
                    onChange={(event) => setCiudad(event.target.value)}
                    id="ciudad"
                    name="ciudad"
                    type="text"
                    autoComplete="city"
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
                <div className="mt-2 mb-3">
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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Agregar Vendedor
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalVendedores;
