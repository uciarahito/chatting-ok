var axios = require('axios');
let methods = {}

methods.getItemByParam = (cb) => {
  // let url = `https://api.bukalapak.com/v2/products.json?sort_by=Termahal&conditions=second&keywords=${encodeURIComponent(params)}&page=1&per_page=10`;
  let url = `https://api.bukalapak.com/v2/products.json?sort_by=Termahal&conditions=second&keywords=lukisan+antik&page=1&per_page=10`;
  let key = process.env.BUKALAPAK_KEY_ID;
  let value = process.env.BUKALAPAK_KEY_VALUE;
  // console.log(process.env.BUKALAPAK_KEY_ID);
  // console.log(process.env.BUKALAPAK_KEY_VALUE);
  axios.get(url, {
    headers: {
      key: value
    }
  })
  .then(function(response) {
    console.log(response);
    cb(null, response.data.products);
  })
  .catch(function(error) {
    cb(error);
  });
}

methods.getProdukByParam = (params, cb) => {
  let url = `https://api.bukalapak.com/v2/products.json?sort_by=Termahal&conditions=second&keywords=${encodeURIComponent(params)}&page=1&per_page=10`;
  // let url = `https://api.bukalapak.com/v2/products.json?sort_by=Termahal&conditions=second&keywords=lukisan+antik&page=1&per_page=10`;
  let key = process.env.BUKALAPAK_KEY_ID;
  let value = process.env.BUKALAPAK_KEY_VALUE;
  // console.log(process.env.BUKALAPAK_KEY_ID);
  // console.log(process.env.BUKALAPAK_KEY_VALUE);
  axios.get(url, {
    headers: {
      key: value
    }
  })
  .then(function(response) {
    console.log(response);
    cb(null, response.data.products);
  })
  .catch(function(error) {
    cb(error);
  });
}

module.exports = methods