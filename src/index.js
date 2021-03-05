const app = require('./app');
require('./db');

(async () => {
    await app.listen(app.get('PORT'), app.get('IP'));

    console.log(`
    port: ${app.get('PORT')}
    IP: ${app.get('IP')}
        `);
})()