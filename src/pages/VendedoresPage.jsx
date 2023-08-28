import React, { useEffect, useState } from "react";
import AvatarNavbar from "../components/global/AvatarNavbar";
import VendedoresTable from "../components/admin/VendedoresTable";
import {useSelector} from 'react-redux'
//import { decrement,increment } from "../features/counter/counterSlice";
import Footer from "../components/global/Footer";

function VendedoresPage() {
  const [user,setUser] = useState({})
  const user1 = useSelector((state) => state.user.value)
  useEffect(()=>{
    setUser(user1);
  },[])
  
  //const count = useSelector((state) => state.counter.value)
  //const dispatch = useDispatch()
  return (
    <div>
      <button onClick={()=> console.log(user)}>CLICKK</button>
      {/* <div>
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
      </div> */}
      <AvatarNavbar />
      <div className="bg-gray-300 py-3">
      <VendedoresTable />
      </div>
      <Footer/>
    </div>
  );
}

export default VendedoresPage;
