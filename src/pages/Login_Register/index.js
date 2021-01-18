import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginHome() {
  const [register, setRegister] = useState(false);

  return (
    <div className="login-page">
      {register === false ? (
        <Login register={register} setRegister={setRegister} />
      ) : (
        <Register register={register} setRegister={setRegister} />
      )}
    </div>
  );
}
