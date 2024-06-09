import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import SearchBar from '../elements/SearchBar';

const SearchBox = () => {
  const [selectedField, setSelectedField] = useState('Rent');

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  return (
    <div className="w-full bg-white rounded-lg mt-8">
      <div className="flex items-center justify-between px-8 py-4 border-b">
        {['Rent', 'Buy', 'Sell'].map((field) => (
          <button
            key={field}
            onClick={() => handleFieldClick(field)}
            className={`pb-2 ${
              selectedField === field ? 'border-b-2 border-primary' : ''
            }`}
          >
            {field}
          </button>
        ))}
      </div>
      <div className="p-4 flex justify-between items-center">
        <SearchBar
          styles="h-10 placeholder:font-thin border-none w-56 outline-none px-2"
          placeHolder="Search Location"
          selectedField={selectedField}
        />
        <button className="bg-primary h-12 w-12 rounded-md text-white text-2xl flex items-center justify-center">
          <LuSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
