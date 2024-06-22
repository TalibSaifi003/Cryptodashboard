import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cryptoCurrency, networkError } from "../state/actions";
import axios from "axios";

const SearchBox = () => {
  const [content, setContent] = useState([]);
  const [searchCurrency, setSearchCurrency] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchValues, setSearchValue] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const HandelContent = async () => {
      try {
        const { data } = await axios.get(
          "https://tusharoxacular09.github.io/cryptocurrency_api/api.json"
        );
        setContent(data);
      } catch (error) {
        dispatch(networkError(true));
      }
    };

    HandelContent();
  }, [dispatch]);

  useEffect(() => {
    function checkSearchDetails() {
      if (searchCurrency.length === 0) {
        setIsOpen(false);
        setSearchValue([]);
        return;
      }

      content.map((currency) => {
        if (
          currency.name.toLowerCase().startsWith(searchCurrency.toLowerCase())
        ) {
          return setSearchValue((prev) => [...prev, currency.name]);
        }
        return setSearchValue((prev) => [...prev]);
      });
    }

    checkSearchDetails();
  }, [searchCurrency, content]);

  return (
    <div className="relative max-lg:mt-1  min-lg:w-8/12 bg-white h-12 lg:h-14 flex items-center px-6 shadow-sm transition ease-in-out hover:ring-4 ring-blue-400 ring-offset-slate-50 rounded-md">
      <img
        className="max-lg:w-6"
        src="./search-icon.svg"
        alt="SearchImage"
      />
      <input
        value={searchCurrency}
        onChange={(e) => {
          setIsOpen(true);
          setSearchValue([]);
          setSearchCurrency(e.target.value);
        }}
        type="text"
        className="text-base lg:text-lg text-gray-500 font-medium h-full focus:outline-none lg:w-[100vh] pl-2 ml-1"
        placeholder="Search by coin"
      />
      {isOpen && (
        <div className="absolute w-full top-11 max-sm:top-9 right-0 z-10 mt-4 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg">
          <div>
            {searchValues.map((currency, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    dispatch(cryptoCurrency(currency));
                    setIsOpen(false);
                    setSearchCurrency(currency);
                  }}
                  className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-gray-600 no-underline hover:bg-gray-100 cursor-pointer"
                >
                  {currency}
                </div>
              );
            })}
            {searchValues.length === 0 && (
              <div className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-gray-600 no-underline cursor-pointer">
                No Result
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
