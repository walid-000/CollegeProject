function uncover(token){
    try {
    const decoded = jwt.verify(token , "thisIsMySecretKey");
    return decoded ;
}
catch (error){
    return null ;
}
}

module.exports = { uncover ,}