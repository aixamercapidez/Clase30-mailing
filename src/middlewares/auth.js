function auth(req, res, next) {
    if (req.session?.user === undefined || req.session?.user === '') {
        console.log('Error de autorización usuario')
        res.redirect(401, '/login')
        return 401;
    }
    return next();
}

module.exports = {
    auth
}