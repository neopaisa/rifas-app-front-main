/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { API_URL } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function EliminarVendedorComponent({ isOpen, vendedorName, vendedorCedula }) {
  const userData = useSelector((state) => state.user.value);
  const TOKEN = userData.access_token;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${API_URL}ven/eliminar`;

    const data = {
      cedula: vendedorCedula,
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
  };
  return (
    <>
      <ToastContainer />

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Eliminar Vendedor</Tooltip>}
      >
        <button
        onClick={handleShow}
        className="bg-red-500 py-2 px-2 hover:bg-red-600 text-white font-bold mx-auto rounded-lg flex items-center justify-center my-2 h-100 "
      >
        <AiFillDelete className="mx-1" />
      </button>
      </OverlayTrigger>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col">
                <h6>¿Está seguro que desea eliminar al vendedor {vendedorName} ?</h6>
              <div>
                <button
                  type="submit"
                  className=" bg-red-500 h-10  hover:bg-red-600 text-white  mx-auto rounded flex items-center justify-center w-10 p-2 text-lg font-bold"
                >
                  Eliminar <AiFillDelete/>
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EliminarVendedorComponent;
