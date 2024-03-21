import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { socket } from '../socket'
import useUserStore from '../stores/UserStore'

export const Mainboard = () => {
  const [rooms, setRooms] = useState<Array<{ room: string, name: string }>>([]);
  const { user } = useUserStore() as { user: { fullname: string, email: string, score: number } };
  useEffect(() => {
    socket.on('roomCreated', (data: { room: string, name: string }) => {
      setRooms(prevRooms => [...prevRooms, data]);
    })
    return () => {
      socket.off('roomCreated');
    }
  }, [])
  const createRoom = () => {
    socket.emit('createRoom', { user: user });
  }
  const joinRoom = (room: string) => {
    socket.emit('joinRoom', {room: room});
  }
  return (
    <Box display='flex' flexDirection='column' alignItems='center' m={2} p={2} sx={{ border: '2px solid gray', height: '85%' }}>
      <Button onClick={createRoom} variant='contained' color='primary' sx={{ width: '30%', height: '50px', fontSize: '20px', fontWeight: 'bold' }}>Create Room</Button>
      {rooms.map((roomData) => (
        <button key={roomData.room} style={{ width: '100%' }} onClick={()=>joinRoom(roomData.room)}>{roomData.name}</button>
      ))}
    </Box>
  )
}
