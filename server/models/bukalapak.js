var axios = require('axios');

module.exports = function(params, cb) {
  let url = `https://api.bukalapak.com/v2/products.json?keywords=${params}&page=1&per_page=2`
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