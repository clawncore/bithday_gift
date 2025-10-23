const fs = require('fs');

// Create an empty favicon.ico file
fs.writeFileSync('client/public/favicon.ico', '', 'binary');

console.log('favicon.ico created successfully');