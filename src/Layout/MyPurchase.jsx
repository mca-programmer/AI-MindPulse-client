import React, { useContext, useEffect, useState } from "react";
import PurchaseCard from "../Component/PurchaseCard";
import { AunthContext } from "../Auth/AuthProvider";
import Loader from "../Component/Loader";
const MyPurchase = () => {
  const { user } = useContext(AunthContext);
  console.log(user.email);
  const [purchases, setPurchase] = useState([]);
  const [isloading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    fetch(`http://localhost:5000/userpurchase/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchase(data);
        console.log(data);
        setloading(false);
      });
  }, []);

  console.log(purchases);

  return (
    <>
      {isloading ? (
        <Loader></Loader>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-[1200px] mx-auto my-20">
          {purchases.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyPurchase;
