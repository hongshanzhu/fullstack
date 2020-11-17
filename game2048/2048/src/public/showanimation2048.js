function showNumberWithAnimation(i,j,randomNumber){
    var theNumberCell = $("#number-cell-"+i+"-"+j);
    theNumberCell.css('backgroud-color', getNumberBackgroundColor(randomNumber));
    theNumberCell.css("color",getNumberColor(randomNumber));
    theNumberCell.text(randomNumber);
    theNumberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50)
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var theNumberCell = $("#number-cell-"+fromx+"-"+fromy);
    theNumberCell.animate({       
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}

function upateScore(score){
    $("#score").text(score);
}

function upateTimes(){
    times++;
    $("#times").text(times);
}