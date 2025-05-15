const jwt = require('jsonwebtoken');

const jwtgenerator = (payload) => {
    console.log(process.env.SECRET_KEY);
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h'
    });
    return token;
}

module.exports = jwtgenerator;