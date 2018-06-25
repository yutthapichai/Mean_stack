const app    = require('./app');
const http   = require('http');


const server = http.createServer(app);
const port   = process.env.PORT || 5000;
server.listen(port, () => {
  console.warn("Server started! port " + port);
});
