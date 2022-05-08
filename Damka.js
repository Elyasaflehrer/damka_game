const creatBoard = document.getElementById('board');
const whitePeice = 'white-peice';
const blackPeice = 'black-peice';
const empty = 'empty';
const white = 'white';
const black = 'black';
const queen = 'queen';
creatHTMLboard()
const listSquars = document.querySelectorAll('#board > div');//shuld be after startGame
function creatHTMLboard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const newdiv = document.createElement('div');
            newdiv.classList.add('squer');
            if (row % 2 === 0)
                newdiv.classList.add(col % 2 === 0 ? white : black);
            else
                newdiv.classList.add(col % 2 === 0 ? black : white);
            if (newdiv.className === 'squer black')
                createEvent(newdiv, row, col);

            creatBoard.appendChild(newdiv);

        }
    }
}
function createEvent(newdiv, row, col) {

    newdiv.addEventListener('click', (event) => {
        Pley(row, col)
    });
    classColorPiece(row, col, newdiv)
}
function classColorPiece(row, col, Blacksquare) {
    const newdiv = document.createElement('div');

    if (row < 3) {
        newdiv.classList.add(whitePeice);
        Blacksquare.appendChild(newdiv);
    }
    else if (row < 5) {
        newdiv.classList.add('empty');
        Blacksquare.appendChild(newdiv);
    }
    else if (row < 8) {
        newdiv.classList.add(blackPeice);
        Blacksquare.appendChild(newdiv);
    }
}
function GetSquareEmpty() {
    const newdiv = document.createElement('div');
    newdiv.classList.add(empty);
    return newdiv
}

let squareEmpty = listSquars[indexListSquare(3, 0)].firstChild;




// =====================Page 2 Logic game=============================

const peice = function (isWhite, isQueen) {
    this.isWhite = isWhite;
    this.isQueen = isQueen;
    this.getIsWhite = function () {
        return isWhite;
    };
    this.getIsQueen = function () {
        return isQueen;
    };
    this.setIsQueen = function (Bool) {
        isQueen = Bool
    };
}
let x = peice(true, false);
let isWhite = true;
let isBlack = !isWhite;
let isQueen = true;
let board = [, new peice(true, false), , new peice(true, false), , new peice(true, false), , new peice(true, false),
    new peice(true, false), , new peice(true, false), , new peice(true, false), , new peice(true, false), ,
    , new peice(true, false), , new peice(true, false), , new peice(true, false), , new peice(true, false),
    new peice(null, null), , new peice(null, null), , new peice(null, null), , new peice(null, null), ,
    , new peice(null, null), , new peice(null, null), , new peice(null, null), , new peice(null, null),
    new peice(false, false), , new peice(false, false), , new peice(false, false), , new peice(false, false), ,
    , new peice(false, false), , new peice(false, false), , new peice(false, false), , new peice(false, false),
    new peice(false, false), , new peice(false, false), , new peice(false, false), , new peice(false, false),]
//---------------------------------

let isChoosePiece = false;
let isWhiteTurn = true;
let isChooseLegalTool = false;
let rowFrom = 0;
let colFrom = 0;
let rowMoveTo = 0;
let colMoveTo = 0;
let rowToEatMore = 0;
let colToEatMore = 0;
let GoForward = 1;
let listSteps = [];
let isCanEat = false;
let isCanEatMore = false;
let isPrimerStep = true;
const stateChoosePiece = 'stateChoosePiece';
const stateEat = 'stateEat ';
const stateSimpleMove = 'stateSimpleMove';
let stateGame = stateChoosePiece;
print();

function Pley(row, col) {
    console.log('stateGame: ' + stateGame)
    switch (stateGame) {
        case stateChoosePiece:
            ChoosePiece(row, col)
            console.clear();
            break;
        case stateEat:
            eat(rowFrom, colFrom, row, col)
            break;
        case stateSimpleMove:
            simpleMove(row, col)
            break;
    }

}
function ChoosePiece(row, col) {
    console.log('ChoosePiece(row,col)')
    rowFrom = row;
    colFrom = col;
    isChoosePiece = isLegalTool(rowFrom, colFrom);
    console.log('isChoosePiece: ' + isChoosePiece)
    if (isChoosePiece) {
        if (isCanEat)
            stateGame = stateEat;
        else
            stateGame = stateSimpleMove;
        changeBackgroundArrayTo(listSteps, 'legal-steps');
    }


}
function isLegalTool(rowFrom, colFrom) {
    let isToolPlayer = isToolsPlayer();
    console.log('isToolPlayer: ' + isToolPlayer)
    if (isToolPlayer) {
        let iscanMove = isCanMove(rowFrom, colFrom);
        console.log('isCanMove(row,col): ' + iscanMove)
        return iscanMove;
    }
}

