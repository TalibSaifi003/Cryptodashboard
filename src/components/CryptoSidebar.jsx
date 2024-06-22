import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../api/api';
import { CryptoState } from '../CryptoContext';
import { useDispatch, useSelector } from 'react-redux';

function CryptoSidebar() {
    const dispatch = useDispatch()
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const currency = useSelector((state)=>state.currentCountry)
    const getSymbol = (currency) => {
        switch (currency) {
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
                case 'INR':
                    return '₹';
            // Add more cases for other currencies
            default:
                return '$';
        }
    };

    const symbol = getSymbol(currency);

    const fetchCoin = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(CoinList(currency));
            setCoins(data);
        } catch (error) {
            console.error('Error fetching coin data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoin();
    }, [currency]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ml-2 mr-4 top hover:border-4 hover:border-blue-400 rounded-xl mt-4 bg-white overflow-y-scroll min-w-[200px] h-[104vh]">
            <h1 className='text-center font-5 mt-3 text-lg font-bold'>Crypto Currency By Market Cap</h1>
            {coins.map((item, index) => (
                <React.Fragment key={index}>
                    <div className="coin-item mt-4 ml-2 flex justify-between items-center">
                        <div>
                            <div className="coin-info flex items-center">
                                <img src={item.image} width="20px" alt={item.name} className="coin-image" />
                                <span className="coin-name">{item.name}</span>
                            </div>
                            <div className="coin-marketcap">Current Price:{symbol}{item.current_price}</div>
                        </div>
                        <div className="price-change flex items-center">
                            {item.price_change_percentage_24h > 0 ? (
                                <div className="flex items-center">
                                    <svg
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 12 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.1921 9.23047L15.9065 13.6879C16.3408 14.2089 15.9702 15 15.292 15L8.70803 15C8.02976 15 7.65924 14.2089 8.09346 13.6879L11.8079 9.23047C11.9079 9.11053 12.0921 9.11053 12.1921 9.23047Z"
                                            fill="#69ca00"
                                        />
                                    </svg>
                                    <p className="text-green-500 font-semibold pl-2">
                                        {item.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <svg
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 12 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.8079 14.7695L8.09346 10.3121C7.65924 9.79109 8.02976 9 8.70803 9L15.292 9C15.9702 9 16.3408 9.79108 15.9065 10.3121L12.1921 14.7695C12.0921 14.8895 11.9079 14.8895 11.8079 14.7695Z"
                                            fill="#ff8000"
                                        />
                                    </svg>
                                    <p className="text-orange-500 font-semibold pl-1">
                                        {item.price_change_percentage_24h.toFixed(2)}%
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                </React.Fragment>
            ))}
        </div>
    );
}

export default CryptoSidebar;
