import React from "react";
import FirstList from "./FirstList";

import SecondList from "./SecondList";
import ThirdList from "./ThirdList";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <FirstList />
      <SecondList />
      <ThirdList />
    </div>
  );
}
