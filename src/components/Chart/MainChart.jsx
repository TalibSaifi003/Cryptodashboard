import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoricalChart } from '../../api/api';
import { networkError } from '../../state/actions';
import { Bar, Line } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import ChartHeading from './ChartHeading';

function MainChart() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.currentCryptoCurrency);
  const currency = useSelector((state) => state.currentCountry);
  const days = useSelector((state) => state.daysCount);
  const chart = useSelector((state) => state.chartTypeSelector);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(HistoricalChart(id.toLowerCase(), days, currency));
        setData(response.data.prices);
      } catch (error) {
        if (error.message === 'Request failed with status code 404') {
          toast.warning(`The Data is unavailable for ${id.toUpperCase()}`);
        } else if (error.message === 'Network Error') {
          dispatch(networkError(true));
        }
        console.log(error.message);
      }
    };
    getData();
  }, [id, days, currency, dispatch]);

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.plugins.title.display = true;
  defaults.plugins.title.align = 'start';
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = 'black';

  return (
    <div className='bg-white ml-2 \ rounded-xl '>
      <ChartHeading />
    <div className='h-full px-4 lg:px-12'>
      {chart === "Bar-Chart" && (<div style={{ height: '350px' }}>
        <Bar
          data={{
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Price',
                data: data.map((element) => element[1]),
                backgroundColor: [
                  'rgba(43, 63, 229, 0.8)',
                  'rgba(250, 192, 19, 0.8)',
                  'rgba(75, 192, 192, 0.8)',
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(255, 206, 86, 0.8)',
                  'rgba(253, 135, 135, 0.8)',
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>)}
      {chart === "Line-Chart" && (
        <div style={{ height: '350px' }}>
        <Line
          data={{
            labels: data.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                label: "Price",
                data: data.map((element) => element[1]),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
          }}
        />
        </div>
      )}
      
    </div>
    </div>
  );
}

export default MainChart;
