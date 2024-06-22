import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { numberOfDays } from '../../state/actions';
import LineChart from '../LineChart';
import CryptoChart from '../CryptoChart';

function ChartHeading() {
  const dispatch = useDispatch();
  const selectedCryptoCurrency = useSelector((state) => state.currentCryptoCurrency);
  const selectedCountry = useSelector((state) => state.currentCountry);
  const [days, setDays] = useState({
    one: false,
    week: false,
    month: false,
    six_months: false,
    year: true,
  });
  const mystyle = `bg-slate-100 max-sm:!p-1 max-sm:text-xs  px-4 py-2 max-lg:px-3 max-sm:rounded-lg rounded-xl max-sm:border border-2 hover:bg-blue-200 cursor-pointer`;

  const handleDaysChange = (period, stateUpdate) => {
    console.log(`Setting period to ${period} days`); // Debugging log
    dispatch(numberOfDays(period));
    setDays(stateUpdate);
  };

  return (
    <div>
      <div className="mt-4 p-1 w-full bg-white shadow-sm transition ease-in-out hover:ring-4 ring-blue-400 ring-offset-slate-50 rounded-md">
        <div className="h-1/6 pt-2">
          <div className="max-sm:h-[68px] pb-1 flex">
            <div className="lg:w-2/12 h-full"></div>
            <div className="w-6/12 lg:w-5/12 h-full flex justify-evenly items-center lg:font-medium">
              <div
                className={`${mystyle} ${days.one ? "border-blue-800 text-blue-700" : ""}`}
                onClick={() => handleDaysChange(1, { one: true, week: false, month: false, six_months: false, year: false })}
              >
                1D
              </div>
              <div
                className={`${mystyle} ${days.week ? "border-blue-800 text-blue-700" : ""}`}
                onClick={() => handleDaysChange(7, { one: false, week: true, month: false, six_months: false, year: false })}
              >
                7D
              </div>
              <div
                className={`${mystyle} ${days.month ? "border-blue-800 text-blue-700" : ""}`}
                onClick={() => handleDaysChange(30, { one: false, week: false, month: true, six_months: false, year: false })}
              >
                1M
              </div>
              <div
                className={`${mystyle} ${days.six_months ? "border-blue-800 text-blue-700" : ""}`}
                onClick={() => handleDaysChange(180, { one: false, week: false, month: false, six_months: true, year: false })}
              >
                6M
              </div>
              <div
                className={`${mystyle} ${days.year ? "border-blue-800 text-blue-700" : ""}`}
                onClick={() => handleDaysChange(365, { one: false, week: false, month: false, six_months: false, year: true })}
              >
                1Y
              </div>
            </div>
            <div className="w-6/12 h-full flex max-sm:flex-col items-center justify-center gap-2 md:gap-4 lg:gap-6">
              <CryptoChart />
              <LineChart />
            </div>
          </div>
          <div className="flex justify-between px-4 lg:px-14">
            <p className="font-medium">{selectedCountry}</p>
            <div className="flex gap-1 items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <p className="font-medium">{selectedCryptoCurrency}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartHeading;
