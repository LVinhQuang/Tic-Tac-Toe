import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { socket } from '../socket'
import useUserStore from '../stores/UserStore'
import { SportsCricket } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Room {
  roomId: string;
  roomName: string;
  players: Array<{fullname: string, email: string, score: number}>;
}
export const Mainboard = ({rooms,joinRoom}:{rooms: Array<Room>, joinRoom: Function}) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' m={2} p={2} sx={{ border: '2px solid gray', height: '85%' }}>
      <Button onClick={()=>joinRoom(null)} variant='contained' color='primary' sx={{ width: '30%', height: '50px', fontSize: '20px', fontWeight: 'bold' }}>Create Room</Button>
      {rooms.map((room) => (
        <>
          {room.players.length === 1 &&
          <button key={room.roomId} style={{ width: '100%' }} onClick={() => joinRoom(room.roomId)}>{room.players[0].fullname}</button>}
        </>
      ))}
    </Box>
  )
}
