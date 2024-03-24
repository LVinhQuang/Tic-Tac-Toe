import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import useUserStore from '../stores/UserStore'
import { socket } from '../socket';
import { Popup } from './Popup';

export const Gameboard = ({ playerIndex, handleClose }: { playerIndex: number,handleClose: ()=>void }) => {
    const [board, setBoard] = React.useState<Array<Array<number>>>(new Array(3).fill(new Array(3).fill(0)));
    const [resultPopUp, setResultPopUp] = React.useState<boolean>(false);
    const [isWin, setIsWin] = React.useState<boolean>(false);
    const [isMyTurn, setIsMyTurn] = React.useState<boolean>(playerIndex === 1);
    const opponentIndex = playerIndex === 1 ? 2 : 1;
    useEffect(() => {
        const winner = checkWin();
        if (winner) {
            if (winner === playerIndex) {
                setIsWin(true);
                setResultPopUp(true)
            } else {
                setIsWin(false);
                setResultPopUp(true)
            }
        }
        if (checkDraw()) {
            alert('Draw!');
        }
        socket.on('move', (data: { i: number, j: number }) => {
            check(data.i, data.j, opponentIndex);
            setIsMyTurn(true);
        })
        return () => {
            socket.off('move');
        }
    }, [board])
    const check = (i: number, j: number, moverIndex: number) => {
        setBoard(board.map((row, rowIndex) => row.map((cell, cellIndex) => {
            if (rowIndex === i && cellIndex === j) {
                return moverIndex;
            }
            return cell;
        })))
    }
    const checkWin = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== 0) {
                return board[i][0];
            }
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== 0) {
                return board[0][i];
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
            return board[0][2];
        }
        return 0;
    }
    const checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }
    const handleClick = (i: number,j: number) => {
        if (isMyTurn) {
            check(i, j, playerIndex)
            socket.emit('move', { i: i, j: j });
            setIsMyTurn(false);
        }
    }
    return (
        <>
            <Popup trigger={resultPopUp} setTrigger={setResultPopUp} timeOut={0} handleClose={handleClose}>
                <h1>You {isWin ? 'Win': "Lose" }!</h1>
            </Popup>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                {board.map((row, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '33%' }}>
                        {row.map((cell, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '33%', height: '100%', border: '1px solid black' }} onClick={() => handleClick(i,j)}>
                                {cell === 0 ? "" : (cell === 1 ? "X" : "O")}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