function isToolsPlayer() {
    if (board[indexListSquare(rowFrom, colFrom)].getIsWhite() !== isWhiteTurn)
        return false;
    return true;
}

function isCanMove(row, col) {
    isCanEat = isEatSteps(row, col);
    console.log('isCanEat: ' + isCanEat)
    if (!isCanEat) {
        regularSteps(GoForward);
        if (board[indexListSquare(row, col)].getIsQueen())
            regularSteps(-GoForward);
    }
    if (listSteps.length !== 0)
        return true;
    return false;
}

function regularSteps(goTo) {
    let cellInListSquars = indexListSquare(rowFrom + goTo, colFrom);
    if (!exit(rowFrom + goTo, colFrom + 1) && board[cellInListSquars + 1].getIsWhite() === null)
        listSteps.push(cellInListSquars + 1)
    if (!exit(rowFrom + goTo, colFrom - 1) && board[cellInListSquars - 1].getIsWhite() === null)
        listSteps.push(cellInListSquars - 1)
}

function isEatSteps(row, col) {
    eatLeft(row, col, -1, GoForward);
    eatRight(row, col, 1, GoForward);
    if (board[indexListSquare(row, col)].getIsQueen()) {
        let goBack = -GoForward;
        eatLeft(row, col, -1, goBack);
        eatRight(row, col, 1, goBack);
    }
    if (listSteps.length !== 0)
        return true;
    return false;
}

function eatLeft(row, col, colToCheck, GoTo) {
    if (exit(row + GoTo, col + colToCheck) || board[indexListSquare(row + GoTo, col + colToCheck)].getIsWhite() !== (!isWhiteTurn))
        return false
    if (exit(row + 2 * GoTo, col + 2 * colToCheck) || board[indexListSquare(row + 2 * GoTo, col + 2 * colToCheck)].getIsWhite() !== null)
        return false
    listSteps.push(indexListSquare(row + 2 * GoTo, col + 2 * colToCheck));
    return true;
}

function eatRight(row, col, colToCheck, GoTo) {
    if (exit(row + GoTo, col + colToCheck) || board[indexListSquare(row + GoTo, col + colToCheck)].getIsWhite() !== !isWhiteTurn)
        return false
    if (exit(row + 2 * GoTo, col + 2 * colToCheck) || board[indexListSquare(row + 2 * GoTo, col + 2 * colToCheck)].getIsWhite() !== null)
        return false
    listSteps.push(indexListSquare(row + 2 * GoTo, col + 2 * colToCheck));
    return true;
}
function simpleMove(row, col) {
    rowMoveTo = row;
    colMoveTo = col;
    let islegal = isLegalSquaerMoveTo(rowMoveTo, colMoveTo)
    if (islegal) {
        move(rowFrom, colFrom, rowMoveTo, colMoveTo);
        changeBackgroundArrayTo(listSteps, black);
        if (!board[indexListSquare(rowMoveTo, colMoveTo)].getIsQueen() && (rowMoveTo === 0 || rowMoveTo === 7))
            getQueen(board[indexListSquare(rowMoveTo, colMoveTo)], listSquars[indexListSquare(rowMoveTo, colMoveTo)]);
        updateTurnPlayer();
    }
}

function isLegalSquaerMoveTo(rowMoveTo, colMoveTo) {
    for (let index = 0; index < listSteps.length; index++)
        if (listSteps[index] === indexListSquare(rowMoveTo, colMoveTo))
            return true;
    return false;
}

