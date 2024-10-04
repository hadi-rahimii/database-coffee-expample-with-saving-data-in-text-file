import React, { useState } from "react";

export default function page() {
  const [profit, setProfit] = useState();
  const showProfit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/orders", {
      method: "GET",
    });

    const data = await res.json();

    const cost = data.map((d) => {
      return d.price - d.cost;
    });
    let totalPriceProfit = 0;
    const h = cost.map((profit) => {
      return (totalPriceProfit += profit);
    });
    setProfit(totalPriceProfit);
  };
  return (
    <div className=" mt-9 flex flex-row items-center bg-orange-500">
      <button className=" bg- bg-orange-100 p-5 te" onClick={showProfit}>
        محاسبه ی سود
      </button>

      <div className=" bg-orange-500 text-white text-2xl">{profit?.toLocaleString()}</div>
    </div>
  );
}
