$(document).ready(function() {
});

grid = [];

function initGrid(){
    $("#game-screen .grid").html("");
    let sectorNames = ["a","b","c","d","e","f","g","h","i"];//in column order
    for (let i = 0; i < 9; i++) {
        $("#game-screen .grid").append('<div class="' + sectorNames[i] + '">');
    }

    for (let x = 0; x < 9; x++) {
        grid.push([]);
        for (let y = 0; y < 9; y++) {
            grid[x].push(0);
            updateGrid(x, y, Math.floor(Math.random()*3));

            let sector = 3*Math.floor(x/3) + Math.floor(y/3);
            $("game-screen ." + sector).append('<div class="' + x + "" + y + '">');
        }
    }
}

function updateGrid(x, y, val){
    grid[x][y] = val;
    //animate;
}
