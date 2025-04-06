const fs = require('fs');

const readStream = fs.createReadStream('./docs/sample3.txt', { encoding: 'utf-8'});
const writeStream = fs.createWriteStream('./docs/sample4.txt');


// readStream.on('data', (chunk) => {
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

//piping

readStream.pipe(writeStream);