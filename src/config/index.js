require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8080,
    ip: process.env.IP || '0.0.0.0',
    uri: process.env.MONGODB_URI || 'mongodb://localhost/test',
    corsOrigin: process.env.CORS_ORIGIN,
    secretOrKey: process.env.SECRET_OR_KEY
}