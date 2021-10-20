const { server } = require('./dist/server.js');

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Application is started on localhost:', port);
});
