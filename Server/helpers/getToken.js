const jwt = require('jsonwebtoken');

const getToken = (payload) => {

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "60m" });
    return token;
}

module.exports = getToken;