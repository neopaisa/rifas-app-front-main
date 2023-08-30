/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AiFillSwitcher } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function AsociarBoletaComponent({ isOpen, cedula }) {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [show, setShow] = useState(false);
  const [boleta,setBoleta] = useState(0)
  const listaBoletas = []

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${API_URL}ven/asociar`;

    const data = {
      cedula: cedula,
      boletas: listaBoletas
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        toast.success("Datos Actualizados Correctamente", response.data);
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
        overlay={<Tooltip>Asociar Boletas</Tooltip>}
      >
        <button
          onClick={handleShow}
          className="bg-blue-500 h-10  hover:bg-blue-600 text-white font-bold mx-auto rounded flex items-center justify-center w-1/2
           p-2 mt-2"
        >
          Asociar Boletas <AiFillSwitcher/>
        </button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

              <input type="number" placeholder="# de Boleta" onChange={(e)=>setBoleta(e.target.value)}/>
              <button onClick={() => (listaBoletas.push(boleta))}>Agregar</button>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Asignar Boletas
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AsociarBoletaComponent;
 