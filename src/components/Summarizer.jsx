import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";

const Summarizer = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted");

    setArticle({ ...article, url: "" });
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
        <div>history</div>
      </div>

      {/* Display summary */}
    </section>
  );
};

export default Summarizer;
