const fs = require('fs');
const fetch = require('node-fetch');
const { google } = require("googleapis");
require('dotenv').config();

const writeValuesToSheet = (googleSheetsInstance, auth, spreadsheetId, values) => {
  return googleSheetsInstance.spreadsheets.values.append({
    auth, //auth object
    spreadsheetId, //spreadsheet id
    range: "Feuille 1!A:C", //sheet name and range of cells
    valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
    resource: {
      values: [values],
    },
  });
};

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.CREDS),
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

auth.getClient().then(client => {
  const googleSheetsInstance = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SPREADSHEET_ID;

  fetch(`${process.env.API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    })
  })
    .then(res => res.json())
    .then(auth => fetch(`${process.env.API_URL}/events`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + auth.access_token },
    }))
    .then(res => res.json().then(data => ({
      data,
      code: res.status
    })))
    .then(({ data, code }) => {
      writeValuesToSheet(googleSheetsInstance, client, spreadsheetId, [new Date().toLocaleString('fr'), code, JSON.stringify(data)])
        .then(res => console.log(res))
        .catch(e => console.log(e));
    })
    .catch(customError => {
      writeValuesToSheet(googleSheetsInstance, client, spreadsheetId, [new Date().toLocaleString('fr'), customError.code, JSON.stringify(customError.data)])
        .then(res => console.log(res))
        .catch(e => console.log(e));
    });
});
