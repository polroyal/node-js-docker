const protect = (req, res, next) => {
    const { user } = req.session

    if (!user) {
        return res.status(401).json({status: 'fail', message: 'unauthorized'})
    }
    //attach the request directly to the user object instead of going through the session object
    req.user = user;

    next();
};

module.exports = protect