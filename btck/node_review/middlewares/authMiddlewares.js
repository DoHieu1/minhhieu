const jwt = require('jsonwebtoken');

const requireLogin = (req, res, next) => {
    
    const token = req.headers.token;

    console.log(req.headers);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.send('You must login first');
        return;
    }
};

module.exports = requireLogin;
