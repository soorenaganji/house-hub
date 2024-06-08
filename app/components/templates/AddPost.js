"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import InputField from "app/components/elements/InputField";
import TextareaField from "app/components/elements/TextAreaField";
import { validateForm } from "@/app/helper/validate";
const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    street: "",
    zipcode: "",
    phoneNumber: "",
    email: "",
    rentalOrSell: "rental",
    deposit: "",
    mortgage: "",
    price: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSwitchToggle = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rentalOrSell: prevFormData.rentalOrSell === "rental" ? "sell" : "rental",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
validateForm(formData , toast)
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/posts", formData);
      toast.success("Post created successfully!");
      setFormData({
        title: "",
        description: "",
        city: "",
        street: "",
        zipcode: "",
        phoneNumber: "",
        email: "",
        rentalOrSell: "rental",
        deposit: "",
        mortgage: "",
        price: "",
      });
    } catch (error) {
      toast.error("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 mt-12">
      <Toaster />
      <h5 className="text-2xl font-extrabold mb-8 text-center">Add New Post</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <InputField
          label="City"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          label="Street"
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
        />
        <InputField
          label="Zipcode"
          name="zipcode"
          type="text"
          value={formData.zipcode}
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="flex items-center space-x-2">
          <div
            className={`relative inline-block w-32 h-16 bg- rounded-full cursor-pointer transition-all duration-150 ${
              formData.rentalOrSell === "rental" ? "bg-[#100A55]" : "bg-primary"
            }`}
            onClick={handleSwitchToggle}
          >
            <div
              className={`absolute top-1 left-1 w-14 h-14 text-white rounded-full flex items-center justify-center transition-all ${
                formData.rentalOrSell === "rental"
                  ? "transform translate-x-0 bg-primary"
                  : "transform translate-x-16 bg-[#100A55]"
              }`}
            >
              {formData.rentalOrSell === "rental" ? "Rent" : "Sell"}
            </div>
          </div>
        </div>

        {formData.rentalOrSell === "rental" && (
          <>
            <InputField
              label="Deposit"
              name="deposit"
              type="text"
              value={formData.deposit}
              onChange={handleChange}
            />
            <InputField
              label="Mortgage per month"
              name="mortgage"
              type="text"
              value={formData.mortgage}
              onChange={handleChange}
            />
          </>
        )}

        {formData.rentalOrSell === "sell" && (
          <InputField
            label="Price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
          />
        )}

        <button
          type="submit"
          className={`px-10 py-5 text-lg rounded-lg font-semibold mt-8 mx-auto ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
