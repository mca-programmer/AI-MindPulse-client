import React, { useContext, useEffect, useState } from "react";
import { AunthContext } from "../Auth/AuthProvider";
import Cards from "../Component/Cards";
import { useLocation } from "react-router";
import Loader from "../Component/Loader";

const Modals = () => {
  const { setDetails } = useContext(AunthContext);
  const location = useLocation();

  const [aiS, setAi] = useState([]);
  const [filteredAi, setFilteredAi] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setLoading] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    setLoading(true);
    fetch("https://ai-mind-pulse-server.vercel.app/allmodals")
      .then((res) => res.json())
      .then((data) => {
        setAi(data);
        setFilteredAi(data);
        setLoading(false);
      });
  }, []);

  // Get unique framework names
  let uniqueNamesArray = ["All", ...new Set(filteredAi.map((item) => item.framework))];

  // Filter by framework
  const filtering = (framework) => {
    if (framework === "All") {
      setFilteredAi(aiS);
    } else {
      const filtered = aiS.filter((item) => item.framework === framework);
      setFilteredAi(filtered);
    }
    setSearchQuery(""); // clear search when selecting filter
  };

  // Search handler
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const regex = new RegExp(query, "i");
      const filtered = aiS.filter((ai) => regex.test(ai.name));
      setFilteredAi(filtered);
    } else {
      setFilteredAi(aiS);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredAi(aiS);
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 py-6">
      {/* Top bar: Dropdown + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Dropdown */}
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="btn text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg px-6 py-3 shadow-lg hover:scale-105 transition-transform"
          >
            Filter
          </button>

          {isOpen && (
            <ul className="absolute mt-2 w-52 bg-white rounded-xl shadow-lg z-10 overflow-hidden">
              {uniqueNamesArray.map((name) => (
                <li
                  key={name}
                  className="hover:bg-purple-100 cursor-pointer"
                  onClick={() => filtering(name)}
                >
                  <span className="block px-4 py-2 text-sm text-gray-800">{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full max-w-[400px]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search models..."
            className="w-full py-3 pl-4 pr-10 rounded-full bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all"
          />
          {/* Icon: search or X */}
          {searchQuery ? (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors"
            >
              &#x2715; {/* X icon */}
            </button>
          ) : (
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {isloading ? (
        <Loader />
      ) : filteredAi.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAi.map((ai) => (
            <Cards key={ai._id} ai={ai} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No models found.</p>
      )}
    </div>
  );
};

export default Modals;
