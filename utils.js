const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify({ users: content }, null, 2), 'utf8', (err) => {
    if(err) {
      console.log(err);
    };
  });
};

function getUserData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body ='';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    };
  });
};

module.exports = {
  writeDataToFile,
  getUserData,
};
