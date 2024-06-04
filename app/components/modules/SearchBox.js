import { LuSearch } from "react-icons/lu";
import SearchBar from "../elements/SearchBar";
const SearchBox = () => {
  return (
    <div className="w-full bg-white rounded-lg mt-8">
      <div className="flex items-center justify-between px-8 py-4 border-b">
        <button>Rent</button>
        <button>Buy</button>
        <button>Sell</button>
      </div>
      <div className="p-4 flex justify-between items-center">
        <SearchBar
          styles={
            "h-10 placeholder:font-thin border-none w-56 outline-none px-2"
          }
          placeHolder={"Search Location"}
        />
        <button className="bg-primary h-12 w-12 rounded-md text-white text-2xl flex items-center justify-center">
          <LuSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
