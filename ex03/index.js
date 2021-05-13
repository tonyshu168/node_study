const fs = require('fs');

module.exports.parser = path => {
  const readStream = fs.createReadStream(path);
  let reqData = [],
      size = 0;

  return new Promise(resolve => {
    readStream.on('open', fd => {
    });

    readStream.on('ready', () => {
    });

    readStream.on('data', (chunk) => {
      reqData.push(chunk);
      size += chunk.length;
    });

    readStream.on('end', () => {
    });

    readStream.on('close', () => {
      const data = Buffer.concat(reqData, size);

      resolve(JSON.parse(data.toString()));
    })

  })
};

