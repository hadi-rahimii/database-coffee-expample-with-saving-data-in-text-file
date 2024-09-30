import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const addOrder = async () => {
    const order = { name, product, price };
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (res.ok) {
      alert("سفارش شما با موفقیت ثبت شد");
      setName("");
      setPrice("");
      setProduct("");
      router.refresh()
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const res1 = await fetch("/api/products");
      const data1 = await res1.json();
      const res2 = await fetch("/api/auth/signup");
      const data2 = await res2.json();
      setOrders(data1);
      setUsers(data2);
    };

    getOrders();
  }, []);

  const settingPrice = (value) => {
    setProduct(value);
    const data = orders?.filter((order) => {
      return order.product == value;
    });

    setPrice(data[0]?.price);
  };

  console.log("price", price);
  return (
    <div>
      <form
        action=""
        className="flex flex-col w-4/6  border-4 border-amber-700 p-4 mt-4"
        onSubmit={addOrder}
      >
        <div className=" flex flex-col ">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            نام کاربری :
          </label>
          <select
            name=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            id=""
            className=" border-2 rounded-md border-red-400 p-2"
          >
            <option value=""></option>
            {users?.map((user) => (
              <option value={user.name}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className=" flex flex-col">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            نام سفارش :
          </label>
          <select
            value={product}
            onChange={(e) => settingPrice(e.target.value)}
            name=""
            id=""
            className=" border-2 rounded-md border-red-400 p-2"
          >
            <option value=""></option>
            {orders?.map((order) => (
              <option value={order.product}>{order.product}</option>
            ))}
          </select>
        </div>
        <div className=" flex flex-col">
          <label htmlFor="" className=" right-0 my-2 text-xl">
            {" "}
            قیمت سفارش :
          </label>
          <input
            value={price}
            readOnly
            type="text"
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
