const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0VCaHJhYTBpTFp3U1hqUk5BL3FKeEFmQzhwUlk0R3poYURwWFJodmUwST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVhTWmkwalNXVEpQZkcrRW02cWpvbk1UK0Y4eHBaQkhDUmZYcWxoQ0tuRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTFNpdGNiMzRzVEZqenB3ZmNudHN2V0ZUbm9vakN0KzdVUUVZK2t5VlVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGNXRablJKUHBsVWhoc2liNzBxV2R6MlY5aDhobUxtMjROK2xPZG5DT3pzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtJMlh5cDdMdituTjdsbDRRM3R2TWtmZW1ONGU0MzlWT3MzQjIxQ3FNR1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE4enpwdTB2S3VzVkVLTm9YTmNSYVFxUit6UW05bE95M1hXNHUybXdqRDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0lSaTdvSUxHNW1lT3Z6Z0xhTkFNVS9RTFhISzdoVWhpZjB2VXc1RHZFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY09wUlV1a3RmelZwK3ZOWmp0amh4RGtXdXFUaTJ3Sk9KK2V4TWRXTXIzMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVPc1pCdTVnbzU3aTZDaFhlNkl4aHpmVzBET2lxY1RrUWY3ekc1UVVESWZOaWJUbXNrNjU1d0dqZDhXZytTL2JISzdtSHZUbTd5aExacTBxbW1odmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJaN2k2amZjV2owc01DaHdlemw1WEpIOWsxZUlwQmtxdUtoODVLTlNKL2FFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOa2Y2NjZTSVN2cUd6ZktBd3dUX1VRIiwicGhvbmVJZCI6IjFkZjkzNjU2LTdhMjUtNDdkMi05ZGZiLWQ5NzU3MzI5OThkMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxNDhvbkRjbGJOY21zbTFTQ1ZwVDZPMzVpQm89In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhibGJ0T3RVWHJ5VCsvZFJkcHRMMllla0pqST0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05uZzlMVUJFUGY3eXNFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldLaFZqbDlpd1hzMlEySGI5UmpsNnJNSWhrdUR0LytoY3RKcVRzNVI1UWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IldZSUo0S3V2QTIzWnFkN21hL21CMzBIbURLZk9XMDM5Z29Dc2lFa1o3Vlh3SVZXNWM1UDJvbkJSSHJOcUs3dEIySFo3TWRuR2JuN3pnbEtPdXJaQ0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuUVVraWdSQWx6SVhKTHJ6ZzlYQlQzU2IwanZvTjZEK2grQVlGMGdrQmFMTmI3T3dGYWl1SzdjWExhSXg0QWFVMHZSbEZqNmR6bzM5Vk54YkVHdXNnZz09In0sIm1lIjp7ImlkIjoiOTE5MzMzMjgyMzMzOjExQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjIyNDEwNjcwMzY2Nzc5OjExQGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTkzMzMyODIzMzM6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVmlvVlk1ZllzRjdOa05oMi9VWTVlcXpDSVpMZzdmL29YTFNhazdPVWVVSiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4MTU1OTA4LCJsYXN0UHJvcEhhc2giOiIyTUZLUFEiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZLcyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo J ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "26777821911",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Tox-md',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
