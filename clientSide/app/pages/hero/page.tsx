"use client";
import HeroTable from "@/app/components/hero/HeroTable";
import { useState } from "react";

const HeroPage = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setIsSearched(true);
      // ตรงนี้ใส่ logic การเรียก API search ของคุณ
    } else {
      setIsSearched(false);
    }
  };
  return (
    <div
      className={`flex flex-col items-center min-h-screen font-sans transition-all duration-700 px-4 ${
        isSearched ? "pt-10" : "justify-center"
      }`}
    >
      <div
        className={`relative w-full max-w-2xl group transition-all duration-500 ${
          isSearched ? "mb-8" : "mb-0"
        }`}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by hero name or power"
          className="w-full py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-200 rounded-full outline-none hover:shadow-md focus:shadow-md focus:border-transparent transition-all duration-200"
        />
      </div>

      {isSearched && (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <HeroTable />
        </div>
      )}
    </div>
  );
};

export default HeroPage;
