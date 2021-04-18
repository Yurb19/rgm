const express = require("express");
const config = require("./config/index");
const morgan = require('morgan');
const passport = require('passport');
const { logErrors, errorHandler } = require('./utils/middlewares/errorHandlers');

const app = express();

// * Settings

app.set("PORT", config.port);
app.set("IP", config.ip);

// * Middlewares

app.use(express.json());
app.use(morgan('dev'));
require('./utils/middlewares/passportJWT')(passport);

// * Routes

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', passport.authenticate('jwt', { session: false }), require('./routes/user.route'));
app.use('/api/games', passport.authenticate('jwt', { session: false }), require('./routes/games.route'))

// * Error Middlewares

app.use(logErrors);
app.use(errorHandler);

module.exports = app;
