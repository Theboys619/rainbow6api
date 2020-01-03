const axios = require('axios');

const JSONID = "9d15c77e";
var OPERATORS = {}

axios({
  method: "get",
  url: `https://game-rainbow6.ubi.com/assets/data/operators.${JSONID}.json`
}).then(function(res) {
  let data = res.data;

  OPERATORS = data;
});

module.exports = OPERATORS;
