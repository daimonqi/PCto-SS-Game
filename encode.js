const fs = require('fs');
const c = fs.readFileSync('f:/aiUI/color-extraction-demo.html');
console.log(c.toString('base64'));
