
const logErrors = async (err, req, res, next) => {
    console.log(err);
    next(err);
}

const errorHandler = async (err, req, res, next) => {
    res.status(err.status || 500);
    const errors = {};
    for (const key in err) {
        if (err.hasOwnProperty(key)) {
            if(err[key].name == "ValidatorError") res.status(400);
            errors[key] = err[key].message;
        }
    }
    res.json(errors);
}

module.exports = {
    logErrors,
    errorHandler
}