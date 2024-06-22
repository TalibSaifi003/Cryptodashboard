export const CoinList = (currency) =>
  `https://tusharoxacular09.github.io/cryptocurrency_api/api.json`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://tusharoxacular09.github.io/cryptocurrency_api/api.json`;