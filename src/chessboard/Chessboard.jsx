import React, {useState} from 'react'
import { Chessboard as Board } from 'react-chessboard'
import {Chess} from "chess.js";
function Chessboard() {
    const [game, setGame] = useState( new Chess())


    function makeMove(move) {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn());
        gameCopy.move(move);
        setGame(gameCopy);
      }
    
      function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.game_over || game.in_draw || possibleMoves.length === 0) return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeMove(possibleMoves[randomIndex]);
      }
    
      function onDrop(sourceSquare, targetSquare) {
        makeMove({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        // if (currentMove === null) return false;
        // setTimeout(makeRandomMove, 200);
        // return true;
      }

  return (
    <div className='Board'>
        <Board position={game.fen()} onPieceDrop={onDrop} />
    </div>
  )
}

export default Chessboard