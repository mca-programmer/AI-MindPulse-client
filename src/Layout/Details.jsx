import React, { useContext, useState } from "react";
import { AunthContext } from "../Auth/AuthProvider";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Details = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AunthContext);
  const details = useLoaderData();
  const navigation = useNavigate();

  if (!details) {
    return <Navigate to="/" />;
  }

  const userDetails = user?.email === details.createdBy;

  // Delete function
  const deleteData = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Don't delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ai-mind-pulse-server.vercel.app/models/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire("Deleted!", "", "success");
              navigation("/models");
            } else {
              Swal.fire("Item not found", "", "error");
            }
          })
          .catch(() => Swal.fire("Error", "Something went wrong!", "error"));
      } else if (result.isDenied) {
        Swal.fire("Item not deleted", "", "info");
      }
    });
  };

  // Purchase function
  const handlePurchase = async (id) => {
    try {
      const response = await fetch(
        `https://ai-mind-pulse-server.vercel.app/purchase?id=${id}&&email=${user?.email}`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();

      if (data.message === "Purchase successful") {
        Swal.fire("Purchased successfully!", "", "success");
        navigation("/purchase");
      } else {
        Swal.fire("Already Purchased", "", "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <section className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-3xl shadow-2xl overflow-hidden my-10 max-w-7xl mx-auto p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-center md:items-stretch space-y-8 md:space-y-0">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full p-6 flex items-center justify-center bg-gray-800/40 backdrop-blur-sm rounded-xl shadow-lg hover:scale-[1.05] transition-transform duration-300">
          <img
            src={details.image}
            alt={details.name}
            className="w-72 h-72 object-contain rounded-xl shadow-xl"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-white text-center md:text-left">
            {details.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p>
              <span className="font-semibold">Framework:</span> {details.framework}
            </p>
            <p>
              <span className="font-semibold">Use Case:</span> {details.useCase}
            </p>
            <p>
              <span className="font-semibold">Dataset:</span> {details.dataset}
            </p>
            <p>
              <span className="font-semibold">Purchased:</span> {details.purchased} times
            </p>
            <p>
              <span className="font-semibold">Created By:</span> {details.createdBy}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(details.createdAt).toLocaleDateString()}
            </p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mt-4 border-t border-gray-600 pt-3">
            {details.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 justify-center md:justify-start mt-6">
            <button
              onClick={() => handlePurchase(details._id)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              🛒 Purchase
            </button>

            {userDetails && (
              <div className="flex gap-5">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteData(details._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <UpdateModal
        details={details}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

const UpdateModal = ({ details, isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: details.name,
    framework: details.framework,
    useCase: details.useCase,
    dataset: details.dataset,
    description: details.description,
    image: details.image,
    createdBy: details.createdBy,
    createdAt: details.createdAt,
    purchased: details.purchased,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      // Keep createdBy, createdAt, purchased unchanged in backend if required
    };

    try {
      const response = await fetch(
        `https://ai-mind-pulse-server.vercel.app/update/${details._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      console.log(data);

      Swal.fire({
        title: "Model Updated!",
        icon: "success",
        draggable: true,
      });

      onClose();
    } catch {
      Swal.fire("Error", "Failed to update model!", "error");
    }
  };

  const inputStyle =
    "w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-pink-400 focus:border-pink-400 transition duration-150 ease-in-out";
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
  const fieldsetStyles = "grid grid-cols-1 md:grid-cols-2 gap-4";

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all duration-300 scale-100 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <h3 className="text-3xl font-extrabold text-pink-400 mb-6 border-b border-gray-700 pb-3">
            Model Update 🚀
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className={fieldsetStyles}>
              <div>
                <label className={labelStyle} htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className={labelStyle} htmlFor="framework">
                  Framework
                </label>
                <input
                  type="text"
                  id="framework"
                  name="framework"
                  value={formData.framework}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className={labelStyle} htmlFor="useCase">
                  Use Case
                </label>
                <input
                  type="text"
                  id="useCase"
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className={labelStyle} htmlFor="dataset">
                  Dataset
                </label>
                <input
                  type="text"
                  id="dataset"
                  name="dataset"
                  value={formData.dataset}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelStyle} htmlFor="image">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className={inputStyle + " resize-none"}
                required
              />
            </div>

            {/* Readonly fields */}
            <div className={fieldsetStyles}>
              <div>
                <label className={labelStyle} htmlFor="createdBy">
                  Created By
                </label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  value={formData.createdBy}
                  className={inputStyle + " bg-gray-600 cursor-not-allowed"}
                  readOnly
                />
              </div>
              <div>
                <label className={labelStyle} htmlFor="createdAt">
                  Created At
                </label>
                <input
                  type="text"
                  id="createdAt"
                  name="createdAt"
                  value={new Date(formData.createdAt).toLocaleString()}
                  className={inputStyle + " bg-gray-600 cursor-not-allowed"}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className={labelStyle} htmlFor="purchased">
                Purchased
              </label>
              <input
                type="number"
                id="purchased"
                name="purchased"
                value={formData.purchased}
                className={inputStyle + " bg-gray-600 cursor-not-allowed"}
                readOnly
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-150 shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-150 shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Details;
