let games = [];

class Game{
	constructor(hostUser, mode){
		this.host = hostUser;
        this.mode = mode;
        this.opponent;
		this.tag = GenerateTag();
        this.moves = [];
	}

    Start(){

    }
}

function CreateGame(host, mode){
	for (let game of games) {
		if(game.host.pseudo == host.pseudo){
			return false;
		}
        if(game.opponent.pseudo == host.pseudo){
			return false;
		}
	}
	games.push(new Game(host, mode));
    if(mode == "local"){
        games[games.length - 1].Start();
    }
	console.log("CREATED GAME " + games[games.length-1].tag);
	return true;
}

/*function ProcessMoveRequest(socket, move){
	for (let [i, game] of games.entries()){
		for (let [j,gamePlayer] of game.players.entries()) {
			if(gamePlayer.socket.id == socket.id){
                //process move
				return;
			}
		}
	}
}*/

function ProcessPlayerDisconnection(player){
	for (let [i,game] of games.entries()){
        if(game.host.pseudo == player.pseudo || game.opponent.pseudo){
            console.log("DELETED GAME " + game.tag);
			games.splice(i, 1);
			return;
        }
	}
}

function GenerateTag(){
	letters = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","Y","Z"]
	tag = ""
	for (let i = 0; i < 3; i++) {
		tag += letters[Math.floor(Math.random() * letters.length)];
	}
	for (let game of games) {
		if(game.tag == tag){
			return GenerateTag();
		}
	}
	return tag;
}

module.exports = { Game, CreateGame, ProcessPlayerDisconnection};