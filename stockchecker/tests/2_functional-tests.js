/* eslint-disable no-undef */
const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server');
const stocksModel = require('../db/stocks');

const { assert } = chai;

chai.use(chaiHttp);

before(async () => {
  await stocksModel.deleteMany({});
});

suite('Functional Tests', () => {
  suite('GET /api/stock-prices => stockData object', () => {
    test('1 stock', (done) => {
      chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'GOOG' })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepNestedPropertyVal(res.body, 'stockData.stock', 'GOOG');
          assert.nestedProperty(res.body, 'stockData.price');
          assert.nestedProperty(res.body, 'stockData.likes');
          done();
        });
    });

    test('1 stock with like', (done) => {
      chai.request(server)
        .get('/api/stock-prices')
        .set('x-forwarded-for', '127.0.0.1')
        .query({ stock: 'GOOG', like: true })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepNestedPropertyVal(res.body, 'stockData.stock', 'GOOG');
          assert.nestedProperty(res.body, 'stockData.price');
          assert.nestedProperty(res.body, 'stockData.likes');
          done();
        });
    });

    test('1 stock with like again (ensure likes arent double counted)', (done) => {
      chai.request(server)
        .get('/api/stock-prices')
        .set('x-forwarded-for', '127.0.0.1')
        .query({ stock: 'GOOG', like: true })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.deepNestedPropertyVal(res.body, 'stockData.stock', 'GOOG');
          assert.nestedProperty(res.body, 'stockData.price');
          assert.nestedProperty(res.body, 'stockData.likes');
          done();
        });
    });

    test('2 stocks', (done) => {
      chai.request(server)
        .get('/api/stock-prices')
        .set('x-forwarded-for', '127.0.0.1')
        .query({ stock: ['GOOG', 'MSFT'] })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.isArray(res.body.stockData);
          assert.deepNestedPropertyVal(res.body, 'stockData[0].stock', 'GOOG');
          assert.deepNestedPropertyVal(res.body, 'stockData[1].stock', 'MSFT');
          assert.deepNestedPropertyVal(res.body, 'stockData[0].rel_likes', 1);
          assert.deepNestedPropertyVal(res.body, 'stockData[1].rel_likes', -1);
          assert.nestedProperty(res.body, 'stockData[0].price');
          assert.nestedProperty(res.body, 'stockData[1].price');
          done();
        });
    });

    test('2 stocks with like', (done) => {
      chai.request(server)
        .get('/api/stock-prices')
        .set('x-forwarded-for', '127.0.0.1')
        .query({ stock: ['GOOG', 'MSFT'], like: true })
        .end((_err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.isArray(res.body.stockData);
          assert.deepNestedPropertyVal(res.body, 'stockData[0].stock', 'GOOG');
          assert.deepNestedPropertyVal(res.body, 'stockData[1].stock', 'MSFT');
          assert.deepNestedPropertyVal(res.body, 'stockData[0].rel_likes', 0);
          assert.deepNestedPropertyVal(res.body, 'stockData[1].rel_likes', 0);
          assert.nestedProperty(res.body, 'stockData[0].price');
          assert.nestedProperty(res.body, 'stockData[1].price');
          done();
        });
    });
  });
});
