import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, false); // Extended constructor
    }

    getAvailableMoves(board) {

        let location = board.findPiece(this)
        let availableMoves = []
       if (this.player === Player.WHITE) {
            if (!(this.isFirstSquareFree(board)) || (location.row == 7)) { return [] } // No moves
            else {
                if (this.isPiecePresentLeftDiagonal(board) && !this.isLeftDiagonalFriendlyPiece(board) && !this.isLeftDiagonalOpposingKing(board)) {// It can move diagonally if there is a piece to take either on the first move or not
                    console.log(`I have entered the piece present WHite Left diagonal and my col values are ${location.row}${location.col} and left diagonal piece value is ${location.row + 1}${location.col + 1}`)
                    availableMoves.push(Square.at(location.row + 1, location.col + 1))
                }
                if (this.isPiecePresentRightDiagonal(board) && !this.isRightDiagonalFriendlyPiece(board) && !this.isRightDiagonalOpposingKing(board) ) {
                    console.log(`I have entered the piece present White Right diagonal and my col values are ${location.row}${location.col} and left diagonal piece value is ${location.row + 1}${location.col - 1}`)

                    availableMoves.push(Square.at(location.row + 1, location.col - 1))
                }
                if (location.row > 1) // Not the first move (1 up only)
                {
                    availableMoves.push(Square.at(location.row + 1, location.col))
                    //return availableMoves
                }
                else if (this.isSecondSquareFree(board)) // First move (Up to 2 up)
                {
                    availableMoves.push(Square.at(location.row + 1, location.col), Square.at(location.row + 2, location.col))
                    //return availableMoves
                }


                return availableMoves

            }
        }
        else // Black moves
        {
            if (!(this.isFirstSquareFree(board)) || (location.row === 0)) { return [] }
            else {
                if (this.isPiecePresentLeftDiagonal(board) && !this.isLeftDiagonalFriendlyPiece(board) && !this.isLeftDiagonalOpposingKing(baord)) { // It can move diagonally if there is a piece to take either on the first move or not
                    console.log(`I have entered the piece present Black Left diagonal and my col values are ${location.row}${location.col} and left diagonal piece value is ${location.row - 1}${location.col + 1}`)

                    availableMoves.push(Square.at(location.row - 1, location.col + 1))
                }
                if (this.isPiecePresentRightDiagonal(board) && !this.isRightDiagonalFriendlyPiece(board) && !this.isRightDiagonalOpposingKing(board) ) {
                    console.log(`I have entered the piece present Black Right diagonal and my col values are ${location.row}${location.col} and left diagonal piece value is ${location.row - 1}${location.col - 1}`)

                    availableMoves.push(Square.at(location.row - 1, location.col - 1))
                }
                if (location.row < 6) {
                    availableMoves.push(Square.at(location.row - 1, location.col))
                    //   return availableMoves
                }
                else if (this.isSecondSquareFree(board)) {
                    availableMoves.push(Square.at(location.row - 1, location.col), Square.at(location.row - 2, location.col))
                    //    return availableMoves
                }


                return availableMoves

            }
        }
    }
    isFirstSquareFree(board) {
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            if (!(location.row === 7))// Board edge condition, otherwise it will fail when it calculates Row7+1
                return (board.getPiece(Square.at(location.row + 1, location.col)) === undefined) // First square is free and white pawn can move 1 up
        }
        else { // Black Moves
            if (!(location.row === 0))
                return (board.getPiece(Square.at(location.row - 1, location.col)) === undefined) // First square is free and black pawn can move 1 down
        }
    }

    isSecondSquareFree(board) {
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            if (!(location.row === 7))
                return (board.getPiece(Square.at(location.row + 2, location.col)) === undefined) // Second square is free and white pawn can move 2 up
        }
        else {
            if (!(location.row === 0))
                return (board.getPiece(Square.at(location.row - 2, location.col)) === undefined) // Second square if free and black pawn can move 2 down
        }
    }

    isPiecePresentLeftDiagonal(board) {
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            if ((!(location.row === 7) || (!(location.col === 0))))
                return (board.getPiece(Square.at(location.row + 1, location.col + 1)) !== undefined)
        }
        else {
            if ((!(location.row === 0) || (!(location.col === 7))))
                return (board.getPiece(Square.at(location.row - 1, location.col + 1)) !== undefined)
        }
    }

    isPiecePresentRightDiagonal(board) {
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            if (!(location.row === 7) || (!(location.col === 7)))
                return (board.getPiece(Square.at(location.row + 1, location.col - 1)) !== undefined)
        }
        else {
            if (!(location.row === 0) || (!(location.col === 0)))
                return (board.getPiece(Square.at(location.row - 1, location.col - 1)) !== undefined)
        }
    }

    isLeftDiagonalFriendlyPiece(board) {
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            if (!(location.row === 7) || (!(location.col === 0)))
                return (board.getPiece(Square.at(location.row + 1, location.col + 1)).player === Player.WHITE)
        }
        else {
            if (!(location.row === 0) || (!(location.col === 7)))
                return (board.getPiece(Square.at(location.row - 1, location.col + 1)).player === Player.BLACK)
        }
    }

    isRightDiagonalFriendlyPiece(board) {
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            if (!(location.row === 7) || (!(location.col === 7)))
                return (board.getPiece(Square.at(location.row + 1, location.col - 1)).player === Player.WHITE)
        }
        else {
            if (!(location.row === 0) || (!(location.col === 0)))
                return (board.getPiece(Square.at(location.row - 1, location.col - 1)).player === Player.BLACK)
        }
    }

    isLeftDiagonalOpposingKing(board) {
        console.log("Left Diagonal Opposing King Function:")
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            console.log('White player')
            if ((this.isPiecePresentLeftDiagonal(board))) {
                console.log('Piece is Present')
                if (board.getPiece(Square.at(location.row + 1, location.col + 1)).player === Player.BLACK) // Not friendly
                console.log('Not friendly piece')
                {   console.log(board.getPiece(Square.at(location.row + 1, location.col + 1)).isKing)
                return board.getPiece(Square.at(location.row + 1, location.col + 1)).isKing
                }
            }
        }
        else {
            console.log("black",this.player)
            if ((this.isPiecePresentLeftDiagonal(board))) {
                if (board.getPiece(Square.at(location.row - 1, location.col + 1)).player === Player.WHITE){
                  console.log(board.getPiece(Square.at(location.row - 1, location.col + 1)).isKing)
                    return board.getPiece(Square.at(location.row - 1, location.col + 1)).isKing
            }
        }
        }
    }

    isRightDiagonalOpposingKing(board) {
        console.log("I am enterinto Right Diagonal Opposing King Function")
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            console.log("My player is White",this.player)
            if ((this.isPiecePresentRightDiagonal(board))) {
                console.log(`entered into the loop that in right diagonal Piece is present`)
                if (board.getPiece(Square.at(location.row + 1, location.col - 1)).player === Player.BLACK)
                {console.log(`board.getPiece(Square.at(location.row + 1, location.col - 1)).isKing${board.getPiece(Square.at(location.row + 1, location.col - 1)).isKing}`)
                     return board.getPiece(Square.at(location.row + 1, location.col - 1)).isKing
                }
            }
        }
        else {
            if ((this.isPiecePresentRightDiagonal(board))) {
                console.log(`entered into the loop that in right diagonal Piece is present`)
                console.log(board.getPiece(Square.at(location.row - 1, location.col - 1)).player === Player.WHITE)
                if (board.getPiece(Square.at(location.row - 1, location.col - 1)).player === Player.WHITE)
                {
                   // console.log(`board.getPiece(Square.at(location.row + 1, location.col - 1)).isKing${board.getPiece(Square.at(location.row + 1, location.col - 1)).isKing}`)
                    return board.getPiece(Square.at(location.row - 1, location.col - 1)).isKing
                }
            }
        }
    }
}
