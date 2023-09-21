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
  const query = searchParams.get("query");

  useEffect(() => {
    setLoading(true); // Start loading

    // Define the API URL with the query parameter
    const apiUrl = `http://localhost:8080/api/news/search?query=${query}`;

    // Use Axios to fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setSearchResults(response.data.articles);
        } else {
          console.error("Error fetching search results:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading when the data is fetched
      });
  }, [query]);

  const formatIndianTime = (isoDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return new Date(isoDate).toLocaleString("en-IN", options);
  };

  return (
    <div className="pt-20 px-6">
      <h1 className="text-2xl font-semibold">Search Results for: {query}</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <BarLoader color="#36D7B7" css={loaderStyle} />
        </div>
      ) : (
        <div className="mt-4 ">
          {searchResults.map((article, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-lg"
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
