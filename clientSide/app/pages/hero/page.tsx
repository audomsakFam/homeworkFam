/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import HeroTable from "@/app/components/hero/HeroTable";
import { useDebounce } from "@/app/lib/useDebounce";
import { heroesService } from "@/app/services/heroes.service";
import { Heroes } from "@/app/types";
import { useEffect, useState } from "react";

const HeroPage = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [heroes, setHeroes] = useState<Heroes[] | null>(null);
  const [suggestions, setSuggestions] = useState<Heroes[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const fetchSuggestions = async (text: string) => {
    try {
      const res = await heroesService.searchHero(text);
      setSuggestions(res || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setIsSearched(true);
      fetchHero(inputValue);
    } else {
      setIsSearched(false);
    }
  };

  const handleSearch = (text: string) => {
    setIsSearched(true);
    setShowSuggestions(false);
    setInputValue(text);
    fetchHero(text);
  };

  const fetchHero = async (text: string) => {
    const res = await heroesService.searchHero(text);
    setHeroes(res);
  };

  useEffect(() => {
    if (debouncedSearchTerm && !isSearched) {
      fetchSuggestions(debouncedSearchTerm);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div
      className={`flex flex-col items-center min-h-screen font-sans transition-all duration-700 px-4 ${
        isSearched ? "pt-10" : "justify-center"
      }`}
      onClick={() => setShowSuggestions(false)}
    >
      <div
        className={`relative w-full max-w-2xl group transition-all duration-500 ${
          isSearched ? "mb-8" : "mb-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-20">
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
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
              if (isSearched) setIsSearched(false);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Search hero by name or power"
            className={`w-full py-3 pl-12 pr-12 text-gray-900 bg-white border border-gray-200 outline-none hover:shadow-md focus:shadow-md focus:border-transparent transition-all duration-200 ${
              showSuggestions && suggestions.length > 0
                ? "rounded-t-3xl rounded-b-none"
                : "rounded-full"
            }`}
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-gray-200 rounded-b-3xl shadow-lg z-10 overflow-hidden">
            <ul>
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSearch(item.name)}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 min-w-4"
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

                  <div className="flex flex-col">
                    <span
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: item.highlightedName || item.name,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isSearched && (
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-4">
          <HeroTable data={heroes} />
        </div>
      )}
    </div>
  );
};

export default HeroPage;
