import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AunthContext } from "../Auth/AuthProvider";
import { Navigate } from "react-router";

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
      return <Navigate state={location.pathname}></Navigate>;
    } catch (err) {
      console.error("Failed to fetch model:", err);
    }
  }

  return (
    <div className="card-surface rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
      <div className="p-5">
        <div className="w-full h-48 rounded-xl overflow-hidden bg-black/30 border border-[var(--border)]">
          <img
            src={ai.image}
            alt={ai.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold brand-gradient">{ai.name}</h2>
            <span className="chip px-2 py-1 rounded-full text-xs">
              {ai.framework}
            </span>
          </div>

          <p className="text-sm text-soft">
            Use Case: <span className="text-white">{ai.useCase}</span>
          </p>
          <p className="text-sm text-soft">
            Dataset: <span className="text-white">{ai.dataset}</span>
          </p>

          <p className="text-sm text-soft border-t border-[var(--border)] pt-3 leading-relaxed">
            {ai.description}
          </p>

          <div className="flex items-center justify-between mt-3 text-xs text-soft">
            <span>
              By: <span className="text-white">{ai.createdBy}</span>
            </span>
            <span>{ai.purchased} Purchases</span>
          </div>

          <p className="text-[11px] text-soft">
            Added on {new Date(ai.createdAt).toLocaleDateString()}
          </p>

          <NavLink
            onClick={() => getModelById(ai._id)}
            to={`/details/${ai._id}`}
            className="block"
          >
            <button className="btn btn-brand w-full mt-3 rounded-xl">
              View Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cards;
