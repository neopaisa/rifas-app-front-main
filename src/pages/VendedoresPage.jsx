import React from "react";
import AvatarNavbar from "../components/global/AvatarNavbar";
import VendedoresTable from "../components/admin/VendedoresTable";
import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment } from "../features/counter/counterSlice";

function VendedoresPage() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <AvatarNavbar />
      <div className="bg-gray-300 py-3">
      <VendedoresTable />
      </div>
    </div>
  );
}

export default VendedoresPage;
