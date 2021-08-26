const fs = require('fs');
const fetch = require('node-fetch');

fetch('https://api.dev.eventdrive.com/public/v1/token', {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  })
})
.then(res => res.json())
.then(auth => fetch('https://api.dev.eventdrive.com/public/v1/events', {
  method: 'GET',
  headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + auth.access_token },
}))
.then(res => res.json().then(data => ({
  data,
  code: res.status
})))
.then(({ data, code }) => {
  fs.appendFile('logs_api_call.txt', '[' + new Date().toLocaleString() + ']\t' + code + '\t' + JSON.stringify(data) + '\n', (error) => {
    if(error) {
      console.error(error);
      return;
    }
  })
})
.catch(customError => {
  fs.appendFile('logs_api_call.txt', '[' + new Date().toLocaleString() + ']\t' + customError.code + '\t' + JSON.stringify(customError.data) + '\n', (error) => {
    if(error) {
      console.error(error);
      return;
    }
  })
});
