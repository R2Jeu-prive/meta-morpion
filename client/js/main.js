$(document).ready(function() {
    $("#main-screen .create-game").on("click", function(){
        $("#main-screen").addClass("hidden-screen");
        $("#game-screen").removeClass("hidden-screen");
        test();
	});
	$("#main-screen .join-game").on("click", function(){
		/*let joinTag = $("#main-screen .gametag").val();
        $("#main-screen").addClass("hidden-screen");
        $("#loading-screen").removeClass("hidden-screen");
        socket.emit("joinGame", joinTag, (joined) => {
            if(!joined){
                $("#loading-screen").addClass("hidden-screen");
                $("#error-screen .message").text("Ce TAG ne correspond à aucun lobby");
                $("#error-screen").removeClass("hidden-screen");
            }
        })*/
	});
});