
# About
A Rainbow 6 Node Module to get Stats of players.
This module allows to get stats of players from ubisoft services.
The module requires login info.

## Important
Create a new account at https://ubisoft.com for use of the module.

## Declare Example
```javascript
const credentials = {
    email: "xxxxxx@gmail.com",
    password: "xxxxxxxxx123"
}
const R6Api = require("rainbow6api");
let R6 = new R6Api(credentials);
R6.login() // Make sure it is logged in first before running other r6api functions
```

# Documentation

### Table of Contents
- [How to Use](#How to use)
  - [Functions](#functions)
	- [Platforms](#platforms)
	- [Types](#types)
	- [Example](#example)

## How to Use

### Functions

`.getStats(username, platform, type)`:  Enter a username and platform to search

### Platforms
`xbl`: Xbox Live (xbox one)  
`psn`: Playstation Network (ps4)  
`uplay`: Personal Computer (pc)  
`pc`: Personal Computer (pc)  

### Types
`default`: Gets general statistics (kills, deaths, wins, losses, etc...)  
`operators`: Gets stats for all operators used  
`all`: Gets every possible statistic for player  

### Example
```javascript
let username = "Theboys619"
let platform = "uplay" // Pc also works
R6.getStats(username, platform).then(function(data) {
	console.log(`Kills: ${data.generalpvp_kills}`};
	console.log(data); // log data to see json array of stats (kills/deaths);
});
```
