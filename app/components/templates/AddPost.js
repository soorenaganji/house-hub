"use client";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadImageToSupabase } from "@/app/helper/functions";
import { createPost } from "@/app/apiCalls/post";
import PostForm from "../modules/PostForm"; // Adjust the path as necessary
import { validateForm } from "@/app/helper/validate";

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, toast)) return;
    setIsSubmitting(true);

    try {
      // Upload images to Supabase
      const imageUrls = await Promise.all(
        images.map((image) => uploadImageToSupabase(image))
      );

      console.log(imageUrls);

      // Add image paths to formData
      const updatedFormData = { ...formData, imageUrls };
      const response = await createPost(updatedFormData);
      console.log(response);
      toast.success("Post created successfully!");
      // router.push("/dashboard/my-posts");
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
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="p-4 mt-12">
      <h5 className="text-2xl font-extrabold mb-8 text-center">Add New Post</h5>
      <PostForm
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddPost;
