const fs = require("fs");
const {getUser ,} = require("./../Services/auth");


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

  function checkAuth(req, res, next) {
    const authToken = req.cookies?.authToken || null; // Use optional chaining
    console.log(authToken)
  
    if (!authToken) {
      req.user = null; // No authToken, set user to null
      console.log("no auth token ")
    } else {
      try {
        req.user = getUser(authToken); // Get user based on authToken
        console.log("auth token present : " , req.user)
      } catch (error) {
        console.error('Error fetching user:', error);
        req.user = null; // Fallback in case of error
      }
    }
  
    next(); // Proceed to the next middleware
  }

module.exports = {
    LogRequestMiddleware : LogRequestMiddlewarefn ,
    checkAuth ,
}
