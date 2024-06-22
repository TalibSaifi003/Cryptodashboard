import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CoinList } from '../../api/api';
import { Pie } from 'react-chartjs-2';

function Portfolio() {
  const [topCrypto, setTopCrypto] = useState([]);
  const selectedCurrency = useSelector((state) => state.currentCryptoCurrency);
  const selectedCountry = useSelector((state) => state.currentCountry);
  const [totalVal, setTotalVal] = useState(0);
  const dispatch = useDispatch();
  const getSymbol = (selectedCountry) =>{
    switch(selectedCountry) {
      case 'USD':
        return '$';
      case 'INR':
        return '₹';
      case 'EUR':
        return '€';
      default:
        return '$'
    }

  }
 const symbol= getSymbol(selectedCountry)
  

  useEffect(() => {
    const fetchTop3Crypto = async () => {
      try {
        const response = await axios.get(CoinList(selectedCountry));
        setTopCrypto(response.data.slice(0, 3)); // Adjusted to get top 3 directly
      } catch (error) {
        console.error('Error fetching top cryptocurrencies:', error);
      }
    };
    fetchTop3Crypto();
  }, [selectedCurrency, selectedCountry]); // Dependencies to trigger re-fetch

  useEffect(() => {
    const calculateTotalVal = () => {
      const val = topCrypto.reduce((acc, crypto) => acc + crypto.total_volume, 0);
      setTotalVal(val);
    };
    calculateTotalVal();
  }, [topCrypto]);

  return (
    <div className="ml-2 mt-2 xl:w-1/2 flex max-sm:flex-col p-0.5 lg:h-64 h-fit bg-white shadow-sm transition ease-in-out hover:ring-4 ring-blue-400 ring-offset-slate-50 rounded-md">
      <div className="w-3/12 max-sm:w-full max-sm:gap-1 flex flex-col items-start justify-between pt-2 pl-2">
        <p className="max-sm:text-base text-xl align-middle font-semibold">Portfolio</p>
        <div className="flex flex-col">
          {topCrypto.map((crypto, i) => (
            <div key={i} className="flex items-center gap-1">
              <img src={crypto.image} alt="logo" className="w-4 h-4" />
              <p className="font-medium text-base max-sm:text-sm">{crypto.name}:</p>
              <p className="text-base max-sm:text-sm">{symbol}{crypto.total_volume}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 align-middle max-sm:text-base text-xl">
          Total value <span className="text-black font-semibold">{symbol}{totalVal}</span>
        </p>
      </div>
      <div className="w-9/12 max-sm:w-full h-full">
        <Pie
          data={{
            labels: topCrypto.map((crypto) => crypto.name),
            datasets: [
              {
                label: 'Value',
                data: topCrypto.map((crypto) => crypto.total_volume),
                backgroundColor: ['#FF6361', '#2984C3', '#39C05E'],
                borderColor: ['#FF6361', '#2984C3', '#39C05E'],
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default Portfolio;
