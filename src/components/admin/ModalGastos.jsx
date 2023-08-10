/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlinePlusCircle } from "react-icons/ai";

function ModalGastos({ isOpen }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={handleShow}
        className="bg-green-500 py-2 px-2 hover:bg-green-600 text-white font-bold mx-auto rounded-lg flex items-center justify-center my-2 "
      >
        Agregar Gasto <AiOutlinePlusCircle className="mx-1" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit="{handleSubmit}">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label
                  htmlFor="titulo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Titulo
                </label>
                <div className="mt-2">
                  <input
                    value="{monto}"
                    onChange="{(event) => setMonto(event.target.value)}"
                    id="titulo"
                    name="titulo"
                    type="text"
                    autoComplete="title"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="usuario"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Descripción
                </label>
                <div className="mt-2">
                  <input
                    value="{descripcion}"
                    onChange="{(event) => setUsuario(event.target.value)}"
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    autoComplete="description"
                    required
                    className="block w-full  py-1.5 px-2 ra-input"
                    disabled="{ !user ? false : true }"
            
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Monto
                </label>
                <div className="mt-2">
                  <input
                    value="{monto}"
                    onChange="{(event) => setTelefono(event.target.value)}"
                    id="monto"
                    name="monto"
                    type="currency"
                    autoComplete="currency"
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
                    value="{date}"
                    onChange="{(event) => setDate(event.target.value)}"
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
                  Agregar Gasto
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalGastos;
