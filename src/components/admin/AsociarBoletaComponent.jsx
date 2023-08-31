/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AiFillSwitcher, AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BuscadorBoletas from "../general/BuscadorBoletas";

function AsociarBoletaComponent({ isOpen, cedula }) {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [show, setShow] = useState(false);
  const [boleta, setBoleta] = useState(0);
  const [listaBoletas, setListaBoletas] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const agregarBoleta = (boleta) => {
    // Crear una copia del estado actual y agregar la nueva boleta
    const nuevaListaBoletas = [...listaBoletas, boleta];

    // Actualizar el estado con la nueva lista de boletas
    setListaBoletas(nuevaListaBoletas);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      agregarBoleta(boleta);
    }
  };
  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${API_URL}ven/asociar`;

    const data = {
      cedula: cedula,
      boletas: listaBoletas,
    };

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        toast.success(response.data.mensaje + `  N° ${boleta}`);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        var errorDetail = error.response.data.detail;
        toast.error(errorDetail);
      });
  };

  return (
    <div>
      <ToastContainer />
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Asignar Boletas</Tooltip>}
      >
        <button
          onClick={handleShow}
          className="bg-blue-500 h-10  hover:bg-blue-600 text-white font-bold mx-auto rounded flex items-center justify-center
           p-2 mt-2"
        >
          Asignar<AiFillSwitcher className="ml-2" />
        </button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Boletas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
              <input
                min={0}
                type="number"
                placeholder="# de Boleta"
                onChange={(e) => setBoleta(e.target.value)}
                className="p-1 border border-gray-500 border-solid rounded"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => agregarBoleta(boleta)}
                className="bg-green-500 rounded p-2 ml-2 text-white"
              >
                <AiOutlinePlusCircle />
              </button>
            </div>
          </form>

          <BuscadorBoletas/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AsociarBoletaComponent;
