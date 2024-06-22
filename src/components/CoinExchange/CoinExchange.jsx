import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function CoinExchange() {
    const dispatch = useDispatch()
    const [sell, setSell] = useState(null)
    const [buy, setBuy] = useState(null)
    const [isSellOpen, setIsSellOpen] = useState(false);
    const [isBuyOpen, setIsBuyOpen] = useState(false)
    const [targetedCurrencies, setTargetedCurrencies] = useState([])
    const [sellAmount, setSellAmount] = useState(null)
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellDetails, setSellDetails] = useState({});
    const [buyDetails, setBuyDetails] = useState({});
    const [error, setError] = useState(false)

    const togglingSell = () => {
        setIsSellOpen((prev) => !prev)
    }
    const togglingBuy = () => {
        setIsBuyOpen((prev) => !prev)
    }

    const selectBuyCurrency = (currency) => {
        setBuy(currency);
        setIsBuyOpen((prev) => !prev)
    }

    const selectSellCurrency = (currency) => {
        setSell(currency);
        setIsSellOpen((prev) => !prev)
    }

    useEffect(() => {
        const getExchangeRate = async () => {
            try {
                const myCurrencies = await axios.get('https://api.coingecko.com/api/v3/exchange_rates')
                setTargetedCurrencies(myCurrencies.data.rates)
            } catch (err) {
                console.error("Error fetching exchange rates: ", err)
            }
        }
        getExchangeRate();
    }, [dispatch])

    const HandleClick = () => {
        if (sell && buy && sellAmount && sellDetails && buyDetails) {
            const sellValue = parseFloat(sellAmount) * parseFloat(sellDetails.value)
            const buyAmt = sellValue / parseFloat(buyDetails.value)
            setBuyAmount(buyAmt.toFixed(2));
        } else {
            setError(true)
        }
    }

    return (
        <div className="mt-2 xl:w-1/2 h-64 max-sm:px-3 px-8 py-3 bg-white shadow-sm transition ease-in-out hover:ring-4 ring-blue-400 ring-offset-slate-50 rounded-md">
            <p className="max-sm:text-lg text-xl font-semibold">
                Exchange Currencies
            </p>
            <div className="flex flex-col mt-4 gap-5">
                <div className="flex items-start justify-between">
                    <div className="w-1/2 flex items-center max-sm:gap-1 gap-3">
                        <p className="text-orange-500 font-medium max-sm:text-sm">Sell</p>
                        <div className="w-10/12 max-sm:ml-[-7px] max-sm:h-10 h-12 flex rounded-md border hover:text-blue-700 hover:border-blue-500">
                            <div className="w-full h-full items-center relative flex rounded-md bg-slate-100 shadow-sm">
                                <div
                                    onClick={togglingSell}
                                    className="w-full rounded-l-md px-4 max-sm:px-2 font-medium max-sm:text-xs max-md:text-sm lg:text-base cursor-pointer"
                                >
                                    {sell || "Currency"}
                                </div>
                                <div onClick={togglingSell} className="h-full max-sm:w-[40px] relative">
                                    <button
                                        type="button"
                                        className="flex h-full items-center justify-center rounded-r-md border-1 border-gray-10 px-2 hover:bg-gray-200"
                                    >
                                        {!isSellOpen && (
                                            <img src="./dropdown.svg" width={40} alt="" />
                                        )}
                                        {isSellOpen && (
                                            <img src="./drop-up.svg" alt="" />
                                        )}
                                    </button>
                                </div>

                                {isSellOpen && (
                                    <div className="max-sm:h-[95px] max-sm:w-[90px] w-[145px] h-[140px] absolute max-sm:top-6 top-9 right-0 z-10 mt-4 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg overflow-y-scroll">
                                        <div>
                                            {Object.keys(targetedCurrencies).map((currency, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        onClick={() => {
                                                            selectSellCurrency(
                                                                targetedCurrencies[currency].name
                                                            );
                                                            setSellDetails(targetedCurrencies[currency]);
                                                        }}
                                                        className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-gray-600 no-underline hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {targetedCurrencies[currency].name}
                                                    </div>
                                                );
                                            })}
                                            {error && <p className="text-center py-2">No Result</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <input
                            type="text"
                            placeholder="Enter amount"
                            onChange={(e) => setSellAmount(e.target.value)}
                            className="max-sm:h-10 h-12 w-10/12 max-sm:px-2 px-4 text-lg max-sm:text-xs text-gray-500 border-2 border-gray-300 rounded-lg focus:outline-blue-500 font-medium focus:text-blue-600 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex ">
                    <div className="w-1/2 flex items-center max-sm:gap-1 gap-3">
                        <p className="text-green-500 font-medium max-sm:text-sm">Buy</p>
                        <div className="w-10/12 max-sm:ml-[-7px] max-sm:h-10 h-12 flex rounded-md border hover:text-blue-700 hover:border-blue-500">
                            <div className="w-full  h-full items-center relative flex rounded-md bg-slate-100 shadow-sm">
                                <div
                                    onClick={togglingBuy}
                                    className="w-full rounded-l-md px-4 max-sm:px-2 font-medium max-sm:text-xs max-md:text-sm lg:text-base cursor-pointer"
                                >
                                    {buy || "Currency"}
                                </div>
                                <div onClick={togglingBuy} className="h-full w-[60px] relative">
                                    <button
                                        type="button"
                                        className="flex h-full items-center justify-center rounded-r-md border-1 border-gray-10 px-2 hover:bg-gray-200"
                                    >
                                        {!isBuyOpen && (
                                            <img src="./dropdown.svg" alt="" width={40} />
                                        )}
                                        {isBuyOpen && <img src="./drop-up.svg" alt="" width={40} />}
                                    </button>
                                </div>

                                {isBuyOpen && (
                                    <div className="max-sm:h-[95px] max-sm:w-[90px] w-[145px] h-[140px] absolute max-sm:top-6 top-9 right-0 z-10 mt-4 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg overflow-y-scroll">
                                        <div>
                                            {Object.keys(targetedCurrencies).map((currency, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        onClick={() => {
                                                            selectBuyCurrency(
                                                                targetedCurrencies[currency].name
                                                            );
                                                            setBuyDetails(targetedCurrencies[currency]);
                                                        }}
                                                        className="block rounded-lg px-4 py-2 max-sm:text-xs text-base text-gray-600 no-underline hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {targetedCurrencies[currency].name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <p className="text-green-500 font-bold max-sm:text-sm">
                            {buyAmount} {buy}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={HandleClick}
                            className="text-white font-medium max-sm:px-4 max-sm:py-2 px-6 py-3 rounded-lg max-sm:text-sm bg-blue-500 hover:bg-blue-600 cursor-pointer"
                        >
                            Exchange
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinExchange
