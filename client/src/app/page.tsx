"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const apiUrl =
      "http://localhost:8080/api/news/top-headlines?category=default";

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          setError("Something went wrong"); // Set error message
        }
      })
      .catch((error) => {
        return setError("Something went wrong"); // Set error message
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatIndianTime = (isoDate: string | number | Date) => {
    // Format Indian time as before
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
    <>
      <h1 className="p-4 pt-20 ml-4 text-2xl font-bold border-b-2 flex justify-center items-start">
        Top headline news
      </h1>
      {loading ? (
        <div className="flex flex-col items-center h-32 mt-4">
          <p className="mb-2 text-xl">Loading ...</p>
          <BarLoader color="#36D7B7" css={loaderStyle} />
        </div>
      ) : error ? ( // Render error message if there's an error
        <div className="text-red-500 text-center mt-4 text-2xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
          {articles.map((article, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-lg  shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600 text-sm py-5">
                {article.description}
              </p>
              <Link
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read more
              </Link>
              <p className="text-sm font-bold text-gray-500 mt-2">
                Source: {article.source}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Published : {formatIndianTime(article.publishedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const loaderStyle = css`
  display: block;
  margin: 0 auto;
`;
