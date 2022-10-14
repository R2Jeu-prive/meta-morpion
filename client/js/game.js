$(document).ready(function() {

});

grid = [];
availableSector = -1;
sectorWins = [];

function initGrid(){
    //clear
    $("#game-screen .grid").html("");

    /*    x->
      y  A  D  G
      |  B  E  H
      V  C  F  I
    */

    //sectors
    availableSector = -1;
    let sectorNames = ["a","b","c","d","e","f","g","h","i"];
    for (let i = 0; i < 9; i++) {
        sectorWins.push(0);
        $("#game-screen .grid").append('<div class="' + sectorNames[i] + ' sectors"></div>');
    }

    //cells
    for (let x = 0; x < 9; x++) {
        grid.push([]);
        for (let y = 0; y < 9; y++) {
            grid[x].push(0);
            updateGrid(x, y, Math.floor(Math.random()*3));

            let sector = sectorNames[3*Math.floor(x/3) + Math.floor(y/3)];
            $("#game-screen ." + sector).append('<div class="' + x + "" + y + ' cells"></div>');
        }
    }

    $("#game-screen .cells").on( "click", function() {
        let x = parseInt($(this).attr("class").slice(0,1));
        let y = parseInt($(this).attr("class").slice(1,2));
        processClick(x,y);
    });
}

function updateGrid(x, y, val){
    grid[x][y] = val;
    let id = "#game-screen ." + x + "" + y;
    
    //animate
    if(val == 0){return;}
    if(val == 1){
        $(id).append('<svg class="circle" width="100%" height="100%"><circle cx="50%" cy="50%" r="30%" stroke="blue" stroke-width="10%" fill="#00000000" pathLength="100" stroke-linecap="round" class="test" stroke-dasharray="100" stroke-dashoffset="100"></circle></svg>');
        $(id + " circle").addClass("animate");
    }
}

function processClick(){

}