function move(rowFrom, colFrom, rowMoveTo, colMoveTo) {
    let squareMoveFrom = board[indexListSquare(rowFrom, colFrom)]
    let squareMoveTo = board[indexListSquare(rowMoveTo, colMoveTo)]
    board[indexListSquare(rowFrom, colFrom)] = squareMoveTo;
    board[indexListSquare(rowMoveTo, colMoveTo)] = squareMoveFrom;
    console.log(' board[indexListSquare(rowFrom,colFrom)].getIsWhite(): ' + board[indexListSquare(rowFrom, colFrom)].getIsWhite())
    console.log('board[indexListSquare(rowMoveTo,colMoveTo)].getIsWhite(): ' + board[indexListSquare(rowMoveTo, colMoveTo)].getIsWhite())
    let KeepTool = listSquars[indexListSquare(rowFrom, colFrom)].firstChild;
    let squareEmpty = listSquars[indexListSquare(rowMoveTo, colMoveTo)].firstChild;
    listSquars[indexListSquare(rowFrom, colFrom)].removeChild(KeepTool)
    listSquars[indexListSquare(rowMoveTo, colMoveTo)].removeChild(squareEmpty)
    listSquars[indexListSquare(rowFrom, colFrom)].appendChild(squareEmpty)
    listSquars[indexListSquare(rowMoveTo, colMoveTo)].appendChild(KeepTool)
}
function getQueen(tool, tool2) {
    const newdiv = document.createElement('div');
    newdiv.classList.add(queen);
    tool2.firstChild.appendChild(newdiv)
    tool.setIsQueen(true);
}
function eat(rowFrom, colFrom, rowMoveTo, colMoveTo) {
    if (isCanEatMore) {
        rowFrom = rowToEatMore;
        colFrom = colToEatMore;
    }
    let islegal = isLegalSquaerMoveTo(rowMoveTo, colMoveTo)
    if (!islegal)
        return false;
    moveToEat(rowFrom, colFrom, rowMoveTo, colMoveTo)
    changeBackgroundArrayTo(listSteps, black);
    if (rowMoveTo === 0 || rowMoveTo === 7) {
        if (!board[indexListSquare(rowMoveTo, colMoveTo)].getIsQueen())
            getQueen(board[indexListSquare(rowMoveTo, colMoveTo)], listSquars[indexListSquare(rowMoveTo, colMoveTo)]);
        console.log("======updateTurnPlayer()")  
        //updateTurnPlayer()
    }
    isCanEatMore = iscanEatMore(rowMoveTo, colMoveTo)
    if (isCanEatMore) {
        rowToEatMore = rowMoveTo;
        colToEatMore = colMoveTo
        changeBackgroundArrayTo(listSteps, 'legal-steps');
    }
    else{
        console.log("======updateTurnPlayer()") 
        updateTurnPlayer()
    }
}
function iscanEatMore(row, col) {
    listSteps = [];
    isCanEat = isEatSteps(row, col);
    if (listSteps.length !== 0)
        return true;
    return false;
}
function moveToEat(rowFrom, colFrom, rowMoveTo, colMoveTo) {

    let squareMoveFrom = board[indexListSquare(rowFrom, colFrom)]
    let squareMoveTo = board[indexListSquare(rowMoveTo, colMoveTo)]
    let rowToEat = Math.abs(rowFrom + rowMoveTo) / 2;
    let colToEat = Math.abs(colFrom + colMoveTo) / 2;
    board[indexListSquare(rowFrom, colFrom)] = squareMoveTo;
    board[indexListSquare(rowMoveTo, colMoveTo)] = squareMoveFrom;
    board[indexListSquare(rowToEat, colToEat)] = new peice(null, null);
    let KeepTool = listSquars[indexListSquare(rowFrom, colFrom)].firstChild;
    let squareEmpty = listSquars[indexListSquare(rowMoveTo, colMoveTo)].firstChild;
    let KeepToolToEat = listSquars[indexListSquare(rowToEat, colToEat)].firstChild;
    listSquars[indexListSquare(rowFrom, colFrom)].removeChild(KeepTool)
    listSquars[indexListSquare(rowMoveTo, colMoveTo)].removeChild(squareEmpty)
    listSquars[indexListSquare(rowToEat, colToEat)].removeChild(KeepToolToEat);
    listSquars[indexListSquare(rowMoveTo, colMoveTo)].appendChild(KeepTool)
    listSquars[indexListSquare(rowToEat, colToEat)].appendChild(squareEmpty)
    const newdiv = document.createElement('div');
    newdiv.classList.add(empty)
    listSquars[indexListSquare(rowFrom, colFrom)].appendChild(newdiv)
}
function updateTurnPlayer() {
    isChoosePiece = false;
    isWhiteTurn = !isWhiteTurn;
    isChooseLegalTool = false;
    rowFrom = 0;
    colFrom = 0;
    rowMoveTo = 0;
    colMoveTo = 0;
    GoForward = -GoForward;
    listSteps = [];
    isCanEat = false;
    isCanEatMore = false;
    stateGame = stateChoosePiece;
}
























//====================PAGE 3====================================

function print() {
    let rows = '';
    for (let index = 0; index < board.length; index++) {
        if (rows.length % 8 === 0) {
            if (index > 0)
                console.log(rows);
            rows = '';
        }
        if (board[index] === undefined)
            rows += 'E  ';
        else if (board[index].getIsWhite() === null)
            rows += 'E  ';
        else if (board[index].getIsWhite() === isWhite)
            rows += 'W  ';
        else if (board[index].getIsWhite() === !isWhite)
            rows += 'B  ';
    }
    console.log(rows + 'E')
}
function indexListSquare(row, col) {
    return row * 8 + col;
}
function exit(row, col) {
    return (row > 7 || row < 0 || col < 0 || col > 7);
}
function changeBackgroundArrayTo(array, background) {
    console.log('changeBackgroundArrayTo(array , background) ')
    for (let index = 0; index < array.length; index++) {
        listSquars[array[index]].className = background;
    }
}