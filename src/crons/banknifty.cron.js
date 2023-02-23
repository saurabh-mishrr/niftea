const cron = require('node-cron');

const dayjs = require('dayjs')
require('dayjs/locale/en-in')
var axiosA = require('axios');

var axiosB = require('axios');


cron.schedule('* 9-15 * * 1-5', async () => {
  

// (async () => {

  var configA = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.moneycontrol.com/mcapi/v1/indices/ad-ratio/heat-map?period=1D&type=EW&indexId=23&subType=ST',
    headers: { 
      'authority': 'api.moneycontrol.com', 
      'accept': 'application/json, text/plain, */*', 
      'accept-language': 'en-GB,en;q=0.8', 
      'cache-control': 'no-cache', 
      'origin': 'https://www.moneycontrol.com', 
      'pragma': 'no-cache', 
      'referer': 'https://www.moneycontrol.com/', 
      'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Brave";v="110"', 
      'sec-ch-ua-mobile': '?0', 
      'sec-ch-ua-platform': '"Linux"', 
      'sec-fetch-dest': 'empty', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-site': 'same-site', 
      'sec-gpc': '1', 
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    }
  };

  let responseA = await axiosA(configA)
  .then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });


  let jsonParsedData = JSON.parse(responseA)

  let data = jsonParsedData.data.chartData;
  


let bn50_data = data.filter(i => ['HDFC Bank', "ICICI Bank"].indexOf(i.fullName) >= 0 )
let bn49_data = data.filter(i => ['HDFC Bank', "ICICI Bank"].indexOf(i.fullName) < 0 )

let bn50_per = parseFloat((bn50_data.map(data => data.changeP)).reduce((a,b) => a+b, 0)).toFixed(2)
let bn49_per = parseFloat((bn49_data.map(data => data.changeP)).reduce((a,b) => a+b, 0)).toFixed(2)


let bn50_change = parseFloat((bn50_data.map(data => data.change)).reduce((a,b) => a+b, 0)).toFixed(2)
let bn49_change = parseFloat((bn49_data.map(data => data.change)).reduce((a,b) => a+b, 0)).toFixed(2)

let time = dayjs().locale('en-in').format('HH:mm A')
let today = dayjs().locale('en-in').format('YYYY-MM-DD')

let reqData = {
  "date": today,
  "data": [{
    "time": time,
    
    "bn49_per": parseFloat(bn49_per),
    "bn49_change": parseFloat(bn49_change),

    "bn50_per": parseFloat(bn50_per),
    "bn50_change": parseFloat(bn50_change),
  }]
}


if (jsonParsedData.success === 1) {
  console.log('in if condition')
  var configB = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/banknifty',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify(reqData)
  };

  var a = await axiosB(configB)
  .then(function (response) {
    return JSON.stringify(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  console.log(a)
  
}
console.log('by pass if condition')

})


/* 
let reqData = {
  "date": "2023-02-19",
  "data": [
    {
      "time": "02:35 AM",
      "bn49_per": 12.82,
      "bn49_change": 2110,
      "bn50_per": 12,
      "bn50_change": 1340
    }
  ]
} */




