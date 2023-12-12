import React from "react";

function ArticlesSidebar({ articles }: any) {
  return (
    <div className="w-1/4 p-4 hidden md:block px-16">
      {/* Categories */}
      <div className="mb-4">
        <h2 className="text-lg  mb-2">Categories</h2>
        {/* Render your categories here */}
        <ul>
          <li>Category 1</li>
          <li>Category 2</li>
          {/* Add more categories */}
        </ul>
      </div>

      {/* Featured Articles */}
      <div>
        <h2 className="text-lg  mb-2">Featured Articles</h2>
        {/* Render your featured articles here */}
        <ul>{articles.map((article) => article.featured && <li key={article.id}>{article.title}</li>)}</ul>
      </div>
    </div>
  );
}

export default ArticlesSidebar;
