import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AunthContext } from "../Auth/AuthProvider";
import Loader from "../Component/Loader";

const CreateModal = () => {
  const { user } = useContext(AunthContext); // Get user context
  console.log(user.email); // Log email for debugging
  const [isloading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const form = e.target;
    const name = form.name.value;
    const createdBy = user.email; // Directly set createdBy to user.email
    const framework = form.framework.value;
    const useCase = form.useCase.value;
    const dataset = form.dataset.value;
    const description = form.description.value;
    const image = form.imageUrl.value;

    const formData = {
      name,
      createdBy,
      framework,
      useCase,
      dataset,
      description,
      image,
    };

    fetch("https://ai-mind-pulse-server.vercel.app/mymodal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        Swal.fire({
          title: "Do you want to add this modal?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            response.json();
            setloading(false);
            if (isloading == false) {
              navigate("/models");
              return <Loader></Loader>;
            }
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      })
      .then((data) => console.log("Success:", data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">AI Information</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        {/* Set the email field as read-only and pre-populate with user.email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email} // Set the value to the user email from context
            readOnly // Make it read-only so the user can't change it
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="framework">Framework</label>
          <input type="text" id="framework" name="framework" required />
        </div>

        <div className="form-group">
          <label htmlFor="useCase">Use Case</label>
          <input type="text" id="useCase" name="useCase" required />
        </div>

        <div className="form-group">
          <label htmlFor="dataset">Dataset</label>
          <input type="text" id="dataset" name="dataset" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" required />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input type="url" id="imageUrl" name="imageUrl" required />
        </div>

        <button type="submit" className="submit-btn">
          CREATE YOUR MODAL
        </button>
      </form>
    </div>
  );
};

export default CreateModal;
