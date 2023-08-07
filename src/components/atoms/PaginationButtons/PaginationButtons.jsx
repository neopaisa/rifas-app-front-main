/* eslint-disable react/prop-types */
import React from "react";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export const NextButton = (props) => (
  <button
    className="text-gray-800 bg-white px-3 py-3 font-semibold hover:text-gray"
    style={{ color: props.page >= 100 ? "gray" : "rgb(31 41 55)" }}
    disabled={props.page >100? true : false}
    onClick={props.e}
  >
    <AiFillCaretRight />
  </button>
);

export const BackButton = (props) => (
  <button
    id="back-button"
    style={{ color: props.page <= 1 ? "gray" : "rgb(31 41 55)" }}
    disabled={props.page <= 1 ? true : false}
    className="text-gray-800 bg-white px-3 py-3 font-semibold hover:text-gray"
    onClick={props.e}
  >
    <AiFillCaretLeft />
  </button>
);
