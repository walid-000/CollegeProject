const fs = require("fs");


function LogRequestMiddlewarefn(filename) {
    return (req, res, next) => {
      const date = new Date().toISOString(); 
      fs.appendFile(filename, `${req.method} : ${req.path} :  ${date} \n`, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        }
      });
      next();
    };
  }

module.exports = {
    LogRequestMiddleware : LogRequestMiddlewarefn ,
}