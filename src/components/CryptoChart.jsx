import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { TrendingCoins } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { cryptoCurrency } from '../state/actions';

function CryptoChart() {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state) => state.currentCryptoCurrency);
  const [isOpen, setIsOpen] = useState(false);
  const [trending, setTrending] = useState([]);

  const fetchTradingcoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(selectedCurrency));
      setTrending(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  };

  useEffect(() => {
    if (selectedCurrency) {
      fetchTradingcoins();
    }
  }, [selectedCurrency]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const selectCurrency = (currency) => {
    dispatch(cryptoCurrency(currency));
    setIsOpen(false);
  };

  return (
    <div className='flex flex-row-reverse max-sm:ml-[120px] max-sm:!flex-row'>
      <div className=" max-sm:w-12/12 max-lg:w-6/12 max-sm:h-6 h-10 flex rounded-md hover:border-blue-500">
        <div className="w-full h-full items-center relative flex rounded-md bg-slate-100 mr-2 shadow-sm">
          <div
            className='w-[173px] rounded-l-md px-4 max-sm:px-2 py-2 font-medium max-sm:text-xs max-md:text-sm lg:text-base cursor-pointer'
            onClick={toggle}
          >
            {selectedCurrency}
          </div>
          <div
            onClick={toggle}
            className='flex h-full w-12 items-center justify-center rounded-r-md border-1 border-gray-10 px-2 hover:bg-gray-200'
          >
            <button type='button'>
              {!isOpen && <img src='./dropdown.svg' alt="dropdown icon" />}
              {isOpen && <img src='./drop-up.svg' alt="drop-up icon" />}
            </button>
          </div>
          {isOpen && (
            <div className='min-w-[200px] max-h-[250px] absolute max-sm:top-2 top-7 right-0 z-10 mt-4 mr-4 origin-top-right rounded-md border overflow-y-scroll border-gray-100 bg-white shadow-lg cursor-pointer'>
              {trending.map((item, index) => (
                <div className='text-black-500 ml-4 uppercase font-bold'
                  key={index}
                  onClick={() => selectCurrency(item.name)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default CryptoChart;
