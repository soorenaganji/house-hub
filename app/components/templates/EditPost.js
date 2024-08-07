"use client";
import { useState, useEffect } from "react";
import PostForm from "@/app/components/modules/PostForm";
import { validateForm } from "@/app/helper/validate";
import toast from "react-hot-toast";
import { uploadImageToSupabase } from "@/app/helper/functions";
import { editPost } from "@/app/apiCalls/post";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
const EditPost = ({ data, imageUrls, id }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    _id: "",
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

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const newData = { ...data, _id: id };
    setFormData(newData);
    setImages(imageUrls);
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) =>
      prevImages
        ? [
            ...prevImages,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          ]
        : [
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          ]
    );
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData, toast)) return;
    setIsSubmitting(true);
    try {
      const uploadedImageUrls = await Promise.all(
        images
          .filter((image) => !image.url)
          .map((image) => uploadImageToSupabase(image))
      );

      const structuredUploadedUrls = uploadedImageUrls.map((url) => ({
        url,
        type: "url",
      }));

      const combinedImageUrls = [
        ...images
          .filter((image) => image.url)
          .map((image) => ({
            url: image.url,
            type: "url",
          })),
        ...structuredUploadedUrls,
      ];

      const updatedFormData = {
        ...formData,
        imageUrls: combinedImageUrls.map((image) => image.url), // Extracting the URL strings
        _id: id,
      };

      const response = await editPost(updatedFormData);
      router.push("/dashboard/my-posts");
      toast.success("Post edited successfully!");
      setFormData({
        _id: "",
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
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 mt-12">
      <h5 className="text-2xl font-extrabold mb-8 text-center">Edit Post</h5>
      <PostForm
        formData={formData}
        setFormData={setFormData}
        images={images}
        setImages={setImages}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onDrop={onDrop}
      />
    </div>
  );
};

export default EditPost;
