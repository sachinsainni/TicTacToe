import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import confetti from 'canvas-confetti';

export default function PlayGround() {
    const [state, setState] = useState(Array(9).fill(null))
    const [XisNext, setXisNext] = useState(true)

    const handleClick = () => {
        const duration = 15 * 100;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
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
    };

    const checkWinner = () => {
        const winnerLogic = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let logic of winnerLogic) {
            const [a, b, c] = logic
            if (state[a] !== null && state[a] === state[b] && state[b] === state[c]) {
                handleClick()
                return true
            }
        }
        return false
    }

    const isWinner = checkWinner()

    const onBoxClick = (index) => {
        if (state[index]) {
            return
        }
        const copyState = [...state]
        copyState[index] = XisNext ? "X" : "O"
        setState(copyState)
        setXisNext(!XisNext)
    }

    return (
        <div className="flex justify-center my-4">
            {isWinner ?
                <div className=" space-y-3 my-2">
                    <div className="text-3xl text-center">
                        {XisNext ? "O" : "X"} Player Won !
                    </div>
                    <div className="flex justify-center">
                        <Button color="success" onClick={() => { setState(Array(9).fill(null)) }}>
                            Play Again
                        </Button>
                    </div>
                </div>
                :
                <>
                    <Card className="max-w-[500px]">
                        <CardHeader className="px-3 py-1 text-medium justify-center flex-row">
                            {/* <div className=""> */}
                            <p>{XisNext ? "X" : "O"} Player </p>
                            &nbsp;
                            <p className=" text-blue-600"> have Next Move</p>

                            {/* </div> */}
                        </CardHeader>
                        <CardBody className="grid grid-cols-3">
                            <div className="p-3"><Square value={state[0]} data='0' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[1]} data='1' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[2]} data='2' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[3]} data='3' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[4]} data='4' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[5]} data='5' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[6]} data='6' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[7]} data='7' onClick={onBoxClick} /></div>
                            <div className="p-3"><Square value={state[8]} data='8' onClick={onBoxClick} /></div>
                        </CardBody>
                        <CardFooter className="gap-3">

                        </CardFooter>
                    </Card>
                </>
            }
        </div>
    );
}



export function Square({ value, onClick, data }) {
    return (
        <Button className=""   onClick={() => { onClick(data) }} >{value}</Button>
    )
}

