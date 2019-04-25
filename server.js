// Runs the server at port 8090
const app = require('./app');
const port = process.env.PORT || 8090;
app.listen(port);
