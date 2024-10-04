"use client";
import Signup from "./signup/page";
import Products from "./products/page";
import Order from "./orders/page";
import Materials from "./material/page";
import Profit from "./profit/page";
export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="grid  grid-flow-col w-11/12 mx-auto">
        <Signup />
        <Materials />
        <Products />
        <Order />
      </div>
      <Profit />
    </div>
  );
}
