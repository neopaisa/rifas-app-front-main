/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function EliminarBoletaComponent({ isOpen, cedula , handleCloseMain }) {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [show, setShow] = useState(false);
  const [boleta, setBoleta] = useState(0);
  const [listaBoletas, setListaBoletas] = useState([]);



  const handleClose = () =>{
    handleCloseMain();
    setShow(false);
  } 


  const handleShow = () => setShow(true);

  const eliminarBoleta = (boleta) => {
    const nuevaListaBoletas = [...listaBoletas, boleta];
    // Actualizar el estado con la nueva lista de boletas
    setListaBoletas(nuevaListaBoletas);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const url = `${API_URL}ven/quitar`;
  
    const data = {
      cedula: cedula,
      boletas: listaBoletas,
    };
    console.log(data)
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        // Limpiar la lista de boletas después de una respuesta exitosa

        toast.success(response.data.mensaje + `  N° ${boleta}`, {
          autoClose: 200 // 2000 milisegundos (2 segundos)
        });
        setBoleta(0);
        setListaBoletas([]);
  
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        setBoleta(0);
        setListaBoletas([]);
        var errorDetail = error.response.data.detail;
        toast.error(errorDetail, {
          autoClose: 200 // 2000 milisegundos (2 segundos)
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Eliminar Boletas</Tooltip>}
      >
        <button
          onClick={handleShow}
          className="bg-red-500 h-10  hover:bg-red-600 text-white font-bold mx-1 rounded flex items-center justify-center
           p-2 mt-2 "
        >
          Eliminar<AiFillDelete className="ml-2" />
        </button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Boleta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
              <input
                type="number"
                placeholder="# de Boleta"
                onChange={(e) => setBoleta(parseInt(e.target.value))}
                className="p-1 border border-gray-500 border-solid rounded"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => eliminarBoleta(boleta)}
                className="bg-red-500 rounded p-2 ml-2 text-white"
              >
                <AiOutlineDelete />
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EliminarBoletaComponent;
