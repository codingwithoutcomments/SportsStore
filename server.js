var connect = require('connect');
connect.createServer(
    connect.static("../SportsStore")
).listen(5000);
