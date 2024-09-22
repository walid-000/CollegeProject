const jwt = require("jsonwebtoken");

function getToken(payload){
    const token = jwt.sign(payload , "thisIsMySecretKey" , {expiresIn : '1hr'});
    return token ;
}

function getUser(token){
    const user = jwt.verify(token , "thisIsMySecretKey");
    return user ;
}

module.exports = {
    getToken ,
    getUser
}