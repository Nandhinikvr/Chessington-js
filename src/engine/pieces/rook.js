import Piece from './piece';
import Square from '../square';
import Player from '../player';
import Pawn from './pawn';


export default class Rook extends Piece {
    constructor(player) {
        super(player, false);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this)
        let availableMoves = []
        let piecePresent = false;
        let removeValue
        var valueDict = [];

        for (let row = 0; row < 8; row++) {   //4
            for (let col = 0; col < 8; col++) {   // 6
                if (row === location.row || col === location.col) {
                    if (!(row === location.row && col === location.col)) {
                        availableMoves.push(Square.at(row, col))
                        valueDict.push(row, col)
                    }
                    
                  
                }
            }
        }
         removeValue=this.blockingPieceInArray(valueDict, board);
      if (removeValue.length>0) {
            let value = "" + removeValue;
            this.removeItem(availableMoves, value)
            return availableMoves
        }
    
        return availableMoves
    }

    removeItem(arr, value) {
        var i = 0;
        while (i < arr.length) {
            if (arr[i] == value) {
                arr.splice(i+1, 1);
                break;
            } else {
                ++i;
            }
        }
        return arr;
    }
    
}
