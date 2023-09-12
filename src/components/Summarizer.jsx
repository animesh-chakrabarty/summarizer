import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

import { useLazyGetSummaryQuery } from "../services/article";

const Summarizer = () => {
  // stores the current article url and summary
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  // to toggle between tick and copy img
  const [copied, setCopied] = useState("");
  // stores previous article urls and summaries
  const [allArticle, setAllArticle] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load all articles from local storage on page mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticle(articlesFromLocalStorage);
    }
  }, []);

  // copy article link to clipboard
  const handleCopy = (copyUrl) => {
    navigator.clipboard.writeText(copyUrl);
    setCopied(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  // submit article link
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticle = [...allArticle, newArticle];

      setArticle(newArticle);
      setAllArticle(updatedAllArticle);

      // save previous articles to local storage
      localStorage.setItem("articles", JSON.stringify(updatedAllArticle));

      console.log(newArticle);
    }

    // setArticle({ ...article, url: "" });
  };
  const handlekeyDown = () => {};

  return (
    <section className="mt-16 w-full max-w-xl ">
      {/* search & browse History */}
      <div className="w-full flex flex-col gap-2 ">
        {/* search  */}
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="linkIcon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handlekeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* browse history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
          {allArticle.map((item, index) => (
            <div
              key={`link-${index}`}
              className="link_card"
              onClick={() => setArticle(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="h-[20px] w-[20px] object-contain "
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display summary */}
      <div className="my-10 flex items-center justify-center max-w-full">
        {isFetching ? (
          <img
            src={loader}
            alt="loader"
            className="h-[80px] w-[80px] object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold font-black text-center">
            Something Went Wrong
            {error.message}
          </p>
        ) : (
          <div className="flex flex-col gap-4 my-6">
            <h2 className="text-center font-satoshi font-bold text-[24px] ">
              Article <span className="blue_gradient">Summary </span>
            </h2>
            <div className="summary_box">
              <p className="font-inter font-medium  text-gray-700">
                {article.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Summarizer;
