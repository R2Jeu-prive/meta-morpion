$(document).ready(function() {
});

grid = [];

function initGrid(){
    /*    x->
      y  A  D  G
      |  B  E  H
      V  C  F  I
    */

    $("#game-screen .grid").html("");
    let sectorNames = ["a","b","c","d","e","f","g","h","i"];
    for (let i = 0; i < 9; i++) {
        $("#game-screen .grid").append('<div class="' + sectorNames[i] + ' sectors">');
    }

    for (let x = 0; x < 9; x++) {
        grid.push([]);
        for (let y = 0; y < 9; y++) {
            grid[x].push(0);
            updateGrid(x, y, Math.floor(Math.random()*3));

            let sector = sectorNames[3*Math.floor(x/3) + Math.floor(y/3)];
            $("#game-screen ." + sector).append('<div class="' + x + "" + y + ' cells">');
        }
    }
}

function updateGrid(x, y, val){
    grid[x][y] = val;
    //animate;
}
