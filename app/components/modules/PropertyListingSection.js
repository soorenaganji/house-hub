import Link from "next/link";
import PublishedPostsList from "./PublishedPostsList";
const PropertyListingSection =  () => {
  return (
    <div className="flex flex-col justify-center items-center   ">
      <h5 className="mb-4 text-3xl text-center font-bold  ">
        Based On Your Location
      </h5>
      <p className="text-[#000929] font-light text-center ">
        Some of our picked properties near you location.
      </p>
      <div className="py-12  w-screen overflow-x-auto">
        <PublishedPostsList />
      </div>
      <Link
        href={"/"}
        className="font-semibold px-8 py-4 text-white mx-auto rounded-lg bg-primary"
      >
        Browse more properties
      </Link>
    </div>
  );
};

export default PropertyListingSection;
