import Piece from './piece';
import Square from '../square';


export default class Rook extends Piece {
    constructor(player) {
        super(player,false);
    }

    getAvailableMoves(board) {
        let location = board.findPiece(this)
        let availableMoves=[]

        for(let row=0;row <8;row++)
        {
            for(let col=0; col<8;col++)
            {
                if(row === location.row || col ===location.col )
                {
                    if(!(row === location.row && col ===location.col) )
                    availableMoves.push(Square.at(row, col))
                }
            }
        }   
         return availableMoves
    }

    



}
