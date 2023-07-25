import React, { useEffect, useState } from 'react'
import Board from './Board'
import History from './History'

function Game() {
    const [history, setHistory] = useState([
      {
        squares: Array(9).fill(null)
      }
    ])


   
    const [oIsNext, setOIsNext] = useState(true)
    const [winner, setWinner] = useState(null)
    const [stepNumber, setStepNumber] = useState(0)


    useEffect(()=>{
        const newWinner = calculateWinner(history[history.length - 1].squares)
        setWinner(newWinner)
    },[history])


    const calculateWinner = (squares) =>{
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        for(let i=0; i<lines.length; i++){
            const [a,b,c] = lines[i];
            if(
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ){
                return squares[a]
            }

        }
        return null;
    } 

    const handleClick = (i) =>{
      const currentHistory = history.slice(0,stepNumber + 1);
      const current = currentHistory[currentHistory.length - 1]
      const newSquares = current.squares.slice();

        if(calculateWinner(newSquares) || newSquares[i]){
            return;
        }

        newSquares[i] = oIsNext? "O" : "X";
        setHistory(
          currentHistory.concat([{
            squares: newSquares,
          }])
        )
        setStepNumber(currentHistory.length)
        setOIsNext((prevState)=>!prevState)
    }
      const jumpTo = (step) => {
        setStepNumber(step);
        setOIsNext(step % 2 === 0);
    };
  

    const handleRestart = () =>{
        setStepNumber(0)
        setHistory([
          {
            squares: Array(9).fill(null),
          },
        ]);
        setOIsNext(true)
    }

  return (

    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <span className="player">Next player is: {oIsNext ? "O" : "X"}</span>
      <div className="game">
       
        <Board squares={history[stepNumber].squares} handleClick={handleClick} />
     
        <History history={history} jumpTo={jumpTo} />
        </div>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}
 




export default Game