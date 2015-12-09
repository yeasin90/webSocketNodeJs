(function (updater) {

	var socketio = require('socket.io');
	updater.init = function (server) {
		var io = socketio.listen(server);

		io.sockets.on("connection", function (socket) {

			console.log("Socket was connected");

			setInterval(function () {
				var timestamp = Date.now();
				// send this message only to individual client who gets connected
				socket.emit('timer', timestamp);
			}, 2000);

			socket.on("broadcast by category", function (pageCategory) {
				socket.broadcast.emit("clients", pageCategory);
				socket.join(pageCategory);
			});

			socket.on('submit', function (data) {
				//  broadcast means send this same message to all the clinets who are connected
				//socket.broadcast.emit("boradcast value", data);
				socket.broadcast.to(data.pageCategory).emit("boradcast note", data.value);
			});
		});
	};

})(module.exports);