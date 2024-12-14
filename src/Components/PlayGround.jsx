import React, { useState, useCallback } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import confetti from 'canvas-confetti';
import { FaGamepad } from "react-icons/fa";

export default function PlayGround() {
    const [state, setState] = useState(Array(9).fill(null));
    const [XisNext, setXisNext] = useState(true);
    const [gameHistory, setGameHistory] = useState([]);

    const triggerConfetti = useCallback(() => {
        const duration = 1500;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    }, []);

    const checkWinner = useCallback(() => {
        const winnerLogic = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let [a, b, c] of winnerLogic) {
            if (state[a] && state[a] === state[b] && state[b] === state[c]) {
                triggerConfetti();
                return state[a];
            }
        }

        if (state.every(square => square !== null)) {
            return 'draw';
        }

        return null;
    }, [state, triggerConfetti]);

    const resetGame = () => {
        setGameHistory(prev => [...prev, { winner: gameStatus, board: [...state] }]);
        setState(Array(9).fill(null));
        setXisNext(true);
    };

    const onBoxClick = (index) => {
        if (state[index] || gameStatus) return;

        setState(prev => {
            const newState = [...prev];
            newState[index] = XisNext ? "X" : "O";
            return newState;
        });
        setXisNext(!XisNext);
    };

    const gameStatus = checkWinner();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center py-8">
            <FaGamepad className="text-3xl text-purple-600 mr-2 flex justify-center " />
            <div className="mb-6 text-center">
                <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    Tic Tac Toe
                </h1>
                {gameHistory.length > 0 && (
                    <p className="text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full">
                        Games played: {gameHistory.length}
                    </p>
                )}
            </div>

            {gameStatus ? (
                <div className="space-y-4 my-4 bg-white/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
                    <div className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                        {gameStatus === 'draw' 
                            ? "It's a Draw!" 
                            : `${gameStatus} Player Won!`}
                    </div>
                    <div className="flex justify-center">
                        <Button 
                            color="success"
                            onClick={resetGame}
                            className="px-8 py-3 text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
                        >
                            Play Again
                        </Button>
                    </div>
                </div>
            ) : (
                <Card className="max-w-[500px] w-full bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader className="px-6 py-4 justify-center border-b">
                        <div className="text-xl font-semibold">
                            <span className={`${XisNext ? 'text-blue-600' : 'text-rose-600'}`}>
                                {XisNext ? "X" : "O"}
                            </span>
                            <span className="text-gray-700"> Player's Turn</span>
                        </div>
                    </CardHeader>
                    <CardBody className="grid grid-cols-3 gap-3 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                        {state.map((value, index) => (
                            <Square 
                                key={index}
                                value={value}
                                onClick={() => onBoxClick(index)}
                            />
                        ))}
                    </CardBody>
                    <CardFooter className="justify-center p-4 border-t">
                        <Button 
                            color="danger"
                            variant="ghost"
                            onClick={resetGame}
                            className="px-6 hover:scale-105 transition-transform"
                        >
                            Reset Game
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

const Square = React.memo(({ value, onClick }) => (
    <Button 
        className={`
            aspect-square text-2xl font-bold h-auto
            transition-all duration-200 ease-in-out
            hover:scale-105 shadow-md 
            ${value === 'X' ? 'bg-blue-500 hover:bg-blue-600' : ''}
            ${value === 'O' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            ${!value ? 'bg-white hover:bg-gray-100' : ''}
        `}
        onClick={onClick}
    >
        <span className={`
            ${value === 'X' ? 'text-white' : ''}
            ${value === 'O' ? 'text-white' : ''}
            ${!value ? 'text-gray-400' : ''}
        `}>
            {value}
        </span>
    </Button>
));

Square.displayName = 'Square';