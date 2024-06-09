"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Removed Toaster import
import InputField from "app/components/elements/InputField";
import TextareaField from "app/components/elements/TextAreaField";
import { validateForm } from "@/app/helper/validate";
import { LuPlus } from "react-icons/lu";
import { IoTrashSharp } from "react-icons/io5";
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
    facilities: [],
    rules: [],
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

  const handleAddFacility = () => {
    if (formData.facilities.length < 5) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        facilities: [...prevFormData.facilities, ""],
      }));
    } else {
      toast.error("Cannot add more than 5 facilities");
    }
  };

  const handleAddRule = () => {
    if (formData.rules.length < 5) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        rules: [...prevFormData.rules, ""],
      }));
    } else {
      toast.error("Cannot add more than 5 rules");
    }
  };

  const handleDeleteFacility = (index) => {
    const updatedFacilities = [...formData.facilities];
    updatedFacilities.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      facilities: updatedFacilities,
    }));
  };

  const handleDeleteRule = (index) => {
    const updatedRules = [...formData.rules];
    updatedRules.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      rules: updatedRules,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, toast)) return;

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
        facilities: [],
        rules: [],
      });
    } catch (error) {
      toast.error("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 mt-12">
      <h5 className="text-2xl font-extrabold mb-8 text-center">Add New Post</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        {/* Description */}
        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {/* City */}
        <InputField
          label="City"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
        />
        {/* Street */}
        <InputField
          label="Street"
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
        />
        {/* Zipcode */}
        <InputField
          label="Zipcode"
          name="zipcode"
          type="text"
          value={formData.zipcode}
          onChange={handleChange}
        />
        {/* Phone Number */}
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {/* Email */}
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* Rental or Sell */}
        <div className="flex items-center space-x-2">
          <div
            className={`relative inline-block w-32 h-16 bg- rounded-lg cursor-pointer transition-all duration-150 ${
              formData.rentalOrSell === "rental" ? "bg-[#100A55]" : "bg-primary"
            }`}
            onClick={handleSwitchToggle}
          >
            <div
              className={`absolute top-1 left-1 w-14 h-14 text-white rounded-lg flex items-center justify-center transition-all ${
                formData.rentalOrSell === "rental"
                  ? "transform translate-x-0 bg-primary"
                  : "transform translate-x-16 bg-[#100A55]"
              }`}
            >
              {formData.rentalOrSell === "rental" ? "Rent" : "Sell"}
            </div>
          </div>
        </div>
        {/* Deposit (if rental) */}
        {formData.rentalOrSell === "rental" && (
          <InputField
            label="Deposit"
            name="deposit"
            type="text"
            value={formData.deposit}
            onChange={handleChange}
          />
        )}
        {/* Mortgage (if rental) */}
        {formData.rentalOrSell === "rental" && (
          <InputField
            label="Mortgage per month"
            name="mortgage"
            type="text"
            value={formData.mortgage}
            onChange={handleChange}
          />
        )}
        {/* Price (if sell) */}
        {formData.rentalOrSell === "sell" && (
          <InputField
            label="Price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
          />
        )}
        {/* Facilities */}
        <div className="space-y-4">
          <h6 className="text-xl font-bold">Facilities</h6>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleAddFacility}
              className="border border-primary  px-3 py-2 rounded-lg flex items-center space-x-2"
            >
              <LuPlus /> Add Facility
            </button>
          </div>
          {formData.facilities.map((facility, index) => (
            <div key={index} className="flex items-center justify-start gap-2">
              <InputField
                value={facility}
                onChange={(e) => {
                  const updatedFacilities = [...formData.facilities];
                  updatedFacilities[index] = e.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    facilities: updatedFacilities,
                  }));
                }}
              />
              <button
                type="button"
                onClick={() => handleDeleteFacility(index)}
                className="bg-red-500 text-white p-3 text-lg -mb-1  rounded-lg "
              >
                <IoTrashSharp />
              </button>
            </div>
          ))}
        </div>
        {/* Rules */}
        <div className="space-y-4">
          <h6 className="text-xl font-bold">Rules</h6>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleAddRule}
              className=" border border-primary  px-3 py-2 rounded-lg flex items-center space-x-2"
            >
              <LuPlus /> Add Rule
            </button>
          </div>
          {formData.rules.map((rule, index) => (
            <div key={index} className="flex items-center space-x-2">
              <InputField
                value={rule}
                onChange={(e) => {
                  const updatedRules = [...formData.rules];
                  updatedRules[index] = e.target.value;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    rules: updatedRules,
                  }));
                }}
              />
              <button
                type="button"
                onClick={() => handleDeleteRule(index)}
                className="bg-red-500 text-white p-3 text-lg -mb-1  rounded-lg "
              >
                <IoTrashSharp />
              </button>
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`px-8 py-4 text-lg rounded-lg font-semibold mt-16 mx-auto transition-all duration-150 ${
            isSubmitting
              ? "opacity-50 bg-primary text-white cursor-not-allowed"
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
