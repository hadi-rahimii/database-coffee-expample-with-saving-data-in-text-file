
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const addUser = async (e) => {
    e.preventDefault(); 
    const user = { name, phone };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if(res.ok){
        alert('با موفقیت اضافه شد')
        setName('')
        setPhone('')
        router.refresh()
    }
  
    }
  return (
    <div  className=" items-center flex"> 
      <form className="flex flex-col w-4/6 h-full justify-center mx-auto border-4 border-amber-700 p-4 mt-4" onSubmit={addUser}>
        <div className=" flex flex-col ">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            نام:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" border-2 rounded-md border-red-400 p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            موبایل:
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className=" border-2 rounded-md border-red-400 p-2"
          />
        </div>
        <button type="submit" className="bg-white rounded-md border-2 border-orange-200 mt-2 py-4" > افزودن</button>
      </form>
    </div>
  );
}
