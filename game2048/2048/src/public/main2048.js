var board = new Array();
var score = 0;
var times = 0;
var hasConflicted = new Array();

var startX=0;
var startY=0;
var endX=0;
var endY=0;


$(document).ready(function () {
    prepareForMobile();
    newgame();
});

function prepareForMobile() {
    if (documentWidth > 500){
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",0.02*gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function newgame() {
    init();
    //random generate number
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"> </div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            if (board[i][j] == 0) {
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css('top', getPosTop(i, j) + cellSideLength/2);
                theNumberCell.css("left", getPosLeft(i, j) + cellSideLength/2);
            }
            else {
                theNumberCell.css("width", cellSideLength);
                theNumberCell.css("height", cellSideLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }        
    }
    $(".number-cell").css("line-height",cellSideLength+"px");
    $(".number-cell").css("font-size",0.6*cellSideLength+"px");
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    // random postion
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if(times == 50){
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    var randomNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randomNumber;
    showNumberWithAnimation(randx, randy, randomNumber);
    return true;
}

$(document).keydown(function (event) {
    event.preventDefault();
    switch (event.keyCode) {
        case 37:  //left
            if (moveLeft()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
            break;
        case 38:  //up
            if (moveUp()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
            break;
        case 39:  //right
            if (moveRight()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
            break;
        case 40:  //dwon
            if (moveDown()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
            break;
        default:
            break;
    }
});

document.addEventListener("touchstart",function(event){
    //event.preventDefault();
    console.log("touchstart");
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});
document.addEventListener("touchmove",function(event){
    console.log("touchmove");
    event.preventDefault();
},{passive:false});
document.addEventListener("touchend",function(event){
    console.log("touchend");
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltax = endX - startX;
    var deltay = endY - startY;
    
    if(Math.abs(deltax) <0.3*documentWidth && Math.abs(deltay)< 0.3*documentWidth){
        console.log("no move");
        return;
    }
    // x
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax >0 ){
            // move right
            if (moveRight()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
        } else{
            // move left
            if (moveLeft()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
        }
    }else{ // y
        if( deltay >0 ){
            // move down
            if (moveDown()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
        } else{
            // move up
            if (moveUp()) {
                setTimeout(generateOneNumber(),210);
                setTimeout(isGameOver(),300);
                upateTimes();
            }
        }
    }
});

function isGameOver(){
    if(nospace(board) && nomove(board)){
        gameOver();
    }
}

function gameOver(){
    alert("Game Over!");
}

function moveLeft(){
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if(board[i][j] != 0){
                for (var k = 0; k < j; k++) {
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k]+=board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[i][k];
                        //update score
                        upateScore(score);
                        hasConflicted[i][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
};

function moveRight(){
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if(board[i][j] != 0){
                for (var k = 3; k > j; k--) {
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        // move
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)  && !hasConflicted[i][k]){
                        // move
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k]+=board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[i][k];
                        //update score
                        upateScore(score);
                        hasConflicted[i][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
};

function moveUp(){
    if (!canMoveUp(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if(board[i][j] != 0){
                for (var k = 0; k < i; k++) {
                    if(board[k][j] == 0 && noBlockVerticality(j,k,i,board)){
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockVerticality(j,k,i,board) && !hasConflicted[k][j]){
                        // move
                        showMoveAnimation(i,j,k,j);
                        // add
                        board[k][j]+=board[i][j];
                        board[i][j] = 0;
                        // add score
                        score += board[k][j];
                        //update score
                        upateScore(score);
                        hasConflicted[i][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
};

function moveDown(){
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if(board[i][j] != 0){
                for (var k = 3; k > i; k--) {
                    if(board[k][j] == 0 && noBlockVerticality(j,i,k,board)){
                        // move
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockVerticality(j,i,k,board)  && !hasConflicted[k][j]){
                        // move
                        showMoveAnimation(i,j,k,j);
                        // add
                        board[k][j]+=board[k][j];
                        board[i][j] = 0;
                        // add score
                        score += board[k][j];
                        //update score
                        upateScore(score);
                        hasConflicted[i][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
};
