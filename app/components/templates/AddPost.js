"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import InputField from "app/components/elements/InputField";
import TextareaField from "app/components/elements/TextAreaField";
import { validateForm } from "@/app/helper/validate";
import { LuPlus } from "react-icons/lu";
import { IoTrashSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";
const AddPost = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    street: "",
    zipcode: "",
    size: "",
    bedroomsCount: "",
    bathroomsCount: "",
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
  const [images, setImages] = useState([]);

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
      mortgage:
        prevFormData.rentalOrSell === "rental" ? "" : prevFormData.mortgage,
      deposit:
        prevFormData.rentalOrSell === "rental" ? "" : prevFormData.deposit,
      price: prevFormData.rentalOrSell === "sell" ? "" : prevFormData.price,
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

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, toast)) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/profile", formData);
      console.log(response);
      toast.success("Post created successfully!");
      router.push("/dashboard/my-posts");
      setFormData({
        title: "",
        description: "",
        city: "",
        street: "",
        zipcode: "",
        size: "",
        bedroomsCount: "",
        bathroomsCount: "",
        phoneNumber: "",
        email: "",
        rentalOrSell: "rental",
        deposit: "",
        mortgage: "",
        price: "",
        facilities: [],
        rules: [],
      });
      setImages([]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="p-4 mt-12">
      <h5 className="text-2xl font-extrabold mb-8 text-center">Add New Post</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div className="space-y-4">
          <h6 className="">Images</h6>
          <div
            {...getRootProps()}
            className={`border-dashed border p-4 rounded-lg cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="text-xs text-center">
                <CiImageOn className="block text-8xl text-center mx-auto" />
                <p>Drop the files here...</p>
              </div>
            ) : (
              <div className="text-xs text-center">
                <CiImageOn className="block text-8xl text-center mx-auto" />
                <p> Drag files here, or click to select files</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={image.preview}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <IoTrashSharp />
                </button>
              </div>
            ))}
          </div>
        </div>
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
        {/* Size */}
        <InputField
          label="Size"
          name="size"
          type="number"
          value={formData.size}
          onChange={handleChange}
        />
        {/* Bedrooms Count */}
        <InputField
          label="Bedrooms"
          name="bedroomsCount"
          type="number"
          value={formData.bedroomsCount}
          onChange={handleChange}
        />
        {/* Bathrooms Count */}
        <InputField
          label="Bathrooms"
          name="bathroomsCount"
          type="number"
          value={formData.bathroomsCount}
          onChange={handleChange}
        />
        {/* Phone Number */}
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="number"
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
            type="number"
            value={formData.deposit}
            onChange={handleChange}
          />
        )}
        {/* Mortgage (if rental) */}
        {formData.rentalOrSell === "rental" && (
          <InputField
            label="Mortgage per month"
            name="mortgage"
            type="number"
            value={formData.mortgage}
            onChange={handleChange}
          />
        )}
        {/* Price (if sell) */}
        {formData.rentalOrSell === "sell" && (
          <InputField
            label="Price"
            name="price"
            type="number"
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
              className="border border-primary px-3 py-2 rounded-lg flex items-center space-x-2"
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
                className="bg-red-500 text-white p-3 text-lg -mb-1 rounded-lg"
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
              className="border border-primary px-3 py-2 rounded-lg flex items-center space-x-2"
            >
              <LuPlus /> Add Rule
            </button>
          </div>
          {formData.rules.map((rule, index) => (
            <div key={index} className="flex items-center justify-start gap-2">
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
                className="bg-red-500 text-white p-3 text-lg -mb-1 rounded-lg"
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
