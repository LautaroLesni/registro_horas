import React from "react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthForm = () => {
  const [status, setStatus] = useState(0);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const auth = useSelector((state) => state.auth);

  return (
    <div className="w-[60vw] h-[650px] bg-[#424769] rounded-xl flex flex-row">
      <div className="w-[50%] h-full rounded-l-xl flex flex-col items-center">
        <div className="w-full flex p-2 gap-2">
          <div
            className={`text-[#ffffff] font-medium cursor-pointer px-3 pt-1 pb-2 ${
              status === 0 ? "border-b-2 border-[#f9b17a]" : null
            }`}
            onClick={() => setStatus(0)}
          >
            Login
          </div>
          <div
            className={`text-[#ffffff] font-medium cursor-pointer px-3 pt-1 pb-2 ${
              status === 1 ? "border-b-2 border-[#f9b17a]" : null
            }`}
            onClick={() => setStatus(1)}
          >
            Registrarse
          </div>
        </div>
        {status === 0 && <Login registeredSuccess={registeredSuccess} />}
        {status === 1 && <Register setStatus={setStatus} setRegisteredSuccess={setRegisteredSuccess} />}
      </div>
      <div className="w-[50%] h-full bg-[#f9b17a] rounded-r-xl"></div>
    </div>
  );
};

export default AuthForm;
