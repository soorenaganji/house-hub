import { LuSearch } from "react-icons/lu";
const SearchSection = () => {
  return (
    <div className="w-full bg-white rounded-lg mt-8">
      <div className="flex items-center justify-between px-8 py-4 border-b">
        <button>Rent</button>
        <button>Buy</button>
        <button>Sell</button>
      </div>
      <div className="p-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Location"
          className="h-10 placeholder:font-thin border-none outline-none px-2 "
        />
        <button className="bg-primary h-10 w-10 rounded-md text-white text-2xl flex items-center justify-center">
          <LuSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
