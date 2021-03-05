module.exports = class Util{
    errorMessage = (key, value, status = 400) => {
        const error = new Error();
        error.status = status;
        error[key] = { message: value }
        return error;
    }
}