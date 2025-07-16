import {
  mainAdvika,
  beritaTerbaru,
  beritaTrending,
} from "../../mocks/advikaMock";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        className="w-10 h-10 rounded-lg bg-indigo-200 text-gray-700 hover:bg-indigo-300 transition disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="w-10 h-10 flex items-center justify-center text-lg text-gray-400">...</span>
        ) : (
          <button
            key={page}
            className={`w-10 h-10 rounded-lg ${
              page === currentPage
                ? "bg-indigo-700 text-white"
                : "bg-indigo-200 text-gray-700 hover:bg-indigo-300"
            } text-lg font-medium transition`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="w-10 h-10 rounded-lg bg-indigo-200 text-gray-700 hover:bg-indigo-300 transition disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default function Advika() {
  return (
    <div className="bg-[url('/images/bg-pattern.png')] bg-cover bg-center bg-no-repeat px-10 md:px-20 lg:px-32 pb-1">
      {/* Title Section */}
      <div id="title" className="pt-[.1px]">
        <h2 className="uppercase font-bold text-2xl text-[#2A2A2A] mb-2 mt-12">
          advika
        </h2>
        <h4 className="capitalize text-xl opacity-[60%]">
          advokasi informasi kampus
        </h4>
      </div>

      {/* Main News */}
      <MainNews />

      <div className="flex flex-col lg:flex-row gap-2">
        {/* New News */}
        <NewNews />

        {/* Trending News */}
        <TrendingNews />
      </div>
    </div>
  );
}

const TrendingNews = () => {
  return (
    <div className="max-w-xs w-full">
      <div className="bg-[#ED9E31] text-white px-[.5rem] text-[1.2rem] tracking-tighter rounded-[3px] hover:brightness-90 transition-all duration-500 ease-in-out mt-[2rem] mb-[1.6rem] cursor-pointer w-fit">
        <h1 className="uppercase">trending</h1>
      </div>
      <div className="flex flex-col gap-3">
        {beritaTrending.map((item) => (
          <NavLink
            to={item.link}
            key={item.id}
            target="_blank"
            className="flex items-center gap-3 rounded-lg shadow p-2 hover:shadow-lg transition"
            style={{ minWidth: 0 }}
          >
            <img
              src={item.imagePath}
              alt={item.title}
              className="w-14 h-14 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-[#2A2A2A] truncate">{item.title}</h3>
              <p className="text-[.6rem] text-gray-500 truncate">{item.date}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const NewNews = () => {
  // Pagination logic
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(beritaTerbaru.length / perPage);
  const pagedData = beritaTerbaru.slice((page - 1) * perPage, page * perPage);


  return (
    <div>
      <div className="bg-[#0B4D9B] text-white px-[.5rem] text-[1.2rem] tracking-tighter rounded-[3px] hover:opacity-80 transition-all duration-500 ease-in-out mt-[2rem] mb-[1.6rem] cursor-pointer w-fit">
        <h1 className="uppercase">berita terbaru</h1>
      </div>
      <Berita data={pagedData} />
      <div className="flex flex-row">
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

const Berita = ({ data }) => {
  const repeatTimes = 1;
  const repeatedMock = Array.from({ length: repeatTimes }).flatMap(() => data);
  return (
    <div>
      {repeatedMock.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="flex flex-col lg:flex-row items-start gap-4 p-4 rounded-xl cursor-pointer shadow hover:shadow-lg hover:brightness-95 transition duration-300 mb-3"
        >
          {/* Image Section */}
          <NavLink
            to={item.link}
            target="_blank"
            className="w-full lg:w-[260px] h-[180px] rounded-lg overflow-hidden flex-shrink-0 block"
          >
            <img
              src={item.imagePath}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </NavLink>

          {/* Text Content Section */}
          <div className="flex flex-col justify-between w-full">
            <div>
              <h3 className="text-2xl font-bold text-[#2A2A2A] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.description}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              <span>{item.date}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MainNews = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between mt-6 gap-x-1">
        <div>
          {mainAdvika
            .filter((item) => item.id === 1)
            .map((item) => (
              <NavLink
                to={item.link}
                key={item.id}
                className="block"
                target="_blank"
              >
                <div className="grid relative rounded-[.2rem] overflow-hidden w-full max-w-full hover:brightness-90 transition-all duration-500 ease-in-out mb-[4px] cursor-pointer">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-auto object-cover row-start-1 col-start-1"
                  />

                  <div className="row-start-1 col-start-1 self-end p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-blue-300">
                      {item.author} -{" "}
                      <span className="text-white">{item.date}</span>
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
        </div>

        <div>
          {mainAdvika
            .filter((item) => item.id !== 1)
            .map((item) => (
              <div
                key={item.id}
                className="grid relative rounded-[.2rem] overflow-hidden w-full max-w-full hover:brightness-90 transition-all duration-500 ease-in-out mb-[1px] cursor-pointer"
              >
                <NavLink
                  to={item.link}
                  target="_blank"
                  className="w-full h-auto object-cover row-start-1 col-start-1 block"
                >
                  <img src={item.imagePath} alt={item.title} />
                </NavLink>
                <div className="row-start-1 col-start-1 self-end p-1 pr-[1.8rem] bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
                  <h3 className="text-xs font-bold mb-2">{item.title}</h3>
                  <p className="text-[.5rem] text-white">{item.date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};