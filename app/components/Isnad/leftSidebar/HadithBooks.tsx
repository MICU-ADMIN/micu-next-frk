import React from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Collection } from "./LeftSideBar";

type HadithBooksProps = {
  data: Collection;
  navigate: (slug: string, bookId: number) => void;
  currentBook: string;
};

const HadithBooks = ({ data, navigate, currentBook }: HadithBooksProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [books, setBooks] = React.useState([]);
  const [cachedBooks, setCachedBooks] = React.useState({}) as any;

  const filteredBooks = () => {
    if (filter === "") return books;
    return books.filter((book: any) => {
      return (
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.id.toString().includes(filter)
      );
    });
  };

  const fetchBooks = async () => {
    if (cachedBooks[data.slug]) return setBooks(cachedBooks[data.slug]);
    const books = await fetch(
      `https://isnad.mosque.icu/json/${data.slug}-books.json`,
      {
        cache: "force-cache",
      }
    ).then((res) => {
      return res.json();
    });

    setBooks(books);
    setCachedBooks({ ...cachedBooks, [data.slug]: books });
  };

  return (
    <div
      className={`cursor-pointer mb-1${
        isExpanded ? "border-gray-500 hover:border-b" : ""
      }`}
      onClick={() => {
        fetchBooks();
        setIsExpanded(!isExpanded);
      }}
    >
      <span
        className={` text-gray-700 hover:text-primary-500  ${
          //@ts-expect-error
          currentBook[0] == data.id ? "text-primary-500" : ""
        }`}
      >
        {data.title}
        {isExpanded && (
          <span className="text-gray-500">
            <ArrowDownCircleIcon className="inline-block w-5 h-5 ml-1 text-primary-500" />
          </span>
        )}
      </span>
      {isExpanded && (
        <div className="slideInDown">
          <input
            onClick={(e) => e.stopPropagation()}
            className="w-full p-1 mt-2 mb-2 base-input"
            placeholder="Search Books"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="flex flex-col max-h-[65vh] overflow-y-auto ">
            {filteredBooks().map((book: any) => (
              <div
                className={`flex flex-row  p-[2px] px-2 rounded-md hover:shadow-md text-sm cursor-pointer   ${
                  currentBook === data.id + book.id
                    ? "bg-primary-400 text-white"
                    : "text-gray-900 hover:bg-primary-100"
                }  `}
                key={book.id}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(data.slug, book.id);
                }}
              >
                <span>{book.id})</span>{" "}
                <p title={book?.title_ar} className="ml-2">
                  {" "}
                  {book?.title || book?.title_ar}
                </p>
                {book?.numberOfdata && book.numberOfdata !== 0 ? (
                  <p className="text-gray-500 ml-2">{book.numberOfdata}</p>
                ) : null}
              </div>
            ))}
          </div>
          {/* <hr className="my-1 border-gray-500" /> */}
        </div>
      )}
    </div>
  );
};

export default HadithBooks;
