

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const router = useRouter()

  const [nameOfProduct, setNameOfProduct] = useState("");
  const [materials, setMaterials] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");

  const addProduct = async (e) => {
    e.preventDefault(); 
    const datas = {nameOfProduct,materials,price,cost}
    
    const res = await fetch('/api/products',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });
    console.log(res);
    
    if(res.ok){
        alert('با موفقیت اضافه شد')
        setNameOfProduct('')
        setMaterials('')
        setPrice('')
        setCost('')
        router.refresh()
    }

  };
  return (
    <div  className=" items-center flex">
      <form action=""  className="flex flex-col w-4/6 h-full justify-center mx-auto border-4 border-amber-700 p-4 mt-4" onSubmit={addProduct}>
        <div className=" flex flex-col ">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            نام محصول :
          </label>
          <input
            type="text"
            value={nameOfProduct}
            onChange={(e) => setNameOfProduct(e.target.value)}
            className=" border-2 rounded-md border-red-400 p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            مواد لازم :
          </label>
          <input
            type="text"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            className=" border-2 rounded-md border-red-400 p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            هزینه :
          </label>
          <input
            type="text"
            value={cost?.toLocaleString()}
            onChange={(e) => setCost(e.target.value)}
            className=" border-2 rounded-md border-red-400 p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            قیمت :
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=" border-2 rounded-md border-red-400 p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-white rounded-md border-2 border-orange-200 mt-2 py-4"
        >
          {" "}
          افزودن
        </button>
      </form>
    </div>
  );
}
