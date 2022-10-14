$(document).ready(function() {
});

grid = [];

function initGrid(){
    $(".game-screen .grid").html("");
    let sectorNames = ["a","b","c","d","e","f","g","h","i"];
    for (let i = 0; i < 9; i++) {
        $(".game-screen .grid").append('<div class="' + sectorNames[i] + '">');
    }

    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push(0);
            updateGrid(i, j, Math.randomInt(0,3));
        }
    }
}

function updateGrid(x, y, val){
    grid[i][j] = val;
    //animate;
}
