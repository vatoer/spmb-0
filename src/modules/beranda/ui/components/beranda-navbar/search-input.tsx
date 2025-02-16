import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    // TODO: add search input functionality
    <form className="hidden md:flex w-full max-w-[800px]">
      <div className="relative w-full">
        <input
          type="text"
          name=""
          id=""
          className="w-full h-10 pl-4 pr-2 py-2 border rounded-l-full focus:outline-none focus:border-blue-300"
          placeholder="Search"
        />
        {/* TODO: add remove search button */}
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-4" />
      </button>
    </form>
  );
};

export default SearchInput;
