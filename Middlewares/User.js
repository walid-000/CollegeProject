function restrictTo(roles = []){
    return function(req , res , next){
        if(!req.user){
            return res.redirect("/login-signUp")
        }
        if(!roles.includes(req.user.role)){
            return  res.end("unauthorized");
        }
        next();
    }
}

function middlewareForHomePage(req , res , next){
    const token  = req.user ;
    if (!token){
        req.data = {isLoggedIn : false}
    }
    else {
    req.data = {isLoggedIn : true , token};
    }

    next();
}

module.exports = {
    restrictTo ,
    middlewareForHomePage ,
}