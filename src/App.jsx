import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css'

import Header from './components/Header'
import NavbarSection from './components/NavbarSection';
import CryptoSidebar from './components/CryptoSidebar';
import CryptoChart from './components/CryptoChart';
import LineChart from './components/LineChart';
import Footer from './components/Footer';
import CryptoContext from './CryptoContext';
import MainChart from './components/Chart/MainChart';
import Portfolio from './components/Portfolio/Portfolio';
import CoinExchange from './components/CoinExchange/CoinExchange';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <Header />
      <div className='max-sm:p-2 p-4 flex max-xl:flex-col '>
      <div className='xl:w-9/12 '>
        <NavbarSection />
        {/* <CryptoChart />  */}
        <MainChart />
        <div className='mt-4 flex max-xl:flex-col gap-4'>
        <Portfolio/>
        <CoinExchange />
        </div>
         </div>
        <div className='mt-[70px] xl:w-3/12 xl:ml-4 max-xl:mt-4'>
          <CryptoSidebar />
        </div>
       
       
      </div>
      <div className='mt-5'> <Footer /></div>
    </div>
  )
}

export default App
