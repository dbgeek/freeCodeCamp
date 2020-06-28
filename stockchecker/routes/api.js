/*
*
*
*       Complete the API routing below
*
*
*/
const axios = require('axios');

const stocksModel = require('../db/stocks');

const axiosInstance = axios.create({
  baseURL: 'https://repeated-alpaca.glitch.me/v1',
});

async function getSymbol(symbol, clientIpAddress, like) {
  const result = await axiosInstance.get(`stock/${symbol}/quote`);
  let stock = await stocksModel.findOne({
    symbol,
  });

  if (!stock) {
    stock = await stocksModel.create({
      symbol,
    });
  }

  if (like && !stock.ipAddress.includes(clientIpAddress)) {
    const updatedStock = await stocksModel.findOneAndUpdate({ symbol }, {
      $push: {
        ipAddress: clientIpAddress,
      },
      $inc: {
        likes: 1,
      },
    },
    {
      upsert: true,
      new: true,
    });
    return {
      stock: symbol,
      price: result.data.latestPrice,
      likes: updatedStock.likes,
    };
  }
  const returnValues = {
    stock: symbol,
    price: result.data.latestPrice,
    likes: stock.likes || 0,
  };
  return returnValues;
}
module.exports = (app) => {
  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const clientIpAddress = req.header('x-forwarded-for')
        ? req.header('x-forwarded-for')
          .split(',')[0] : req.connection.remoteAddress;
      const { stock: stocks, like } = req.query;

      if (typeof (stocks) === 'string') {
        const upDatedStock = await getSymbol(stocks, clientIpAddress, like);
        return res.json({
          stockData: upDatedStock,
        });
      }
      const results = [];
      for (let i = 0; i < 2; i += 1) {
        const upDatedStock = getSymbol(stocks[i], clientIpAddress, like);
        results.push(upDatedStock);
      }
      const resultStocks = [];

      await Promise.all(results).then((values) => {
        resultStocks.push({
          stock: values[0].stock,
          price: values[0].price,
          rel_likes: values[0].likes - values[1].likes,
        });
        resultStocks.push({
          stock: values[1].stock,
          price: values[1].price,
          rel_likes: values[1].likes - values[0].likes,
        });
      });
      return res.json({
        stockData: resultStocks,
      });
    });
};
