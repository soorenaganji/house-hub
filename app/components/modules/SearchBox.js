"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuSearch } from "react-icons/lu";

const SearchBox = () => {
  const [selectedField, setSelectedField] = useState("Buy");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fields = [
    { name: "Buy", color: "border-primary  text-primary " },
    { name: "Sell", color: "border-black text-black " },
    { name: "Rent", color: "border-secondary text-secondary " },
  ];

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filterMap = {
      Buy: "sell",
      Sell: "sell",
      Rent: "rental",
    };
    const filterValue = filterMap[selectedField] || "";
    router.push(`/feed?search=${searchTerm}&filter=${filterValue}`);
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl mt-8 md:w-96 ">
      <div className="flex items-center justify-between px-8 py-4 border-b">
        {fields.map((field) => (
          <button
            key={field.name}
            onClick={() => handleFieldClick(field.name)}
            className={`py-2 transition-all duration-150 ${
              selectedField === field.name
                ? `border-b ${field.color} px-1 font-semibold`
                : "text-slate-700"
            }`}
          >
            {field.name}
          </button>
        ))}
      </div>
      <form
        className="p-4 flex justify-between items-center bg-transparent"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="h-[2.75rem] placeholder:font-thin border-none bg-transparent w-64 outline-none px-2"
          placeholder="Search Location"
        />
        <button
          className="bg-primary h-12 w-12 rounded-md text-white text-2xl flex items-center justify-center"
          type="submit"
        >
          <LuSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
