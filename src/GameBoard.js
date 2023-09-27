import { useState } from "react";
import React from "react";
import './Game.css'
import Header from "./Header";
import Footer from "./Footer";
import GameCircle from "./GameCircle";
import { isDraw, isWinner,getComputerMove } from "./helper";
import { GAME_STATE_PLAYING,GAME_STATE_WIN,GAME_STATE_DRAW ,GAME_STATE_IDLE} from "./componants";
const NO_CIRCLES =16;
const NO_PLAYER =0;
const PLAYER1=1;
const PLAYER2 =2;


const GameBoard =()=>{
    const[gameBoard,setGameBoard]=useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const[currentPlayer,setCurrentPlayer]=useState(PLAYER1);
    const [gameState , setGameState] = useState (GAME_STATE_PLAYING);
    const [winPlayer,setWinPlayer]= useState(NO_PLAYER);

   
    const initGame=()=>{
        console.log("init game");
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER1);
        setGameState(GAME_STATE_PLAYING);
    }
 
    const initBoard = ()=>{
        const circles=[];

        for(let i =0 ;i<NO_CIRCLES ;i++){
            circles.push(renderCircle(i));
        }
        return circles;

    };
    const circleClicked=(id)=>{
        console.log("circle clicked:"+id);
        if(gameBoard[id]!== NO_PLAYER) return;
        if(gameState!== GAME_STATE_PLAYING) return;
    
    if (isWinner(gameBoard,id,currentPlayer)){
        setGameState(GAME_STATE_WIN);
       setWinPlayer(currentPlayer);
}
    if (isDraw(gameBoard,id,currentPlayer)){
    setGameState(GAME_STATE_DRAW);
    setWinPlayer(NO_PLAYER);
}
        
    setGameBoard((prev) =>{
    return prev.map((circle,pos)=>{
    if(pos===id)
    return currentPlayer;
    return circle;
            });
        })
       
    setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);

    console.log(gameBoard);
     console.log(currentPlayer);
    };
    const renderCircle = id =>{
        return <GameCircle key={id} id={id} className={`player${gameBoard[id]}`}onCircleClicked={circleClicked} />
    };
   
    const suggestMove=()=>{
        circleClicked(getComputerMove(gameBoard));
    }
    return (
        <div>
        <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
    <div className="gameBoard">
        {initBoard()}
    </div>
    <Footer onNewGameClick={initGame} onSuggestClick={suggestMove}/>
    </div>
    )

};
export default GameBoard;