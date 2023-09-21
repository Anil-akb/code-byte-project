"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";
import Link from "next/link";

const Search: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("query");

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = `http://localhost:8080/api/news/search?query=${query}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setSearchResults(response.data.articles);
        } else {
          setError("Something went wrong while fetching search results.");
        }
      })
      .catch((error) => {
        setError("Something went wrong while fetching search results.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  const formatIndianTime = (isoDate: string | number | Date) => {
    return new Date(isoDate).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div className="pt-20 px-6">
      <h1 className="text-2xl font-semibold">Search Results for: {query}</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <BarLoader color="#36D7B7" css={loaderStyle} />
        </div>
      ) : error ? ( // Display error message if there's an error
        <div className="text-red-500 mt-4">{error}</div>
      ) : (
        <div className="mt-4 ">
          {searchResults.map((article, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-lg  shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read more
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Source: {article.source}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Published At: {formatIndianTime(article.publishedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const loaderStyle = css`
  display: block;
  margin: 0 auto;
`;

export default Search;
