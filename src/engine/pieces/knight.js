import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player,false);
    }

    getAvailableMoves(board) {
        return new Array(0);
    }
}
