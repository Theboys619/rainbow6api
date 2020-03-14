const axios = require('axios');
const operators = require('./js/operators.js');
const weapons = require('./js/weapons.js');
const stats = require('./js/stats.js')

var _this;

class Rainbow6 {
  constructor(credentials) {
    //Personal Info
    this.credentials = credentials;
    this.accountuser = "";
    this.nameOnPlatform = "";
    this.uid = "";
    this.ticket = "";
    this.ubiappid = "39baebad-39e5-4552-8c25-2c9b919064e2";

    this.loggedin = false;
    //Other Info
    this.uids = [];

    _this = this;
  }

  login() {
    console.log(`Logging into ${this.credentials.email}`);

    axios({
      method: "post",
      url: "https://public-ubiservices.ubi.com/v3/profiles/sessions",
      headers: {
        "authorization": "Basic " + btoa(this.credentials.email+':'+this.credentials.password),
        "ubi-appid": this.ubiappid,
        "Content-Type": "application/json"
      }
    }).then(function(res) {
      _this.accountuser = res.data.username;
      _this.nameOnPlatform = res.data.nameOnPlatform;
      _this.uid = res.data.userId;
      _this.ticket = res.data.ticket;
      _this.loggedin = true;
      console.log("\nLogged in Successfully");
    }).catch(function(err) {
      console.log(`\nAxios Error: ${err}`);
    });
  }

  async getUser(username, platform) {
    let uid;

    if (platform === "pc") {
      platform = "uplay";
    }

    await axios({
      method: "get",
      url: `https://public-ubiservices.ubi.com/v2/profiles?platformType=${platform}&nameOnPlatform=${username}`,
      headers: {
        "authorization": `Ubi_v1 t=${this.ticket}`,
        "ubi-appid": this.ubiappid,
        "Content-Type": "application/json"
      }
    }).then(function(res) {
      _this.uids.push(res.data.profiles[0].userId);
      uid = res.data.profiles[0].userId;
    }).catch(function(err) {
      console.log(err);
    });

    return uid;
  }

  async getStats(username, platform, type = "default") {
    let url;
    let uid;
    let sdata = {};

    if (platform === "uplay") {
      url = "https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/playerstats2/statistics";
    } else if (platform === "pc") {
      platform = "uplay";
      url = "https://public-ubiservices.ubi.com/v1/spaces/5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/playerstats2/statistics";
    } else if (platform === "psn") {
      url = "https://public-ubiservices.ubi.com/v1/spaces/05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/playerstats2/statistics";
    } else if (platformn === "xb1") {
      url = "https://public-ubiservices.ubi.com/v1/spaces/98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/playerstats2/statistics";
    }

    await this.getUser(username, platform).then(function(id) {
      uid = id;
    });

    await axios({
      method: "get",
      url: `${url}?populations=${uid}&statistics=${stats}`,
      headers: {
        "authorization": `Ubi_v1 t=${this.ticket}`,
        "ubi-appid": this.ubiappid,
        "Content-Type": "application/json"
      }
    }).then(function(res) {
      let data = res.data["results"][uid];
      let search = [];
      let keys = Object.keys(data);
      let shortkeys = [];
      let index = 0;
      let key = "";

      keys.forEach(function(item, i) {
        shortkeys.push(item.substring(0, item.indexOf(":")));
      });

      if (type === "default") {
        search = ["generalpvp_kills","generalpvp_death","generalpvp_matchwon","generalpvp_matchlost","generalpvp_meleekills","generalpvp_killassists","generalpvp_matchplayed"];
      } else if (type === "operators") {
        search = ["operatorpvp_kills","operatorpvp_death","operatorpvp_roundwon","operatorpvp_roundlost","operatorpvp_timeplayed"]
      } else if (type === "ranked") {
        search = ["rankedpvp_kills","rankedpvp_death","rankedpvp_matchwon","rankedpvp_matchlost","rankedpvp_timeplayed","rankedpvp_matchplayed"]
      } else if (type === "all") {
        search = stats;
      }

      search.forEach(function(item, i) {
        index = shortkeys.indexOf(item);
        key = Object.keys(data)[index];
        sdata[item] = data[key];
      });

    }).catch(function(err) {
      console.log(err);
    });

    return sdata;
  }

}

function btoa(str) {
  return Buffer.from(str).toString('base64');
}

module.exports = Rainbow6;
