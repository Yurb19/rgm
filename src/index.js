const app = require('./app');
require('./db');

(() => {
    app.listen(app.get('PORT'), app.get('IP'));

    console.log(`
    port: ${app.get('PORT')}
    IP: ${app.get('IP')}
    `);
})()