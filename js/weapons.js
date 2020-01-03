const axios = require('axios');

const JSONID = "8a9b3d9e";
var WEAPONS = {};

axios({
  method: "get",
  url: `https://game-rainbow6.ubi.com/assets/data/weapons.${JSONID}.json`
}).then(function(res) {
  let data = res.data;

  WEAPONS = data;
});

module.exports = WEAPONS;
