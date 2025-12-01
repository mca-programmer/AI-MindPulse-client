import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Loader from "./Loader";

const HomeAi = () => {
  const [aiS, setAi] = useState([""]); // State to store fetched data
  const [isloading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    fetch("https://ai-mind-pulse-server.vercel.app/allai")
      .then((res) => res.json())
      .then((data) => {
        setAi(data);

        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setloading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="font-extrabold text-3xl md:text-4xl w-fit mx-auto px-5 py-3 rounded-2xl brand-gradient">
        FEATURED RECENT AI TOOLS
      </h1>
      <p className="mt-2 mb-6 text-soft">
        Handpicked models, fresh datasets, real impact.
      </p>

      {/* Check if data is being fetched */}

      {isloading ? (
        <Loader></Loader>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {/* Render cards only when data is fetched */}
          {aiS.map((ai) => (
            <Cards key={ai.id} ai={ai} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeAi;
