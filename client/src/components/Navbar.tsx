"use client";

import React, { useState } from "react";
import Link from "next/link";
import { menuData } from "../utils/Constants";

const Navbar: React.FC = () => {
  const [query, setQuery] = useState(""); // State to store the search query

  // Function to handle the search query input change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Function to handle the search form submission
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirect to the search results page with the query as a URL parameter
    window.location.href = `/search?query=${query}`;
  };

  return (
    <nav className="bg-gray-800 py-4 px-8 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white text-2xl font-semibold">NEWS ROOM</p>
        </Link>
        <form onSubmit={handleSearch} className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
            className="bg-gray-200 px-2 py-1 rounded"
          />
          <button type="submit" className="text-white">
            Search
          </button>
        </form>
        <ul className="flex space-x-4">
          {menuData.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`text-white  ${
                  item.disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <p>{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
