import { Box, Button } from '@mui/material'
import React from 'react'
import useUserStore from '../stores/UserStore'
import { socket } from '../socket';

export const Gameboard = ({ playerIndex }: { playerIndex: number }) => {
    const [board, setBoard] = React.useState<Array<Array<number>>>(new Array(3).fill(new Array(3).fill(0)));
    const check = (i: number, j: number) => {
        setBoard(board.map((row, rowIndex) => row.map((cell, cellIndex) => {
            if (rowIndex === i && cellIndex === j) {
                return playerIndex;
            }
            return cell;
        })))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            {board.map((row, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '33%' }}>
                    {row.map((cell, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '33%', height: '100%', border: '1px solid black' }} onClick={() => check(i, j)}>
                            {cell === 0 ? "" : (cell === 1 ? "X" : "O")}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
