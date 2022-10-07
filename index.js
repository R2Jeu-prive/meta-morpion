const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
const mime = require('mime');
const U = require("./user.js");
const G = require("./game.js");
const { Server } = require("socket.io");

let routes = []
routes.push(["/","/client/index.html"])
routes.push(["/js","/client/js/index.js"])
routes.push(["/css","/client/css/index.css"])
routes.push(["/js/main","/client/js/main.js"])
routes.push(["/css/main","/client/css/main.css"])
routes.push(["/js/game","/client/js/game.js"])
routes.push(["/css/game","/client/css/game.css"])
routes.push(["/js/error","/client/js/error.js"])
routes.push(["/css/error","/client/css/error.css"])
routes.push(["/js/loading","/client/js/loading.js"])
routes.push(["/css/loading","/client/css/loading.css"])
routes.push(["/css/phone","/client/css/phone.css"])
for (let route of routes) {
	router.get(route[0], function(req, res){
		res.set('Content-Type', mime.getType(route[1].split(".")[1]));
		res.sendFile(path.join(__dirname, route[1]));
	})
	app.use(route[0], router)
}

let server = app.listen(3000, function(){
  console.log("Web server is running on port 3000");
  console.log("to end press Ctrl + C");
});
const io = new Server(server);

io.on('connection', (socket) => {
	U.AddUser(socket);
	socket.emit("setPseudo", {pseudo : socket.id});
	console.log('CONNECTED ' + socket.id);
	socket.on("createGame", (mode, callback) => {
		callback(G.CreateGame(U.GetUser(socket), mode))
	})
	socket.on('disconnect', (reason) => {
		let user = U.GetUser(socket);
		G.ProcessPlayerDisconnection(user);
		console.log('DISCONNECTED ' + user.pseudo + " (" + reason + ")");
		U.RemoveUser(socket);
	});
});
