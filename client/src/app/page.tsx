"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners"; // Import BarLoader for example

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    // Define the API URL
    const apiUrl =
      "http://localhost:8080/api/news/top-headlines?category=default";

    // Use Axios to fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setArticles(response.data.articles);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the data is fetched
      });
  }, []);
  const formatIndianTime = (isoDate: string | number | Date) => {
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
      <h1 className="p-4 pt-20 ml-4 text-2xl font-bold border-b-2">
        Top headline news
      </h1>
      {loading ? (
        // Render a loading spinner while data is being fetched
        <div className="flex justify-center items-center h-32">
          <BarLoader color="#36D7B7" css={loaderStyle} />
        </div>
      ) : (
        // Render the fetched data once loading is false
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {articles.map((article, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg">
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
