import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player,true);
    }

    getAvailableMoves(board) {
        return new Array(0);
    }
}
