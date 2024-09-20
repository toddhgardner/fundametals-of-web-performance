const webServer = require("./server/webServer");
const apiServer = require("./server/apiServer");

apiServer.listen(3001, () => {
  console.log("API server is ready at http://api.devstickers.localhost:3001/");
})

webServer.listen(3000, () => {
  console.log("Web server is ready at http://devstickers.localhost:3000/");
});

