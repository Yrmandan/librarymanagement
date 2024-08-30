module.exports = (req, res, next) => {
    if (req.session.user || req.session.admin) {
        next(); 
    } else {
        res.status(401).send('Login to access');
    }
};
