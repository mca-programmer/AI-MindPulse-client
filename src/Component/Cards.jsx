import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AunthContext } from "../Auth/AuthProvider";

const Cards = ({ ai }) => {
  const { setDetails } = useContext(AunthContext);

  async function getModelById(id) {
    try {
      const res = await fetch(
        `https://ai-mind-pulse-server.vercel.app/models/${id}`
      );
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.error("Failed to fetch model:", err);
    }
  }

  return (
    <div className="card-surface rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">

      <div className="p-5">

        {/* Image */}
        <div className="w-full h-48 rounded-xl overflow-hidden bg-black/30 border border-[var(--border)]">
          <img
            src={ai.image}
            alt={ai.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-4 space-y-3">

          {/* Framework + Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold brand-gradient">{ai.name}</h2>
            <span className="chip px-2 py-1 rounded-full text-xs">
              {ai.framework}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm text-soft leading-relaxed">
            {ai.description?.length > 100
              ? ai.description.slice(0, 100) + "..."
              : ai.description}
          </p>

          {/* View Details */}
          <NavLink
            onClick={() => getModelById(ai._id)}
            to={`/details/${ai._id}`}
            className="block"
          >
            <button className="btn btn-brand w-full mt-2 rounded-xl">
              View Details
            </button>
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default Cards;
