const { uncover ,} = require("./../Services/auth")

async function getUserIdMiddleware(req , res , next) {

    const decoded = uncover(req.cookies?.token)
    
    if (decoded){
        
        return res.status(401).json({ message: 'Unauthenticated' });
    }
    
    next()
}