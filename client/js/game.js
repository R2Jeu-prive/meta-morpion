$(document).ready(function() {

});

grid = [];
availableSector = -1;
sectorWins = [];
moveCount = 0;
sectorNames = ["a","b","c","d","e","f","g","h","i"];

function initGrid(){
    //clear
    $("#game-screen .grid").html("");

    //GRID LAYOUT
    /*    x->
      y  A  D  G
      |  B  E  H
      V  C  F  I
    */

    //SECTORWINS
    /* 0 1 2 -> vertical triplets from left to right
       3 4 5 -> horizontal triplets from top to bottom
       6 -> \ diag
       7 -> / diag
    */

    //sectors
    availableSector = -1;
    moveCount = 0;
    for (let i = 0; i < 9; i++) {
        sectorWins.push(0);
        $("#game-screen .grid").append('<div class="' + sectorNames[i] + ' sectors"></div>');
    }

    //cells
    for (let x = 0; x < 9; x++) {
        grid.push([]);
        for (let y = 0; y < 9; y++) {
            let sector = sectorNames[3*Math.floor(y/3) + Math.floor(x/3)];
            $("#game-screen ." + sector).append('<div class="' + x + "" + y + ' cells"></div>');
            $("#game-screen ." + x + "" + y).append('<svg class="circle" width="100%" height="100%"><circle cx="50%" cy="50%" r="30%" stroke="blue" stroke-width="10%" fill="#00000000" pathLength="100" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></circle></svg>');
            $("#game-screen ." + x + "" + y).append('<svg class="cross" width="100%" height="100%"><line stroke="orange" stroke-width="10%" pathLength="100" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100" x1="25%" y1="25%" x2="75%" y2="75%" class="later"></line><line stroke="orange" stroke-width="10%" pathLength="100" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100" x1="25%" y1="75%" x2="75%" y2="25%"></line></svg>');
            grid[x].push(0);
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
        $(id + " .circle circle").addClass("animate");
    }else{
        $(id + " .cross line").addClass("animate");
    }
}

function updateSectorVisuals(){
    for (let i = 0; i < 9; i++) {
        if(availableSector == i || availableSector == -1){
            $("#game-screen ." + sectorNames[i] + " .cells").addClass("highlighted");
        }else{
            $("#game-screen ." + sectorNames[i] + " .cells").removeClass("highlighted");
        }
    }
}

function processClick(x,y){
    console.log("clicked",x,y);
    if(grid[x][y] != 0){return;}
    if(3*Math.floor(x/3) + Math.floor(y/3) != availableSector && availableSector != -1){return;}
    updateGrid(x, y, 1 + (moveCount%2));
    moveCount += 1;
    availableSector = 3 * (x%3) + (y%3);
    if(sectorIsFull(availableSector)){availableSector = -1;}
    updateSectorVisuals();

    checkSectorWin(x,y);
}

function sectorIsFull(id){
    let x = 3 * Math.floor(id/3);
    let y = 3 * (id%3);
    for (let dx = 0; dx < 3; dx++) {
        for (let dy = 0; dy <3; dy++) {
            if(grid[x+dx][y+dy] == 0){
                return false;
            }
        }
    }
    return true;
}

function checkSectorWin(x,y){
    if(x % 3 == 1 && y % 3 == 1){
        //center of sector got clicked
    }
}
